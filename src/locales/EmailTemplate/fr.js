const emailTempFrTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempFr = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `Ajouter ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `Modifier ${email_temp_singular}`,

        //placeholder
        'placeholder_subject': 'Objet',
        'placeholder_status': 'Statut',
        'label_email_temp_content': `Corps du ${email_temp_singular}`,

        //validation
        'invalid_subject': `L'objet est requis`,
    };

    return emailTempFr
}

export default emailTempFrTrans 