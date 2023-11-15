const emailTempDeTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempDe = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `Toevoegen ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `Bewerk ${email_temp_singular}`,

        //placeholder
        'placeholder_subject': 'Onderwerp',
        'placeholder_status': 'Status',
        'label_email_temp_content': `${email_temp_singular} inhoud`,

        //validation
        'invalid_subject': 'Onderwerp is verplicht',
    };


    return emailTempDe
}





export default emailTempDeTrans 