const companyArTrans = (company_singular, company_plural) => {

    const companyAr = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `إضافة ${company_singular}`,
        'company_edit_btn': `تعديل ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `تفاصيل ${company_singular}`,
        'setup_new_company': `إعداد ${company_singular} جديد`,
        'add_company_modal_title': 'تقديم التفاصيل للبدء',
        'Hours': 'ساعات',
        'archive_company_btn': `أرشفة ${company_plural}`,
        'active_company_btn': `تنشيط ${company_plural}`,
        'switch_company': `تبديل ${company_singular}`,
        'switched_company': `تم التبديل بالفعل`,
        'created_date': `تاريخ الإنشاء`,

        //messages
        'msg_company_added_successfully': `تمت إضافة ${company_singular} بنجاح`,
        'msg_company_updated_successfully': `تم تحديث ${company_singular} بنجاح`,
        'msg_file_size_exceed': 'الحجم يجب أن يكون أقل من 2 ميجابايت',
        'msg_sure_to_active_this_company': `هل أنت متأكد أنك تريد تنشيط ${company_singular} هذا`,
        'msg_sure_to_archive_this_company': `هل أنت متأكد أنك تريد أرشفة ${company_singular} هذا`,
        'msg_company_activated': `تم تنشيط ${company_singular} بنجاح`,
        'msg_company_archived': `تمت أرشفة ${company_singular} بنجاح`,

        //label
        'label_searh_company': `البحث حسب الاسم`,
        'label_company_name': `اسم ${company_singular}`,
        'label_upload': 'تحميل',
        'label_reset': 'إعادة تعيين',
        'label_country': 'الدولة',
        'label_date_format': 'تنسيق التاريخ',
        'label_time_format': 'تنسيق الوقت',
        'label_description': 'الوصف',
        'label_back_to_general': 'العودة إلى العامة',

        //placeholder
        'placeholder_company_name': `أدخل اسم ${company_singular}`,
        'placeholder_search_country': 'ابحث عن الدولة',
        'placeholder_date_format': 'حدد تنسيق التاريخ',
        'placeholder_time_format': 'حدد تنسيق الوقت',
        'placeholder_description': 'قدم الوصف المناسب',

        //validations
        'invalid_company_name': `أدخل اسم ${company_singular}`,
        'invalid_date_format': 'حدد تنسيق التاريخ',
        'invalid_time_format': 'حدد تنسيق الوقت',
        'invalid_description': 'قم بتوفير الوصف الصحيح',
    }

    return companyAr
}





export default companyArTrans