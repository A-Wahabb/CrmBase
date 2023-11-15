const userArTrans = (user_singular, user_plural) => {

    const userAr = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `إضافة ${user_singular}`,
        'user_page_title': `${user_plural} `,
        'user_edit_btn': `تعديل ${user_singular} `,
        'user_view_btn': `عرض ${user_singular} `,
        'archive_user_btn': `أرشفة ${user_plural} `,
        'active_user_btn': `تفعيل ${user_plural} `,

        'btn_step': 'خطوة',
        'btn_general_info': 'معلومات عامة',
        'btn_fill_all_information_below': 'املأ جميع المعلومات أدناه',
        'btn_additional_info': 'معلومات إضافية',
        'btn_set_password': 'تعيين كلمة المرور',
        'btn_save_next': 'حفظ والتالي',

        //messages
        'msg_user_added_successfully': `تمت إضافة ${user_singular} بنجاح`,
        'msg_user_updated_successfully': `تم تحديث ${user_singular} بنجاح`,
        'msg_file_size_exceed': 'حجم الملف يجب ألا يتجاوز 2 ميجابايت',
        'msg_sure_to_active_this_user': `هل أنت متأكد من رغبتك في تفعيل هذا ${user_singular} `,
        'msg_sure_to_archive_this_user': `هل أنت متأكد من رغبتك في أرشفة هذا ${user_singular} `,
        'msg_user_activated': `${user_singular} تم تفعيله بنجاح`,
        'msg_user_archived': `${user_singular} تمت أرشفته بنجاح`,

        //label
        'label_user_first_name': `أدخل اسم ${user_singular} الأول`,
        'label_user_last_name': `أدخل اسم ${user_singular} الأخير`,
        'label_user_email': `أدخل بريد ${user_singular} الإلكتروني`,
        'label_user_phone': `أدخل رقم هاتف ${user_singular} `,
        'label_set_password': 'تعيين كلمة المرور',
        'label_password': 'كلمة المرور',
        'label_cnfrm_password': 'تأكيد كلمة المرور',
        'label_male': 'ذكر',
        'label_female': 'أنثى',
        'label_other': 'أخرى',
        'label_state': 'المحافظة/الولاية',
        'label_city': 'المدينة',
        'label_gender': 'الجنس',
        'label_variables': 'المتغيرات',

        //placeholder
        'placeholder_first_name': `الاسم الأول`,
        'placeholder_middle_name': `الاسم الأوسط`,
        'placeholder_last_name': `الاسم الأخير`,
        'placeholder_display_name': `اسم العرض`,
        'placeholder_email': `البريد الإلكتروني`,
        'placeholder_phone': `رقم الهاتف`,
        'placeholder_dob': `تاريخ الميلاد`,
        'placeholder_gender': `اختر الجنس`,
        'placeholder_search_state': `ابحث عن المحافظة / الولاية`,
        'placeholder_search_city': `ابحث عن المدينة`,
        'placeholder_street_address': `عنوان الشارع`,
        'placeholder_post_code': `الرمز البريدي`,
        'placeholder_emergency_contact_name': `اسم جهة الاتصال في حالات الطوارئ`,
        'placeholder_emergency_contact_phone': `رقم جهة الاتصال في حالات الطوارئ`,
        'placeholder_emergency_contact_relation': `علاقة جهة الاتصال في حالات الطوارئ`,

        //validations
        'invalid_user_first_name': `أدخل اسم ال${user_singular}`,
        'invalid_user_last_name': `أدخل اسم العائلة ل${user_singular}`,
        'invalid_email': `أدخل البريد الإلكتروني ل${user_singular}`,
        'invalid_phone': `أدخل رقم هاتف ${user_singular}`,
        'invalid_password': `قم بتعيين كلمة مرور ل${user_singular}`,
        'invalid_dob': `قم بتعيين تاريخ ميلاد صحيح`,
        'invalid_gender': 'لم يتم تحديد الجنس',
        'paswword_does_not_match': 'كلمة المرور غير متطابقة',
        'invalid_cnfrm_password': 'تأكيد كلمة المرور',
        'invalid_state': 'حدد الولاية',
        'invalid_city': 'حدد المدينة',
        'invalid_street_address': 'قم بتقديم عنوان الشارع',
        'invalid_post_code': 'قم بتقديم الرمز البريدي',
        'invalid_emergency_contact_name': 'قم بتقديم اسم جهة الاتصال في حالات الطوارئ',
        'invalid_emergency_contact_phone': 'قم بتقديم رقم جهة الاتصال في حالات الطوارئ',
        'invalid_emergency_contact_relation': 'قم بتقديم علاقة جهة الاتصال في حالات الطوارئ',
    }
    return userAr
}





export default userArTrans