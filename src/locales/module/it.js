const moduleItTrans = (module_singular, module_plural) => {

    const moduleIt = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `Aggiungi ${module_singular}`,
        'module_edit_btn': `Modifica ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `Sei sicuro di voler attivare questo ${module_singular}?`,
        'msg_sure_to_archive_this_module': `Sei sicuro di voler archiviare questo ${module_singular}?`,
        'msg_module_activated': `${module_singular} attivato con successo`,
        'msg_module_archived': `${module_singular} archiviato con successo`,
        'msg_module_added_successfully': `${module_singular} aggiunto con successo`,
        'msg_module_updated_successfully': `${module_singular} aggiornato con successo`,


        //label
        'label_module_type': `Tipo di ${module_singular}`,
        'label_static_module': `Statico`,
        'label_dynamic_module': `Dinamico`,
        'label_parent_module': `Modulo genitore di ${module_singular} (se applicabile)`,
        'label_module_name': `Nome ${module_singular}`,
        'label_module_url': `URL ${module_singular}`,
        'label_module_icon': `Icona ${module_singular}`,
        'label_module_slug': `Slug ${module_singular}`,
        'label_show_menu': 'Mostra il menu',
        'label_sort_order': 'Ordine di ordinamento',
        'label_readable': `Leggibile`,
        'label_editable': 'Modificabile',
        'label_writeable': 'Scrivibile',
        'label_deleteable': 'Cancellabile',
        'label_unreadable': `Non leggibile`,
        'label_uneditable': 'Non modificabile',
        'label_unwriteable': 'Non scrivibile',
        'label_undeleteable': 'Non cancellabile',
        'label_singular_english': 'Singolare - Inglese',
        'label_singular_french': 'Singolare - Francese',
        'label_singular_spanish': 'Singolare - Spagnolo',
        'label_singular_german': 'Singolare - Tedesco',
        'label_singular_arabic': 'Singolare - Arabo',
        'label_singular_italian': 'Singolare - Italiano',
        'label_singular_chinees': 'Singolare - Cinese',
        'label_plural_english': 'Plurale - Inglese',
        'label_plural_french': 'Plurale - Francese',
        'label_plural_spanish': 'Plurale - Spagnolo',
        'label_plural_german': 'Plurale - Tedesco',
        'label_plural_arabic': 'Plurale - Arabo',
        'label_plural_italian': 'Plurale - Italiano',
        'label_plural_chinees': 'Plurale - Cinese',


        //placeholder
        'placeholder_module_name': `Nome ${module_singular}`,
        'placeholder_module_url': `URL ${module_singular}`,
        'placeholder_module_icon': `Icona ${module_singular}`,
        'placeholder_module_slug': `Slug ${module_singular}`,
        'placeholder_sort_order': 'Ordine di ordinamento',
        'placeholder_singular_english': 'singolare-en',
        'placeholder_singular_french': 'singolare-fr',
        'placeholder_singular_spanish': 'singolare-es',
        'placeholder_singular_german': 'singolare-de',
        'placeholder_singular_arabic': 'singolare-ar',
        'placeholder_singular_italian': 'singolare-it',
        'placeholder_singular_chinees': 'singolare-ch',
        'placeholder_plural_english': 'plurale-en',
        'placeholder_plural_french': 'plurale-fr',
        'placeholder_plural_spanish': 'plurale-es',
        'placeholder_plural_german': 'plurale-de',
        'placeholder_plural_arabic': 'plurale-ar',
        'placeholder_plural_italian': 'plurale-it',
        'placeholder_plural_chinees': 'plurale-ch',


        //validation
        'invalid_module_name': `Inserisci il nome del ${module_singular}`,
        'invalid_module_url': `Inserisci l'URL del ${module_singular}`,
        'invalid_module_icon': `Inserisci l'icona del ${module_singular}`,
        'invalid_module_slug': `Inserisci lo slug del ${module_singular}`,
        'invalid_sort_order': `Inserisci l'ordine di ordinamento`,
        'invalid_singular_english': `Inserisci il singolare in inglese`,
        'invalid_singular_french': `Inserisci il singolare in francese`,
        'invalid_singular_spanish': `Inserisci il singolare in spagnolo`,
        'invalid_singular_german': `Inserisci il singolare in tedesco`,
        'invalid_singular_arabic': `Inserisci il singolare in arabo`,
        'invalid_singular_italian': `Inserisci il singolare in italiano`,
        'invalid_singular_chinees': `Inserisci il singolare in cinese`,
        'invalid_plural_english': `Inserisci il plurale in inglese`,
        'invalid_plural_french': `Inserisci il plurale in francese`,
        'invalid_plural_spanish': `Inserisci il plurale in spagnolo`,
        'invalid_plural_german': `Inserisci il plurale in tedesco`,
        'invalid_plural_arabic': `Inserisci il plurale in arabo`,
        'invalid_plural_italian': `Inserisci il plurale in italiano`,
        'invalid_plural_chinees': `Inserisci il plurale in cinese`,
    }

    return moduleIt
}

export default moduleItTrans 