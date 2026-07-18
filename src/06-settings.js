// Definições — nome, idioma, moeda, tema (guardado no perfil, sincroniza entre dispositivos)
let PROFILE = null;

const LANGS = [
  { code: 'pt', label: '🇵🇹 Português' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'en', label: '🇬🇧 English' }
];

async function loadProfile() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  PROFILE = data;
  if (PROFILE) {
    if (I18N[PROFILE.language]) LANG = PROFILE.language;
    applyTheme(PROFILE.theme || 'auto');
  }
  return PROFILE;
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode === 'auto' ? '' : mode);
}

async function renderSettings() {
  if (!PROFILE) await loadProfile();
  const p = PROFILE || {};
  const pushOn = await pushIsEnabled();
  sectionShell(t('settings'), `
    <div class="form">
      <label class="lbl">${t('set_name')}</label>
      <input id="set-name" type="text" value="${(p.display_name || '').replace(/"/g, '&quot;')}">

      <label class="lbl">${t('nif_lbl')}</label>
      <input id="set-nif" type="text" placeholder="${t('nif_ph')}" value="${(p.nif || '').replace(/"/g, '&quot;')}">

      <label class="lbl">${t('set_language')}</label>
      <select id="set-lang">
        ${LANGS.map(l => `<option value="${l.code}"${p.language === l.code ? ' selected' : ''}${I18N[l.code] ? '' : ' disabled'}>${l.label}${I18N[l.code] ? '' : ' ' + t('lang_soon')}</option>`).join('')}
      </select>

      <label class="lbl">${t('set_currency')}</label>
      <select id="set-cur">
        ${CURRENCIES.map(c => `<option value="${c}"${(p.currency || 'CHF') === c ? ' selected' : ''}>${c}</option>`).join('')}
      </select>

      <label class="lbl">${t('set_theme')}</label>
      <div class="seg">
        <button class="seg-btn${(p.theme || 'auto') === 'auto' ? ' on' : ''}" onclick="setTheme(this,'auto')">${t('theme_auto')}</button>
        <button class="seg-btn${p.theme === 'light' ? ' on' : ''}" onclick="setTheme(this,'light')">${t('theme_light')}</button>
        <button class="seg-btn${p.theme === 'dark' ? ' on' : ''}" onclick="setTheme(this,'dark')">${t('theme_dark')}</button>
      </div>
      <input type="hidden" id="set-theme" value="${p.theme || 'auto'}">

      <label class="lbl">${t('push_lbl')} — ${pushOn ? t('push_on_lbl') : t('push_off_lbl')}</label>
      <button class="btn-secondary" onclick="togglePush(this)">${pushOn ? t('push_disable') : t('push_enable')}</button>

      <div id="set-msg"></div>
      <button class="btn-primary" onclick="saveSettings()">${t('save')}</button>
      <div class="divider"></div>
      ${p.is_admin ? `
      <div class="card" style="padding:14px;margin-bottom:10px;border:1px solid var(--acc)">
        <div style="font-weight:600;margin-bottom:8px">⚙️ Admin</div>
        <button class="btn-secondary" style="width:100%" onclick="renderAdminSupport()">📊 Painel Admin</button>
      </div>` : ''}
      <button class="btn-secondary" onclick="doLogout()">${t('logout')}</button>
    </div>
  `);
}

function setTheme(btn, mode) {
  document.getElementById('set-theme').value = mode;
  btn.parentElement.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  applyTheme(mode);
}

async function saveSettings() {
  const { data: { user } } = await sb.auth.getUser();
  const display_name = document.getElementById('set-name').value.trim();
  const nif = document.getElementById('set-nif').value.trim() || null;
  const language = document.getElementById('set-lang').value;
  const currency = document.getElementById('set-cur').value;
  const theme = document.getElementById('set-theme').value;

  const { error } = await sb.from('profiles')
    .update({ display_name, nif, language, currency, theme }).eq('id', user.id);
  if (error) { console.error(error); document.getElementById('set-msg').innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }

  // atualizar também os metadados de auth (para o "Olá, X")
  await sb.auth.updateUser({ data: { display_name } });

  PROFILE = { ...PROFILE, display_name, nif, language, currency, theme };
  if (I18N[language]) LANG = language;
  applyTheme(theme);
  document.getElementById('set-msg').innerHTML = `<div class="ok">${t('saved')}</div>`;
  setTimeout(renderSettings, 700);
}
