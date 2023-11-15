const emailTempArTrans = (email_temp_singular, email_temp_plural) => {

    const emailTempAr = {
        'email_temp_singular': email_temp_singular,
        'email_temp_plural': email_temp_plural,
        'all_email_templates': email_temp_plural,
        'email_temp_add_btn': `إضافة ${email_temp_singular}`,
        'email_temp_page_title': `${email_temp_plural}`,

        //button
        'btn_edit_email_template': `تعديل ${email_temp_singular}`,

        //placeholder
        'placeholder_subject': 'الموضوع',
        'placeholder_status': 'الحالة',
        'label_email_temp_content': `محتوى ${email_temp_singular}`,

        //validation
        'invalid_subject': 'الموضوع مطلوب',
    };


    return emailTempAr
}





export default emailTempArTrans 