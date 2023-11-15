const moduleFrTrans = (module_singular, module_plural) => {

    const moduleFr = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `Ajouter ${module_singular}`,
        'module_edit_btn': `Modifier ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `Êtes-vous sûr de vouloir activer ce ${module_singular} ?`,
        'msg_sure_to_archive_this_module': `Êtes-vous sûr de vouloir archiver ce ${module_singular} ?`,
        'msg_module_activated': `${module_singular} activé avec succès`,
        'msg_module_archived': `${module_singular} archivé avec succès`,
        'msg_module_added_successfully': `${module_singular} ajouté avec succès`,
        'msg_module_updated_successfully': `${module_singular} mis à jour avec succès`,




        //label
        'label_module_type': `Type de ${module_singular}`,
        'label_static_module': `Statique`,
        'label_dynamic_module': `Dynamique`,
        'label_parent_module': `Module parent de ${module_singular} (le cas échéant)`,
        'label_module_name': `Nom du ${module_singular}`,
        'label_module_url': `URL du ${module_singular}`,
        'label_module_icon': `Icône du ${module_singular}`,
        'label_module_slug': `Slug du ${module_singular}`,
        'label_show_menu': 'Afficher le menu',
        'label_sort_order': 'Ordre de tri',
        'label_readable': `Lisible`,
        'label_editable': 'Modifiable',
        'label_writeable': 'Écrivable',
        'label_deleteable': 'Supprimable',
        'label_unreadable': `Illisible`,
        'label_uneditable': 'Non modifiable',
        'label_unwriteable': 'Non écrivable',
        'label_undeleteable': 'Non supprimable',
        'label_singular_english': 'Singulier - Anglais',
        'label_singular_french': 'Singulier - Français',
        'label_singular_spanish': 'Singulier - Espagnol',
        'label_singular_german': 'Singulier - Allemand',
        'label_singular_arabic': 'Singulier - Arabe',
        'label_singular_italian': 'Singulier - Italien',
        'label_singular_chinees': 'Singulier - Chinois',
        'label_plural_english': 'Pluriel - Anglais',
        'label_plural_french': 'Pluriel - Français',
        'label_plural_spanish': 'Pluriel - Espagnol',
        'label_plural_german': 'Pluriel - Allemand',
        'label_plural_arabic': 'Pluriel - Arabe',
        'label_plural_italian': 'Pluriel - Italien',
        'label_plural_chinees': 'Pluriel - Chinois',


        //placeholder
        'placeholder_module_name': `Nom du ${module_singular}`,
        'placeholder_module_url': `URL du ${module_singular}`,
        'placeholder_module_icon': `Icône du ${module_singular}`,
        'placeholder_module_slug': `Slug du ${module_singular}`,
        'placeholder_sort_order': 'Ordre de tri',
        'placeholder_singular_english': 'singulier-en',
        'placeholder_singular_french': 'singulier-fr',
        'placeholder_singular_spanish': 'singulier-es',
        'placeholder_singular_german': 'singulier-de',
        'placeholder_singular_arabic': 'singulier-ar',
        'placeholder_singular_italian': 'singulier-it',
        'placeholder_singular_chinees': 'singulier-ch',
        'placeholder_plural_english': 'pluriel-en',
        'placeholder_plural_french': 'pluriel-fr',
        'placeholder_plural_spanish': 'pluriel-es',
        'placeholder_plural_german': 'pluriel-de',
        'placeholder_plural_arabic': 'pluriel-ar',
        'placeholder_plural_italian': 'pluriel-it',
        'placeholder_plural_chinees': 'pluriel-ch',


        //validation
        'invalid_module_name': `Entrez le nom du ${module_singular}`,
        'invalid_module_url': `Entrez l'URL du ${module_singular}`,
        'invalid_module_icon': `Entrez l'icône du ${module_singular}`,
        'invalid_module_slug': `Entrez le slug du ${module_singular}`,
        'invalid_sort_order': "Entrez l'ordre de tri",
        'invalid_singular_english': 'Entrez le singulier en anglais',
        'invalid_singular_french': 'Entrez le singulier en français',
        'invalid_singular_spanish': 'Entrez le singulier en espagnol',
        'invalid_singular_german': 'Entrez le singulier en allemand (Allemagne)',
        'invalid_singular_arabic': 'Entrez le singulier en arabe',
        'invalid_singular_italian': 'Entrez le singulier en italien',
        'invalid_singular_chinees': 'Entrez le singulier en chinois',
        'invalid_plural_english': 'Entrez le pluriel en anglais',
        'invalid_plural_french': 'Entrez le pluriel en français',
        'invalid_plural_spanish': 'Entrez le pluriel en espagnol',
        'invalid_plural_german': 'Entrez le pluriel en allemand (Allemagne)',
        'invalid_plural_arabic': 'Entrez le pluriel en arabe',
        'invalid_plural_italian': 'Entrez le pluriel en italien',
        'invalid_plural_chinees': 'Entrez le pluriel en chinois',
    }

    return moduleFr
}

export default moduleFrTrans 