const userItTrans = (user_singular, user_plural) => {

    const userIt = {
        'user_singular': 'utente',
        'user_plural': 'utenti',
        'all_users': 'Tutti gli utenti',
        'user_add_btn': `Aggiungi ${user_singular}`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `Modifica ${user_singular}`,
        'user_view_btn': `Visualizza ${user_singular}`,
        'archive_user_btn': `Archivia ${user_plural}`,
        'active_user_btn': `Attiva ${user_plural}`,

        'btn_step': 'Passo',
        'btn_general_info': 'Informazioni generali',
        'btn_fill_all_information_below': 'Compila tutte le informazioni qui sotto',
        'btn_additional_info': 'Informazioni aggiuntive',
        'btn_set_password': 'Imposta password',
        'btn_save_next': 'Salva e successivo',

        //messages
        'msg_user_added_successfully': `${user_singular} aggiunto con successo`,
        'msg_user_updated_successfully': `${user_singular} aggiornato con successo`,
        'msg_file_size_exceed': 'La dimensione del file non deve superare i 2 MB',
        'msg_sure_to_active_this_user': `Sei sicuro di voler attivare questo ${user_singular}`,
        'msg_sure_to_archive_this_user': `Sei sicuro di voler archiviare questo ${user_singular}`,
        'msg_user_activated': `${user_singular} attivato con successo`,
        'msg_user_archived': `${user_singular} archiviato con successo`,

        //label
        'label_user_first_name': `Inserisci il nome di ${user_singular}`,
        'label_user_last_name': `Inserisci il cognome di ${user_singular}`,
        'label_user_email': `Inserisci l'email di ${user_singular}`,
        'label_user_phone': `Inserisci il numero di telefono di ${user_singular}`,
        'label_set_password': 'Imposta password',
        'label_password': 'Password',
        'label_cnfrm_password': 'Conferma password',
        'label_male': 'Maschio',
        'label_female': 'Femmina',
        'label_other': 'Altro',
        'label_state': 'Stato',
        'label_city': 'Città',
        'label_gender': 'Genere',
        'label_variables': 'Variabili',

        //placeholder
        'placeholder_first_name': `Nome`,
        'placeholder_middle_name': `Secondo nome`,
        'placeholder_last_name': `Cognome`,
        'placeholder_display_name': `Nome visualizzato`,
        'placeholder_email': `Email`,
        'placeholder_phone': `Numero di telefono`,
        'placeholder_dob': `Data di nascita`,
        'placeholder_gender': `Seleziona genere`,
        'placeholder_search_state': `Cerca stato`,
        'placeholder_search_city': `Cerca città`,
        'placeholder_street_address': `Indirizzo`,
        'placeholder_post_code': `Codice postale`,
        'placeholder_emergency_contact_name': `Nome contatto di emergenza`,
        'placeholder_emergency_contact_phone': `Numero contatto di emergenza`,
        'placeholder_emergency_contact_relation': `Relazione con il contatto di emergenza`,

        //validations
        'invalid_user_first_name': `Inserisci il nome di ${user_singular}`,
        'invalid_user_last_name': `Inserisci il cognome di ${user_singular}`,
        'invalid_email': `Inserisci l'email di ${user_singular}`,
        'invalid_phone': `Inserisci il numero di telefono di ${user_singular}`,
        'invalid_password': `Imposta la password di ${user_singular}`,
        'invalid_dob': `Inserisci una data di nascita valida`,
        'invalid_gender': 'Genere non selezionato',
        'paswword_does_not_match': 'La password non corrisponde',
        'invalid_cnfrm_password': 'Conferma la password',
        'invalid_state': 'Seleziona uno stato',
        'invalid_city': 'Seleziona una città',
        'invalid_street_address': 'Fornisci un indirizzo',
        'invalid_post_code': 'Fornisci un codice postale',
        'invalid_emergency_contact_name': 'Fornisci il nome del contatto di emergenza',
        'invalid_emergency_contact_phone': 'Fornisci il numero del contatto di emergenza',
        'invalid_emergency_contact_relation': 'Fornisci la relazione del contatto di emergenza',
    };

    return userIt
}
export default userItTrans 