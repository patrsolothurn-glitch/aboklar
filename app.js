// AboKlar — build 60 — 2026-07-18T21:06:12.173Z

// ===== 00-config.js =====
// Config Supabase (anon key é pública por design; segurança vem do RLS)
const SUPA_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bXVjaHp0cWlnbGJtZ3N3ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTM1MDIsImV4cCI6MjA5ODc2OTUwMn0.98Hq3MmpepzCpjE0lDcV-caT5r6xyANmjpU_aEckeVE';
if (!window.supabase) { showFatal('Biblioteca Supabase não carregou. Verifica a ligação à internet e recarrega.'); throw new Error('supabase cdn'); }
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);


// ===== 000-errors.js =====
// Monitor global de erros — mostra falhas no ecrã (estilo Carvalho-55)
function showFatal(msg) {
  const el = document.getElementById('app');
  if (el) el.innerHTML = `<div style="max-width:360px;margin:40px auto;padding:16px;border-radius:14px;background:rgba(220,38,38,.12);color:#F87171;font-family:monospace;font-size:13px;word-break:break-word">⚠️ ${msg}</div>
  <button onclick="location.reload()" style="display:block;margin:0 auto;padding:12px 24px;border-radius:12px;border:none;background:#F59E0B;font-weight:700">Recarregar</button>`;
}
window.addEventListener('error', e => showFatal('Erro: ' + (e.message || e.type) + (e.filename ? '<br>' + e.filename.split('/').pop() + ':' + e.lineno : '')));
window.addEventListener('unhandledrejection', e => showFatal('Erro (promise): ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason))));


// ===== 01-i18n.js =====
// i18n — PT · DE · FR · IT · EN
const I18N = {
  pt: {
    tagline: 'Subscrições e faturas, claro.',
    w_rain: 'Chuva',
    w_wind: 'Vento',
    w_sunrise: 'Nascer do sol',
    w_sunset: 'Pôr do sol',
    w_uv: 'Índice UV',
    w_minmax: 'Mín / Máx',
    w_city_search: 'Procurar cidade…',
    w_use_location: '📍 Usar a minha localização',
    w_pick_city: 'Escolher cidade',
    group_due: '📌 Este mês',
    group_paid: '✓ Pagas',
    group_later: '📅 Mais tarde',
    group_inactive: '⏸ Desativadas',
    weekdays_short: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    weather_today: 'Hoje',
    weather_enable: '📍 Mostrar o tempo (usa a localização)',
    next_due: 'Próximo vencimento',
    customer_ref_ph: 'Nº de cliente/contrato (opcional)',
    periodicity: 'Periodicidade',
    per_quarterly: 'Trimestral',
    per_once: 'Única (1×)',
    per_halfyear: 'Semestral',
    notes_ph: 'Notas (opcional)',
    notes_lbl: 'Notas',
    customer_ref_lbl: 'Nº cliente',
    push_lbl: 'Notificações',
    push_on_lbl: 'Ativadas neste dispositivo',
    push_off_lbl: 'Desativadas',
    push_enable: 'Ativar notificações 🔔',
    push_disable: 'Desativar notificações 🔕',
    push_on: 'Notificações ativadas ✓',
    push_off: 'Notificações desativadas',
    push_denied: 'Permissão negada no browser.',
    months: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    email: 'Email',
    password: 'Palavra-passe',
    password2: 'Repetir palavra-passe',
    name: 'Nome',
    login: 'Entrar',
    register: 'Criar conta',
    no_account: 'Ainda não tens conta?',
    has_account: 'Já tens conta?',
    forgot: 'Esqueceste a palavra-passe?',
    reset_send: 'Enviar link de recuperação',
    back: 'Voltar',
    confirm_title: 'Confirma o teu email 📬',
    confirm_body: 'Enviámos um link de confirmação para',
    confirm_hint: 'Abre o email e toca no link. Depois volta aqui e entra.',
    reset_sent: 'Se o email existir, enviámos um link de recuperação.',
    logout: 'Sair',
    welcome: 'Olá',
    home_soon: 'Subscrições e Faturas chegam no próximo passo 🚧',
    subs: 'Subscrições',
    subs_hint: 'mensal · anual',
    bills: 'Faturas',
    bills_hint: '✓ pago · arquivo',
    settings: 'Definições',
    section_soon: 'Esta secção chega no próximo passo 🚧',
    new: '+ Nova',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Apagar',
    delete_confirm: 'Apagar mesmo? Esta ação não pode ser desfeita.',
    edit: 'Editar',
    monthly: 'Mensal',
    yearly: 'Anual',
    per_month: '/mês',
    per_year: '/ano',
    total_monthly: 'Total mensal',
    total_yearly: 'Total anual',
    sub_name_ph: 'Nome (ex: Netflix)',
    amount_ph: 'Valor',
    category_ph: 'Categoria (opcional)',
    renewal_day: 'Dia de renovação',
    renewal_date: 'Data de renovação',
    cycle: 'Ciclo',
    currency_lbl: 'Moeda',
    no_subs: 'Ainda não tens subscrições. Toca em + Nova para começar.',
    sort_date: '📅 Data',
    sort_name: '🔤 Nome A-Z',
    status: 'Estado',
    active_lbl: 'Ativa',
    inactive_lbl: 'Desativada',
    activate: 'Ativar',
    deactivate: 'Desativar',
    method: 'Método',
    bank: 'Banco',
    card: 'Cartão',
    country: 'País',
    website_ph: 'Site (opcional, ex: netflix.com — para o logótipo)',
    bank_ph: 'Banco (opcional)',
    card_ph: 'Cartão — últimos 4 dígitos (opcional)',
    next_charge: 'Próxima cobrança',
    close: 'Fechar',
    category: 'Categoria',
    value_lbl: 'Valor',
    in_days: 'em',
    next_renewal: 'Renova dia',
    err_amount: 'Valor inválido.',
    err_day: 'Dia inválido (1–31).',
    bills_tab: 'Faturas',
    archive_tab: '📦 Arquivo',
    bill_name_ph: 'Nome (ex: Eletricidade)',
    ref_amount_ph: 'Valor de referência',
    limit_ph: 'Limite (opcional)',
    due_day: 'Dia do mês (aprox.)',
    mark_paid: '✓ Pago',
    paid_badge: 'Pago',
    pending: 'Pendente',
    no_bills: 'Ainda não tens faturas. Toca em + Nova para começar.',
    no_payments: 'Sem pagamentos neste mês.',
    month_total: 'Total do mês',
    pay_count: 'pagamentos',
    ocr_reading: 'A ler o texto da foto… (1ª vez pode demorar ~30s)',
    ocr_done: 'Campos preenchidos a partir da foto ✓ — confirma os valores',
    ocr_nothing: 'Não consegui ler dados úteis — preenche manualmente.',
    scan_btn: '📷 Digitalizar fatura (código QR)',
    scan_ok: 'Dados preenchidos a partir do QR ✓',
    scan_no_qr: 'QR não encontrado — aproxima e foca o código QR da fatura.',
    scan_reading: 'A ler…',
    nif_lbl: 'NIF',
    nif_ph: 'NIF — Nº Identificação Fiscal (opcional)',
    phone_lbl: 'Telefone',
    phone_ph: 'Telefone (opcional)',
    email_ph: 'E-mail (opcional)',
    export_name_lbl: 'Nome do ficheiro',
    export_btn: '📤 Exportar / Enviar',
    csv_bill: 'Fatura',
    csv_paid: 'Data pagamento',
    csv_period: 'Mês',
    csv_amount: 'Valor',
    csv_currency: 'Moeda',
    period_lbl: 'Período (opcional) — de / até',
    period_row: 'Período',
    year_total: 'Total do ano',
    over_limit: 'acima do limite',
    confirm_paid_title: 'Confirmar pagamento',
    paid_on: 'Pago a',
    locked_hint: 'Bloqueado 🔒 — prime longo para editar',
    edit_payment: 'Corrigir valor',
    delete_payment: 'Apagar pagamento',
    limit_lbl: 'Limite',
    ref_lbl: 'Referência',
    set_language: 'Idioma',
    set_currency: 'Moeda por defeito',
    set_theme: 'Tema',
    theme_auto: 'Automático',
    theme_light: 'Claro',
    theme_dark: 'Escuro',
    set_name: 'Nome',
    saved: 'Guardado ✓',
    lang_soon: '(brevemente)',
    help: 'Ajuda',
    help_chat_title: 'Suporte & Sugestões',
    help_chat_ph: 'Escreve a tua dúvida ou sugestão…',
    help_chat_send: 'Enviar',
    help_chat_hint: 'O assistente AboKlar responde automaticamente. As conversas são guardadas para análise.',
    help_chat_thinking: 'A pensar…',
    admin_support: '🛠️ Painel de Suporte',
    admin_unread: 'Não lidas',
    admin_all: 'Todas',
    mark_read: 'Marcar como lida',
    help_intro: 'Como funciona o AboKlar, passo a passo.',
    help_subs_title: '📋 Subscrições',
    help_subs_steps: [
      'Toca em <b>Subscrições</b> no ecrã inicial.',
      'Toca em <b>+ Nova</b> e preenche: nome (ex: Netflix), valor, moeda, ciclo (mensal ou anual) e dia de renovação.',
      'A subscrição aparece na lista com o valor e a próxima renovação.',
      'Os cartões no topo mostram o <b>total mensal</b> e o <b>total anual</b>.',
      'Para editar ou apagar, toca na subscrição e escolhe o lápis ✏️ ou o lixo 🗑️.'
    ],
    help_bills_title: '🧾 Faturas',
    help_bills_steps: [
      'Toca em <b>Faturas</b> no ecrã inicial.',
      'Toca em <b>+ Nova</b> e preenche: nome (ex: Eletricidade), valor de referência, dia do mês e, se quiseres, um <b>limite</b> para controlo.',
      'Cada mês, quando o dinheiro sair do banco, toca em <b>✓ Pago</b>.',
      'O valor aparece pré-preenchido com o último pagamento — corrige se for diferente e confirma.',
      'O pagamento vai para o <b>arquivo do mês</b>. Se passar o limite, fica marcado a vermelho.',
      'Podes corrigir o valor durante <b>5 dias úteis</b>. Depois bloqueia 🔒 — para editar na mesma, prime longo no registo.'
    ],
    help_general_title: '⚙️ Geral',
    help_general_steps: [
      'Em <b>Definições</b> podes mudar o idioma, a moeda e o tema (claro/escuro).',
      'Os teus dados são só teus — cada conta vê apenas as suas subscrições e faturas.',
      'Instala a app no telemóvel: no Chrome, menu ⋮ → <b>Adicionar ao ecrã principal</b>.'
    ],
    err_fill: 'Preenche todos os campos.',
    err_pw_match: 'As palavras-passe não coincidem.',
    err_pw_short: 'A palavra-passe deve ter pelo menos 8 caracteres.',
    err_invalid: 'Email ou palavra-passe errados.',
    err_not_confirmed: 'Email ainda não confirmado. Verifica a tua caixa de correio.',
    err_exists: 'Já existe uma conta com este email.',
    err_generic: 'Algo correu mal. Tenta outra vez.'
  },
  de: {
    tagline: 'Abos und Rechnungen, klar.',
    w_rain: 'Regen',
    w_wind: 'Wind',
    w_sunrise: 'Sonnenaufgang',
    w_sunset: 'Sonnenuntergang',
    w_uv: 'UV-Index',
    w_minmax: 'Min / Max',
    w_city_search: 'Stadt suchen…',
    w_use_location: '📍 Meinen Standort verwenden',
    w_pick_city: 'Stadt wählen',
    group_due: '📌 Diesen Monat',
    group_paid: '✓ Bezahlt',
    group_later: '📅 Später',
    group_inactive: '⏸ Deaktiviert',
    weekdays_short: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    weather_today: 'Heute',
    weather_enable: '📍 Wetter anzeigen (nutzt den Standort)',
    next_due: 'Nächste Fälligkeit',
    customer_ref_ph: 'Kunden-/Vertragsnummer (optional)',
    periodicity: 'Periodizität',
    per_quarterly: 'Vierteljährlich',
    per_once: 'Einmalig (1×)',
    per_halfyear: 'Halbjährlich',
    notes_ph: 'Notizen (optional)',
    notes_lbl: 'Notizen',
    customer_ref_lbl: 'Kundennr.',
    push_lbl: 'Benachrichtigungen',
    push_on_lbl: 'Auf diesem Gerät aktiviert',
    push_off_lbl: 'Deaktiviert',
    push_enable: 'Benachrichtigungen aktivieren 🔔',
    push_disable: 'Benachrichtigungen deaktivieren 🔕',
    push_on: 'Benachrichtigungen aktiviert ✓',
    push_off: 'Benachrichtigungen deaktiviert',
    push_denied: 'Berechtigung im Browser verweigert.',
    months: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    email: 'E-Mail',
    password: 'Passwort',
    password2: 'Passwort wiederholen',
    name: 'Name',
    login: 'Anmelden',
    register: 'Konto erstellen',
    no_account: 'Noch kein Konto?',
    has_account: 'Schon ein Konto?',
    forgot: 'Passwort vergessen?',
    reset_send: 'Wiederherstellungslink senden',
    back: 'Zurück',
    confirm_title: 'Bestätige deine E-Mail 📬',
    confirm_body: 'Wir haben einen Bestätigungslink gesendet an',
    confirm_hint: 'Öffne die E-Mail und tippe auf den Link. Danach hier anmelden.',
    reset_sent: 'Falls die E-Mail existiert, haben wir einen Link gesendet.',
    logout: 'Abmelden',
    welcome: 'Hallo',
    home_soon: '',
    subs: 'Abos',
    subs_hint: 'monatlich · jährlich',
    bills: 'Rechnungen',
    bills_hint: '✓ bezahlt · Archiv',
    settings: 'Einstellungen',
    section_soon: 'Dieser Bereich kommt bald 🚧',
    new: '+ Neu',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    delete_confirm: 'Wirklich löschen? Das kann nicht rückgängig gemacht werden.',
    edit: 'Bearbeiten',
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    per_month: '/Monat',
    per_year: '/Jahr',
    total_monthly: 'Total pro Monat',
    total_yearly: 'Total pro Jahr',
    sub_name_ph: 'Name (z.B. Netflix)',
    amount_ph: 'Betrag',
    category_ph: 'Kategorie (optional)',
    renewal_day: 'Erneuerungstag',
    renewal_date: 'Erneuerungsdatum',
    cycle: 'Zyklus',
    currency_lbl: 'Währung',
    no_subs: 'Noch keine Abos. Tippe auf + Neu, um zu starten.',
    sort_date: '📅 Datum',
    sort_name: '🔤 Name A-Z',
    status: 'Status',
    active_lbl: 'Aktiv',
    inactive_lbl: 'Deaktiviert',
    activate: 'Aktivieren',
    deactivate: 'Deaktivieren',
    method: 'Methode',
    bank: 'Bank',
    card: 'Karte',
    country: 'Land',
    website_ph: 'Website (optional, z.B. netflix.com — für das Logo)',
    bank_ph: 'Bank (optional)',
    card_ph: 'Karte — letzte 4 Ziffern (optional)',
    next_charge: 'Nächste Abbuchung',
    close: 'Schliessen',
    category: 'Kategorie',
    value_lbl: 'Betrag',
    in_days: 'in',
    next_renewal: 'Erneuert am',
    err_amount: 'Ungültiger Betrag.',
    err_day: 'Ungültiger Tag (1–31).',
    bills_tab: 'Rechnungen',
    archive_tab: '📦 Archiv',
    bill_name_ph: 'Name (z.B. Strom)',
    ref_amount_ph: 'Referenzbetrag',
    limit_ph: 'Limite (optional)',
    due_day: 'Tag im Monat (ca.)',
    mark_paid: '✓ Bezahlt',
    paid_badge: 'Bezahlt',
    pending: 'Offen',
    no_bills: 'Noch keine Rechnungen. Tippe auf + Neu, um zu starten.',
    no_payments: 'Keine Zahlungen in diesem Monat.',
    month_total: 'Monatstotal',
    pay_count: 'Zahlungen',
    ocr_reading: 'Text wird gelesen… (1. Mal ~30s)',
    ocr_done: 'Felder aus Foto übernommen ✓ — Werte prüfen',
    ocr_nothing: 'Keine Daten erkannt — bitte manuell ausfüllen.',
    scan_btn: '📷 Rechnung scannen (QR-Code)',
    scan_ok: 'Daten aus QR übernommen ✓',
    scan_no_qr: 'Kein QR gefunden — näher heran und QR-Code fokussieren.',
    scan_reading: 'Wird gelesen…',
    nif_lbl: 'Steuernummer',
    nif_ph: 'Steuernummer / UID (optional)',
    phone_lbl: 'Telefon',
    phone_ph: 'Telefon (optional)',
    email_ph: 'E-Mail (optional)',
    export_name_lbl: 'Dateiname',
    export_btn: '📤 Exportieren / Senden',
    csv_bill: 'Rechnung',
    csv_paid: 'Zahlungsdatum',
    csv_period: 'Monat',
    csv_amount: 'Betrag',
    csv_currency: 'Währung',
    period_lbl: 'Zeitraum (optional) — von / bis',
    period_row: 'Zeitraum',
    year_total: 'Jahrestotal',
    over_limit: 'über der Limite',
    confirm_paid_title: 'Zahlung bestätigen',
    paid_on: 'Bezahlt am',
    locked_hint: 'Gesperrt 🔒 — lange drücken zum Bearbeiten',
    edit_payment: 'Betrag korrigieren',
    delete_payment: 'Zahlung löschen',
    limit_lbl: 'Limite',
    ref_lbl: 'Referenz',
    set_language: 'Sprache',
    set_currency: 'Standardwährung',
    set_theme: 'Design',
    theme_auto: 'Automatisch',
    theme_light: 'Hell',
    theme_dark: 'Dunkel',
    set_name: 'Name',
    saved: 'Gespeichert ✓',
    lang_soon: '(bald)',
    help: 'Hilfe',
    help_chat_title: 'Support & Vorschläge',
    help_chat_ph: 'Schreib deine Frage oder deinen Vorschlag…',
    help_chat_send: 'Senden',
    help_chat_hint: 'Der AboKlar-Assistent antwortet automatisch. Nachrichten werden gespeichert.',
    help_chat_thinking: 'Denkt nach…',
    admin_support: '🛠️ Support-Panel',
    admin_unread: 'Ungelesen',
    admin_all: 'Alle',
    mark_read: 'Als gelesen markieren',
    help_intro: 'So funktioniert AboKlar, Schritt für Schritt.',
    help_subs_title: '📋 Abos',
    help_subs_steps: [
      'Tippe auf <b>Abos</b> im Startbildschirm.',
      'Tippe auf <b>+ Neu</b> und fülle aus: Name (z.B. Netflix), Betrag, Währung, Zyklus (monatlich oder jährlich) und Erneuerungsdatum.',
      'Das Abo erscheint in der Liste mit Betrag und nächster Erneuerung.',
      'Die Karten oben zeigen das <b>Monatstotal</b> und das <b>Jahrestotal</b>.',
      'Zum Bearbeiten oder Löschen tippe auf das Abo und wähle ✏️ oder 🗑️.'
    ],
    help_bills_title: '🧾 Rechnungen',
    help_bills_steps: [
      'Tippe auf <b>Rechnungen</b> im Startbildschirm.',
      'Tippe auf <b>+ Neu</b> und fülle aus: Name (z.B. Strom), Referenzbetrag, Tag im Monat und optional eine <b>Limite</b> zur Kontrolle.',
      'Jeden Monat, wenn das Geld vom Konto abgeht, tippe auf <b>✓ Bezahlt</b>.',
      'Der Betrag ist mit der letzten Zahlung vorausgefüllt — korrigiere ihn falls nötig und bestätige.',
      'Die Zahlung geht ins <b>Monatsarchiv</b>. Über der Limite wird sie rot markiert.',
      'Du kannst den Betrag während <b>5 Werktagen</b> korrigieren. Danach ist er gesperrt 🔒 — zum Bearbeiten lange drücken.'
    ],
    help_general_title: '⚙️ Allgemein',
    help_general_steps: [
      'In den <b>Einstellungen</b> kannst du Sprache, Währung und Design (hell/dunkel) ändern.',
      'Deine Daten gehören nur dir — jedes Konto sieht nur seine eigenen Abos und Rechnungen.',
      'Installiere die App: im Chrome-Menü ⋮ → <b>Zum Startbildschirm hinzufügen</b>.'
    ],
    err_fill: 'Bitte alle Felder ausfüllen.',
    err_pw_match: 'Die Passwörter stimmen nicht überein.',
    err_pw_short: 'Das Passwort muss mindestens 8 Zeichen haben.',
    err_invalid: 'E-Mail oder Passwort falsch.',
    err_not_confirmed: 'E-Mail noch nicht bestätigt. Prüfe dein Postfach.',
    err_exists: 'Mit dieser E-Mail existiert bereits ein Konto.',
    err_generic: 'Etwas ist schiefgelaufen. Versuche es nochmals.'
  },
  fr: {
    tagline: 'Abonnements et factures, clairement.',
    w_rain: 'Pluie',
    w_wind: 'Vent',
    w_sunrise: 'Lever du soleil',
    w_sunset: 'Coucher du soleil',
    w_uv: 'Indice UV',
    w_minmax: 'Min / Max',
    w_city_search: 'Chercher une ville…',
    w_use_location: '📍 Utiliser ma position',
    w_pick_city: 'Choisir la ville',
    group_due: '📌 Ce mois-ci',
    group_paid: '✓ Payées',
    group_later: '📅 Plus tard',
    group_inactive: '⏸ Désactivées',
    weekdays_short: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    weather_today: "Aujourd'hui",
    weather_enable: '📍 Afficher la météo (utilise la position)',
    next_due: 'Prochaine échéance',
    customer_ref_ph: 'Nº client/contrat (optionnel)',
    periodicity: 'Périodicité',
    per_quarterly: 'Trimestriel',
    per_once: 'Unique (1×)',
    per_halfyear: 'Semestriel',
    notes_ph: 'Notes (optionnel)',
    notes_lbl: 'Notes',
    customer_ref_lbl: 'Nº client',
    push_lbl: 'Notifications',
    push_on_lbl: 'Activées sur cet appareil',
    push_off_lbl: 'Désactivées',
    push_enable: 'Activer les notifications 🔔',
    push_disable: 'Désactiver les notifications 🔕',
    push_on: 'Notifications activées ✓',
    push_off: 'Notifications désactivées',
    push_denied: 'Permission refusée dans le navigateur.',
    months: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    email: 'E-mail',
    password: 'Mot de passe',
    password2: 'Répéter le mot de passe',
    name: 'Nom',
    login: 'Se connecter',
    register: 'Créer un compte',
    no_account: 'Pas encore de compte ?',
    has_account: 'Déjà un compte ?',
    forgot: 'Mot de passe oublié ?',
    reset_send: 'Envoyer le lien de récupération',
    back: 'Retour',
    confirm_title: 'Confirme ton e-mail 📬',
    confirm_body: 'Nous avons envoyé un lien de confirmation à',
    confirm_hint: "Ouvre l'e-mail et touche le lien. Reviens ensuite ici pour te connecter.",
    reset_sent: "Si l'e-mail existe, nous avons envoyé un lien.",
    logout: 'Déconnexion',
    welcome: 'Salut',
    home_soon: '',
    subs: 'Abonnements',
    subs_hint: 'mensuel · annuel',
    bills: 'Factures',
    bills_hint: '✓ payé · archives',
    settings: 'Réglages',
    section_soon: 'Cette section arrive bientôt 🚧',
    new: '+ Nouveau',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    delete_confirm: 'Vraiment supprimer ? Cette action est irréversible.',
    edit: 'Modifier',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    per_month: '/mois',
    per_year: '/an',
    total_monthly: 'Total mensuel',
    total_yearly: 'Total annuel',
    sub_name_ph: 'Nom (ex : Netflix)',
    amount_ph: 'Montant',
    category_ph: 'Catégorie (optionnel)',
    renewal_day: 'Jour de renouvellement',
    renewal_date: 'Date de renouvellement',
    cycle: 'Cycle',
    currency_lbl: 'Devise',
    no_subs: "Pas encore d'abonnements. Touche + Nouveau pour commencer.",
    sort_date: '📅 Date',
    sort_name: '🔤 Nom A-Z',
    status: 'Statut',
    active_lbl: 'Actif',
    inactive_lbl: 'Désactivé',
    activate: 'Activer',
    deactivate: 'Désactiver',
    method: 'Méthode',
    bank: 'Banque',
    card: 'Carte',
    country: 'Pays',
    website_ph: 'Site (optionnel, ex : netflix.com — pour le logo)',
    bank_ph: 'Banque (optionnel)',
    card_ph: 'Carte — 4 derniers chiffres (optionnel)',
    next_charge: 'Prochain prélèvement',
    close: 'Fermer',
    category: 'Catégorie',
    value_lbl: 'Montant',
    in_days: 'dans',
    next_renewal: 'Renouvelle le',
    err_amount: 'Montant invalide.',
    err_day: 'Jour invalide (1–31).',
    bills_tab: 'Factures',
    archive_tab: '📦 Archives',
    bill_name_ph: 'Nom (ex : Électricité)',
    ref_amount_ph: 'Montant de référence',
    limit_ph: 'Limite (optionnel)',
    due_day: 'Jour du mois (approx.)',
    mark_paid: '✓ Payé',
    paid_badge: 'Payé',
    pending: 'En attente',
    no_bills: 'Pas encore de factures. Touche + Nouveau pour commencer.',
    no_payments: 'Aucun paiement ce mois-ci.',
    month_total: 'Total du mois',
    pay_count: 'paiements',
    ocr_reading: 'Lecture du texte… (1re fois ~30s)',
    ocr_done: 'Champs remplis depuis la photo ✓ — vérifie les valeurs',
    ocr_nothing: 'Aucune donnée lisible — remplis manuellement.',
    scan_btn: '📷 Scanner la facture (code QR)',
    scan_ok: 'Données remplies depuis le QR ✓',
    scan_no_qr: 'QR introuvable — rapproche-toi et vise le code QR.',
    scan_reading: 'Lecture…',
    nif_lbl: 'NIF',
    nif_ph: 'NIF — Nº fiscal (optionnel)',
    phone_lbl: 'Téléphone',
    phone_ph: 'Téléphone (optionnel)',
    email_ph: 'E-mail (optionnel)',
    export_name_lbl: 'Nom du fichier',
    export_btn: '📤 Exporter / Envoyer',
    csv_bill: 'Facture',
    csv_paid: 'Date de paiement',
    csv_period: 'Mois',
    csv_amount: 'Montant',
    csv_currency: 'Devise',
    period_lbl: 'Période (optionnel) — du / au',
    period_row: 'Période',
    year_total: "Total de l'année",
    over_limit: 'au-dessus de la limite',
    confirm_paid_title: 'Confirmer le paiement',
    paid_on: 'Payé le',
    locked_hint: 'Verrouillé 🔒 — appui long pour modifier',
    edit_payment: 'Corriger le montant',
    delete_payment: 'Supprimer le paiement',
    limit_lbl: 'Limite',
    ref_lbl: 'Référence',
    set_language: 'Langue',
    set_currency: 'Devise par défaut',
    set_theme: 'Thème',
    theme_auto: 'Automatique',
    theme_light: 'Clair',
    theme_dark: 'Sombre',
    set_name: 'Nom',
    saved: 'Enregistré ✓',
    lang_soon: '(bientôt)',
    help: 'Aide',
    help_chat_title: 'Support & Suggestions',
    help_chat_ph: 'Écris ta question ou suggestion…',
    help_chat_send: 'Envoyer',
    help_chat_hint: "L'assistant AboKlar répond automatiquement. Les messages sont enregistrés.",
    help_chat_thinking: 'Réflexion…',
    admin_support: '🛠️ Panneau Support',
    admin_unread: 'Non lus',
    admin_all: 'Tous',
    mark_read: 'Marquer comme lu',
    help_intro: 'Comment fonctionne AboKlar, étape par étape.',
    help_subs_title: '📋 Abonnements',
    help_subs_steps: [
      "Touche <b>Abonnements</b> sur l'écran d'accueil.",
      'Touche <b>+ Nouveau</b> et remplis : nom (ex : Netflix), montant, devise, cycle (mensuel ou annuel) et date de renouvellement.',
      "L'abonnement apparaît dans la liste avec le montant et le prochain renouvellement.",
      'Les cartes en haut montrent le <b>total mensuel</b> et le <b>total annuel</b>.',
      "Pour modifier ou supprimer, touche l'abonnement et choisis ✏️ ou 🗑️."
    ],
    help_bills_title: '🧾 Factures',
    help_bills_steps: [
      "Touche <b>Factures</b> sur l'écran d'accueil.",
      'Touche <b>+ Nouveau</b> et remplis : nom (ex : Électricité), montant de référence, jour du mois et, si tu veux, une <b>limite</b> de contrôle.',
      "Chaque mois, quand l'argent sort du compte, touche <b>✓ Payé</b>.",
      'Le montant est prérempli avec le dernier paiement — corrige-le si besoin et confirme.',
      'Le paiement va dans les <b>archives du mois</b>. Au-dessus de la limite, il est marqué en rouge.',
      'Tu peux corriger le montant pendant <b>5 jours ouvrables</b>. Ensuite il est verrouillé 🔒 — appui long pour modifier quand même.'
    ],
    help_general_title: '⚙️ Général',
    help_general_steps: [
      'Dans <b>Réglages</b> tu peux changer la langue, la devise et le thème (clair/sombre).',
      'Tes données ne sont qu\'à toi — chaque compte ne voit que ses propres abonnements et factures.',
      "Installe l'app : menu Chrome ⋮ → <b>Ajouter à l'écran d'accueil</b>."
    ],
    err_fill: 'Remplis tous les champs.',
    err_pw_match: 'Les mots de passe ne correspondent pas.',
    err_pw_short: 'Le mot de passe doit avoir au moins 8 caractères.',
    err_invalid: 'E-mail ou mot de passe incorrect.',
    err_not_confirmed: 'E-mail pas encore confirmé. Vérifie ta boîte mail.',
    err_exists: 'Un compte existe déjà avec cet e-mail.',
    err_generic: "Quelque chose s'est mal passé. Réessaie."
  },
  it: {
    tagline: 'Abbonamenti e fatture, chiaro.',
    w_rain: 'Pioggia',
    w_wind: 'Vento',
    w_sunrise: 'Alba',
    w_sunset: 'Tramonto',
    w_uv: 'Indice UV',
    w_minmax: 'Min / Max',
    w_city_search: 'Cerca città…',
    w_use_location: '📍 Usa la mia posizione',
    w_pick_city: 'Scegli città',
    group_due: '📌 Questo mese',
    group_paid: '✓ Pagate',
    group_later: '📅 Più tardi',
    group_inactive: '⏸ Disattivate',
    weekdays_short: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
    weather_today: 'Oggi',
    weather_enable: '📍 Mostra il meteo (usa la posizione)',
    next_due: 'Prossima scadenza',
    customer_ref_ph: 'Nº cliente/contratto (opzionale)',
    periodicity: 'Periodicità',
    per_quarterly: 'Trimestrale',
    per_once: 'Unica (1×)',
    per_halfyear: 'Semestrale',
    notes_ph: 'Note (opzionale)',
    notes_lbl: 'Note',
    customer_ref_lbl: 'Nº cliente',
    push_lbl: 'Notifiche',
    push_on_lbl: 'Attive su questo dispositivo',
    push_off_lbl: 'Disattivate',
    push_enable: 'Attiva notifiche 🔔',
    push_disable: 'Disattiva notifiche 🔕',
    push_on: 'Notifiche attivate ✓',
    push_off: 'Notifiche disattivate',
    push_denied: 'Permesso negato nel browser.',
    months: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    email: 'E-mail',
    password: 'Password',
    password2: 'Ripeti password',
    name: 'Nome',
    login: 'Accedi',
    register: 'Crea account',
    no_account: 'Non hai ancora un account?',
    has_account: 'Hai già un account?',
    forgot: 'Password dimenticata?',
    reset_send: 'Invia link di recupero',
    back: 'Indietro',
    confirm_title: 'Conferma la tua e-mail 📬',
    confirm_body: 'Abbiamo inviato un link di conferma a',
    confirm_hint: "Apri l'e-mail e tocca il link. Poi torna qui e accedi.",
    reset_sent: "Se l'e-mail esiste, abbiamo inviato un link.",
    logout: 'Esci',
    welcome: 'Ciao',
    home_soon: '',
    subs: 'Abbonamenti',
    subs_hint: 'mensile · annuale',
    bills: 'Fatture',
    bills_hint: '✓ pagato · archivio',
    settings: 'Impostazioni',
    section_soon: 'Questa sezione arriva presto 🚧',
    new: '+ Nuovo',
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    delete_confirm: 'Eliminare davvero? Questa azione è irreversibile.',
    edit: 'Modifica',
    monthly: 'Mensile',
    yearly: 'Annuale',
    per_month: '/mese',
    per_year: '/anno',
    total_monthly: 'Totale mensile',
    total_yearly: 'Totale annuale',
    sub_name_ph: 'Nome (es: Netflix)',
    amount_ph: 'Importo',
    category_ph: 'Categoria (opzionale)',
    renewal_day: 'Giorno di rinnovo',
    renewal_date: 'Data di rinnovo',
    cycle: 'Ciclo',
    currency_lbl: 'Valuta',
    no_subs: 'Nessun abbonamento. Tocca + Nuovo per iniziare.',
    sort_date: '📅 Data',
    sort_name: '🔤 Nome A-Z',
    status: 'Stato',
    active_lbl: 'Attivo',
    inactive_lbl: 'Disattivato',
    activate: 'Attiva',
    deactivate: 'Disattiva',
    method: 'Metodo',
    bank: 'Banca',
    card: 'Carta',
    country: 'Paese',
    website_ph: 'Sito (opzionale, es: netflix.com — per il logo)',
    bank_ph: 'Banca (opzionale)',
    card_ph: 'Carta — ultime 4 cifre (opzionale)',
    next_charge: 'Prossimo addebito',
    close: 'Chiudi',
    category: 'Categoria',
    value_lbl: 'Importo',
    in_days: 'tra',
    next_renewal: 'Rinnova il',
    err_amount: 'Importo non valido.',
    err_day: 'Giorno non valido (1–31).',
    bills_tab: 'Fatture',
    archive_tab: '📦 Archivio',
    bill_name_ph: 'Nome (es: Elettricità)',
    ref_amount_ph: 'Importo di riferimento',
    limit_ph: 'Limite (opzionale)',
    due_day: 'Giorno del mese (circa)',
    mark_paid: '✓ Pagato',
    paid_badge: 'Pagato',
    pending: 'In attesa',
    no_bills: 'Nessuna fattura. Tocca + Nuovo per iniziare.',
    no_payments: 'Nessun pagamento questo mese.',
    month_total: 'Totale del mese',
    pay_count: 'pagamenti',
    ocr_reading: 'Lettura del testo… (1a volta ~30s)',
    ocr_done: 'Campi compilati dalla foto ✓ — verifica i valori',
    ocr_nothing: 'Nessun dato leggibile — compila manualmente.',
    scan_btn: '📷 Scansiona la fattura (codice QR)',
    scan_ok: 'Dati compilati dal QR ✓',
    scan_no_qr: 'QR non trovato — avvicinati e inquadra il codice QR.',
    scan_reading: 'Lettura…',
    nif_lbl: 'Codice fiscale',
    nif_ph: 'Codice fiscale / P.IVA (opzionale)',
    phone_lbl: 'Telefono',
    phone_ph: 'Telefono (opzionale)',
    email_ph: 'E-mail (opzionale)',
    export_name_lbl: 'Nome del file',
    export_btn: '📤 Esporta / Invia',
    csv_bill: 'Fattura',
    csv_paid: 'Data pagamento',
    csv_period: 'Mese',
    csv_amount: 'Importo',
    csv_currency: 'Valuta',
    period_lbl: 'Periodo (opzionale) — dal / al',
    period_row: 'Periodo',
    year_total: "Totale dell'anno",
    over_limit: 'oltre il limite',
    confirm_paid_title: 'Conferma pagamento',
    paid_on: 'Pagato il',
    locked_hint: 'Bloccato 🔒 — tieni premuto per modificare',
    edit_payment: 'Correggi importo',
    delete_payment: 'Elimina pagamento',
    limit_lbl: 'Limite',
    ref_lbl: 'Riferimento',
    set_language: 'Lingua',
    set_currency: 'Valuta predefinita',
    set_theme: 'Tema',
    theme_auto: 'Automatico',
    theme_light: 'Chiaro',
    theme_dark: 'Scuro',
    set_name: 'Nome',
    saved: 'Salvato ✓',
    lang_soon: '(presto)',
    help: 'Aiuto',
    help_chat_title: 'Supporto & Suggerimenti',
    help_chat_ph: 'Scrivi la tua domanda o suggerimento…',
    help_chat_send: 'Invia',
    help_chat_hint: "L'assistente AboKlar risponde automaticamente. I messaggi vengono salvati.",
    help_chat_thinking: 'Sto pensando…',
    admin_support: '🛠️ Pannello Supporto',
    admin_unread: 'Non letti',
    admin_all: 'Tutti',
    mark_read: 'Segna come letto',
    help_intro: 'Come funziona AboKlar, passo dopo passo.',
    help_subs_title: '📋 Abbonamenti',
    help_subs_steps: [
      'Tocca <b>Abbonamenti</b> nella schermata iniziale.',
      'Tocca <b>+ Nuovo</b> e compila: nome (es: Netflix), importo, valuta, ciclo (mensile o annuale) e data di rinnovo.',
      "L'abbonamento appare nella lista con l'importo e il prossimo rinnovo.",
      'Le carte in alto mostrano il <b>totale mensile</b> e il <b>totale annuale</b>.',
      "Per modificare o eliminare, tocca l'abbonamento e scegli ✏️ o 🗑️."
    ],
    help_bills_title: '🧾 Fatture',
    help_bills_steps: [
      'Tocca <b>Fatture</b> nella schermata iniziale.',
      'Tocca <b>+ Nuovo</b> e compila: nome (es: Elettricità), importo di riferimento, giorno del mese e, se vuoi, un <b>limite</b> di controllo.',
      'Ogni mese, quando i soldi escono dal conto, tocca <b>✓ Pagato</b>.',
      "L'importo è precompilato con l'ultimo pagamento — correggilo se serve e conferma.",
      "Il pagamento va nell'<b>archivio del mese</b>. Oltre il limite viene segnato in rosso.",
      "Puoi correggere l'importo per <b>5 giorni lavorativi</b>. Poi si blocca 🔒 — tieni premuto per modificare comunque."
    ],
    help_general_title: '⚙️ Generale',
    help_general_steps: [
      'In <b>Impostazioni</b> puoi cambiare lingua, valuta e tema (chiaro/scuro).',
      'I tuoi dati sono solo tuoi — ogni account vede solo i propri abbonamenti e fatture.',
      "Installa l'app: menu Chrome ⋮ → <b>Aggiungi a schermata Home</b>."
    ],
    err_fill: 'Compila tutti i campi.',
    err_pw_match: 'Le password non corrispondono.',
    err_pw_short: 'La password deve avere almeno 8 caratteri.',
    err_invalid: 'E-mail o password errati.',
    err_not_confirmed: 'E-mail non ancora confermata. Controlla la tua casella.',
    err_exists: 'Esiste già un account con questa e-mail.',
    err_generic: 'Qualcosa è andato storto. Riprova.'
  },
  en: {
    tagline: 'Subscriptions and bills, clear.',
    w_rain: 'Rain',
    w_wind: 'Wind',
    w_sunrise: 'Sunrise',
    w_sunset: 'Sunset',
    w_uv: 'UV index',
    w_minmax: 'Min / Max',
    w_city_search: 'Search city…',
    w_use_location: '📍 Use my location',
    w_pick_city: 'Choose city',
    group_due: '📌 This month',
    group_paid: '✓ Paid',
    group_later: '📅 Later',
    group_inactive: '⏸ Deactivated',
    weekdays_short: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    weather_today: 'Today',
    weather_enable: '📍 Show weather (uses location)',
    next_due: 'Next due date',
    customer_ref_ph: 'Customer/contract no. (optional)',
    periodicity: 'Frequency',
    per_quarterly: 'Quarterly',
    per_once: 'One-time (1×)',
    per_halfyear: 'Half-yearly',
    notes_ph: 'Notes (optional)',
    notes_lbl: 'Notes',
    customer_ref_lbl: 'Customer no.',
    push_lbl: 'Notifications',
    push_on_lbl: 'Enabled on this device',
    push_off_lbl: 'Disabled',
    push_enable: 'Enable notifications 🔔',
    push_disable: 'Disable notifications 🔕',
    push_on: 'Notifications enabled ✓',
    push_off: 'Notifications disabled',
    push_denied: 'Permission denied in the browser.',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    email: 'Email',
    password: 'Password',
    password2: 'Repeat password',
    name: 'Name',
    login: 'Sign in',
    register: 'Create account',
    no_account: "Don't have an account yet?",
    has_account: 'Already have an account?',
    forgot: 'Forgot your password?',
    reset_send: 'Send recovery link',
    back: 'Back',
    confirm_title: 'Confirm your email 📬',
    confirm_body: 'We sent a confirmation link to',
    confirm_hint: 'Open the email and tap the link. Then come back and sign in.',
    reset_sent: 'If the email exists, we sent a recovery link.',
    logout: 'Sign out',
    welcome: 'Hello',
    home_soon: '',
    subs: 'Subscriptions',
    subs_hint: 'monthly · yearly',
    bills: 'Bills',
    bills_hint: '✓ paid · archive',
    settings: 'Settings',
    section_soon: 'This section is coming soon 🚧',
    new: '+ New',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    delete_confirm: 'Really delete? This cannot be undone.',
    edit: 'Edit',
    monthly: 'Monthly',
    yearly: 'Yearly',
    per_month: '/month',
    per_year: '/year',
    total_monthly: 'Monthly total',
    total_yearly: 'Yearly total',
    sub_name_ph: 'Name (e.g. Netflix)',
    amount_ph: 'Amount',
    category_ph: 'Category (optional)',
    renewal_day: 'Renewal day',
    renewal_date: 'Renewal date',
    cycle: 'Cycle',
    currency_lbl: 'Currency',
    no_subs: 'No subscriptions yet. Tap + New to start.',
    sort_date: '📅 Date',
    sort_name: '🔤 Name A-Z',
    status: 'Status',
    active_lbl: 'Active',
    inactive_lbl: 'Deactivated',
    activate: 'Activate',
    deactivate: 'Deactivate',
    method: 'Method',
    bank: 'Bank',
    card: 'Card',
    country: 'Country',
    website_ph: 'Website (optional, e.g. netflix.com — for the logo)',
    bank_ph: 'Bank (optional)',
    card_ph: 'Card — last 4 digits (optional)',
    next_charge: 'Next charge',
    close: 'Close',
    category: 'Category',
    value_lbl: 'Amount',
    in_days: 'in',
    next_renewal: 'Renews on',
    err_amount: 'Invalid amount.',
    err_day: 'Invalid day (1–31).',
    bills_tab: 'Bills',
    archive_tab: '📦 Archive',
    bill_name_ph: 'Name (e.g. Electricity)',
    ref_amount_ph: 'Reference amount',
    limit_ph: 'Limit (optional)',
    due_day: 'Day of month (approx.)',
    mark_paid: '✓ Paid',
    paid_badge: 'Paid',
    pending: 'Pending',
    no_bills: 'No bills yet. Tap + New to start.',
    no_payments: 'No payments this month.',
    month_total: 'Month total',
    pay_count: 'payments',
    ocr_reading: 'Reading text… (first time ~30s)',
    ocr_done: 'Fields filled from photo ✓ — check the values',
    ocr_nothing: 'Could not read useful data — fill in manually.',
    scan_btn: '📷 Scan bill (QR code)',
    scan_ok: 'Fields filled from QR ✓',
    scan_no_qr: 'No QR found — get closer and focus the QR code.',
    scan_reading: 'Reading…',
    nif_lbl: 'Tax ID',
    nif_ph: 'Tax ID (optional)',
    phone_lbl: 'Phone',
    phone_ph: 'Phone (optional)',
    email_ph: 'Email (optional)',
    export_name_lbl: 'File name',
    export_btn: '📤 Export / Send',
    csv_bill: 'Bill',
    csv_paid: 'Payment date',
    csv_period: 'Month',
    csv_amount: 'Amount',
    csv_currency: 'Currency',
    period_lbl: 'Period (optional) — from / to',
    period_row: 'Period',
    year_total: 'Year total',
    over_limit: 'over the limit',
    confirm_paid_title: 'Confirm payment',
    paid_on: 'Paid on',
    locked_hint: 'Locked 🔒 — long-press to edit',
    edit_payment: 'Fix amount',
    delete_payment: 'Delete payment',
    limit_lbl: 'Limit',
    ref_lbl: 'Reference',
    set_language: 'Language',
    set_currency: 'Default currency',
    set_theme: 'Theme',
    theme_auto: 'Automatic',
    theme_light: 'Light',
    theme_dark: 'Dark',
    set_name: 'Name',
    saved: 'Saved ✓',
    lang_soon: '(soon)',
    help: 'Help',
    help_chat_title: 'Support & Suggestions',
    help_chat_ph: 'Write your question or suggestion…',
    help_chat_send: 'Send',
    help_chat_hint: 'The AboKlar assistant replies automatically. Conversations are saved for review.',
    help_chat_thinking: 'Thinking…',
    admin_support: '🛠️ Support Panel',
    admin_unread: 'Unread',
    admin_all: 'All',
    mark_read: 'Mark as read',
    help_intro: 'How AboKlar works, step by step.',
    help_subs_title: '📋 Subscriptions',
    help_subs_steps: [
      'Tap <b>Subscriptions</b> on the home screen.',
      'Tap <b>+ New</b> and fill in: name (e.g. Netflix), amount, currency, cycle (monthly or yearly) and renewal date.',
      'The subscription appears in the list with the amount and next renewal.',
      'The cards at the top show the <b>monthly total</b> and <b>yearly total</b>.',
      'To edit or delete, tap the subscription and choose ✏️ or 🗑️.'
    ],
    help_bills_title: '🧾 Bills',
    help_bills_steps: [
      'Tap <b>Bills</b> on the home screen.',
      'Tap <b>+ New</b> and fill in: name (e.g. Electricity), reference amount, day of month and, if you like, a <b>limit</b> for control.',
      'Each month, when the money leaves your account, tap <b>✓ Paid</b>.',
      'The amount is pre-filled with the last payment — adjust if needed and confirm.',
      "The payment goes to the <b>month's archive</b>. Over the limit, it's marked in red.",
      'You can fix the amount for <b>5 business days</b>. Then it locks 🔒 — long-press to edit anyway.'
    ],
    help_general_title: '⚙️ General',
    help_general_steps: [
      'In <b>Settings</b> you can change language, currency and theme (light/dark).',
      'Your data is yours alone — each account only sees its own subscriptions and bills.',
      'Install the app: Chrome menu ⋮ → <b>Add to Home screen</b>.'
    ],
    err_fill: 'Fill in all fields.',
    err_pw_match: 'The passwords do not match.',
    err_pw_short: 'The password must have at least 8 characters.',
    err_invalid: 'Wrong email or password.',
    err_not_confirmed: 'Email not confirmed yet. Check your inbox.',
    err_exists: 'An account with this email already exists.',
    err_generic: 'Something went wrong. Try again.'
  }
};
let LANG = 'pt';
function t(k) { return (I18N[LANG] && I18N[LANG][k]) !== undefined && (I18N[LANG][k] !== '') ? I18N[LANG][k] : (I18N.pt[k] || k); }


// ===== 02-auth.js =====
// Lógica de autenticação
async function doLogin(email, pw) {
  const { error } = await sb.auth.signInWithPassword({ email, password: pw });
  if (error) {
    if (/not confirmed/i.test(error.message)) throw new Error(t('err_not_confirmed'));
    throw new Error(t('err_invalid'));
  }
}

async function doRegister(name, email, pw) {
  const { data, error } = await sb.auth.signUp({
    email,
    password: pw,
    options: {
      data: { display_name: name },
      emailRedirectTo: 'https://aboklar.ch/'
    }
  });
  if (error) {
    if (/already/i.test(error.message)) throw new Error(t('err_exists'));
    throw new Error(t('err_generic'));
  }
  // signUp com email já registado devolve user sem identities
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error(t('err_exists'));
  }
}

async function doReset(email) {
  await sb.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://aboklar.ch/'
  });
}

async function doLogout() {
  await sb.auth.signOut();
  renderAuth('login');
}


// ===== 03-ui.js =====
// UI — ecrãs de auth e home provisória
const $app = () => document.getElementById('app');

function logoBlock() {
  return `
    <div class="logo-block">
      <img src="assets/icon-512.png" alt="AboKlar" class="logo-img">
      <h1 class="brand">Abo<span class="klar">Klar</span></h1>
      <p class="tagline">${t('tagline')}</p>
    </div>`;
}

function errBox(msg) {
  return msg ? `<div class="err">${msg}</div>` : '';
}

function pwField(id, placeholder, autocomplete) {
  return `<div class="pw-wrap">
    <input id="${id}" type="password" placeholder="${placeholder}" autocomplete="${autocomplete}">
    <button type="button" class="pw-eye" onclick="togglePw('${id}', this)">👁</button>
  </div>`;
}

function togglePw(id, btn) {
  const el = document.getElementById(id);
  if (el.type === 'password') { el.type = 'text'; btn.classList.add('on'); }
  else { el.type = 'password'; btn.classList.remove('on'); }
}

function renderAuth(view, ctx = {}) {
  let inner = '';
  if (view === 'login') {
    inner = `
      ${errBox(ctx.err)}
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      ${pwField('f-pw', t('password'), 'current-password')}
      <button class="btn-primary" onclick="uiLogin()">${t('login')}</button>
      <button class="btn-link" onclick="renderAuth('reset')">${t('forgot')}</button>
      <div class="divider"></div>
      <p class="muted">${t('no_account')}</p>
      <button class="btn-secondary" onclick="renderAuth('register')">${t('register')}</button>`;
  } else if (view === 'register') {
    inner = `
      ${errBox(ctx.err)}
      <input id="f-name" type="text" placeholder="${t('name')}" autocomplete="name" value="${ctx.name || ''}">
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      ${pwField('f-pw', t('password'), 'new-password')}
      ${pwField('f-pw2', t('password2'), 'new-password')}
      <button class="btn-primary" onclick="uiRegister()">${t('register')}</button>
      <div class="divider"></div>
      <p class="muted">${t('has_account')}</p>
      <button class="btn-secondary" onclick="renderAuth('login')">${t('login')}</button>`;
  } else if (view === 'confirm') {
    inner = `
      <div class="confirm-box">
        <h2>${t('confirm_title')}</h2>
        <p><strong>${ctx.email || ''}</strong></p>
        <p class="muted">${t('confirm_hint')}</p>
      </div>
      <button class="btn-secondary" onclick="renderAuth('login', {email:'${ctx.email || ''}'})">${t('login')}</button>`;
  } else if (view === 'reset') {
    inner = `
      ${ctx.sent ? `<div class="ok">${t('reset_sent')}</div>` : errBox(ctx.err)}
      <input id="f-email" type="email" placeholder="${t('email')}" autocomplete="email" value="${ctx.email || ''}">
      <button class="btn-primary" onclick="uiReset()">${t('reset_send')}</button>
      <button class="btn-link" onclick="renderAuth('login')">${t('back')}</button>`;
  }
  $app().innerHTML = `<div class="auth-card">${logoBlock()}${inner}</div>`;
}

async function renderHome(user) {
  localStorage.setItem('aboklar_last_view', 'home');
  const lastSec = localStorage.getItem('aboklar_last_section') || 'subs';
  const name = (user.user_metadata && user.user_metadata.display_name) || user.email;
  $app().innerHTML = `
    <div class="page home-page">
      <div class="home-logo-block">
        <img src="assets/icon-512.png" alt="AboKlar" class="home-logo">
        <h1 class="brand home-brand">Abo<span class="klar">Klar</span></h1>
      </div>
      <p class="greet greet-center">${t('welcome')}, ${name} 👋</p>
      <div class="home-grid">
        <button class="home-card ${lastSec === 'subs' ? 'card-active' : 'card-idle'}" onclick="renderSubs()">
          <span class="home-emoji">📋</span>
          <span class="home-title">${t('subs')}</span>
          <span class="home-hint">${t('subs_hint')}</span>
        </button>
        <button class="home-card ${lastSec === 'bills' ? 'card-active' : 'card-idle'}" onclick="renderBills()">
          <span class="home-emoji">🧾</span>
          <span class="home-title">${t('bills')}</span>
          <span class="home-hint">${t('bills_hint')}</span>
        </button>
      </div>
      ${weatherBox()}
      <div class="home-bottom">
        <button class="btn-help-sm" onclick="renderHelp()">❓ ${t('help')}</button>
        <button class="icon-btn" onclick="renderSettings()" title="${t('settings')}">⚙️</button>
      </div>
    </div>`;
  loadWeather();
}

function sectionShell(title, inner, rightBtn = '') {
  $app().innerHTML = `
    <div class="page">
      <header class="topbar">
        <button class="icon-btn" onclick="boot(true)">←</button>
        <span class="topbar-name">${title}</span>
        ${rightBtn || '<span style="width:40px"></span>'}
      </header>
      ${inner}
    </div>`;
}

function helpSection(title, steps, open) {
  const items = steps.map((st, i) => `<li>${st}</li>`).join('');
  return `<details class="help-sec"${open ? ' open' : ''}>
    <summary>${title}</summary>
    <ol class="help-steps">${items}</ol>
  </details>`;
}

function renderHelp() {
  sectionShell(t('help'), `
    <button class="btn-primary" style="width:100%;margin-bottom:16px" onclick="renderSupportChat()">💬 ${t('help_chat_title')}</button>
    <p class="muted" style="text-align:left;margin-bottom:16px">${t('help_intro')}</p>
    ${helpSection(t('help_subs_title'), t('help_subs_steps'), true)}
    ${helpSection(t('help_bills_title'), t('help_bills_steps'), false)}
    ${helpSection(t('help_general_title'), t('help_general_steps'), false)}
  `);
}

// ---- handlers ----
async function uiLogin() {
  const email = document.getElementById('f-email').value.trim();
  const pw = document.getElementById('f-pw').value;
  if (!email || !pw) return renderAuth('login', { err: t('err_fill'), email });
  try {
    await doLogin(email, pw);
    boot();
  } catch (e) { renderAuth('login', { err: e.message, email }); }
}

async function uiRegister() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const pw = document.getElementById('f-pw').value;
  const pw2 = document.getElementById('f-pw2').value;
  if (!name || !email || !pw || !pw2) return renderAuth('register', { err: t('err_fill'), name, email });
  if (pw !== pw2) return renderAuth('register', { err: t('err_pw_match'), name, email });
  if (pw.length < 8) return renderAuth('register', { err: t('err_pw_short'), name, email });
  try {
    await doRegister(name, email, pw);
    renderAuth('confirm', { email });
  } catch (e) { renderAuth('register', { err: e.message, name, email }); }
}

async function uiReset() {
  const email = document.getElementById('f-email').value.trim();
  if (!email) return renderAuth('reset', { err: t('err_fill') });
  await doReset(email);
  renderAuth('reset', { sent: true, email });
}

// ---- arranque ----
async function boot(forceHome) {
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    await loadProfile();
    const last = forceHome ? 'home' : localStorage.getItem('aboklar_last_view');
    if (last === 'subs') renderSubs();
    else if (last === 'bills') renderBills();
    else renderHome(session.user);
  } else renderAuth('login');
}
document.addEventListener('DOMContentLoaded', () => {
  boot();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});


// ===== 04-subs.js =====
// Subscrições — CRUD + detalhe + estado + ordenação
const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];
const PAY_METHODS = ['Débito', 'Cartão', 'Twint', 'Apple Pay', 'Google Pay', 'PayPal', 'MB WAY', 'Transferência', 'Outro'];
const COUNTRIES = ['CH', 'PT', 'DE', 'FR', 'IT', 'AT', 'ES', 'NL', 'BE', 'GB', 'US'];
let SUBS_CACHE = [];
let SUBS_SORT = 'date';
let FX = null;

async function fetchRatesFrom(url) {
  try {
    const r = await fetch(url);
    const d = await r.json();
    if (d && d.rates && Object.keys(d.rates).length) return d.rates;
  } catch (e) { console.error('fx', url, e); }
  return null;
}

async function getRates(base) {
  try {
    const cached = JSON.parse(localStorage.getItem('aboklar_fx2') || 'null');
    if (cached && cached.base === base && cached.rates && Object.keys(cached.rates).length &&
        Date.now() - cached.ts < 12 * 3600 * 1000) { FX = cached; return FX; }
  } catch (e) {}
  const rates =
    await fetchRatesFrom(`https://api.frankfurter.dev/v1/latest?base=${base}`) ||
    await fetchRatesFrom(`https://api.frankfurter.app/latest?from=${base}`) ||
    await fetchRatesFrom(`https://open.er-api.com/v6/latest/${base}`);
  if (rates) {
    FX = { base, rates, ts: Date.now() };
    localStorage.setItem('aboklar_fx2', JSON.stringify(FX));
  } else {
    // rede de segurança: taxas fixas aproximadas (método Abo Kontrolle)
    const EURper = { EUR: 1, CHF: 1.03, USD: 0.92, GBP: 1.17 };
    const fixed = {};
    for (const c of Object.keys(EURper)) {
      if (c !== base) fixed[c] = (EURper[base] || 1) / EURper[c];
    }
    FX = { base, rates: fixed, ts: 0 };
  }
  return FX;
}

function toBase(amount, cur, base) {
  if (cur === base) return amount;
  if (!FX || FX.base !== base || !FX.rates[cur]) return null;
  return amount / FX.rates[cur];
}
const HIDE_STATE = {
  monthly: localStorage.getItem('aboklar_hide_monthly') === '1',
  yearly: localStorage.getItem('aboklar_hide_yearly') === '1'
};

function toggleTotals(which) {
  HIDE_STATE[which] = !HIDE_STATE[which];
  localStorage.setItem('aboklar_hide_' + which, HIDE_STATE[which] ? '1' : '0');
  const card = document.getElementById('total-' + which);
  if (!card) return;
  card.querySelectorAll('.total-val').forEach(el => el.classList.toggle('hidden-val', HIDE_STATE[which]));
  const eye = card.querySelector('.total-eye');
  if (eye) eye.textContent = HIDE_STATE[which] ? '🙈' : '👁';
}

function fmtMoney(v, cur) { return `${Number(v).toFixed(2)} ${cur}`; }
function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}.${m}.${y}`;
}

function flagEmoji(cc) {
  if (!cc || cc.length !== 2) return '';
  const A = 0x1F1E6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
}

function subIcon(s) {
  if (s.website) {
    const dom = s.website.replace(/^https?:\/\//, '').split('/')[0];
    return `<img class="sub-logo" src="https://www.google.com/s2/favicons?domain=${dom}&sz=64" alt="" onerror="this.outerHTML=subLetter('${(s.name||'?')[0]}')">`;
  }
  return subLetter((s.name || '?')[0]);
}

function subLetter(ch) {
  return `<span class="sub-letter">${ch.toUpperCase()}</span>`;
}

function nextRenewal(s) {
  const today = new Date(); today.setHours(0,0,0,0);
  let base = null;
  if (s.renewal_date) base = new Date(s.renewal_date + 'T00:00:00');
  else if (s.billing_cycle === 'monthly' && s.renewal_day)
    base = new Date(today.getFullYear(), today.getMonth(), s.renewal_day);
  if (!base) return null;

  let d = new Date(base);
  const dayWanted = base.getDate();
  let guard = 0;
  while (d < today && guard++ < 600) {
    if (s.billing_cycle === 'yearly') {
      d = new Date(d.getFullYear() + 1, d.getMonth(), dayWanted);
    } else {
      let m = d.getMonth() + 1, y = d.getFullYear();
      if (m > 11) { m = 0; y++; }
      const lastDay = new Date(y, m + 1, 0).getDate();
      d = new Date(y, m, Math.min(dayWanted, lastDay));
    }
  }
  const days = Math.round((d - today) / 86400000);
  const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return { date: iso, days };
}

async function loadSubs() {
  const { data, error } = await sb.from('subscriptions').select('*').order('name');
  if (error) { console.error(error); return []; }
  SUBS_CACHE = data || [];
  return SUBS_CACHE;
}

function subsTotals(subs, base) {
  let monthly = 0, yearly = 0, ok = true;
  const byCur = {};
  for (const s of subs) {
    if (!s.active) continue;
    const cur = s.currency || 'CHF';
    const amt = Number(s.amount) || 0;
    const m = s.billing_cycle === 'yearly' ? amt / 12 : amt;
    const y = s.billing_cycle === 'yearly' ? amt : amt * 12;
    if (!byCur[cur]) byCur[cur] = { monthly: 0, yearly: 0 };
    byCur[cur].monthly += m; byCur[cur].yearly += y;
    const mConv = toBase(m, cur, base);
    if (mConv === null) { ok = false; continue; }
    monthly += mConv; yearly += toBase(y, cur, base);
  }
  return { monthly, yearly, ok, byCur };
}

function setSubsSort(mode) { SUBS_SORT = mode; renderSubs(); }

async function renderSubs() {
  localStorage.setItem('aboklar_last_view', 'subs');
  localStorage.setItem('aboklar_last_section', 'subs');
  const base = (typeof PROFILE !== 'undefined' && PROFILE && PROFILE.currency) || 'CHF';
  const subs = await loadSubs();
  await getRates(base);
  const totals = subsTotals(subs, base);
  const sec = base === 'EUR' ? 'CHF' : 'EUR';
  const secRate = FX && FX.base === base && FX.rates[sec] ? FX.rates[sec] : null;

  const sorted = [...subs].sort((a, b) => {
    if (SUBS_SORT === 'name') return a.name.localeCompare(b.name);
    const ra = nextRenewal(a), rb = nextRenewal(b);
    if (!ra && !rb) return a.name.localeCompare(b.name);
    if (!ra) return 1; if (!rb) return -1;
    return ra.days - rb.days;
  });

  const totalCard = (which, val) => {
    const hid = HIDE_STATE[which] ? ' hidden-val' : '';
    let inner;
    if (totals.ok) {
      inner = `<span class="total-val${hid}">${fmtMoney(val, base)}</span>` +
        (secRate ? `<span class="total-val total-sec${hid}">${fmtMoney(val * secRate, sec)}</span>` : '');
    } else {
      inner = Object.entries(totals.byCur).map(([c, v]) =>
        `<span class="total-val${hid}">${fmtMoney(which === 'monthly' ? v.monthly : v.yearly, c)}</span>`).join('');
    }
    return `<div class="total-card" id="total-${which}" onclick="toggleTotals('${which}')">
      <span class="total-label">${t(which === 'monthly' ? 'total_monthly' : 'total_yearly')} <span class="total-eye">${HIDE_STATE[which] ? '🙈' : '👁'}</span></span>
      ${inner}</div>`;
  };
  const totalCards = subs.length
    ? `<div class="totals-row">${totalCard('monthly', totals.monthly)}${totalCard('yearly', totals.yearly)}</div>` : '';

  const list = sorted.length
    ? sorted.map(s => {
        const nr = nextRenewal(s);
        const meta2 = [s.payment_method, s.bank, s.card_last4 ? '••••' + s.card_last4 : null].filter(Boolean).join(' · ');
        return `
      <div class="row-card sub-row${s.active ? '' : ' off'}" onclick="renderSubDetail('${s.id}')">
        <div class="sub-icon-wrap">${subIcon(s)}</div>
        <div class="row-main">
          <span class="row-name"><span class="dot ${s.active ? 'dot-on' : 'dot-off'}"></span>${s.name} ${flagEmoji(s.country)}</span>
          <span class="row-cat">${[s.category, s.billing_cycle === 'yearly' ? t('yearly') : t('monthly')].filter(Boolean).join(' · ')}</span>
          ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
          ${nr ? `<span class="row-cat">${fmtDate(nr.date)} (${t('in_days')} ${nr.days}d)</span>` : ''}
        </div>
        <div class="row-side">
          <span class="row-amount">${fmtMoney(s.amount, s.currency)}</span>
          <div class="row-actions">
            <button class="mini-btn" onclick="event.stopPropagation();renderSubForm('${s.id}')">✏️</button>
            <button class="mini-btn danger" onclick="event.stopPropagation();deleteSub('${s.id}')">🗑️</button>
          </div>
        </div>
      </div>`;
      }).join('')
    : `<p class="muted" style="margin-top:30px">${t('no_subs')}</p>`;

  sectionShell(t('subs'), `
    ${totalCards}
    <button class="btn-primary" style="width:100%;margin:14px 0" onclick="renderSubForm()">${t('new')}</button>
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${SUBS_SORT === 'date' ? ' on' : ''}" onclick="setSubsSort('date')">${t('sort_date')}</button>
      <button class="seg-btn${SUBS_SORT === 'name' ? ' on' : ''}" onclick="setSubsSort('name')">${t('sort_name')}</button>
    </div>
    <div class="rows">${list}</div>
  `);
}

function renderSubDetail(id) {
  const s = SUBS_CACHE.find(x => x.id === id);
  if (!s) return;
  const nr = nextRenewal(s);
  const rows = [
    [t('category'), s.category],
    [t('cycle'), s.billing_cycle === 'yearly' ? t('yearly') : t('monthly')],
    [t('value_lbl'), fmtMoney(s.amount, s.currency)],
    [t('method'), s.payment_method],
    [t('bank'), s.bank],
    [t('card'), s.card_last4 ? '•••• ' + s.card_last4 : null],
    [t('country'), s.country ? `${flagEmoji(s.country)} ${s.country}` : null],
    [t('nif_lbl'), s.nif],
    [t('phone_lbl'), s.phone ? `<a href="tel:${s.phone}">${s.phone}</a>` : null],
    [t('email'), s.email ? `<a href="mailto:${s.email}">${s.email}</a>` : null],
    [t('next_charge'), nr ? `${fmtDate(nr.date)} (${t('in_days')} ${nr.days}d)` : null],
    [t('status'), s.active ? t('active_lbl') : t('inactive_lbl')]
  ].filter(r => r[1]);

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="sub-icon-wrap big">${subIcon(s)}</div>
        <div>
          <div class="modal-title">${s.name} ${flagEmoji(s.country)}</div>
          <div class="modal-sub">${fmtMoney(s.amount, s.currency)} / ${s.billing_cycle === 'yearly' ? t('yearly').toLowerCase() : t('monthly').toLowerCase()}</div>
        </div>
      </div>
      ${rows.map(r => `<div class="detail-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}
      <button class="btn-secondary" style="margin-top:14px" onclick="toggleSubActive('${s.id}', ${!s.active})">${s.active ? t('deactivate') + ' ⏸' : t('activate') + ' ▶️'}</button>
      <div class="modal-btns">
        <button class="btn-primary" onclick="this.closest('.modal-bg').remove();renderSubForm('${s.id}')">${t('edit')} ✏️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function toggleSubActive(id, val) {
  const { error } = await sb.from('subscriptions').update({ active: val }).eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderSubs();
}

function renderSubForm(id) {
  const s = id ? SUBS_CACHE.find(x => x.id === id) : null;
  const isEdit = !!s;
  const cur = (s && s.currency) || 'CHF';
  const cycle = (s && s.billing_cycle) || 'monthly';
  const esc = v => (v || '').replace(/"/g, '&quot;');

  sectionShell(isEdit ? t('edit') : t('new'), `
    <div class="form">
      <input id="s-name" type="text" placeholder="${t('sub_name_ph')}" value="${esc(s && s.name)}">
      <input id="s-website" type="text" placeholder="${t('website_ph')}" value="${esc(s && s.website)}">
      <input id="s-cat" type="text" placeholder="${t('category_ph')}" value="${esc(s && s.category)}">
      <div class="form-row">
        <input id="s-amount" type="number" step="0.01" inputmode="decimal" placeholder="${t('amount_ph')}" value="${s ? s.amount : ''}">
        <select id="s-cur">${CURRENCIES.map(c => `<option value="${c}"${c === cur ? ' selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <div class="form-row">
        <select id="s-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${s && s.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="s-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${s && s.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="s-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(s && s.bank)}">
      <input id="s-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(s && s.card_last4)}">
      <input id="s-nif" type="text" placeholder="${t('nif_ph')}" value="${esc(s && s.nif)}">
      <input id="s-phone" type="tel" placeholder="${t('phone_ph')}" value="${esc(s && s.phone)}">
      <input id="s-email" type="email" placeholder="${t('email_ph')}" value="${esc(s && s.email)}">
      <label class="lbl">${t('cycle')}</label>
      <div class="seg">
        <button type="button" class="seg-btn${cycle === 'monthly' ? ' on' : ''}" onclick="segCycle(this,'monthly')">${t('monthly')}</button>
        <button type="button" class="seg-btn${cycle === 'yearly' ? ' on' : ''}" onclick="segCycle(this,'yearly')">${t('yearly')}</button>
      </div>
      <input type="hidden" id="s-cycle" value="${cycle}">
      <label class="lbl">${t('renewal_date')}</label>
      <input id="s-date" type="date" value="${s && s.renewal_date ? s.renewal_date : ''}">
      <div id="s-err"></div>
      <button class="btn-primary" onclick="saveSub(${isEdit ? `'${s.id}'` : 'null'})">${t('save')}</button>
      <button class="btn-secondary" onclick="renderSubs()">${t('cancel')}</button>
      ${isEdit ? `<button class="btn-danger" onclick="deleteSub('${s.id}')">${t('delete')} 🗑️</button>` : ''}
    </div>
  `);
}

function segCycle(btn, val) {
  document.getElementById('s-cycle').value = val;
  document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}

async function saveSub(id) {
  const g = i => document.getElementById(i);
  const name = g('s-name').value.trim();
  const amount = parseFloat(g('s-amount').value);
  const cycle = g('s-cycle').value;
  const rdate = g('s-date').value || null;
  const errEl = g('s-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (!amount || amount <= 0) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('s-website').value.trim() || null,
    category: g('s-cat').value.trim() || null,
    amount, currency: g('s-cur').value,
    payment_method: g('s-method').value || null,
    country: g('s-country').value || null,
    bank: g('s-bank').value.trim() || null,
    card_last4: g('s-card').value.trim() || null,
    nif: g('s-nif').value.trim() || null,
    phone: g('s-phone').value.trim() || null,
    email: g('s-email').value.trim() || null,
    billing_cycle: cycle,
    renewal_day: cycle === 'monthly' && rdate ? parseInt(rdate.slice(8, 10), 10) : null,
    renewal_date: rdate
  };

  let error;
  if (id) ({ error } = await sb.from('subscriptions').update(row).eq('id', id));
  else ({ error } = await sb.from('subscriptions').insert(row));
  if (error) { console.error(error); errEl.innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }
  renderSubs();
}

async function deleteSub(id) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('subscriptions').delete().eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderSubs();
}


// ===== 05-bills.js =====
// Faturas — CRUD + ✓ Pago + arquivo mensal + limite + bloqueio 5 dias úteis
let BILLS_CACHE = [];
const BHIDE_KEYS = {
  month: 'aboklar_hide_billmonth',
  archmonth: 'aboklar_hide_archtotal',
  archyear: 'aboklar_hide_archyear'
};
let BHIDE = {
  month: localStorage.getItem(BHIDE_KEYS.month) === '1',
  archmonth: localStorage.getItem(BHIDE_KEYS.archmonth) === '1',
  archyear: localStorage.getItem(BHIDE_KEYS.archyear) === '1'
};

function toggleBillTotal(which) {
  BHIDE[which] = !BHIDE[which];
  localStorage.setItem(BHIDE_KEYS[which], BHIDE[which] ? '1' : '0');
  const card = document.getElementById('btotal-' + which);
  if (card) {
    card.querySelectorAll('.total-val').forEach(el => el.classList.toggle('hidden-val', BHIDE[which]));
    const eye = card.querySelector('.total-eye');
    if (eye) eye.textContent = BHIDE[which] ? '🙈' : '👁';
  }
  if (which === 'archyear')
    document.querySelectorAll('.arch-mrow .row-amount').forEach(el => el.classList.toggle('hidden-val', BHIDE[which]));
}

function billTotalCard(which, label, byCur, base) {
  const hid = BHIDE[which] ? ' hidden-val' : '';
  const sec = base === 'EUR' ? 'CHF' : 'EUR';
  const secRate = FX && FX.base === base && FX.rates[sec] ? FX.rates[sec] : null;
  let total = 0, ok = true;
  for (const [c, v] of Object.entries(byCur)) {
    const conv = toBase(v, c, base);
    if (conv === null) { ok = false; break; }
    total += conv;
  }
  let inner;
  if (ok && Object.keys(byCur).length) {
    inner = `<span class="total-val${hid}">${fmtMoney(total, base)}</span>` +
      (secRate ? `<span class="total-val total-sec${hid}">${fmtMoney(total * secRate, sec)}</span>` : '');
  } else {
    inner = Object.entries(byCur).map(([c, v]) => `<span class="total-val${hid}">${fmtMoney(v, c)}</span>`).join('') || `<span class="total-val">—</span>`;
  }
  return `<div class="total-card" id="btotal-${which}" onclick="toggleBillTotal('${which}')">
    <span class="total-label">${label} <span class="total-eye">${BHIDE[which] ? '🙈' : '👁'}</span></span>
    ${inner}</div>`;
}
let PAYMENTS_CACHE = [];
let BILLS_TAB = 'bills'; // 'bills' | 'archive'
let BILLS_GROUP = 'due'; // 'due' | 'paid' | 'later' | 'inactive'
function setBillsGroup(g) { BILLS_GROUP = g; renderBills(); }
let ARCH_PERIOD = null;  // 'YYYY-MM'
let ARCH_YEAR = null;
let ARCH_VIEW = 'year'; // 'year' | 'month'
function shiftArchYear(d) { ARCH_YEAR = String(parseInt(ARCH_YEAR, 10) + d); renderBills(); }
function openArchMonth(p) { ARCH_PERIOD = p; ARCH_VIEW = 'month'; renderBills(); }
function backToYear() { ARCH_VIEW = 'year'; renderBills(); }
let ARCH_SORT = 'date'; // 'date' | 'name'
function setArchSort(m) { ARCH_SORT = m; renderBills(); }

function csvEscape(v) {
  v = String(v == null ? '' : v);
  return /[";\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

let JSQR_LOADING = null;
function loadJsQR() {
  if (window.jsQR) return Promise.resolve();
  if (JSQR_LOADING) return JSQR_LOADING;
  JSQR_LOADING = new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    sc.onload = res; sc.onerror = rej;
    document.head.appendChild(sc);
  });
  return JSQR_LOADING;
}

async function scanBillPhoto(input) {
  const file = input.files && input.files[0];
  input.value = '';
  if (!file) return;
  showToast(t('scan_reading'));
  try {
    await loadJsQR();
    const bmp = await createImageBitmap(file);
    let code = null;
    for (const maxSide of [1600, 1000, 2200]) {
      const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
      const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const ctx = cv.getContext('2d');
      ctx.drawImage(bmp, 0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h);
      code = jsQR(img.data, w, h);
      if (code && code.data) break;
    }
    if (code && code.data) { fillFromQR(code.data); return; }
    await runOCR(file);
  } catch (e) { console.error(e); showToast(t('err_generic')); }
}

function fillFromQR(data) {
  const g = i => document.getElementById(i);
  const setVal = (id, v) => { const el = g(id); if (el && v) el.value = v; };
  const L = data.split(/\r?\n/);
  if (L[0] === 'SPC') {
    // Swiss QR-bill (SPC v2)
    setVal('b-name', L[5]);
    if (L[18]) setVal('b-amount', L[18]);
    if (L[19] && g('b-cur') && [...g('b-cur').options].some(o => o.value === L[19])) g('b-cur').value = L[19];
    if (L[10] && g('b-country') && [...g('b-country').options].some(o => o.value === L[10])) g('b-country').value = L[10];
    if (L[28]) setVal('b-ref', L[28]);
    if (L[29]) setVal('b-notes', L[29]);
    showToast(t('scan_ok'));
  } else if (/^A:\d{9}\*/.test(data)) {
    // QR fiscal português (AT): A:NIF*B:NIF*C:PT*...*F:data*G:doc*O:total
    const F = {};
    for (const part of data.split('*')) {
      const i = part.indexOf(':');
      if (i > 0) F[part.slice(0, i)] = part.slice(i + 1);
    }
    if (F.A) setVal('b-nif', F.A);
    if (F.O) setVal('b-amount', F.O);
    if (g('b-cur') && [...g('b-cur').options].some(o => o.value === 'EUR')) g('b-cur').value = 'EUR';
    if (g('b-country') && [...g('b-country').options].some(o => o.value === 'PT')) g('b-country').value = 'PT';
    if (F.F && /^\d{8}$/.test(F.F)) setVal('b-date', `${F.F.slice(0,4)}-${F.F.slice(4,6)}-${F.F.slice(6,8)}`);
    if (F.G) setVal('b-notes', 'Doc ' + F.G);
    showToast(t('scan_ok'));
  } else if (/^A:\d{9}\*/.test(data) && data.includes('*O:')) {
    // QR das faturas portuguesas (Autoridade Tributária): A:NIF*B:...*F:data*O:total*...
    const f = {};
    for (const part of data.split('*')) {
      const i = part.indexOf(':');
      if (i > 0) f[part.slice(0, i)] = part.slice(i + 1);
    }
    if (f.A) setVal('b-nif', f.A);
    if (f.O) setVal('b-amount', f.O.replace(',', '.'));
    const g2 = i => document.getElementById(i);
    if (g2('b-cur')) g2('b-cur').value = 'EUR';
    if (g2('b-country') && [...g2('b-country').options].some(o => o.value === 'PT')) g2('b-country').value = 'PT';
    if (f.G) setVal('b-notes', f.G);
    showToast(t('scan_ok'));
  } else {
    // QR genérico: guarda o conteúdo nas notas para não se perder
    setVal('b-notes', data.slice(0, 200));
    showToast(t('scan_ok'));
  }
}

// ---- OCR (Tesseract.js a pedido) para faturas sem QR ----
let TESS_LOADING = null;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve();
  if (TESS_LOADING) return TESS_LOADING;
  TESS_LOADING = new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    sc.onload = res; sc.onerror = rej;
    document.head.appendChild(sc);
  });
  return TESS_LOADING;
}

async function runOCR(file) {
  showToast(t('ocr_reading'));
  try {
    await loadTesseract();
    // reconhece os 5 idiomas da app em simultâneo (funciona para qualquer fatura)
    const { data } = await Tesseract.recognize(file, 'por+deu+fra+ita+eng');
    const text = (data && data.text) || '';
    if (!text.trim()) { showToast(t('ocr_nothing')); return; }
    const setIfEmpty = (id, v) => {
      const el = document.getElementById(id);
      if (el && v && !el.value.trim()) el.value = v;
    };
    let filled = false;

    const email = text.match(/[\w.+-]+@[\w-]+\.[\w.]{2,}/);
    if (email) { setIfEmpty('b-email', email[0]); filled = true; }

    const phone = text.match(/(?:tel\.?|telefone|phone|tél)[^\d+]{0,8}(\+?[\d][\d .\/-]{6,15}\d)/i)
      || text.match(/\+\d{2}[\d .\/-]{7,14}\d/);
    if (phone) { setIfEmpty('b-phone', (phone[1] || phone[0]).trim()); filled = true; }

    const nif = text.match(/(?:NIF|Contribuinte|UID|VAT|MwSt)[^\dA-Z]{0,8}((?:CHE[-. ]?)?\d[\d .-]{6,12}\d)/i);
    if (nif) { setIfEmpty('b-nif', nif[1].trim()); filled = true; }

    // valor: apanhar o maior montante com 2 decimais
    const amts = [...text.matchAll(/(\d{1,3}(?:[ .']\d{3})*[.,]\d{2})/g)]
      .map(m => parseFloat(m[1].replace(/[ .']/g, function(c){return c === ',' ? '.' : '';}).replace(',', '.')))
      .filter(n => !isNaN(n) && n > 0 && n < 100000);
    if (amts.length) { setIfEmpty('b-amount', Math.max(...amts).toFixed(2)); filled = true; }

    showToast(filled ? t('ocr_done') : t('ocr_nothing'));
  } catch (e) { console.error(e); showToast(t('ocr_nothing')); }
}

function exportArch(scope) {
  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:12px">${t('export_btn')}</div>
      <div class="form">
        <label class="lbl">${t('export_name_lbl')}</label>
        <input id="exp-name" type="text" value="aboklar-${scope}">
        <button class="btn-primary" onclick="doExportArch('${scope}', document.getElementById('exp-name').value); this.closest('.modal-bg').remove()">${t('export_btn')}</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function doExportArch(scope, rawName) {
  // scope: 'YYYY' (ano) ou 'YYYY-MM' (mês)
  const like = scope.length === 4 ? scope + '-%' : scope;
  const q = sb.from('bill_payments').select('bill_id,amount,period,paid_at');
  const { data: pays } = scope.length === 4 ? await q.like('period', like) : await q.eq('period', scope);
  const billById = {};
  for (const b of BILLS_CACHE) billById[b.id] = b;
  const rows = (pays || []).sort((a, b) => a.period.localeCompare(b.period) || new Date(a.paid_at) - new Date(b.paid_at));
  const header = [t('csv_bill'), t('csv_paid'), t('csv_period'), t('csv_amount'), t('csv_currency')].join(';');
  const lines = rows.map(p => {
    const b = billById[p.bill_id] || {};
    return [csvEscape(b.name || '?'), fmtDate(p.paid_at), p.period, Number(p.amount).toFixed(2), b.currency || 'CHF'].join(';');
  });
  const csv = '\ufeff' + header + '\n' + lines.join('\n');
  let name = (rawName || `aboklar-${scope}`).trim().replace(/[\\/:*?"<>|]/g, '-');
  if (!name) name = `aboklar-${scope}`;
  const filename = name.toLowerCase().endsWith('.csv') ? name : name + '.csv';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const file = new File([blob], filename, { type: 'text/csv' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'AboKlar ' + scope }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function curPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function periodLabel(p) {
  const [y, m] = p.split('-');
  const months = t('months');
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function shiftPeriod(p, delta) {
  let [y, m] = p.split('-').map(Number);
  m += delta;
  while (m < 1) { m += 12; y--; }
  while (m > 12) { m -= 12; y++; }
  return `${y}-${String(m).padStart(2, '0')}`;
}

function businessDaysSince(iso) {
  const start = new Date(iso.slice(0, 10) + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let count = 0;
  const d = new Date(start);
  while (d < today) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) count++;
  }
  return count;
}

const PER_MONTHS = { monthly: 1, quarterly: 3, halfyear: 6, yearly: 12 };

function nextBillDue(b) {
  const today = new Date(); today.setHours(0,0,0,0);
  let base = b.due_date ? new Date(b.due_date + 'T00:00:00')
    : (b.due_day ? new Date(today.getFullYear(), today.getMonth(), b.due_day) : null);
  if (!base) return null;
  if (b.periodicity === 'once') {
    const days0 = Math.round((base - today) / 86400000);
    const iso0 = `${base.getFullYear()}-${String(base.getMonth()+1).padStart(2,'0')}-${String(base.getDate()).padStart(2,'0')}`;
    return { date: iso0, days: days0 };
  }
  const step = PER_MONTHS[b.periodicity || 'monthly'] || 1;
  const dayWanted = base.getDate();
  let d = new Date(base); let g = 0;
  while (d < today && g++ < 600) {
    let m = d.getMonth() + step, y = d.getFullYear();
    while (m > 11) { m -= 12; y++; }
    const last = new Date(y, m + 1, 0).getDate();
    d = new Date(y, m, Math.min(dayWanted, last));
  }
  const days = Math.round((d - today) / 86400000);
  const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return { date: iso, days };
}

async function loadBills() {
  const { data, error } = await sb.from('bills').select('*').order('due_day');
  if (error) { console.error(error); return []; }
  BILLS_CACHE = data || [];
  return BILLS_CACHE;
}

async function loadPayments(period) {
  const { data, error } = await sb.from('bill_payments').select('*').eq('period', period);
  if (error) { console.error(error); return []; }
  PAYMENTS_CACHE = data || [];
  return PAYMENTS_CACHE;
}

function setBillsTab(tab) { BILLS_TAB = tab; if (tab === 'archive') ARCH_VIEW = 'year'; renderBills(); }
function shiftArch(delta) { ARCH_PERIOD = shiftPeriod(ARCH_PERIOD, delta); renderBills(); }

async function renderBills() {
  localStorage.setItem('aboklar_last_view', 'bills');
  localStorage.setItem('aboklar_last_section', 'bills');
  if (!ARCH_PERIOD) ARCH_PERIOD = curPeriod();
  const base = (typeof PROFILE !== 'undefined' && PROFILE && PROFILE.currency) || 'CHF';
  await getRates(base);
  await loadBills();

  const tabs = `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${BILLS_TAB === 'bills' ? ' on' : ''}" onclick="setBillsTab('bills')">${t('bills_tab')}</button>
      <button class="seg-btn${BILLS_TAB === 'archive' ? ' on' : ''}" onclick="setBillsTab('archive')">${t('archive_tab')}</button>
    </div>`;

  if (BILLS_TAB === 'bills') {
    const period = curPeriod();
    const pays = await loadPayments(period);
    const paidBy = {};
    for (const p of pays) paidBy[p.bill_id] = p;

    const billRow = b => {
      const pay = paidBy[b.id];
      const nd = nextBillDue(b);
      const meta2 = [b.payment_method, b.bank, b.card_last4 ? '••••' + b.card_last4 : null].filter(Boolean).join(' · ');
      return `
        <div class="row-card sub-row${b.active ? '' : ' off'}${pay ? ' paid-row' : ''}" onclick="renderBillDetail('${b.id}')">
          <div class="sub-icon-wrap">${subIcon(b)}</div>
          <div class="row-main">
            <span class="row-name"><span class="dot ${b.active ? 'dot-on' : 'dot-off'}"></span>${b.name} ${flagEmoji(b.country)}</span>
            <span class="row-cat">${[b.category, b.periodicity && b.periodicity !== 'monthly' ? ({quarterly:t('per_quarterly'),halfyear:t('per_halfyear'),yearly:t('yearly'),once:t('per_once')})[b.periodicity] : null].filter(Boolean).join(' · ')}</span>
            ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
            ${nd ? `<span class="row-cat">${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)</span>` : ''}
            ${b.period_start || b.period_end ? `<span class="row-cat">📆 ${b.period_start ? fmtDate(b.period_start) : '…'} – ${b.period_end ? fmtDate(b.period_end) : '…'}</span>` : ''}
          </div>
          <div class="row-side">
            <span class="row-amount">${fmtMoney(pay ? pay.amount : b.reference_amount, b.currency)}</span>
            ${pay
              ? `<span class="paid-badge">✓ ${t('paid_badge')}</span>`
              : (b.active ? `<button class="btn-paid" onclick="event.stopPropagation();openPaidModal('${b.id}')">${t('mark_paid')}</button>` : '')}
          </div>
        </div>`;
    };

    const now = new Date();
    const groups = { due: [], paid: [], later: [], inactive: [] };
    for (const b of BILLS_CACHE) {
      if (!b.active) { groups.inactive.push(b); continue; }
      if (paidBy[b.id]) { groups.paid.push(b); continue; }
      const nd = nextBillDue(b);
      if (nd && new Date(nd.date + 'T00:00:00').getMonth() === now.getMonth() &&
          new Date(nd.date + 'T00:00:00').getFullYear() === now.getFullYear()) groups.due.push(b);
      else groups.later.push(b);
    }
    const byDays = (a, c) => {
      const da = nextBillDue(a), dc = nextBillDue(c);
      if (!da && !dc) return a.name.localeCompare(c.name);
      if (!da) return 1; if (!dc) return -1;
      return da.days - dc.days;
    };
    groups.due.sort(byDays); groups.later.sort(byDays);
    groups.paid.sort((a, c) => a.name.localeCompare(c.name));

    const groupBtn = (key, label) =>
      `<button class="seg-btn grp-btn${BILLS_GROUP === key ? ' on' : ''}" onclick="setBillsGroup('${key}')">${label} (${groups[key].length})</button>`;

    const groupBtns = `<div class="grp-row">
      ${groupBtn('due', t('group_due'))}
      ${groupBtn('paid', t('group_paid'))}
      ${groupBtn('later', t('group_later'))}
      ${groupBtn('inactive', t('group_inactive'))}
    </div>`;

    const monthCur = {};
    for (const b of [...groups.due, ...groups.paid]) {
      const cur = b.currency || 'CHF';
      const amt = Number(paidBy[b.id] ? paidBy[b.id].amount : b.reference_amount) || 0;
      monthCur[cur] = (monthCur[cur] || 0) + amt;
    }
    const monthCard = Object.keys(monthCur).length
      ? `<div style="margin-bottom:14px">${billTotalCard('month', t('month_total'), monthCur, base)}</div>` : '';

    const sel = groups[BILLS_GROUP] || [];
    const list = BILLS_CACHE.length
      ? monthCard + groupBtns + (sel.length ? sel.map(billRow).join('') : `<p class="muted" style="margin-top:24px">—</p>`)
      : `<p class="muted" style="margin-top:30px">${t('no_bills')}</p>`;

    sectionShell(t('bills'), `
      ${tabs}
      <button class="btn-primary" style="width:100%;margin-bottom:14px" onclick="renderBillForm()">${t('new')}</button>
      <div class="rows">${list}</div>
    `);
  } else {
    if (!ARCH_YEAR) ARCH_YEAR = ARCH_PERIOD.slice(0, 4);
    const billById = {};
    for (const b of BILLS_CACHE) billById[b.id] = b;

    if (ARCH_VIEW === 'year') {
      const year = ARCH_YEAR;
      const { data: yearPays } = await sb.from('bill_payments').select('bill_id,amount,period').like('period', year + '-%');
      const yearCur = {};
      const byMonth = {};
      for (const p of (yearPays || [])) {
        const b = billById[p.bill_id];
        const cur = (b && b.currency) || 'CHF';
        yearCur[cur] = (yearCur[cur] || 0) + Number(p.amount);
        if (!byMonth[p.period]) byMonth[p.period] = { count: 0, byCur: {} };
        byMonth[p.period].count++;
        byMonth[p.period].byCur[cur] = (byMonth[p.period].byCur[cur] || 0) + Number(p.amount);
      }

      const months = t('months');
      const hid = BHIDE.archyear ? ' hidden-val' : '';
      const rows = Object.keys(byMonth).sort().reverse().map(per => {
        const mi = parseInt(per.slice(5), 10) - 1;
        let tot = 0, ok = true;
        for (const [c, v] of Object.entries(byMonth[per].byCur)) {
          const x = toBase(v, c, base);
          if (x === null) { ok = false; break; }
          tot += x;
        }
        const amt = ok ? fmtMoney(tot, base)
          : Object.entries(byMonth[per].byCur).map(([c, v]) => fmtMoney(v, c)).join(' + ');
        return `<button class="row-card arch-mrow" onclick="openArchMonth('${per}')">
          <div class="row-main">
            <span class="row-name">📅 ${months[mi]}</span>
            <span class="row-cat">${byMonth[per].count} ${t('pay_count')}</span>
          </div>
          <span class="row-amount${hid}">${amt}</span>
        </button>`;
      }).join('');

      sectionShell(t('bills'), `
        ${tabs}
        <div class="arch-nav">
          <button class="icon-btn" onclick="shiftArchYear(-1)">‹</button>
          <span class="arch-title">${year}</span>
          <button class="icon-btn" onclick="shiftArchYear(1)">›</button>
        </div>
        <div style="margin-bottom:14px">${billTotalCard('archyear', t('year_total') + ' ' + year, yearCur, base)}</div>
        <button class="btn-secondary" style="width:100%;margin-bottom:14px" onclick="exportArch('${year}')">${t('export_btn')} · ${year}</button>
        <div class="rows">${rows || `<p class="muted" style="margin-top:24px">${t('no_payments')}</p>`}</div>
      `);
    } else {
      const pays = await loadPayments(ARCH_PERIOD);
      const totals = {};
      for (const p of pays) {
        const b = billById[p.bill_id];
        const cur = (b && b.currency) || 'CHF';
        totals[cur] = (totals[cur] || 0) + Number(p.amount);
      }

      if (ARCH_SORT === 'name') {
        pays.sort((a, b) => ((billById[a.bill_id] || {}).name || '').localeCompare((billById[b.bill_id] || {}).name || ''));
      } else {
        pays.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
      }
      const list = pays.length
        ? pays.map(p => {
            const b = billById[p.bill_id] || { name: '?', currency: 'CHF' };
            const over = b.limit_amount && Number(p.amount) > Number(b.limit_amount);
            const bd = businessDaysSince(p.paid_at);
            const locked = bd > 5;
            return `
          <div class="row-card pay-row" data-pid="${p.id}" data-locked="${locked ? '1' : '0'}"
               onclick="payTap('${p.id}', ${locked})">
            <div class="row-main">
              <span class="row-name">${b.name} ${locked ? '🔒' : ''}</span>
              <span class="row-cat">${t('paid_on')} ${fmtDate(p.paid_at)}</span>
              ${over ? `<span class="row-cat over">⚠️ ${t('over_limit')} (${fmtMoney(b.limit_amount, b.currency)})</span>` : ''}
            </div>
            <span class="row-amount${over ? ' over' : ''}">${fmtMoney(p.amount, b.currency)}</span>
          </div>`;
          }).join('')
        : `<p class="muted" style="margin-top:30px">${t('no_payments')}</p>`;

      sectionShell(t('bills'), `
        ${tabs}
        <div class="arch-nav">
          <button class="icon-btn" onclick="backToYear()">←</button>
          <span class="arch-title">${periodLabel(ARCH_PERIOD)}</span>
          <span style="display:flex;gap:8px">
            <button class="icon-btn" onclick="shiftArch(-1)">‹</button>
            <button class="icon-btn" onclick="shiftArch(1)">›</button>
          </span>
        </div>
        <div style="margin-bottom:14px">${billTotalCard('archmonth', t('month_total'), totals, base)}</div>
        <div class="seg" style="margin-bottom:14px">
          <button class="seg-btn${ARCH_SORT === 'date' ? ' on' : ''}" onclick="setArchSort('date')">${t('sort_date')}</button>
          <button class="seg-btn${ARCH_SORT === 'name' ? ' on' : ''}" onclick="setArchSort('name')">${t('sort_name')}</button>
        </div>
        <button class="btn-secondary" style="width:100%;margin-bottom:14px" onclick="exportArch('${ARCH_PERIOD}')">${t('export_btn')} · ${periodLabel(ARCH_PERIOD)}</button>
        <div class="rows">${list}</div>
      `);
      setupLongPress();
    }
  }
}

// ---- premir longo para desbloquear ----
let LP_TIMER = null;
let LP_FIRED = false;

function setupLongPress() {
  document.querySelectorAll('.pay-row[data-locked="1"]').forEach(el => {
    el.addEventListener('pointerdown', () => {
      LP_FIRED = false;
      LP_TIMER = setTimeout(() => {
        LP_FIRED = true;
        openPaymentEdit(el.getAttribute('data-pid'), true);
      }, 600);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev =>
      el.addEventListener(ev, () => clearTimeout(LP_TIMER)));
  });
}

function payTap(pid, locked) {
  if (LP_FIRED) { LP_FIRED = false; return; }
  if (locked) { showToast(t('locked_hint')); return; }
  openPaymentEdit(pid, false);
}

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ---- ✓ Pago ----
async function openPaidModal(billId) {
  const b = BILLS_CACHE.find(x => x.id === billId);
  if (!b) return;
  // último valor pago desta fatura
  const { data } = await sb.from('bill_payments')
    .select('amount').eq('bill_id', billId)
    .order('period', { ascending: false }).limit(1);
  const prefill = (data && data.length) ? data[0].amount : b.reference_amount;

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:4px">${t('confirm_paid_title')}</div>
      <div class="modal-sub" style="margin-bottom:14px">${b.name} · ${periodLabel(curPeriod())}</div>
      <div class="form">
        <div class="form-row">
          <input id="pay-amount" type="number" step="0.01" inputmode="decimal" value="${prefill}">
          <span style="align-self:center;font-weight:700">${b.currency}</span>
        </div>
        ${b.limit_amount ? `<p class="muted" style="text-align:left;font-size:13px">${t('limit_lbl')}: ${fmtMoney(b.limit_amount, b.currency)}</p>` : ''}
        <button class="btn-primary" onclick="confirmPaid('${b.id}')">${t('mark_paid')}</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function confirmPaid(billId) {
  const amount = parseFloat(document.getElementById('pay-amount').value);
  if (!amount || amount <= 0) return;
  const { data: { user } } = await sb.auth.getUser();
  const { error } = await sb.from('bill_payments').insert({
    bill_id: billId, user_id: user.id, period: curPeriod(), amount
  });
  if (error) { console.error(error); alert(t('err_generic')); return; }
  const billOnce = BILLS_CACHE.find(x => x.id === billId);
  if (billOnce && billOnce.periodicity === 'once') {
    await sb.from('bills').update({ active: false }).eq('id', billId);
  }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- editar/apagar pagamento no arquivo ----
function openPaymentEdit(pid, unlocked) {
  const p = PAYMENTS_CACHE.find(x => x.id === pid);
  if (!p) return;
  const b = BILLS_CACHE.find(x => x.id === p.bill_id) || { name: '?', currency: 'CHF' };

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title" style="margin-bottom:4px">${t('edit_payment')} ${unlocked ? '🔓' : ''}</div>
      <div class="modal-sub" style="margin-bottom:14px">${b.name} · ${periodLabel(p.period)}</div>
      <div class="form">
        <div class="form-row">
          <input id="pay-amount" type="number" step="0.01" inputmode="decimal" value="${p.amount}">
          <span style="align-self:center;font-weight:700">${b.currency}</span>
        </div>
        <button class="btn-primary" onclick="savePaymentEdit('${p.id}')">${t('save')}</button>
        <button class="btn-danger" onclick="deletePayment('${p.id}')">${t('delete_payment')} 🗑️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('cancel')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function savePaymentEdit(pid) {
  const amount = parseFloat(document.getElementById('pay-amount').value);
  if (!amount || amount <= 0) return;
  const { error } = await sb.from('bill_payments').update({ amount }).eq('id', pid);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

async function deletePayment(pid) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('bill_payments').delete().eq('id', pid);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- detalhe da fatura ----
function renderBillDetail(id) {
  const b = BILLS_CACHE.find(x => x.id === id);
  if (!b) return;
  const perLbl = { monthly: t('monthly'), quarterly: t('per_quarterly'), halfyear: t('per_halfyear'), yearly: t('yearly'), once: t('per_once') };
  const rows = [
    [t('category'), b.category],
    [t('customer_ref_lbl'), b.customer_ref],
    [t('periodicity'), perLbl[b.periodicity || 'monthly']],
    [t('ref_lbl'), fmtMoney(b.reference_amount, b.currency)],
    [t('limit_lbl'), b.limit_amount ? fmtMoney(b.limit_amount, b.currency) : null],
    [t('next_due'), (() => { const nd = nextBillDue(b); return nd ? `${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)` : null; })()],
    [t('period_row'), b.period_start || b.period_end ? `${b.period_start ? fmtDate(b.period_start) : '…'} – ${b.period_end ? fmtDate(b.period_end) : '…'}` : null],
    [t('method'), b.payment_method],
    [t('bank'), b.bank],
    [t('card'), b.card_last4 ? '•••• ' + b.card_last4 : null],
    [t('country'), b.country ? `${flagEmoji(b.country)} ${b.country}` : null],
    [t('nif_lbl'), b.nif],
    [t('phone_lbl'), b.phone ? `<a href="tel:${b.phone}">${b.phone}</a>` : null],
    [t('email'), b.email ? `<a href="mailto:${b.email}">${b.email}</a>` : null],
    [t('notes_lbl'), b.notes],
    [t('status'), b.active ? t('active_lbl') : t('inactive_lbl')]
  ].filter(r => r[1]);

  const modal = document.createElement('div');
  modal.className = 'modal-bg';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <div class="sub-icon-wrap big">${subIcon(b)}</div>
        <div>
          <div class="modal-title">${b.name} ${flagEmoji(b.country)}</div>
          <div class="modal-sub">${fmtMoney(b.reference_amount, b.currency)}</div>
        </div>
      </div>
      ${rows.map(r => `<div class="detail-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}
      <button class="btn-secondary" style="margin-top:14px" onclick="toggleBillActive('${b.id}', ${!b.active})">${b.active ? t('deactivate') + ' ⏸' : t('activate') + ' ▶️'}</button>
      <div class="modal-btns">
        <button class="btn-primary" onclick="this.closest('.modal-bg').remove();renderBillForm('${b.id}')">${t('edit')} ✏️</button>
        <button class="btn-secondary" onclick="this.closest('.modal-bg').remove()">${t('close')}</button>
      </div>
    </div>`;
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
}

async function toggleBillActive(id, val) {
  const { error } = await sb.from('bills').update({ active: val }).eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}

// ---- formulário fatura ----
function renderBillForm(id) {
  const b = id ? BILLS_CACHE.find(x => x.id === id) : null;
  const isEdit = !!b;
  const cur = (b && b.currency) || 'CHF';
  const esc = v => (v || '').replace(/"/g, '&quot;');

  sectionShell(isEdit ? t('edit') : t('new'), `
    <div class="form">
      <button type="button" class="btn-secondary" onclick="document.getElementById('b-scan').click()">${t('scan_btn')}</button>
      <input id="b-scan" type="file" accept="image/*" capture="environment" style="display:none" onchange="scanBillPhoto(this)">
      <input id="b-name" type="text" placeholder="${t('bill_name_ph')}" value="${esc(b && b.name)}">
      <input id="b-website" type="text" placeholder="${t('website_ph')}" value="${esc(b && b.website)}">
      <input id="b-cat" type="text" placeholder="${t('category_ph')}" value="${esc(b && b.category)}">
      <div class="form-row">
        <input id="b-amount" type="number" step="0.01" inputmode="decimal" placeholder="${t('ref_amount_ph')}" value="${b ? b.reference_amount : ''}">
        <select id="b-cur">${CURRENCIES.map(c => `<option value="${c}"${c === cur ? ' selected' : ''}>${c}</option>`).join('')}</select>
      </div>
      <input id="b-limit" type="number" step="0.01" inputmode="decimal" placeholder="${t('limit_ph')}" value="${b && b.limit_amount ? b.limit_amount : ''}">
      <input id="b-ref" type="text" placeholder="${t('customer_ref_ph')}" value="${esc(b && b.customer_ref)}">
      <label class="lbl">${t('periodicity')}</label>
      <select id="b-per">
        <option value="monthly"${!b || b.periodicity === 'monthly' || !b.periodicity ? ' selected' : ''}>${t('monthly')}</option>
        <option value="quarterly"${b && b.periodicity === 'quarterly' ? ' selected' : ''}>${t('per_quarterly')}</option>
        <option value="halfyear"${b && b.periodicity === 'halfyear' ? ' selected' : ''}>${t('per_halfyear')}</option>
        <option value="yearly"${b && b.periodicity === 'yearly' ? ' selected' : ''}>${t('yearly')}</option>
        <option value="once"${b && b.periodicity === 'once' ? ' selected' : ''}>${t('per_once')}</option>
      </select>
      <label class="lbl">${t('next_due')}</label>
      <input id="b-date" type="date" value="${b && b.due_date ? b.due_date : ''}">
      <label class="lbl">${t('period_lbl')}</label>
      <div class="form-row">
        <input id="b-pstart" type="date" value="${b && b.period_start ? b.period_start : ''}">
        <input id="b-pend" type="date" value="${b && b.period_end ? b.period_end : ''}">
      </div>
      <div class="form-row">
        <select id="b-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${b && b.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="b-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${b && b.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="b-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(b && b.bank)}">
      <input id="b-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(b && b.card_last4)}">
      <input id="b-nif" type="text" placeholder="${t('nif_ph')}" value="${esc(b && b.nif)}">
      <input id="b-phone" type="tel" placeholder="${t('phone_ph')}" value="${esc(b && b.phone)}">
      <input id="b-email" type="email" placeholder="${t('email_ph')}" value="${esc(b && b.email)}">
      <input id="b-notes" type="text" placeholder="${t('notes_ph')}" value="${esc(b && b.notes)}">
      <div id="b-err"></div>
      <button class="btn-primary" onclick="saveBill(${isEdit ? `'${b.id}'` : 'null'})">${t('save')}</button>
      <button class="btn-secondary" onclick="renderBills()">${t('cancel')}</button>
      ${isEdit ? `<button class="btn-danger" onclick="deleteBill('${b.id}')">${t('delete')} 🗑️</button>` : ''}
    </div>
  `);
}

async function saveBill(id) {
  const g = i => document.getElementById(i);
  const name = g('b-name').value.trim();
  const amount = parseFloat(g('b-amount').value);
  const limit = parseFloat(g('b-limit').value);
  const ddate = g('b-date').value || null;
  const errEl = g('b-err');

  if (!name) { errEl.innerHTML = `<div class="err">${t('err_fill')}</div>`; return; }
  if (g('b-amount').value.trim() !== '' && (isNaN(amount) || amount < 0)) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('b-website').value.trim() || null,
    category: g('b-cat').value.trim() || null,
    reference_amount: isNaN(amount) ? 0 : amount,
    period_start: g('b-pstart').value || null,
    period_end: g('b-pend').value || null,
    limit_amount: limit > 0 ? limit : null,
    currency: g('b-cur').value,
    due_date: ddate,
    due_day: ddate ? parseInt(ddate.slice(8, 10), 10) : null,
    customer_ref: g('b-ref').value.trim() || null,
    periodicity: g('b-per').value,
    notes: g('b-notes').value.trim() || null,
    payment_method: g('b-method').value || null,
    country: g('b-country').value || null,
    bank: g('b-bank').value.trim() || null,
    card_last4: g('b-card').value.trim() || null,
    nif: g('b-nif').value.trim() || null,
    phone: g('b-phone').value.trim() || null,
    email: g('b-email').value.trim() || null
  };

  let error;
  if (id) ({ error } = await sb.from('bills').update(row).eq('id', id));
  else ({ error } = await sb.from('bills').insert(row));
  if (error) { console.error(error); errEl.innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }
  renderBills();
}

async function deleteBill(id) {
  if (!confirm(t('delete_confirm'))) return;
  const { error } = await sb.from('bills').delete().eq('id', id);
  if (error) { console.error(error); alert(t('err_generic')); return; }
  document.querySelectorAll('.modal-bg').forEach(m => m.remove());
  renderBills();
}


// ===== 06-settings.js =====
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
  const adminMenuBtn = p.is_admin ? `
    <div style="position:relative">
      <button class="icon-btn" onclick="toggleAdminMenu()" id="admin-menu-btn">⋮</button>
      <div id="admin-menu" style="display:none;position:absolute;right:0;top:44px;background:var(--card);border-radius:12px;padding:8px;box-shadow:0 4px 20px rgba(0,0,0,.3);min-width:160px;z-index:100">
        <button class="btn-secondary" style="width:100%;text-align:left;margin:0" onclick="renderAdminSupport()">📊 Painel Admin</button>
      </div>
    </div>` : '';
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
      <button class="btn-secondary" onclick="doLogout()">${t('logout')}</button>
    </div>
  `, adminMenuBtn);
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

function toggleAdminMenu() {
  const m = document.getElementById('admin-menu');
  if (!m) return;
  m.style.display = m.style.display === 'none' ? 'block' : 'none';
  if (m.style.display === 'block') {
    setTimeout(() => document.addEventListener('click', function close(e) {
      if (!e.target.closest('#admin-menu') && e.target.id !== 'admin-menu-btn') {
        m.style.display = 'none';
        document.removeEventListener('click', close);
      }
    }), 0);
  }
}


// ===== 07-push.js =====
// Push notifications — subscrição do dispositivo
const VAPID_PUBLIC = 'BA2j4REGfVURlASSywNEFnaiXS3Q2ZYZ56__ap0YMQKJI0q9LTBHHQ8dtPVTZ80S9tuNvbyS8pF7Lx2LooTUcIU';

function urlB64ToUint8(base64) {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

async function registerSW() {
  if (!('serviceWorker' in navigator)) return null;
  return navigator.serviceWorker.register('sw.js');
}

async function pushIsEnabled() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return false;
  const sub = await reg.pushManager.getSubscription();
  return !!sub;
}

async function enablePush() {
  try {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { showToast(t('push_denied')); return false; }
    const reg = await registerSW();
    await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8(VAPID_PUBLIC)
    });
    const { data: { user } } = await sb.auth.getUser();
    await sb.from('push_subscriptions').insert({ user_id: user.id, subscription: sub.toJSON() });
    showToast(t('push_on'));
    return true;
  } catch (e) { console.error(e); showToast(t('err_generic')); return false; }
}

async function disablePush() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = reg && await reg.pushManager.getSubscription();
    if (sub) {
      const json = sub.toJSON();
      await sub.unsubscribe();
      await sb.from('push_subscriptions').delete().eq('subscription->>endpoint', json.endpoint);
    }
    showToast(t('push_off'));
    return true;
  } catch (e) { console.error(e); return false; }
}

async function togglePush(btn) {
  const on = await pushIsEnabled();
  const ok = on ? await disablePush() : await enablePush();
  if (ok) renderSettings();
}


// ===== 08-weather.js =====
// Meteo — Open-Meteo com localização do aparelho ou cidade escolhida
let WEATHER_CACHE = null;
let WEATHER_TS = 0;
let WEATHER_PLACE = '';

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
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset,uv_index_max` +
      `&timezone=auto&forecast_days=7`;
    const res = await fetch(url);
    const data = await res.json();
    WEATHER_CACHE = data; WEATHER_TS = Date.now();
    renderWeather(data);
  } catch (e) { console.error(e); }
}

function renderWeather(d) {
  const box = document.getElementById('weather-box');
  if (!box || !d || !d.current) return;
  const wd = t('weekdays_short');
  const days = (d.daily && d.daily.time ? d.daily.time : []).map((iso, i) => {
    const date = new Date(iso + 'T00:00:00');
    return `<button class="wday" onclick="showDayDetail(${i})">
      <span class="wday-name">${i === 0 ? t('weather_today') : wd[date.getDay()]}</span>
      <span class="wday-icon">${WMO_EMOJI(d.daily.weather_code[i])}</span>
      <span class="wday-max">${Math.round(d.daily.temperature_2m_max[i])}°</span>
      <span class="wday-min">${Math.round(d.daily.temperature_2m_min[i])}°</span>
    </button>`;
  }).join('');

  box.innerHTML = `
    <button class="weather-place" onclick="openCityPicker()">📍 ${WEATHER_PLACE || t('w_pick_city')} ▾</button>
    <div class="weather-now">
      <span class="wnow-icon">${WMO_EMOJI(d.current.weather_code)}</span>
      <span class="wnow-temp">${Math.round(d.current.temperature_2m)}°C</span>
    </div>
    <div class="weather-week">${days}</div>`;
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


// ===== 09-support.js =====
// Suporte: chat com IA + painel admin
const SUPPORT_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co/functions/v1/aboklar-chat';
let CHAT_HISTORY = [];
let CHAT_SESSION = null;

function getChatSession() {
  if (!CHAT_SESSION) CHAT_SESSION = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
  return CHAT_SESSION;
}

async function renderSupportChat() {
  sectionShell(t('help_chat_title'), `
    <div class="chat-hint">${t('help_chat_hint')}</div>
    <div id="chat-msgs" class="chat-msgs"></div>
    <div class="chat-input-row">
      <input id="chat-in" type="text" placeholder="${t('help_chat_ph')}" onkeydown="if(event.key==='Enter')sendChatMsg()">
      <button class="btn-primary chat-send" onclick="sendChatMsg()">${t('help_chat_send')}</button>
    </div>
  `);
  renderChatMsgs();
}

function renderChatMsgs() {
  const box = document.getElementById('chat-msgs');
  if (!box) return;
  box.innerHTML = CHAT_HISTORY.map(m => `
    <div class="chat-bubble ${m.role}">
      <span>${m.content.replace(/\n/g, '<br>')}</span>
    </div>`).join('');
  box.scrollTop = box.scrollHeight;
}

async function sendChatMsg() {
  const inp = document.getElementById('chat-in');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  inp.disabled = true;

  CHAT_HISTORY.push({ role: 'user', content: msg });
  CHAT_HISTORY.push({ role: 'assistant', content: t('help_chat_thinking') });
  renderChatMsgs();

  try {
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(SUPPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session ? session.access_token : ''}`,
        'x-cron-secret': 'aboklar-cron-7k2m9x4p'
      },
      body: JSON.stringify({
        message: msg,
        history: CHAT_HISTORY.slice(0, -1).filter(m => m.content !== t('help_chat_thinking')),
        session_id: getChatSession(),
        lang: LANG
      })
    });
    const d = await res.json();
    CHAT_HISTORY[CHAT_HISTORY.length - 1].content = d.reply || t('err_generic');
  } catch (e) {
    CHAT_HISTORY[CHAT_HISTORY.length - 1].content = t('err_generic');
  }
  renderChatMsgs();
  if (inp) inp.disabled = false;
}

// ---- painel admin (só para is_admin) ----
let ADMIN_FILTER = 'unread';
let ADMIN_TAB = 'chats';

async function renderAdminSupport() {
  sectionShell(t('admin_support'), `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${ADMIN_TAB === 'stats' ? ' on' : ''}" onclick="setAdminTab('stats')">📊 Stats</button>
      <button class="seg-btn${ADMIN_TAB === 'chats' ? ' on' : ''}" onclick="setAdminTab('chats')">${t('admin_support')}</button>
    </div>
    <div id="admin-content"><p class="muted">A carregar…</p></div>
  `);
  if (ADMIN_TAB === 'stats') loadAdminStats();
  else renderAdminChatsPanel();
}

function setAdminTab(tab) { ADMIN_TAB = tab; renderAdminSupport(); }

async function loadAdminStats() {
  const box = document.getElementById('admin-content');
  if (!box) return;
  box.innerHTML = `<p class="muted">A carregar estatísticas…</p>`;
  const [statsRes, usersRes] = await Promise.all([
    sb.rpc('get_admin_stats'),
    sb.rpc('get_user_list')
  ]);
  if (statsRes.error || !statsRes.data) {
    box.innerHTML = `<p class="muted" style="color:var(--err)">Erro: ${statsRes.error?.message || 'sem dados'}</p>`;
    return;
  }
  const s = { ...statsRes.data, users: usersRes.data || [] };
  const badge = (icon, val, label) => `
    <div style="display:flex;align-items:center;gap:6px;background:var(--bg);border-radius:8px;padding:7px 10px">
      <span style="font-size:1rem">${icon}</span>
      <div>
        <div style="font-weight:700;font-size:.95rem;line-height:1.2">${val}</div>
        <div style="font-size:.68rem;color:var(--muted)">${label}</div>
      </div>
    </div>`;
  const userCard = u => `
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)">
        <div style="width:38px;height:38px;border-radius:50%;background:var(--acc);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;color:#000;flex-shrink:0">${(u.display_name || '?')[0].toUpperCase()}</div>
        <div style="min-width:0">
          <div style="font-weight:600;font-size:.95rem">${u.display_name || '—'}</div>
          <div style="font-size:.78rem;color:var(--acc);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.email || '—'}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${badge('📅', u.created_at ? new Date(u.created_at).toLocaleDateString('pt-PT') : '—', 'Registo')}
        ${badge('🌐', (u.language || '?').toUpperCase() + ' · ' + (u.currency || '?'), 'Idioma · Moeda')}
        ${badge('📋', u.sub_count || 0, 'Subscrições')}
        ${badge('🧾', u.bill_count || 0, 'Faturas')}
      </div>
    </div>`;
  const statBlock = (icon, val, label) => `
    <div style="text-align:center;padding:12px 8px">
      <div style="font-size:1.5rem;font-weight:700;color:var(--acc);line-height:1">${val}</div>
      <div style="font-size:.65rem;color:var(--muted);margin-top:4px">${icon} ${label}</div>
    </div>`;
  box.innerHTML = `
    <div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:10px">Utilizadores</div>
    ${s.users && s.users.length ? s.users.map(userCard).join('') : '<p class="muted">—</p>'}
    <div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:16px 0 10px">Totais</div>
    <div class="card" style="display:grid;grid-template-columns:repeat(3,1fr);margin-bottom:8px;border-radius:14px;overflow:hidden">
      ${statBlock('👤', s.total_users, 'Utilizadores')}
      ${statBlock('📋', s.total_subs, 'Subscrições')}
      ${statBlock('🧾', s.total_bills, 'Faturas')}
    </div>
    <div class="card" style="display:grid;grid-template-columns:1fr 1fr;border-radius:14px;overflow:hidden">
      ${statBlock('🆕', s.new_7d, 'Novos 7 dias')}
      ${statBlock('📅', s.new_30d, 'Novos 30 dias')}
    </div>
  `;
}

function renderAdminChatsPanel() {
  const box = document.getElementById('admin-content');
  if (!box) return;
  box.innerHTML = `
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn${ADMIN_FILTER === 'unread' ? ' on' : ''}" onclick="setAdminFilter('unread')">${t('admin_unread')}</button>
      <button class="seg-btn${ADMIN_FILTER === 'all' ? ' on' : ''}" onclick="setAdminFilter('all')">${t('admin_all')}</button>
    </div>
    <div id="admin-chats"><p class="muted">A carregar…</p></div>
  `;
  loadAdminChats();
}

function setAdminFilter(f) { ADMIN_FILTER = f; renderAdminChatsPanel(); }

async function loadAdminChats() {
  const { data: { session } } = await sb.auth.getSession();
  const res = await fetch(`${SUPPORT_URL}?admin=1&filter=${ADMIN_FILTER}`, {
    headers: {
      'Authorization': `Bearer ${session ? session.access_token : ''}`,
      'x-cron-secret': 'aboklar-cron-7k2m9x4p'
    }
  });
  const d = await res.json();
  const box = document.getElementById('admin-chats');
  if (!box) return;
  const sessions = d.sessions || [];
  if (!sessions.length) { box.innerHTML = `<p class="muted">—</p>`; return; }
  box.innerHTML = sessions.map(sess => `
    <div class="admin-sess" id="sess-${sess.session_id}">
      <div class="admin-sess-head">
        <span class="row-name">${sess.display_name || sess.user_email || '?'}${!sess.admin_read ? ' 🔴' : ''}</span>
        <span class="row-cat">${fmtDate(sess.last_at)}</span>
      </div>
      <div class="admin-msgs">${sess.messages.map(m =>
        `<div class="chat-bubble ${m.role}">${m.content.replace(/\n/g, '<br>')}</div>`
      ).join('')}</div>
      ${!sess.admin_read ? `<button class="btn-secondary" style="margin-top:8px" onclick="markRead('${sess.session_id}')">${t('mark_read')}</button>` : ''}
    </div>
  `).join('');
}

async function markRead(session_id) {
  const { data: { session } } = await sb.auth.getSession();
  await fetch(`${SUPPORT_URL}?mark_read=${session_id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session ? session.access_token : ''}`,
      'x-cron-secret': 'aboklar-cron-7k2m9x4p'
    }
  });
  loadAdminChats();
}

