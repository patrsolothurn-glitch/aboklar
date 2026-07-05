// AboKlar — build 21 — 2026-07-05T11:20:13.914Z

// ===== 00-config.js =====
// Config Supabase (anon key é pública por design; segurança vem do RLS)
const SUPA_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bXVjaHp0cWlnbGJtZ3N3ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTM1MDIsImV4cCI6MjA5ODc2OTUwMn0.98Hq3MmpepzCpjE0lDcV-caT5r6xyANmjpU_aEckeVE';
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);


// ===== 01-i18n.js =====
// i18n — PT · DE · FR · IT · EN
const I18N = {
  pt: {
    tagline: 'Subscrições e faturas, claro.',
    weekdays_short: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    weather_today: 'Hoje',
    weather_enable: '📍 Mostrar o tempo (usa a localização)',
    next_due: 'Próximo vencimento',
    customer_ref_ph: 'Nº de cliente/contrato (opcional)',
    periodicity: 'Periodicidade',
    per_quarterly: 'Trimestral',
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
    weekdays_short: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    weather_today: 'Heute',
    weather_enable: '📍 Wetter anzeigen (nutzt den Standort)',
    next_due: 'Nächste Fälligkeit',
    customer_ref_ph: 'Kunden-/Vertragsnummer (optional)',
    periodicity: 'Periodizität',
    per_quarterly: 'Vierteljährlich',
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
    weekdays_short: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    weather_today: "Aujourd'hui",
    weather_enable: '📍 Afficher la météo (utilise la position)',
    next_due: 'Prochaine échéance',
    customer_ref_ph: 'Nº client/contrat (optionnel)',
    periodicity: 'Périodicité',
    per_quarterly: 'Trimestriel',
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
    weekdays_short: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
    weather_today: 'Oggi',
    weather_enable: '📍 Mostra il meteo (usa la posizione)',
    next_due: 'Prossima scadenza',
    customer_ref_ph: 'Nº cliente/contratto (opzionale)',
    periodicity: 'Periodicità',
    per_quarterly: 'Trimestrale',
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
    weekdays_short: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    weather_today: 'Today',
    weather_enable: '📍 Show weather (uses location)',
    next_due: 'Next due date',
    customer_ref_ph: 'Customer/contract no. (optional)',
    periodicity: 'Frequency',
    per_quarterly: 'Quarterly',
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
      emailRedirectTo: 'https://patrsolothurn-glitch.github.io/aboklar/'
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
    redirectTo: 'https://patrsolothurn-glitch.github.io/aboklar/'
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
  const name = (user.user_metadata && user.user_metadata.display_name) || user.email;
  $app().innerHTML = `
    <div class="page home-page">
      <div class="home-logo-block">
        <img src="assets/icon-512.png" alt="AboKlar" class="home-logo">
        <h1 class="brand home-brand">Abo<span class="klar">Klar</span></h1>
      </div>
      <p class="greet greet-center">${t('welcome')}, ${name} 👋</p>
      <div class="home-grid">
        <button class="home-card card-subs" onclick="renderSubs()">
          <span class="home-emoji">📋</span>
          <span class="home-title">${t('subs')}</span>
          <span class="home-hint">${t('subs_hint')}</span>
        </button>
        <button class="home-card card-bills" onclick="renderBills()">
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

function sectionShell(title, inner) {
  $app().innerHTML = `
    <div class="page">
      <header class="topbar">
        <button class="icon-btn" onclick="boot()">←</button>
        <span class="topbar-name">${title}</span>
        <span style="width:40px"></span>
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
async function boot() {
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    await loadProfile();
    renderHome(session.user);
  } else renderAuth('login');
}
document.addEventListener('DOMContentLoaded', () => {
  boot();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});


// ===== 04-subs.js =====
// Subscrições — CRUD + detalhe + estado + ordenação
const CURRENCIES = ['CHF', 'EUR', 'USD', 'GBP'];
const PAY_METHODS = ['Débito', 'Cartão', 'Twint', 'Apple Pay', 'Google Pay', 'PayPal', 'Transferência', 'Outro'];
const COUNTRIES = ['CH', 'PT', 'DE', 'FR', 'IT', 'AT', 'ES', 'NL', 'BE', 'GB', 'US'];
let SUBS_CACHE = [];
let SUBS_SORT = 'date';

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

function subsTotals(subs) {
  const byCur = {};
  for (const s of subs) {
    if (!s.active) continue;
    const cur = s.currency || 'CHF';
    if (!byCur[cur]) byCur[cur] = { monthly: 0, yearly: 0 };
    const amt = Number(s.amount) || 0;
    if (s.billing_cycle === 'yearly') { byCur[cur].yearly += amt; byCur[cur].monthly += amt / 12; }
    else { byCur[cur].monthly += amt; byCur[cur].yearly += amt * 12; }
  }
  return byCur;
}

function setSubsSort(mode) { SUBS_SORT = mode; renderSubs(); }

async function renderSubs() {
  const subs = await loadSubs();
  const totals = subsTotals(subs);

  const sorted = [...subs].sort((a, b) => {
    if (SUBS_SORT === 'name') return a.name.localeCompare(b.name);
    const ra = nextRenewal(a), rb = nextRenewal(b);
    if (!ra && !rb) return a.name.localeCompare(b.name);
    if (!ra) return 1; if (!rb) return -1;
    return ra.days - rb.days;
  });

  const totalCards = Object.keys(totals).length
    ? `<div class="totals-row">
        <div class="total-card"><span class="total-label">${t('total_monthly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.monthly, c)}</span>`).join('')}</div>
        <div class="total-card"><span class="total-label">${t('total_yearly')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v.yearly, c)}</span>`).join('')}</div>
      </div>` : '';

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
let PAYMENTS_CACHE = [];
let BILLS_TAB = 'bills'; // 'bills' | 'archive'
let ARCH_PERIOD = null;  // 'YYYY-MM'
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

function setBillsTab(tab) { BILLS_TAB = tab; renderBills(); }
function shiftArch(delta) { ARCH_PERIOD = shiftPeriod(ARCH_PERIOD, delta); renderBills(); }

async function renderBills() {
  if (!ARCH_PERIOD) ARCH_PERIOD = curPeriod();
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

    const list = BILLS_CACHE.length
      ? BILLS_CACHE.map(b => {
          const pay = paidBy[b.id];
          const meta2 = [b.payment_method, b.bank, b.card_last4 ? '••••' + b.card_last4 : null].filter(Boolean).join(' · ');
          return `
        <div class="row-card sub-row${b.active ? '' : ' off'}" onclick="renderBillDetail('${b.id}')">
          <div class="sub-icon-wrap">${subIcon(b)}</div>
          <div class="row-main">
            <span class="row-name"><span class="dot ${b.active ? 'dot-on' : 'dot-off'}"></span>${b.name} ${flagEmoji(b.country)}</span>
            <span class="row-cat">${[b.category, b.periodicity && b.periodicity !== 'monthly' ? ({quarterly:t('per_quarterly'),halfyear:t('per_halfyear'),yearly:t('yearly')})[b.periodicity] : null].filter(Boolean).join(' · ')}</span>
            ${(() => { const nd = nextBillDue(b); return nd ? `<span class="row-cat">${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)</span>` : ''; })()}
            ${meta2 ? `<span class="row-cat">${meta2}</span>` : ''}
          </div>
          <div class="row-side">
            <span class="row-amount">${fmtMoney(pay ? pay.amount : b.reference_amount, b.currency)}</span>
            ${pay
              ? `<span class="paid-badge">✓ ${t('paid_badge')}</span>`
              : (b.active ? `<button class="btn-paid" onclick="event.stopPropagation();openPaidModal('${b.id}')">${t('mark_paid')}</button>` : '')}
          </div>
        </div>`;
        }).join('')
      : `<p class="muted" style="margin-top:30px">${t('no_bills')}</p>`;

    sectionShell(t('bills'), `
      ${tabs}
      <button class="btn-primary" style="width:100%;margin-bottom:14px" onclick="renderBillForm()">${t('new')}</button>
      <div class="rows">${list}</div>
    `);
  } else {
    const pays = await loadPayments(ARCH_PERIOD);
    const billById = {};
    for (const b of BILLS_CACHE) billById[b.id] = b;

    const totals = {};
    for (const p of pays) {
      const b = billById[p.bill_id];
      const cur = (b && b.currency) || 'CHF';
      totals[cur] = (totals[cur] || 0) + Number(p.amount);
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
        <button class="icon-btn" onclick="shiftArch(-1)">‹</button>
        <span class="arch-title">${periodLabel(ARCH_PERIOD)}</span>
        <button class="icon-btn" onclick="shiftArch(1)">›</button>
      </div>
      ${Object.keys(totals).length ? `
        <div class="total-card" style="margin-bottom:14px">
          <span class="total-label">${t('month_total')}</span>
          ${Object.entries(totals).map(([c, v]) => `<span class="total-val">${fmtMoney(v, c)}</span>`).join('')}
        </div>` : ''}
      <div class="rows">${list}</div>
    `);
    setupLongPress();
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
  const perLbl = { monthly: t('monthly'), quarterly: t('per_quarterly'), halfyear: t('per_halfyear'), yearly: t('yearly') };
  const rows = [
    [t('category'), b.category],
    [t('customer_ref_lbl'), b.customer_ref],
    [t('periodicity'), perLbl[b.periodicity || 'monthly']],
    [t('ref_lbl'), fmtMoney(b.reference_amount, b.currency)],
    [t('limit_lbl'), b.limit_amount ? fmtMoney(b.limit_amount, b.currency) : null],
    [t('next_due'), (() => { const nd = nextBillDue(b); return nd ? `${fmtDate(nd.date)} (${t('in_days')} ${nd.days}d)` : null; })()],
    [t('method'), b.payment_method],
    [t('bank'), b.bank],
    [t('card'), b.card_last4 ? '•••• ' + b.card_last4 : null],
    [t('country'), b.country ? `${flagEmoji(b.country)} ${b.country}` : null],
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
      </select>
      <label class="lbl">${t('next_due')}</label>
      <input id="b-date" type="date" value="${b && b.due_date ? b.due_date : ''}">
      <div class="form-row">
        <select id="b-method"><option value="">${t('method')}…</option>${PAY_METHODS.map(m => `<option value="${m}"${b && b.payment_method === m ? ' selected' : ''}>${m}</option>`).join('')}</select>
        <select id="b-country"><option value="">${t('country')}…</option>${COUNTRIES.map(c => `<option value="${c}"${b && b.country === c ? ' selected' : ''}>${flagEmoji(c)} ${c}</option>`).join('')}</select>
      </div>
      <input id="b-bank" type="text" placeholder="${t('bank_ph')}" value="${esc(b && b.bank)}">
      <input id="b-card" type="text" inputmode="numeric" maxlength="4" placeholder="${t('card_ph')}" value="${esc(b && b.card_last4)}">
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
  if (!amount || amount <= 0) { errEl.innerHTML = `<div class="err">${t('err_amount')}</div>`; return; }

  const { data: { user } } = await sb.auth.getUser();
  const row = {
    user_id: user.id, name,
    website: g('b-website').value.trim() || null,
    category: g('b-cat').value.trim() || null,
    reference_amount: amount,
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
    card_last4: g('b-card').value.trim() || null
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
  sectionShell(t('settings'), `
    <div class="form">
      <label class="lbl">${t('set_name')}</label>
      <input id="set-name" type="text" value="${(p.display_name || '').replace(/"/g, '&quot;')}">

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
  const language = document.getElementById('set-lang').value;
  const currency = document.getElementById('set-cur').value;
  const theme = document.getElementById('set-theme').value;

  const { error } = await sb.from('profiles')
    .update({ display_name, language, currency, theme }).eq('id', user.id);
  if (error) { console.error(error); document.getElementById('set-msg').innerHTML = `<div class="err">${t('err_generic')}</div>`; return; }

  // atualizar também os metadados de auth (para o "Olá, X")
  await sb.auth.updateUser({ data: { display_name } });

  PROFILE = { ...PROFILE, display_name, language, currency, theme };
  if (I18N[language]) LANG = language;
  applyTheme(theme);
  document.getElementById('set-msg').innerHTML = `<div class="ok">${t('saved')}</div>`;
  setTimeout(renderSettings, 700);
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

