// Meteo — Open-Meteo com localização do aparelho ou cidade escolhida
let WEATHER_CACHE = null;
let WEATHER_TS = 0;
let WEATHER_PLACE = '';
let WEATHER_WEEK = 0;

const WMO_EMOJI = c => {
  if (c === 0) return '☀️';
  if (c === 1) return '🌤️';
  if (c === 2) return '⛅';
  if (c === 3) return '☁️';
  if (c === 45 || c === 48) return '🌫️';
  if (c >= 51 && c <= 57) return '🌦️';
  if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return '🌧️';
  if ((c >= 71 && c <= 77) || c === 85 || c === 86) return '🌨️';
  if (c >= 95) return '⛈️';
  return '🌡️';
};

function weatherBox() {
  return `<div id="weather-box" class="weather-box"></div>`;
}

function savedCity() {
  try { return JSON.parse(localStorage.getItem('aboklar_weather_city') || 'null'); }
  catch (_) { return null; }
}

async function loadWeather() {
  const box = document.getElementById('weather-box');
  if (!box) return;

  if (WEATHER_CACHE && Date.now() - WEATHER_TS < 30 * 60 * 1000) {
    renderWeather(WEATHER_CACHE);
    return;
  }

  const city = savedCity();
  if (city) {
    WEATHER_PLACE = city.name;
    fetchWeather(city.lat, city.lon);
    return;
  }

  if (!('geolocation' in navigator)) return;
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    try {
      const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${LANG}`);
      const g = await r.json();
      WEATHER_PLACE = g.city || g.locality || g.principalSubdivision || '';
    } catch (_) { WEATHER_PLACE = ''; }
    fetchWeather(latitude, longitude);
  }, () => {
    box.innerHTML = `<button class="btn-help-sm" style="width:100%" onclick="openCityPicker()">${t('weather_enable')}</button>`;
  }, { maximumAge: 600000, timeout: 8000 });
}

async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weather_code` +
      `&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset,uv_index_max` +
      `&timezone=auto&forecast_days=14`;
    const res = await fetch(url);
    const data = await res.json();
    WEATHER_CACHE = data; WEATHER_TS = Date.now();
    renderWeather(data);
  } catch (e) { console.error(e); }
}

function renderWeather(d) {
  const box = document.getElementById('weather-box');
  if (!box || !d || !d.current) return;
  renderWeatherWeek(d);
}

function renderWeatherWeek(d) {
  const box = document.getElementById('weather-box');
  if (!box || !d || !d.current) return;
  const wd = t('weekdays_short');
  const allDays = d.daily && d.daily.time ? d.daily.time : [];
  const totalWeeks = Math.ceil(allDays.length / 7);
  const start = WEATHER_WEEK * 7;
  const slice = allDays.slice(start, start + 7);
  const days = slice.map((iso, j) => {
    const i = start + j;
    const date = new Date(iso + 'T00:00:00');
    const label = i === 0 ? t('weather_today') : wd[date.getDay()];
    return `<button class="wday" onclick="showDayDetail(${i})">
      <span class="wday-name">${label}</span>
      <span class="wday-icon">${WMO_EMOJI(d.daily.weather_code[i])}</span>
      <span class="wday-max">${Math.round(d.daily.temperature_2m_max[i])}°</span>
      <span class="wday-min">${Math.round(d.daily.temperature_2m_min[i])}°</span>
    </button>`;
  }).join('');

  const navBtn = (dir, disabled) => `
    <button onclick="changeWeatherWeek(${dir})" ${disabled ? 'disabled' : ''}
      style="background:none;border:none;font-size:1.3rem;cursor:${disabled ? 'default' : 'pointer'};
             opacity:${disabled ? '0.2' : '0.7'};padding:0 6px;color:inherit;line-height:1;align-self:center">
      ${dir < 0 ? '←' : '→'}
    </button>`;

  box.innerHTML = `
    <button class="weather-place" onclick="openCityPicker()">📍 ${WEATHER_PLACE || t('w_pick_city')} ▾</button>
    <div class="weather-now">
      <span class="wnow-icon">${WMO_EMOJI(d.current.weather_code)}</span>
      <span class="wnow-temp">${Math.round(d.current.temperature_2m)}°C</span>
    </div>
    <div style="display:flex;align-items:stretch;gap:2px">
      ${navBtn(-1, WEATHER_WEEK === 0)}
      <div class="weather-week" style="flex:1">${days}</div>
      ${navBtn(1, WEATHER_WEEK >= totalWeeks - 1)}
    </div>`;
}

function changeWeatherWeek(dir) {
  const allDays = WEATHER_CACHE?.daily?.time || [];
  const totalWeeks = Math.ceil(allDays.length / 7);
  WEATHER_WEEK = Math.max(0, Math.min(totalWeeks - 1, WEATHER_WEEK + dir));
  renderWeatherWeek(WEATHER_CACHE);
}

function showDayDetail(i) {
  const d = WEATHER_CACHE;
  if (!d || !d.daily) return;
  const iso = d.daily.time[i];
  const date = new Date(iso + 'T00:00:00');
  const wd = t('weekdays_short');
  const hm = x => x ? x.slice(11, 16) : '—';
  const rows = [
    [t('w_minmax'), `${Math.round(d.daily.temperature_2m_min[i])}° / ${Math.round(d.daily.temperature_2m_max[i])}°`],
    [`🌧️ ${t('w_rain')}`, `${d.daily.precipitation_probability_max[i] ?? 0}% · ${(d.daily.precipitation_sum[i] ?? 0).toFixed(1)} mm`],
    [`💨 ${t('w_wind')}`, `${Math.round(d.daily.wind_speed_10m_max[i])} km/h`],
    [`🌅 ${t('w_sunrise')}`, hm(d.daily.sunrise[i])],
    [`🌇 ${t('w_sunset')}`, hm(d.daily.sunset[i])],
    [`☀️ ${t('w_uv')}`, `${Math.round(d.daily.uv_index_max[i] ?? 0)}`]
  ];

  // Dados horários para este dia
  let hoursHtml = '';
  if (d.hourly && d.hourly.time) {
    const now = new Date();
    const dayPrefix = iso; // 'YYYY-MM-DD'
    const dayHours = d.hourly.time
      .map((t2, hi) => ({ t: t2, hi }))
      .filter(({ t: t2 }) => t2.startsWith(dayPrefix));
    if (dayHours.length) {
      const hourRows = dayHours.map(({ t: t2, hi }) => {
        const hour = t2.slice(11, 16);
        const isNow = i === 0 && parseInt(hour) === now.getHours();
        return `<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:8px;${isNow ? 'background:var(--acc20,rgba(255,180,0,.15));font-weight:600' : ''}">
          <span style="width:38px;font-size:.8rem;color:var(--muted)">${hour}</span>
          <span>${WMO_EMOJI(d.hourly.weather_code[hi])}</span>
          <span style="min-width:36px;font-size:.9rem">${Math.round(d.hourly.temperature_2m[hi])}°</span>
          <span style="font-size:.75rem;color:var(--muted)">${d.hourly.precipitation_probability[hi] ?? 0}% 💧</span>
          <span style="font-size:.75rem;color:var(--muted);margin-left:auto">${Math.round(d.hourly.wind_speed_10m[hi])} km/h 💨</span>
        </div>`;
      }).join('');
      hoursHtml = `
        <div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px">Hora a hora</div>
        <div style="max-height:220px;overflow-y:auto;border-radius:10px;background:var(--bg)">${hourRows}</div>`;
    }
  }

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <span style="font-size:40px">${WMO_EMOJI(d.daily.weather_code[i])}</span>
        <div>
          <div class="modal-title">${i === 0 ? t('weather_today') : wd[date.getDay()]}</div>
          <div class="modal-sub">${fmtDate(iso)} · ${WEATHER_PLACE}</div>
        </div>
      </div>
      ${rows.map(r => `<div class="detail-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}
      ${hoursHtml}
      <div class="modal-btns">
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

function openCityPicker() {
  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:12px">${t('w_pick_city')}</div>
      <div class="form">
        <input id="city-q" type="text" placeholder="${t('w_city_search')}" oninput="cityDebounce()">
        <div id="city-results"></div>
        <button class="btn-secondary" onclick="useMyLocation()">${t('w_use_location')}</button>
        <button class="btn-link" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
  setTimeout(() => document.getElementById('city-q').focus(), 100);
}

let CITY_TIMER = null;
function cityDebounce() {
  clearTimeout(CITY_TIMER);
  CITY_TIMER = setTimeout(searchCity, 400);
}

async function searchCity() {
  const q = document.getElementById('city-q');
  const out = document.getElementById('city-results');
  if (!q || !out || q.value.trim().length < 2) { if (out) out.innerHTML = ''; return; }
  try {
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q.value.trim())}&count=5&language=${LANG}`);
    const d = await r.json();
    out.innerHTML = (d.results || []).map(c =>
      `<button class="city-opt" onclick='pickCity(${JSON.stringify(JSON.stringify({ name: c.name, lat: c.latitude, lon: c.longitude }))})'>
        ${flagEmoji(c.country_code ? c.country_code.toUpperCase() : '')} ${c.name}${c.admin1 ? ', ' + c.admin1 : ''} (${c.country || ''})
      </button>`).join('') || `<p class="muted">—</p>`;
  } catch (e) { console.error(e); }
}

function pickCity(json) {
  const c = JSON.parse(json);
  localStorage.setItem('aboklar_weather_city', JSON.stringify(c));
  WEATHER_CACHE = null; WEATHER_PLACE = c.name;
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  loadWeather();
}

function useMyLocation() {
  localStorage.removeItem('aboklar_weather_city');
  WEATHER_CACHE = null;
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  loadWeather();
}

function loadWeatherForce() { WEATHER_CACHE = null; loadWeather(); }
