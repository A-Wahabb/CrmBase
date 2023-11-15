
const companyFrTrans = (company_singular, company_plural) => {
    const companyFr = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `Ajouter ${company_singular}`,
        'company_edit_btn': `Modifier ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `Détails de ${company_singular}`,
        'setup_new_company': `Configurer une nouvelle ${company_singular}`,
        'add_company_modal_title': 'Fournir les détails pour commencer',
        'Hours': 'Heures',
        'archive_company_btn': `Archiver ${company_plural}`,
        'active_company_btn': `Activer ${company_plural}`,
        'switch_company': `Changer de ${company_singular}`,
        'switched_company': `Déjà changé`,
        'created_date': `Date de création`,



        //messages
        'msg_company_added_successfully': `Votre ${company_singular} a été ajouté avec succès`,
        'msg_company_updated_successfully': `Votre ${company_singular} a été mis à jour avec succès`,
        'msg_file_size_exceed': 'Seuls les fichiers de moins de 2 Mo sont autorisés',
        'msg_sure_to_active_this_company': `Êtes-vous sûr de vouloir activer ce ${company_singular} ?`,
        'msg_sure_to_archive_this_company': `Êtes-vous sûr de vouloir archiver ce ${company_singular} ?`,
        'msg_company_activated': `${company_singular} activé avec succès`,
        'msg_company_archived': `${company_singular} archivé avec succès`,

        //label
        'label_searh_company': `rechercher par nom`,
        'label_company_name': `Nom de ${company_singular}`,
        'label_upload': 'Télécharger',
        'label_reset': 'Réinitialiser',
        'label_country': 'Pays',
        'label_date_format': 'Format de date',
        'label_time_format': 'Format d\'heure',
        'label_description': 'Description',
        'label_back_to_general': 'Retour à Général',


        //placeholder
        'placeholder_company_name': `Entrez le nom de ${company_singular}`,
        'placeholder_search_country': 'Rechercher un pays',
        'placeholder_date_format': 'Sélectionnez le format de date',
        'placeholder_time_format': 'Sélectionnez le format d\'heure',
        'placeholder_description': 'Fournir une description',


        //validations
        'invalid_company_name': `Entrez le nom de ${company_singular}`,
        'invalid_date_format': 'Sélectionnez un format de date',
        'invalid_time_format': 'Sélectionnez un format d\'heure',
        'invalid_description': 'Fournissez une description valide',
    };

    return companyFr
}





export default companyFrTrans