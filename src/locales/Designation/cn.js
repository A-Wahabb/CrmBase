const designationCnTrans = (designation_singular, designation_plural) => {


    const designationCn = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `添加${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `编辑${designation_singular}`,
        'archive_designation_btn': `归档${designation_plural}`,
        'active_designation_btn': `激活${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `成功添加${designation_singular}`,
        'msg_designation_updated_successfully': `成功更新${designation_singular}`,
        'msg_sure_to_active_this_designation': `确定要激活此${designation_singular}吗？`,
        'msg_sure_to_archive_this_designation': `确定要归档此${designation_singular}吗？`,
        'msg_designation_activated': `${designation_singular}已成功激活`,
        'msg_designation_archived': `${designation_singular}已成功归档`,

        //label
        'label_designation_title': `${designation_singular}标题`,
        'label_add_designation': `添加${designation_singular}`,
        'label_add_more_designation': `添加更多${designation_singular}`,
        'label_designation_sort_order': `${designation_singular}排序顺序`,
        'label_select_designation': `选择${designation_singular}`,

        //validation
        'invalid_designation_title': `请输入${designation_singular}`,
        'invalid_designation_sort_order': `请输入${designation_singular}排序顺序`,

        //placeholder
        'placeholder_designation_title': `输入${designation_singular}名称`,
    };

    return designationCn
}

export default designationCnTrans 