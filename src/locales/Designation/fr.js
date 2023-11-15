const designationFrTrans = (designation_singular, designation_plural) => {

    const designationFr = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `Ajouter ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `Modifier ${designation_singular}`,
        'archive_designation_btn': `Archiver ${designation_plural}`,
        'active_designation_btn': `Activer ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `Votre ${designation_singular} a été ajouté avec succès`,
        'msg_designation_updated_successfully': `Votre ${designation_singular} a été mis à jour avec succès`,
        'msg_sure_to_active_this_designation': `Êtes-vous sûr de vouloir activer ce ${designation_singular} ?`,
        'msg_sure_to_archive_this_designation': `Êtes-vous sûr de vouloir archiver ce ${designation_singular} ?`,
        'msg_designation_activated': `${designation_singular} activé avec succès`,
        'msg_designation_archived': `${designation_singular} archivé avec succès`,

        //label
        'label_designation_title': `Titre du ${designation_singular}`,
        'label_add_designation': `Ajouter ${designation_singular}`,
        'label_add_more_designation': `Ajouter plus de ${designation_singular}`,
        'label_designation_sort_order': `Ordre de tri du ${designation_singular}`,
        'label_select_designation': `Sélectionner ${designation_singular}`,

        //validation
        'invalid_designation_title': `Veuillez saisir le ${designation_singular}`,
        'invalid_designation_sort_order': `Veuillez saisir l'ordre de tri du ${designation_singular}`,

        //placeholder
        'placeholder_designation_title': `Entrez le nom du ${designation_singular}`,
    };
    return designationFr
}

export default designationFrTrans 