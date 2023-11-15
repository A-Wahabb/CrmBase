const moduleEsTrans = (module_singular, module_plural) => {

    const moduleEs = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `Agregar ${module_singular}`,
        'module_edit_btn': `Editar ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `¿Estás seguro de que quieres activar este ${module_singular}?`,
        'msg_sure_to_archive_this_module': `¿Estás seguro de que quieres archivar este ${module_singular}?`,
        'msg_module_activated': `${module_singular} activado correctamente`,
        'msg_module_archived': `${module_singular} archivado correctamente`,
        'msg_module_added_successfully': `${module_singular} añadido correctamente`,
        'msg_module_updated_successfully': `${module_singular} actualizado correctamente`,

        //label
        'label_module_type': `Tipo de ${module_singular} `,
        'label_static_module': `Estático`,
        'label_dynamic_module': `Dinámico`,
        'label_parent_module': `Módulo padre de ${module_singular} (si aplica)`,
        'label_module_name': `Nombre del ${module_singular} `,
        'label_module_url': `URL del ${module_singular} `,
        'label_module_icon': `Icono del ${module_singular} `,
        'label_module_slug': `Slug del ${module_singular} `,
        'label_show_menu': 'Mostrar menú',
        'label_sort_order': 'Orden de clasificación',
        'label_readable': `Legible`,
        'label_editable': 'Editable',
        'label_writeable': 'Escribible',
        'label_deleteable': 'Eliminable',
        'label_unreadable': `No legible`,
        'label_uneditable': 'No editable',
        'label_unwriteable': 'No escribible',
        'label_undeleteable': 'No eliminable',
        'label_singular_english': 'Singular - Inglés',
        'label_singular_french': 'Singular - Francés',
        'label_singular_spanish': 'Singular - Español',
        'label_singular_german': 'Singular - Alemán',
        'label_singular_arabic': 'Singular - Árabe',
        'label_singular_italian': 'Singular - Italiano',
        'label_singular_chinees': 'Singular - Chino',
        'label_plural_english': 'Plural - Inglés',
        'label_plural_french': 'Plural - Francés',
        'label_plural_spanish': 'Plural - Español',
        'label_plural_german': 'Plural - Alemán',
        'label_plural_arabic': 'Plural - Árabe',
        'label_plural_italian': 'Plural - Italiano',
        'label_plural_chinees': 'Plural - Chino',


        //placeholder
        'placeholder_module_name': `Nombre del ${module_singular} `,
        'placeholder_module_url': `URL del ${module_singular} `,
        'placeholder_module_icon': `Icono del ${module_singular} `,
        'placeholder_module_slug': `Slug del ${module_singular}`,
        'placeholder_sort_order': 'Orden de clasificación',
        'placeholder_singular_english': 'singular-en',
        'placeholder_singular_french': 'singular-fr',
        'placeholder_singular_spanish': 'singular-es',
        'placeholder_singular_german': 'singular-de',
        'placeholder_singular_arabic': 'singular-ar',
        'placeholder_singular_italian': 'singular-it',
        'placeholder_singular_chinees': 'singular-ch',
        'placeholder_plural_english': 'plural-en',
        'placeholder_plural_french': 'plural-fr',
        'placeholder_plural_spanish': 'plural-es',
        'placeholder_plural_german': 'plural-de',
        'placeholder_plural_arabic': 'plural-ar',
        'placeholder_plural_italian': 'plural-it',
        'placeholder_plural_chinees': 'plural-ch',


        //validation
        'invalid_module_name': `Ingresa el nombre de ${module_singular}`,
        'invalid_module_url': `Ingresa la URL de ${module_singular}`,
        'invalid_module_icon': `Ingresa el ícono de ${module_singular}`,
        'invalid_module_slug': `Ingresa el slug de ${module_singular}`,
        'invalid_sort_order': 'Ingresa el orden de clasificación',
        'invalid_singular_english': 'Ingresa el singular en inglés',
        'invalid_singular_french': 'Ingresa el singular en francés',
        'invalid_singular_spanish': 'Ingresa el singular en español',
        'invalid_singular_german': 'Ingresa el singular en alemán (Alemania)',
        'invalid_singular_arabic': 'Ingresa el singular en árabe',
        'invalid_singular_italian': 'Ingresa el singular en italiano',
        'invalid_singular_chinees': 'Ingresa el singular en chino',
        'invalid_plural_english': 'Ingresa el plural en inglés',
        'invalid_plural_french': 'Ingresa el plural en francés',
        'invalid_plural_spanish': 'Ingresa el plural en español',
        'invalid_plural_german': 'Ingresa el plural en alemán (Alemania)',
        'invalid_plural_arabic': 'Ingresa el plural en árabe',
        'invalid_plural_italian': 'Ingresa el plural en italiano',
        'invalid_plural_chinees': 'Ingresa el plural en chino',
    }

    return moduleEs
}





export default moduleEsTrans 