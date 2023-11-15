const companyDeTrans = (company_singular, company_plural) => {

    const companyDe = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `Toevoegen ${company_singular}`,
        'company_edit_btn': `Bewerken ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `${company_singular} details`,
        'setup_new_company': `Nieuwe ${company_singular} opzetten`,
        'add_company_modal_title': 'Vul de gegevens in om te beginnen',
        'Hours': 'Uren',
        'archive_company_btn': `Archiveren ${company_plural}`,
        'active_company_btn': `Activeren ${company_plural}`,
        'switch_company': `Wissel ${company_singular}`,
        'switched_company': `Al gewisseld`,
        'created_date': `Aanmaakdatum`,



        //messages
        'msg_company_added_successfully': `Je ${company_singular} is succesvol toegevoegd`,
        'msg_company_updated_successfully': `Je ${company_singular} is succesvol bijgewerkt`,
        'msg_file_size_exceed': 'Alleen bestanden kleiner dan 2 MB zijn toegestaan',
        'msg_sure_to_active_this_company': `Weet je zeker dat je deze ${company_singular} wilt activeren`,
        'msg_sure_to_archive_this_company': `Weet je zeker dat je deze ${company_singular} wilt archiveren`,
        'msg_company_activated': `${company_singular} succesvol geactiveerd`,
        'msg_company_archived': `${company_singular} succesvol gearchiveerd`,

        //label
        'label_searh_company': `Zoeken op naam`,
        'label_company_name': `${company_singular} naam`,
        'label_upload': 'Uploaden',
        'label_reset': 'Resetten',
        'label_country': 'Land',
        'label_date_format': 'Datumnotatie',
        'label_time_format': 'Tijdnotatie',
        'label_description': 'Beschrijving',
        'label_back_to_general': 'Terug naar Algemeen',


        //placeholder
        'placeholder_company_name': `Voer ${company_singular} naam in`,
        'placeholder_search_country': 'Zoek land',
        'placeholder_date_format': 'Selecteer datumnotatie',
        'placeholder_time_format': 'Selecteer tijdnotatie',
        'placeholder_description': 'Geef een beschrijving',


        //validations
        'invalid_company_name': `Voer ${company_singular} naam in`,
        'invalid_date_format': 'Selecteer datumnotatie',
        'invalid_time_format': 'Selecteer tijdnotatie',
        'invalid_description': 'Geef een geldige beschrijving',
    };

    return companyDe
}

export default companyDeTrans