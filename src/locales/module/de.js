const moduleDeTrans = (module_singular, module_plural) => {

    const moduleDe = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `Toevoegen ${module_singular}`,
        'module_edit_btn': `Bewerken ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `Weet je zeker dat je deze ${module_singular} wilt activeren?`,
        'msg_sure_to_archive_this_module': `Weet je zeker dat je deze ${module_singular} wilt archiveren?`,
        'msg_module_activated': `${module_singular} succesvol geactiveerd`,
        'msg_module_archived': `${module_singular} succesvol gearchiveerd`,
        'msg_module_added_successfully': `${module_singular} succesvol toegevoegd`,
        'msg_module_updated_successfully': `${module_singular} succesvol bijgewerkt`,




        //label
        'label_module_type': `${module_singular} Type`,
        'label_static_module': `Statisch`,
        'label_dynamic_module': `Dynamisch`,
        'label_parent_module': `Hoofd ${module_singular} (indien van toepassing)`,
        'label_module_name': `${module_singular} Naam`,
        'label_module_url': `${module_singular} URL`,
        'label_module_icon': `${module_singular} Pictogram`,
        'label_module_slug': `${module_singular} Slug`,
        'label_show_menu': 'Menu tonen',
        'label_sort_order': 'Sorteervolgorde',
        'label_readable': `Leesbaar`,
        'label_editable': 'Bewerkbaar',
        'label_writeable': 'Schrijfbaar',
        'label_deleteable': 'Verwijderbaar',
        'label_unreadable': `Onleesbaar`,
        'label_uneditable': 'Niet bewerkbaar',
        'label_unwriteable': 'Niet schrijfbaar',
        'label_undeleteable': 'Niet verwijderbaar',
        'label_singular_english': 'Enkelvoud Engels',
        'label_singular_french': 'Enkelvoud Frans',
        'label_singular_spanish': 'Enkelvoud Spaans',
        'label_singular_german': 'Enkelvoud Duits',
        'label_singular_arabic': 'Enkelvoud Arabisch',
        'label_singular_italian': 'Enkelvoud Italiaans',
        'label_singular_chinees': 'Enkelvoud Chinees',
        'label_plural_english': 'Meervoud Engels',
        'label_plural_french': 'Meervoud Frans',
        'label_plural_spanish': 'Meervoud Spaans',
        'label_plural_german': 'Meervoud Duits',
        'label_plural_arabic': 'Meervoud Arabisch',
        'label_plural_italian': 'Meervoud Italiaans',
        'label_plural_chinees': 'Meervoud Chinees',


        //placeholder
        'placeholder_module_name': `${module_singular} Naam`,
        'placeholder_module_url': `${module_singular} URL`,
        'placeholder_module_icon': `${module_singular} Pictogram`,
        'placeholder_module_slug': `${module_singular} Slug`,
        'placeholder_sort_order': 'Sorteervolgorde',
        'placeholder_singular_english': 'enkelvoud-en',
        'placeholder_singular_french': 'enkelvoud-fr',
        'placeholder_singular_spanish': 'enkelvoud-es',
        'placeholder_singular_german': 'enkelvoud-de',
        'placeholder_singular_arabic': 'enkelvoud-ar',
        'placeholder_singular_italian': 'enkelvoud-it',
        'placeholder_singular_chinees': 'enkelvoud-ch',
        'placeholder_plural_english': 'meervoud-en',
        'placeholder_plural_french': 'meervoud-fr',
        'placeholder_plural_spanish': 'meervoud-es',
        'placeholder_plural_german': 'meervoud-de',
        'placeholder_plural_arabic': 'meervoud-ar',
        'placeholder_plural_italian': 'meervoud-it',
        'placeholder_plural_chinees': 'meervoud-ch',


        //validation
        'invalid_module_name': `Voer ${module_singular} naam in`,
        'invalid_module_url': `Voer ${module_singular} URL in`,
        'invalid_module_icon': `Voer ${module_singular} pictogram in`,
        'invalid_module_slug': `Voer ${module_singular} slug in`,
        'invalid_sort_order': 'Voer sorteervolgorde in',
        'invalid_singular_english': 'Voer enkelvoudig Engels in',
        'invalid_singular_french': 'Voer enkelvoudig Frans in',
        'invalid_singular_spanish': 'Voer enkelvoudig Spaans in',
        'invalid_singular_german': 'Voer enkelvoudig Duits in (Duitsland)',
        'invalid_singular_arabic': 'Voer enkelvoudig Arabisch in',
        'invalid_singular_italian': 'Voer enkelvoudig Italiaans in',
        'invalid_singular_chinees': 'Voer enkelvoudig Chinees in',
        'invalid_plural_english': 'Voer meervoudig Engels in',
        'invalid_plural_french': 'Voer meervoudig Frans in',
        'invalid_plural_spanish': 'Voer meervoudig Spaans in',
        'invalid_plural_german': 'Voer meervoudig Duits in (Duitsland)',
        'invalid_plural_arabic': 'Voer meervoudig Arabisch in',
        'invalid_plural_italian': 'Voer meervoudig Italiaans in',
        'invalid_plural_chinees': 'Voer meervoudig Chinees in',
    }

    return moduleDe
}





export default moduleDeTrans 