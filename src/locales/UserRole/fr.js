const userRoleFrTrans = (user_role_singular, user_role_plural) => {

    const userRoleFr = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `Ajouter ${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `Modifier ${user_role_singular}`,
        'archive_user_role_btn': `Archiver ${user_role_plural}`,
        'active_user_role_btn': `Activer ${user_role_plural}`,
        'user_role_edit_permissions_btn': `Modifier les permissions de ${user_role_plural}`,

        //messages
        'msg_user_role_added_successfully': `Votre ${user_role_singular} a été ajouté avec succès`,
        'msg_user_role_updated_successfully': `Votre ${user_role_singular} a été mis à jour avec succès`,
        'msg_user_role_permission_updated_successfully': `Les permissions de votre ${user_role_singular} ont été mises à jour avec succès`,
        'msg_sure_to_active_this_user_role': `Êtes-vous sûr(e) de vouloir activer ce ${user_role_singular} ?`,
        'msg_sure_to_archive_this_user_role': `Êtes-vous sûr(e) de vouloir archiver ce ${user_role_singular} ?`,
        'msg_user_role_activated': `${user_role_singular} activé avec succès`,
        'msg_user_role_archived': `${user_role_singular} archivé avec succès`,

        //label
        'label_user_role_title': `Titre du ${user_role_singular}`,
        'label_add_user_role': `Ajouter ${user_role_singular}`,
        'label_add_more_user_role': `Ajouter plus de ${user_role_singular}`,
        'label_user_role_description': `Description du ${user_role_singular}`,
        'label_select_user_role': `Sélectionner ${user_role_singular}`,

        //validation
        'invalid_user_role_title': `Veuillez entrer le titre du ${user_role_singular}`,
        'invalid_user_role_description': `Veuillez entrer la description du ${user_role_singular}`,
        'invalid_user_role': `Veuillez sélectionner ${user_role_singular}`,

        //placeholder
        'placeholder_user_role_title': `Entrez le nom de ${user_role_singular}`,
    };

    return userRoleFr
}

export default userRoleFrTrans 