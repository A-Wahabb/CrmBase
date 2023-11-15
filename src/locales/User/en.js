const userEnTrans = (user_singular, user_plural) => {


    const userEn = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `Add ${user_singular}`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `Edit ${user_singular}`,
        'user_view_btn': `View ${user_singular}`,
        'archive_user_btn': `Archive ${user_plural}`,
        'active_user_btn': `Active ${user_plural}`,


        'btn_step': 'Step',
        'btn_general_info': 'General Info',
        'btn_fill_all_information_below': 'Fill all Information Below',
        'btn_additional_info': 'Additional Info',
        'btn_set_password': 'Set Password',
        'btn_save_next': 'Save & Next',

        //messages
        'msg_user_added_successfully': `Your ${user_singular} is Added Successfully`,
        'msg_user_updated_successfully': `Your ${user_singular} is Updated Successfully`,
        'msg_file_size_exceed': 'File less than 2MB is allowed',
        'msg_sure_to_active_this_user': `Are you sure you want to Active this ${user_singular}`,
        'msg_sure_to_archive_this_user': `Are you sure you want to Archive this ${user_singular}`,
        'msg_user_activated': `${user_singular} Activated Successfully`,
        'msg_user_archived': `${user_singular} Archived Successfully`,


        //label
        'label_user_first_name': `Enter ${user_singular} First Name`,
        'label_user_last_name': `Enter ${user_singular} Last Name`,
        'label_user_email': `Enter ${user_singular} Email`,
        'label_user_phone': `Enter ${user_singular} Phone Number`,
        'label_set_password': 'Set Password',
        'label_password': 'Password',
        'label_cnfrm_password': 'Confirm Password',
        'label_male': 'Male',
        'label_female': 'Female',
        'label_other': 'Other',
        'label_state': 'State',
        'label_city': 'City',
        'label_gender': 'Gender',
        'label_variables': 'Variables',



        //placeholder
        'placeholder_first_name': `First Name`,
        'placeholder_middle_name': `Middle Name`,
        'placeholder_last_name': `Last Name`,
        'placeholder_display_name': `Display Name`,
        'placeholder_email': `Email`,
        'placeholder_phone': `Phone Number`,
        'placeholder_dob': `Date of Birth`,
        'placeholder_gender': `Choose Gender`,
        'placeholder_search_state': `Search State`,
        'placeholder_search_city': `Search City`,
        'placeholder_street_address': `Street Address`,
        'placeholder_post_code': `Postal Code`,
        'placeholder_emergency_contact_name': `Emergency Contact Name`,
        'placeholder_emergency_contact_phone': `Emergency Contact Number`,
        'placeholder_emergency_contact_relation': `Emergency Contact Relation`,


        //validations
        'invalid_user_first_name': `Enter ${user_singular} First name`,
        'invalid_user_last_name': `Enter ${user_singular} Last name`,
        'invalid_email': `Enter ${user_singular} Email`,
        'invalid_phone': `Enter ${user_singular} Phone Number`,
        'invalid_password': `Set ${user_singular} Password`,
        'invalid_dob': `Set Valid Date of Birth`,
        'invalid_gender': 'Gender not selected',
        'paswword_does_not_match': 'Password does not match',
        'invalid_cnfrm_password': 'Confirm Password',
        'invalid_state': 'Select State',
        'invalid_city': 'Select City',
        'invalid_street_address': 'Provide Street Address',
        'invalid_post_code': 'Provide Postal Code',
        'invalid_emergency_contact_name': 'Provide Emergency Contact Name',
        'invalid_emergency_contact_phone': 'Provide Emergency Contact Number',
        'invalid_emergency_contact_relation': 'Provide Emergency Contact Relation',

    }
    return userEn
}





export default userEnTrans 