const emailTempItTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempIt = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `Aggiungi ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `Modifica ${email_temp_singular}`,

        //placeholder
        'placeholder_subject': 'Oggetto',
        'placeholder_status': 'Stato',
        'label_email_temp_content': `Corpo ${email_temp_singular}`,

        //validation
        'invalid_subject': 'L\'oggetto è obbligatorio',
    };

    return emailTempIt
}

export default emailTempItTrans 