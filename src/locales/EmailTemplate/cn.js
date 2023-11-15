const emailTempCnTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempCn = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `添加${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `编辑${email_temp_singular}`,

        //placeholder
        'placeholder_subject': '主题',
        'placeholder_status': '状态',
        'label_email_temp_content': `${email_temp_singular}正文`,

        //validation
        'invalid_subject': '主题不能为空',
    };

    return emailTempCn
}

export default emailTempCnTrans 