const companyCnTrans = (company_singular, company_plural) => {


    const companyCn = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `添加${company_singular}`,
        'company_edit_btn': `编辑${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `${company_singular}详情`,
        'setup_new_company': `设置新的${company_singular}`,
        'add_company_modal_title': '提供详细信息以开始',
        'Hours': '小时',
        'archive_company_btn': `存档${company_plural}`,
        'active_company_btn': `激活${company_plural}`,
        'switch_company': `切换${company_singular}`,
        'switched_company': `已切换`,
        'created_date': `创建日期`,

        //messages
        'msg_company_added_successfully': `成功添加${company_singular} `,
        'msg_company_updated_successfully': `成功更新${company_singular} `,
        'msg_file_size_exceed': '文件大小不能超过2MB',
        'msg_sure_to_active_this_company': `您确定要激活此${company_singular} 吗`,
        'msg_sure_to_archive_this_company': `您确定要存档此${company_singular} 吗`,
        'msg_company_activated': `${company_singular} 已成功激活`,
        'msg_company_archived': `${company_singular} 已成功存档`,

        //label
        'label_searh_company': `按名称搜索`,
        'label_company_name': `${company_singular} 名称`,
        'label_upload': '上传',
        'label_reset': '重置',
        'label_country': '国家',
        'label_date_format': '日期格式',
        'label_time_format': '时间格式',
        'label_description': '描述',
        'label_back_to_general': '返回一般',

        //placeholder
        'placeholder_company_name': `输入${company_singular} 名称`,
        'placeholder_search_country': '搜索国家',
        'placeholder_date_format': '选择日期格式',
        'placeholder_time_format': '选择时间格式',
        'placeholder_description': '提供描述',

        //validations
        'invalid_company_name': `请输入${company_singular} 名称`,
        'invalid_date_format': '请选择日期格式',
        'invalid_time_format': '请选择时间格式',
        'invalid_description': '请提供正确的描述',
    }

    return companyCn
}

export default companyCnTrans