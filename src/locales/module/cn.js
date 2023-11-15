const moduleCnTrans = (module_singular, module_plural) => {

    const moduleCn = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `添加${module_singular}`,
        'module_edit_btn': `编辑${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `确定要激活此${module_singular}吗？`,
        'msg_sure_to_archive_this_module': `确定要存档此${module_singular}吗？`,
        'msg_module_activated': `${module_singular}已成功激活`,
        'msg_module_archived': `${module_singular}已成功存档`,
        'msg_module_added_successfully': `${module_singular}已成功添加`,
        'msg_module_updated_successfully': `${module_singular}已成功更新`,




        //label
        'label_module_type': `${module_singular}类型`,
        'label_static_module': `静态`,
        'label_dynamic_module': `动态`,
        'label_parent_module': `父${module_singular}（如果适用）`,
        'label_module_name': `${module_singular}名称`,
        'label_module_url': `${module_singular} URL`,
        'label_module_icon': `${module_singular}图标`,
        'label_module_slug': `${module_singular} Slug`,
        'label_show_menu': '显示菜单',
        'label_sort_order': '排序顺序',
        'label_readable': `可读`,
        'label_editable': '可编辑',
        'label_writeable': '可写',
        'label_deleteable': '可删除',
        'label_unreadable': `不可读`,
        'label_uneditable': '不可编辑',
        'label_unwriteable': '不可写',
        'label_undeleteable': '不可删除',
        'label_singular_english': '英语单数',
        'label_singular_french': '法语单数',
        'label_singular_spanish': '西班牙语单数',
        'label_singular_german': '德语单数（德国）',
        'label_singular_arabic': '阿拉伯语单数',
        'label_singular_italian': '意大利语单数',
        'label_singular_chinees': '中文单数',
        'label_plural_english': '英语复数',
        'label_plural_french': '法语复数',
        'label_plural_spanish': '西班牙语复数',
        'label_plural_german': '德语复数（德国）',
        'label_plural_arabic': '阿拉伯语复数',
        'label_plural_italian': '意大利语复数',
        'label_plural_chinees': '中文复数',


        //placeholder
        'placeholder_module_name': `${module_singular}名称`,
        'placeholder_module_url': `${module_singular} URL`,
        'placeholder_module_icon': `${module_singular}图标`,
        'placeholder_module_slug': `${module_singular} Slug`,
        'placeholder_sort_order': '排序顺序',
        'placeholder_singular_english': '单数-英语',
        'placeholder_singular_french': '单数-法语',
        'placeholder_singular_spanish': '单数-西班牙语',
        'placeholder_singular_german': '单数-德语（德国）',
        'placeholder_singular_arabic': '单数-阿拉伯语',
        'placeholder_singular_italian': '单数-意大利语',
        'placeholder_singular_chinees': '单数-中文',
        'placeholder_plural_english': '复数-英语',
        'placeholder_plural_french': '复数-法语',
        'placeholder_plural_spanish': '复数-西班牙语',
        'placeholder_plural_german': '复数-德语',
        'placeholder_plural_arabic': '复数-阿拉伯语',
        'placeholder_plural_italian': '复数-意大利语',
        'placeholder_plural_chinees': '复数-中文',


        //validation
        'invalid_module_name': `输入${module_singular}名称`,
        'invalid_module_url': `输入${module_singular} URL`,
        'invalid_module_icon': `输入${module_singular}图标`,
        'invalid_module_slug': `输入${module_singular} Slug`,
        'invalid_sort_order': '输入排序顺序',
        'invalid_singular_english': '输入英语单数',
        'invalid_singular_french': '输入法语单数',
        'invalid_singular_spanish': '输入西班牙语单数',
        'invalid_singular_german': '输入德语单数（德国）',
        'invalid_singular_arabic': '输入阿拉伯语单数',
        'invalid_singular_italian': '输入意大利语单数',
        'invalid_singular_chinees': '输入中文单数',
        'invalid_plural_english': '输入英语复数',
        'invalid_plural_french': '输入法语复数',
        'invalid_plural_spanish': '输入西班牙语复数',
        'invalid_plural_german': '输入德语复数（德国）',
        'invalid_plural_arabic': '输入阿拉伯语复数',
        'invalid_plural_italian': '输入意大利语复数',
        'invalid_plural_chinees': '输入中文复数',
    }

    return moduleCn
}

export default moduleCnTrans 