import companyIt from "./company/it"
import moduleIt from "./module/it"
import designationIt from "./Designation/it"
import userRoleIt from "./UserRole/it"
import userIt from "./User/it"
import emailTempIt from "./EmailTemplate/it"
import { moduleIds } from "../Components/constants/modulesIds"


const globalTrans = {
    'btn_submit': 'Invia',
    'btn_archive': 'Sì, archivia',
    'btn_activate': 'Sì, attiva',
    'btn_close': 'Chiudi',
    'btn_update_details': 'Aggiorna dettagli',
    'msg_well_done': 'Ben fatto!',
    'msg_no_data_available': 'Nessun dato disponibile',
    'msg_no_data_matched': 'Nessun dato corrispondente',
    'are_you_sure': 'Sei sicuro?',
    'view': 'Visualizza',
    'edit': 'Modifica',
    'add': 'Aggiungi',
    'set_as_default': 'Imposta come predefinito',
    'archive': 'Archivia',
    're_activate': 'Riattiva',
    'search': 'Cerca',
    'reset': 'Resetta',
    'filter': 'Filtra',
    'url': 'URL',
    'icon': 'Icona',
    'slug': 'Slug',
    'sort_order': 'Ordine di ordinamento',
    'feature': 'Funzionalità',
    'created_at': 'Creato il',
    'updated_at': 'Aggiornato il',
    'action': 'Azione',
    'default': 'Predefinito',
    'save': 'Salva',
    'close': 'Chiudi',
    'next': 'Avanti',
    'permission': 'Permesso',
    'access_denied': 'Accesso negato. Contatta l\'amministratore della tua azienda',
    'go_to_dashboard': 'Vai alla dashboard',
    'title': 'Titolo',
    'profile': 'Profilo',
    'display_name': 'Nome visualizzato',
    'full_name': 'Nome completo',
    'event': 'Evento',
    'subject': 'Soggetto',

    'customizer': 'Personalizzatore',
    'layout': 'Layout',
    'choose_layout': 'Scegli il tuo layout',
    'vertical': 'Verticale',
    'horizontal': 'Orizzontale',
    'two_column': 'Due colonne',
    'semi_box': 'Semi-box',
    'color_scheme': 'Schema di colori',
    'choose_color_scheme': 'Scegli uno schema di colori chiaro o scuro',
    'light': 'Chiaro',
    'dark': 'Scuro',
    'sidebar_visibility': 'Visibilità della barra laterale',
    'choose_sidebar_visibility': 'Scegli se la barra laterale deve essere visualizzata o nascosta',
    'show': 'Mostra',
    'hidden': 'Nascosto',
    'layout_width': 'Larghezza del layout',
    'choose_layout_width': 'Scegli un layout fluido o fisso',
    'fluid': 'Fluido',
    'boxed': 'Fisso',
    'layout_position': 'Posizione del layout',
    'choose_layout_position': 'Scegli se il layout deve essere fisso o scrollabile',
    'fixed': 'Fisso',
    'scrollable': 'Scrollabile',
    'top_color': 'Colore superiore',
    'choose_top_color': 'Scegli un colore chiaro o scuro per la parte superiore',
    'sidebar_size': 'Dimensione della barra laterale',
    'choose_sidebar_size': 'Scegli la dimensione della barra laterale',
    'compact': 'Compatto',
    'icon_view': 'Vista icona (dimensione piccola)',
    'hover_view': 'Vista al passaggio del mouse (dimensione piccola)',
    'sidebar_view': 'Vista della barra laterale',
    'choose_sidebar_view': 'Scegli la vista predefinita o indipendente della barra laterale',
    'detach': 'Sgancia',
    'sidebar_color': 'Colore della barra laterale',
    'choose_sidebar_color': 'Scegli un colore chiaro o scuro per la barra laterale',
    'gradient': 'Gradiente',
    'sidebar_imgs': 'Immagini della barra laterale',
    'choose_sidebar_imgs': 'Scegli un\'immagine per la barra laterale',
    'preloader': 'Preloader',
    'choose_preloader': 'Scegli un preloader',
    'enable': 'Abilita',
    'disable': 'Disabilita',

    // Validazione
    'mandatory_feild': 'Questo campo è obbligatorio',
    'min_8_required': 'Sono richiesti almeno 8 caratteri',
    'pattren_mismatch': 'L\'input non corrisponde al pattern',
};


const getItTrans = (translations) => {

    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-it`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-it`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-it`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-it`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-it`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-it`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-it`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-it`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-it`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-it`] : '';
    return {
        ...companyIt(company_singular, company_plural),
        ...moduleIt(module_singular, module_plural),
        ...designationIt(designation_singular, designation_plural),
        ...userRoleIt(user_role_singular, user_role_plural),
        ...userIt(user_singular, user_plural),
        ...emailTempIt(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getItTrans