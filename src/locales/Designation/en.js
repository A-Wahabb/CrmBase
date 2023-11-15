const designationEnTrans = (designation_singular, designation_plural) => {


    const designationEn = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `Add ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `Edit ${designation_singular}`,
        'archive_designation_btn': `Archive ${designation_plural}`,
        'active_designation_btn': `Active ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `Your ${designation_singular} is Added Successfully`,
        'msg_designation_updated_successfully': `Your ${designation_singular} is Updated Successfully`,
        'msg_sure_to_active_this_designation': `Are you sure you want to Active this ${designation_singular}`,
        'msg_sure_to_archive_this_designation': `Are you sure you want to Archive this ${designation_singular}`,
        'msg_designation_activated': `${designation_singular} Activated Successfully`,
        'msg_designation_archived': `${designation_singular} Archived Successfully`,

        //label
        'label_designation_title': `${designation_singular} Title`,
        'label_add_designation': `Add ${designation_singular}`,
        'label_add_more_designation': `Add more ${designation_singular}`,
        'label_designation_sort_order': `${designation_singular} Sort Order`,
        'label_select_designation': `Select ${designation_singular}`,

        //validation
        'invalid_designation_title': `Enter the ${designation_singular}`,
        'invalid_designation_sort_order': `Enter the ${designation_singular}`,

        //placeholder
        'placeholder_designation_title': `Enter ${designation_singular} Name`,
    }
    return designationEn
}





export default designationEnTrans 