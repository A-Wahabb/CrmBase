const moduleEnTrans = (module_singular, module_plural) => {

    const moduleEn = {
        'module_singular': module_singular,
        'module_plural': module_plural,
        'all_module': module_plural,
        'module_add_btn': `Add ${module_singular}`,
        'module_edit_btn': `Edit ${module_singular}`,
        'module_page_title': `${module_plural}`,
        'msg_sure_to_active_this_module': `Are you sure you want to Active this ${module_singular}`,
        'msg_sure_to_archive_this_module': `Are you sure you want to Archive this ${module_singular}`,
        'msg_module_activated': `${module_singular} Activated Successfully`,
        'msg_module_archived': `${module_singular} Archived Successfully`,
        'msg_module_added_successfully': `${module_singular} Added Successfully`,
        'msg_module_updated_successfully': `${module_singular} Updated Successfully`,




        //label
        'label_module_type': `${module_singular} Type`,
        'label_static_module': `Static`,
        'label_dynamic_module': `Dynamic`,
        'label_parent_module': `Parent ${module_singular} (If Applicable)`,
        'label_module_name': `${module_singular} Name`,
        'label_module_url': `${module_singular} URL`,
        'label_module_icon': `${module_singular} Icon`,
        'label_module_slug': `${module_singular} Slug`,
        'label_show_menu': 'Show Menu',
        'label_sort_order': 'Sort Order',
        'label_readable': `Readable`,
        'label_editable': 'Editable',
        'label_writeable': 'Writeable',
        'label_deleteable': 'Deleteable',
        'label_unreadable': `Unreadable`,
        'label_uneditable': 'Uneditable',
        'label_unwriteable': 'Unwriteable',
        'label_undeleteable': 'Undeleteable',
        'label_singular_english': 'Singular English',
        'label_singular_french': 'Singular French',
        'label_singular_spanish': 'Singular Spanish',
        'label_singular_german': 'Singular German(Deutschland)',
        'label_singular_arabic': 'Singular Arabic',
        'label_singular_italian': 'Singular Italian',
        'label_singular_chinees': 'Singular Chinees',
        'label_plural_english': 'Plural English',
        'label_plural_french': 'Plural French',
        'label_plural_spanish': 'Plural Spanish',
        'label_plural_german': 'Plural German(Deutschland)',
        'label_plural_arabic': 'Plural Arabic',
        'label_plural_italian': 'Plural Italian',
        'label_plural_chinees': 'Plural Chinees',


        //placeholder
        'placeholder_module_name': `${module_singular} Name`,
        'placeholder_module_url': `${module_singular} URL`,
        'placeholder_module_icon': `${module_singular} Icon`,
        'placeholder_module_slug': `${module_singular} Slug`,
        'placeholder_sort_order': 'Sort Order',
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
        'invalid_module_name': `Enter ${module_singular} Name`,
        'invalid_module_url': `Enter ${module_singular} URL`,
        'invalid_module_icon': `Enter ${module_singular} Icon`,
        'invalid_module_slug': `Enter ${module_singular} Slug`,
        'invalid_sort_order': 'Enter Sort Order',
        'invalid_singular_english': 'Enter Singular English',
        'invalid_singular_french': 'Enter Singular French',
        'invalid_singular_spanish': 'Enter Singular Spanish',
        'invalid_singular_german': 'Enter Singular German(Deutschland)',
        'invalid_singular_arabic': 'Enter Singular Arabic',
        'invalid_singular_italian': 'Enter Singular Italian',
        'invalid_singular_chinees': 'Enter Singular Chinees',
        'invalid_plural_english': 'Enter Plural English',
        'invalid_plural_french': 'Enter Plural French',
        'invalid_plural_spanish': 'Enter Plural Spanish',
        'invalid_plural_german': 'Enter Plural German(Deutschland)',
        'invalid_plural_arabic': 'Enter Plural Arabic',
        'invalid_plural_italian': 'Enter Plural Italian',
        'invalid_plural_chinees': 'Enter Plural Chinees',
    }

    return moduleEn
}


export default moduleEnTrans 