const userRoleEsTrans = (user_role_singular, user_role_plural) => {

    const userRoleEs = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `Agregar ${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `Editar ${user_role_singular}`,
        'archive_user_role_btn': `Archivar ${user_role_plural}`,
        'active_user_role_btn': `Activar ${user_role_plural}`,
        'user_role_edit_permissions_btn': `Editar permisos de ${user_role_plural}`,

        //mensajes
        'msg_user_role_added_successfully': `Tu ${user_role_singular} se ha agregado correctamente`,
        'msg_user_role_updated_successfully': `Tu ${user_role_singular} se ha actualizado correctamente`,
        'msg_user_role_permission_updated_successfully': `Los permisos de tu ${user_role_singular} se han actualizado correctamente`,
        'msg_sure_to_active_this_user_role': `¿Estás seguro/a de que deseas activar este ${user_role_singular}?`,
        'msg_sure_to_archive_this_user_role': `¿Estás seguro/a de que deseas archivar este ${user_role_singular}?`,
        'msg_user_role_activated': `${user_role_singular} activado/a correctamente`,
        'msg_user_role_archived': `${user_role_singular} archivado/a correctamente`,

        //etiqueta
        'label_user_role_title': `Título de ${user_role_singular}`,
        'label_add_user_role': `Agregar ${user_role_singular}`,
        'label_add_more_user_role': `Agregar más ${user_role_singular}`,
        'label_user_role_description': `Descripción de ${user_role_singular}`,
        'label_select_user_role': `Seleccionar ${user_role_singular}`,

        //validación
        'invalid_user_role_title': `Ingresa el título de ${user_role_singular}`,
        'invalid_user_role_description': `Ingresa la descripción de ${user_role_singular}`,
        'invalid_user_role': `Selecciona ${user_role_singular}`,

        //espacio reservado
        'placeholder_user_role_title': `Ingresa el nombre de ${user_role_singular}`,
    };
    return userRoleEs
}

export default userRoleEsTrans 