const emailTempEsTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempEs = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `Agregar ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `Editar ${email_temp_singular}`,

        //placeholder
        'placeholder_subject': 'Asunto',
        'placeholder_status': 'Estado',
        'label_email_temp_content': `Cuerpo de ${email_temp_singular}`,

        //validation
        'invalid_subject': 'El asunto es requerido',
    };

    return emailTempEs
}





export default emailTempEsTrans 