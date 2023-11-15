


const companyEnTrans = (company_singular, company_plural) => {

    const companyEn = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `Add ${company_singular}`,
        'company_edit_btn': `Edit ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `${company_singular} details`,
        'setup_new_company': `setup new ${company_singular}`,
        'add_company_modal_title': 'Provide Details to get Started',
        'Hours': 'Hours',
        'archive_company_btn': `Archive ${company_plural}`,
        'active_company_btn': `Active ${company_plural}`,
        'switch_company': `Switch ${company_singular}`,
        'switched_company': `Already Switched`,
        'created_date': `Created Date`,



        //messages
        'msg_company_added_successfully': `Your ${company_singular} is Added Successfully`,
        'msg_company_updated_successfully': `Your ${company_singular} is Updated Successfully`,
        'msg_file_size_exceed': 'File less than 2MB is allowed',
        'msg_sure_to_active_this_company': `Are you sure you want to Active this ${company_singular}`,
        'msg_sure_to_archive_this_company': `Are you sure you want to Archive this ${company_singular}`,
        'msg_company_activated': `${company_singular} Activated Successfully`,
        'msg_company_archived': `${company_singular} Archived Successfully`,

        //label
        'label_searh_company': `search by name`,
        'label_company_name': `${company_singular} Name`,
        'label_upload': 'Upload',
        'label_reset': 'Reset',
        'label_country': 'Country',
        'label_date_format': 'Date Format',
        'label_time_format': 'Date Format',
        'label_description': 'Description',
        'label_back_to_general': 'Back to General',


        //placeholder
        'placeholder_company_name': `Enter ${company_singular} Name`,
        'placeholder_search_country': 'Search Country',
        'placeholder_date_format': 'Select Date Format',
        'placeholder_time_format': 'Select Time Format',
        'placeholder_description': 'Provide Description',


        //validations
        'invalid_company_name': `Enter ${company_singular} Name`,
        'invalid_date_format': 'Select Date Format',
        'invalid_time_format': 'Select Time Format',
        'invalid_description': 'Provide the proper Description',

    }

    return companyEn
}





export default companyEnTrans
