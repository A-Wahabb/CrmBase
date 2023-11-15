const designationEsTrans = (designation_singular, designation_plural) => {

    const designationEs = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `Agregar ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `Editar ${designation_singular}`,
        'archive_designation_btn': `Archivar ${designation_plural}`,
        'active_designation_btn': `Activar ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `Se agregó correctamente el ${designation_singular}`,
        'msg_designation_updated_successfully': `Se actualizó correctamente el ${designation_singular}`,
        'msg_sure_to_active_this_designation': `¿Estás seguro de que deseas activar este ${designation_singular}?`,
        'msg_sure_to_archive_this_designation': `¿Estás seguro de que deseas archivar este ${designation_singular}?`,
        'msg_designation_activated': `${designation_singular} activado correctamente`,
        'msg_designation_archived': `${designation_singular} archivado correctamente`,

        //label
        'label_designation_title': `Título de ${designation_singular}`,
        'label_add_designation': `Agregar ${designation_singular}`,
        'label_add_more_designation': `Agregar más ${designation_singular}`,
        'label_designation_sort_order': `Orden de clasificación de ${designation_singular}`,
        'label_select_designation': `Seleccionar ${designation_singular}`,

        //validation
        'invalid_designation_title': `Ingresa el ${designation_singular}`,
        'invalid_designation_sort_order': `Ingresa el orden de clasificación de ${designation_singular}`,

        //placeholder
        'placeholder_designation_title': `Ingresa el nombre de ${designation_singular}`,
    };

    return designationEs
}





export default designationEsTrans 