const userFrTrans = (user_singular, user_plural) => {

    const userFr = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `Ajouter ${user_singular}`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `Modifier ${user_singular}`,
        'user_view_btn': `Afficher ${user_singular}`,
        'archive_user_btn': `Archiver ${user_plural}`,
        'active_user_btn': `Activer ${user_plural}`,

        'btn_step': 'Étape',
        'btn_general_info': 'Informations générales',
        'btn_fill_all_information_below': 'Remplissez toutes les informations ci-dessous',
        'btn_additional_info': 'Informations supplémentaires',
        'btn_set_password': 'Définir le mot de passe',
        'btn_save_next': 'Enregistrer et suivant',

        //messages
        'msg_user_added_successfully': `${user_singular} ajouté avec succès`,
        'msg_user_updated_successfully': `${user_singular} mis à jour avec succès`,
        'msg_file_size_exceed': 'La taille du fichier ne doit pas dépasser 2 Mo',
        'msg_sure_to_active_this_user': `Êtes-vous sûr de vouloir activer ce ${user_singular}`,
        'msg_sure_to_archive_this_user': `Êtes-vous sûr de vouloir archiver ce ${user_singular}`,
        'msg_user_activated': `${user_singular} activé avec succès`,
        'msg_user_archived': `${user_singular} archivé avec succès`,

        //label
        'label_user_first_name': `Entrez le prénom de ${user_singular}`,
        'label_user_last_name': `Entrez le nom de famille de ${user_singular}`,
        'label_user_email': `Entrez l'e-mail de ${user_singular}`,
        'label_user_phone': `Entrez le numéro de téléphone de ${user_singular}`,
        'label_set_password': 'Définir le mot de passe',
        'label_password': 'Mot de passe',
        'label_cnfrm_password': 'Confirmer le mot de passe',
        'label_male': 'Homme',
        'label_female': 'Femme',
        'label_other': 'Autre',
        'label_state': 'État',
        'label_city': 'Ville',
        'label_gender': 'Genre',
        'label_variables': 'Variables',

        //placeholder
        'placeholder_first_name': `Prénom`,
        'placeholder_middle_name': `Deuxième prénom`,
        'placeholder_last_name': `Nom de famille`,
        'placeholder_display_name': `Nom d'affichage`,
        'placeholder_email': `E-mail`,
        'placeholder_phone': `Numéro de téléphone`,
        'placeholder_dob': `Date de naissance`,
        'placeholder_gender': `Sélectionnez le genre`,
        'placeholder_search_state': `Rechercher un état`,
        'placeholder_search_city': `Rechercher une ville`,
        'placeholder_street_address': `Adresse postale`,
        'placeholder_post_code': `Code postal`,
        'placeholder_emergency_contact_name': `Nom du contact d'urgence`,
        'placeholder_emergency_contact_phone': `Numéro du contact d'urgence`,
        'placeholder_emergency_contact_relation': `Relation avec le contact d'urgence`,

        //validations
        'invalid_user_first_name': `Entrez le prénom de ${user_singular}`,
        'invalid_user_last_name': `Entrez le nom de famille de ${user_singular}`,
        'invalid_email': `Entrez l'e-mail de ${user_singular}`,
        'invalid_phone': `Entrez le numéro de téléphone de ${user_singular}`,
        'invalid_password': `Définissez le mot de passe de ${user_singular}`,
        'invalid_dob': `Entrez une date de naissance valide`,
        'invalid_gender': 'Genre non sélectionné',
        'paswword_does_not_match': 'Le mot de passe ne correspond pas',
        'invalid_cnfrm_password': 'Confirmez le mot de passe',
        'invalid_state': 'Sélectionnez un état',
        'invalid_city': 'Sélectionnez une ville',
        'invalid_street_address': 'Fournissez une adresse',
        'invalid_post_code': 'Fournissez un code postal',
        'invalid_emergency_contact_name': "Fournissez le nom du contact d'urgence",
        'invalid_emergency_contact_phone': "Fournissez le numéro de contact d'urgence",
        'invalid_emergency_contact_relation': "Fournissez la relation du contact d'urgence",
    };

    return userFr
}
export default userFrTrans 