const userRoleCnTrans = (user_role_singular, user_role_plural) => {

    const userRoleCn = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `添加${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `编辑${user_role_singular}`,
        'archive_user_role_btn': `归档${user_role_plural}`,
        'active_user_role_btn': `激活${user_role_plural}`,
        'user_role_edit_permissions_btn': `编辑${user_role_plural}权限`,

        //mesages
        'msg_user_role_added_successfully': `成功添加${user_role_singular}`,
        'msg_user_role_updated_successfully': `成功更新${user_role_singular}`,
        'msg_user_role_permission_updated_successfully': `成功更新${user_role_singular}权限`,
        'msg_sure_to_active_this_user_role': `确定要激活此${user_role_singular}吗`,
        'msg_sure_to_archive_this_user_role': `确定要归档此${user_role_singular}吗`,
        'msg_user_role_activated': `${user_role_singular}已成功激活`,
        'msg_user_role_archived': `${user_role_singular}已成功归档`,

        //label
        'label_user_role_title': `${user_role_singular}标题`,
        'label_add_user_role': `添加${user_role_singular}`,
        'label_add_more_user_role': `添加更多${user_role_singular}`,
        'label_user_role_description': `${user_role_singular}描述`,
        'label_select_user_role': `选择${user_role_singular}`,

        //validation
        'invalid_user_role_title': `请输入${user_role_singular}标题`,
        'invalid_user_role_description': `请输入${user_role_singular}描述`,
        'invalid_user_role': '请选择`用户角色',

        //placeholder
        'placeholder_user_role_title': `请输入${user_role_singular}名称`,
    };

    return userRoleCn
}

export default userRoleCnTrans 