const userCnTrans = (user_singular, user_plural) => {

    const userCn = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `添加${user_singular}`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `编辑${user_singular}`,
        'user_view_btn': `查看${user_singular}`,
        'archive_user_btn': `归档${user_plural}`,
        'active_user_btn': `激活${user_plural}`,

        'btn_step': '步骤',
        'btn_general_info': '基本信息',
        'btn_fill_all_information_below': '填写以下所有信息',
        'btn_additional_info': '附加信息',
        'btn_set_password': '设置密码',
        'btn_save_next': '保存并下一步',

        //messages
        'msg_user_added_successfully': `您的${user_singular}添加成功`,
        'msg_user_updated_successfully': `您的${user_singular}已成功更新`,
        'msg_file_size_exceed': '文件大小不得超过2MB',
        'msg_sure_to_active_this_user': `您确定要激活此${user_singular}吗`,
        'msg_sure_to_archive_this_user': `您确定要归档此${user_singular}吗`,
        'msg_user_activated': `${user_singular}已成功激活`,
        'msg_user_archived': `${user_singular}已成功归档`,

        //label
        'label_user_first_name': `输入${user_singular}名字`,
        'label_user_last_name': `输入${user_singular}姓氏`,
        'label_user_email': `输入${user_singular}电子邮件`,
        'label_user_phone': `输入${user_singular}电话号码`,
        'label_set_password': '设置密码',
        'label_password': '密码',
        'label_cnfrm_password': '确认密码',
        'label_male': '男',
        'label_female': '女',
        'label_other': '其他',
        'label_state': '省/州',
        'label_city': '城市',
        'label_gender': '性别',
        'label_variables': '变量',

        //placeholder
        'placeholder_first_name': `名字`,
        'placeholder_middle_name': `中间名`,
        'placeholder_last_name': `姓氏`,
        'placeholder_display_name': `显示名字`,
        'placeholder_email': `电子邮件`,
        'placeholder_phone': `电话号码`,
        'placeholder_dob': `出生日期`,
        'placeholder_gender': `选择性别`,
        'placeholder_search_state': `搜索省/州`,
        'placeholder_search_city': `搜索城市`,
        'placeholder_street_address': `街道地址`,
        'placeholder_post_code': `邮政编码`,
        'placeholder_emergency_contact_name': `紧急联系人姓名`,
        'placeholder_emergency_contact_phone': `紧急联系人电话号码`,
        'placeholder_emergency_contact_relation': `紧急联系人关系`,

        //validations
        'invalid_user_first_name': `请输入${user_singular}名字`,
        'invalid_user_last_name': `请输入${user_singular}姓氏`,
        'invalid_email': `请输入${user_singular}电子邮件`,
        'invalid_phone': `请输入${user_singular}电话号码`,
        'invalid_password': `设置${user_singular}密码`,
        'invalid_dob': `设置有效的出生日期`,
        'invalid_gender': '未选择性别',
        'paswword_does_not_match': '密码不匹配',
        'invalid_cnfrm_password': '确认密码',
        'invalid_state': '选择省/州',
        'invalid_city': '选择城市',
        'invalid_street_address': '提供街道地址',
        'invalid_post_code': '提供邮政编码',
        'invalid_emergency_contact_name': '提供紧急联系人姓名',
        'invalid_emergency_contact_phone': '提供紧急联系人电话号码',
        'invalid_emergency_contact_relation': '提供紧急联系人关系',
    };

    return userCn
}
export default userCnTrans 