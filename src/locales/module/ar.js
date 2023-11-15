const moduleArTrans = (module_singular, module_plural) => {

    const moduleAr = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `إضافة ${module_singular}`,
        'module_edit_btn': `تعديل ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `هل أنت متأكد أنك تريد تفعيل هذا ${module_singular}`,
        'msg_sure_to_archive_this_module': `هل أنت متأكد أنك تريد أرشفة هذا ${module_singular}`,
        'msg_module_activated': `${module_singular} تم تفعيله بنجاح`,
        'msg_module_archived': `${module_singular} تمت أرشفته بنجاح`,
        'msg_module_added_successfully': `${module_singular} تمت إضافته بنجاح`,
        'msg_module_updated_successfully': `${module_singular} تم تحديثه بنجاح`,

        //label
        'label_module_type': `نوع ${module_singular}`,
        'label_static_module': `ثابت`,
        'label_dynamic_module': `ديناميكي`,
        'label_parent_module': `الوحدة الرئيسية لـ ${module_singular} (إذا كانت مطبقة)`,
        'label_module_name': `اسم ${module_singular}`,
        'label_module_url': `عنوان ${module_singular}`,
        'label_module_icon': `أيقونة ${module_singular}`,
        'label_module_slug': `Slug ${module_singular}`,
        'label_show_menu': 'إظهار القائمة',
        'label_sort_order': 'ترتيب الفرز',
        'label_readable': `قابل للقراءة`,
        'label_editable': 'قابل للتعديل',
        'label_writeable': 'قابل للكتابة',
        'label_deleteable': 'قابل للحذف',
        'label_unreadable': `غير قابل للقراءة`,
        'label_uneditable': 'غير قابل للتعديل',
        'label_unwriteable': 'غير قابل للكتابة',
        'label_undeleteable': 'غير قابل للحذف',
        'label_singular_english': 'المفرد بالإنجليزية',
        'label_singular_french': 'المفرد بالفرنسية',
        'label_singular_spanish': 'المفرد بالإسبانية',
        'label_singular_german': 'المفرد بالألمانية (ألمانيا)',
        'label_singular_arabic': 'المفرد بالعربية',
        'label_singular_italian': 'المفرد بالإيطالية',
        'label_singular_chinees': 'المفرد بالصينية',
        'label_plural_english': 'الجمع بالإنجليزية',
        'label_plural_french': 'الجمع بالفرنسية',
        'label_plural_spanish': 'الجمع بالإسبانية',
        'label_plural_german': 'الجمع بالألمانية (ألمانيا)',
        'label_plural_arabic': 'الجمع بالعربية',
        'label_plural_italian': 'الجمع بالإيطالية',
        'label_plural_chinees': 'الجمع بالصينية',

        //placeholder
        'placeholder_module_name': `اسم ${module_singular}`,
        'placeholder_module_url': `عنوان ${module_singular}`,
        'placeholder_module_icon': `أيقونة ${module_singular}`,
        'placeholder_module_slug': `Slug ${module_singular}`,
        'placeholder_sort_order': 'ترتيب الفرز',
        'placeholder_singular_english': 'المفرد-انجليزي',
        'placeholder_singular_french': 'المفرد-فرنسي', 'placeholder_plural_french': 'جمع-فر',
        'placeholder_plural_spanish': 'جمع-إس',
        'placeholder_plural_german': 'جمع-ألم',
        'placeholder_plural_arabic': 'جمع-عر',
        'placeholder_plural_italian': 'جمع-إيط',
        'placeholder_plural_chinees': 'جمع-صين',


        //validation
        'invalid_module_name': `أدخل اسم ${module_singular}`,
        'invalid_module_url': `أدخل عنوان ${module_singular}`,
        'invalid_module_icon': `أدخل أيقونة ${module_singular}`,
        'invalid_module_slug': `أدخل Slug ${module_singular}`,
        'invalid_sort_order': 'أدخل ترتيب الفرز',
        'invalid_singular_english': 'أدخل المفرد بالإنجليزية',
        'invalid_singular_french': 'أدخل المفرد بالفرنسية',
        'invalid_singular_spanish': 'أدخل المفرد بالإسبانية',
        'invalid_singular_german': 'أدخل المفرد بالألمانية (ألمانيا)',
        'invalid_singular_arabic': 'أدخل المفرد بالعربية',
        'invalid_singular_italian': 'أدخل المفرد بالإيطالية',
        'invalid_singular_chinees': 'أدخل المفرد بالصينية',
        'invalid_plural_english': 'أدخل الجمع بالإنجليزية',
        'invalid_plural_french': 'أدخل الجمع بالفرنسية',
        'invalid_plural_spanish': 'أدخل الجمع بالإسبانية',
        'invalid_plural_german': 'أدخل الجمع بالألمانية (ألمانيا)',
        'invalid_plural_arabic': 'أدخل الجمع بالعربية',
        'invalid_plural_italian': 'أدخل الجمع بالإيطالية',
        'invalid_plural_chinees': 'أدخل الجمع بالصينية',
    }

    return moduleAr
}





export default moduleArTrans 