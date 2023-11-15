const userDeTrans = (user_singular, user_plural) => {


    const userDe = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `Voeg ${user_singular} toe`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `Bewerk ${user_singular}`,
        'user_view_btn': `Bekijk ${user_singular}`,
        'archive_user_btn': `Archiveer ${user_plural}`,
        'active_user_btn': `Activeer ${user_plural}`,

        'btn_step': 'Stap',
        'btn_general_info': 'Algemene Informatie',
        'btn_fill_all_information_below': 'Vul alle informatie hieronder in',
        'btn_additional_info': 'Extra Informatie',
        'btn_set_password': 'Stel wachtwoord in',
        'btn_save_next': 'Opslaan & Volgende',

        'msg_user_added_successfully': `Je ${user_singular} is succesvol toegevoegd`,
        'msg_user_updated_successfully': `Je ${user_singular} is succesvol bijgewerkt`,
        'msg_file_size_exceed': 'Bestand groter dan 2MB is niet toegestaan',
        'msg_sure_to_active_this_user': `Weet je zeker dat je deze ${user_singular} wilt activeren`,
        'msg_sure_to_archive_this_user': `Weet je zeker dat je deze ${user_singular} wilt archiveren`,
        'msg_user_activated': `${user_singular} succesvol geactiveerd`,
        'msg_user_archived': `${user_singular} succesvol gearchiveerd`,

        'label_user_first_name': `Voer de voornaam van ${user_singular} in`,
        'label_user_last_name': `Voer de achternaam van ${user_singular} in`,
        'label_user_email': `Voer de e-mail van ${user_singular} in`,
        'label_user_phone': `Voer het telefoonnummer van ${user_singular} in`,
        'label_set_password': 'Stel wachtwoord in',
        'label_password': 'Wachtwoord',
        'label_cnfrm_password': 'Bevestig wachtwoord',
        'label_male': 'Man',
        'label_female': 'Vrouw',
        'label_other': 'Anders',
        'label_state': 'Provincie',
        'label_city': 'Stad',
        'label_gender': 'Geslacht',
        'label_variables': 'Variabelen',

        'placeholder_first_name': `Voornaam`,
        'placeholder_middle_name': `Tussenvoegsel`,
        'placeholder_last_name': `Achternaam`,
        'placeholder_display_name': `Weergavenaam`,
        'placeholder_email': `E-mail`,
        'placeholder_phone': `Telefoonnummer`,
        'placeholder_dob': `Geboortedatum`,
        'placeholder_gender': `Kies geslacht`,
        'placeholder_search_state': `Zoek provincie`,
        'placeholder_search_city': `Zoek stad`,
        'placeholder_street_address': `Straatnaam en huisnummer`,
        'placeholder_post_code': `Postcode`,
        'placeholder_emergency_contact_name': `Naam van noodcontactpersoon`,
        'placeholder_emergency_contact_phone': `Telefoonnummer van noodcontactpersoon`,
        'placeholder_emergency_contact_relation': `Relatie met noodcontactpersoon`,

        'invalid_user_first_name': `Voer de voornaam van ${user_singular} in`,
        'invalid_user_last_name': `Voer de achternaam van ${user_singular} in`,
        'invalid_email': `Voer de e-mail van ${user_singular} in`,
        'invalid_phone': `Voer het telefoonnummer van ${user_singular} in`,
        'invalid_password': `Stel een wachtwoord in voor ${user_singular}`,
        'invalid_dob': `Voer een geldige geboortedatum in`,
        'invalid_gender': 'Geslacht niet geselecteerd',
        'paswword_does_not_match': 'Wachtwoorden komen niet overeen',
        'invalid_cnfrm_password': 'Bevestig het wachtwoord',
        'invalid_state': 'Selecteer een provincie',
        'invalid_city': 'Selecteer een stad',
        'invalid_street_address': 'Voer een straatnaam en huisnummer in',
        'invalid_post_code': 'Voer een postcode in',
        'invalid_emergency_contact_name': 'Voer de naam van een noodcontactpersoon in',
        'invalid_emergency_contact_phone': 'Voer het telefoonnummer van een noodcontactpersoonin',
        'invalid_emergency_contact_relation': 'Voer de relatie met een noodcontactpersoon in',
    }

    return userDe
}





export default userDeTrans 