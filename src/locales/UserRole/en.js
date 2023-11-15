const userRoleEnTrans = (user_role_singular, user_role_plural) => {

    const userRoleEn = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `Add ${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `Edit ${user_role_singular}`,
        'archive_user_role_btn': `Archive ${user_role_plural}`,
        'active_user_role_btn': `Active ${user_role_plural}`,
        'user_role_edit_permissions_btn': `Edit ${user_role_plural} permissions`,

        //mesages
        'msg_user_role_added_successfully': `Your ${user_role_singular} is Added Successfully`,
        'msg_user_role_updated_successfully': `Your ${user_role_singular} is Updated Successfully`,
        'msg_user_role_permission_updated_successfully': `Your ${user_role_singular}'s permissions are Updated Successfully`,
        'msg_sure_to_active_this_user_role': `Are you sure you want to Active this ${user_role_singular}`,
        'msg_sure_to_archive_this_user_role': `Are you sure you want to Archive this ${user_role_singular}`,
        'msg_user_role_activated': `${user_role_singular} Activated Successfully`,
        'msg_user_role_archived': `${user_role_singular} Archived Successfully`,

        //label
        'label_user_role_title': `${user_role_singular} Title`,
        'label_add_user_role': `Add ${user_role_singular}`,
        'label_add_more_user_role': `Add more ${user_role_singular}`,
        'label_user_role_description': `${user_role_singular} Description`,
        'label_select_user_role': `Select ${user_role_singular}`,

        //validation
        'invalid_user_role_title': `Enter the ${user_role_singular} title`,
        'invalid_user_role_description': `Enter the ${user_role_singular} Description`,
        'invalid_user_role': `Select ${user_role_singular}`,

        //placeholder
        'placeholder_user_role_title': `Enter ${user_role_singular} Name`,
    }

    return userRoleEn
}





export default userRoleEnTrans 