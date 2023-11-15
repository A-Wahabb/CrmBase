const designationArTrans = (designation_singular, designation_plural) => {

    const designationAr = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `إضافة ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `تعديل ${designation_singular}`,
        'archive_designation_btn': `أرشفة ${designation_plural}`,
        'active_designation_btn': `تفعيل ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `تمت إضافة ${designation_singular} بنجاح`,
        'msg_designation_updated_successfully': `تم تحديث ${designation_singular} بنجاح`,
        'msg_sure_to_active_this_designation': `هل أنت متأكد أنك تريد تفعيل ${designation_singular} هذا؟`,
        'msg_sure_to_archive_this_designation': `هل أنت متأكد أنك تريد أرشفة ${designation_singular} هذا؟`,
        'msg_designation_activated': `${designation_singular} تم تفعيله بنجاح`,
        'msg_designation_archived': `${designation_singular} تمت أرشفته بنجاح`,

        //label
        'label_designation_title': `عنوان ${designation_singular}`,
        'label_add_designation': `إضافة ${designation_singular}`,
        'label_add_more_designation': `إضافة ${designation_singular} أخرى`,
        'label_designation_sort_order': `ترتيب ${designation_singular}`,
        'label_select_designation': `اختر ${designation_singular}`,

        //validation
        'invalid_designation_title': `يرجى إدخال ${designation_singular}`,
        'invalid_designation_sort_order': `يرجى إدخال ترتيب ${designation_singular}`,

        //placeholder
        'placeholder_designation_title': `أدخل اسم ${designation_singular}`,
    };

    return designationAr
}





export default designationArTrans 