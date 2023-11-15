const userRoleArTrans = (user_role_singular, user_role_plural) => {

    const userRoleAr = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `إضافة ${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `تعديل ${user_role_singular}`,
        'archive_user_role_btn': `أرشفة ${user_role_plural}`,
        'active_user_role_btn': `تفعيل ${user_role_plural}`,
        'user_role_edit_permissions_btn': `تعديل صلاحيات ${user_role_plural}`,

        //mesages
        'msg_user_role_added_successfully': `تمت إضافة ${user_role_singular} بنجاح`,
        'msg_user_role_updated_successfully': `تم تحديث ${user_role_singular} بنجاح`,
        'msg_user_role_permission_updated_successfully': `تم تحديث صلاحيات ${user_role_singular} بنجاح`,
        'msg_sure_to_active_this_user_role': `هل أنت متأكد أنك تريد تفعيل ${user_role_singular} هذا`,
        'msg_sure_to_archive_this_user_role': `هل أنت متأكد أنك تريد أرشفة ${user_role_singular} هذا`,
        'msg_user_role_activated': `تم تفعيل ${user_role_singular} بنجاح`,
        'msg_user_role_archived': `تم أرشفة ${user_role_singular} بنجاح`,

        //label
        'label_user_role_title': `عنوان ${user_role_singular}`,
        'label_add_user_role': `إضافة ${user_role_singular}`,
        'label_add_more_user_role': `إضافة المزيد من ${user_role_singular}`,
        'label_user_role_description': `وصف ${user_role_singular}`,
        'label_select_user_role': `حدد ${user_role_singular}`,

        //validation
        'invalid_user_role_title': `أدخل عنوان ${user_role_singular}`,
        'invalid_user_role_description': `أدخل وصف ${user_role_singular}`,
        'invalid_user_role': `حدد ${user_role_singular}`,

        //placeholder
        'placeholder_user_role_title': `أدخل اسم ${user_role_singular}`,
    };

    return userRoleAr
}





export default userRoleArTrans 