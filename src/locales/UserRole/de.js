const userRoleDeTrans = (user_role_singular, user_role_plural) => {

    const userRoleDe = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `Voeg ${user_role_singular} toe`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `Bewerk ${user_role_singular}`,
        'archive_user_role_btn': `Archiveer ${user_role_plural}`,
        'active_user_role_btn': `Activeer ${user_role_plural}`,
        'user_role_edit_permissions_btn': `Bewerk ${user_role_plural} permissies`,

        //mesages
        'msg_user_role_added_successfully': `Je ${user_role_singular} is succesvol toegevoegd`,
        'msg_user_role_updated_successfully': `Je ${user_role_singular} is succesvol bijgewerkt`,
        'msg_user_role_permission_updated_successfully': `De permissies van je ${user_role_singular} zijn succesvol bijgewerkt`,
        'msg_sure_to_active_this_user_role': `Weet je zeker dat je deze ${user_role_singular} wilt activeren`,
        'msg_sure_to_archive_this_user_role': `Weet je zeker dat je deze ${user_role_singular} wilt archiveren`,
        'msg_user_role_activated': `${user_role_singular} succesvol geactiveerd`,
        'msg_user_role_archived': `${user_role_singular} succesvol gearchiveerd`,

        //label
        'label_user_role_title': `${user_role_singular} titel`,
        'label_add_user_role': `Voeg ${user_role_singular} toe`,
        'label_add_more_user_role': `Voeg meer ${user_role_singular} toe`,
        'label_user_role_description': `${user_role_singular} beschrijving`,
        'label_select_user_role': `Selecteer ${user_role_singular}`,

        //validation
        'invalid_user_role_title': `Voer de ${user_role_singular} titel in`,
        'invalid_user_role_description': `Voer de ${user_role_singular} beschrijving in`,
        'invalid_user_role': `Selecteer ${user_role_singular}`,

        //placeholder
        'placeholder_user_role_title': `Voer de naam van ${user_role_singular} in`,
    };


    return userRoleDe
}





export default userRoleDeTrans 