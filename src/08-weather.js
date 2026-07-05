// Meteo — Open-Meteo (grátis, sem chave) com localização do aparelho
let WEATHER_CACHE = null;
let WEATHER_TS = 0;

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

async function loadWeather() {
  const box = document.getElementById('weather-box');
  if (!box || !('geolocation' in navigator)) return;

  // cache de 30 min
  if (WEATHER_CACHE && Date.now() - WEATHER_TS < 30 * 60 * 1000) {
    renderWeather(WEATHER_CACHE);
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      const data = await res.json();
      WEATHER_CACHE = data; WEATHER_TS = Date.now();
      renderWeather(data);
    } catch (e) { console.error(e); }
  }, () => {
    // sem permissão: botão discreto para pedir
    box.innerHTML = `<button class="btn-help-sm" style="width:100%" onclick="loadWeatherForce()">${t('weather_enable')}</button>`;
  }, { maximumAge: 600000, timeout: 8000 });
}

function loadWeatherForce() {
  WEATHER_CACHE = null;
  loadWeather();
}

function renderWeather(d) {
  const box = document.getElementById('weather-box');
  if (!box || !d || !d.current) return;
  const wd = t('weekdays_short');
  const days = (d.daily && d.daily.time ? d.daily.time : []).map((iso, i) => {
    const date = new Date(iso + 'T00:00:00');
    return `<div class="wday">
      <span class="wday-name">${i === 0 ? t('weather_today') : wd[date.getDay()]}</span>
      <span class="wday-icon">${WMO_EMOJI(d.daily.weather_code[i])}</span>
      <span class="wday-max">${Math.round(d.daily.temperature_2m_max[i])}°</span>
      <span class="wday-min">${Math.round(d.daily.temperature_2m_min[i])}°</span>
    </div>`;
  }).join('');

  box.innerHTML = `
    <div class="weather-now">
      <span class="wnow-icon">${WMO_EMOJI(d.current.weather_code)}</span>
      <span class="wnow-temp">${Math.round(d.current.temperature_2m)}°C</span>
    </div>
    <div class="weather-week">${days}</div>`;
}
