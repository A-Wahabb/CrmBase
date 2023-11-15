const companyItTrans = (company_singular, company_plural) => {

    const companyIt = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `Aggiungi ${company_singular}`,
        'company_edit_btn': `Modifica ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `Dettagli ${company_singular}`,
        'setup_new_company': `Configura nuovo ${company_singular}`,
        'add_company_modal_title': 'Fornisci i dettagli per iniziare',
        'Hours': 'Ore',
        'archive_company_btn': `Archivia ${company_plural}`,
        'active_company_btn': `Attiva ${company_plural}`,
        'switch_company': `Passa a ${company_singular}`,
        'switched_company': `Già passato`,
        'created_date': `Data di creazione`,



        //messages
        'msg_company_added_successfully': `${company_singular} aggiunto con successo`,
        'msg_company_updated_successfully': `${company_singular} aggiornato con successo`,
        'msg_file_size_exceed': 'Sono consentiti solo file di dimensioni inferiori a 2 MB',
        'msg_sure_to_active_this_company': `Sei sicuro di voler attivare questo ${company_singular}?`,
        'msg_sure_to_archive_this_company': `Sei sicuro di voler archiviare questo ${company_singular}?`,
        'msg_company_activated': `${company_singular} attivato con successo`,
        'msg_company_archived': `${company_singular} archiviato con successo`,

        //label
        'label_searh_company': `Cerca per nome`,
        'label_company_name': `Nome ${company_singular}`,
        'label_upload': 'Carica',
        'label_reset': 'Reset',
        'label_country': 'Paese',
        'label_date_format': 'Formato data',
        'label_time_format': 'Formato ora',
        'label_description': 'Descrizione',
        'label_back_to_general': 'Torna a Generale',


        //placeholder
        'placeholder_company_name': `Inserisci il nome ${company_singular}`,
        'placeholder_search_country': 'Cerca paese',
        'placeholder_date_format': 'Seleziona formato data',
        'placeholder_time_format': 'Seleziona formato ora',
        'placeholder_description': 'Fornisci una descrizione',


        //validations
        'invalid_company_name': `Inserisci il nome ${company_singular}`,
        'invalid_date_format': 'Seleziona un formato data',
        'invalid_time_format': 'Seleziona un formato ora',
        'invalid_description': 'Fornisci una descrizione valida',
    };
    return companyIt
}

export default companyItTrans