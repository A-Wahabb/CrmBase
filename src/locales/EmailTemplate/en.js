const emailTempEnTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempEn = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `Add ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `Edit ${email_temp_singular}`,


        //placeholder
        'placeholder_subject': 'Subject',
        'placeholder_status': 'Status',
        'label_email_temp_content': `${email_temp_singular} body`,


        //validation
        'invalid_subject': 'Subject is Required',
    }
    return emailTempEn
}





export default emailTempEnTrans 