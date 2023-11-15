const userEsTrans = (user_singular, user_plural) => {

    const userEs = {
        'user_singular': user_singular,
        'user_plural': user_plural,
        'all_users': user_plural,
        'user_add_btn': `Agregar ${user_singular}`,
        'user_page_title': `${user_plural}`,
        'user_edit_btn': `Editar ${user_singular}`,
        'user_view_btn': `Ver ${user_singular}`,
        'archive_user_btn': `Archivar ${user_plural}`,
        'active_user_btn': `Activar ${user_plural}`,

        'btn_step': 'Paso',
        'btn_general_info': 'Información General',
        'btn_fill_all_information_below': 'Completa toda la información a continuación',
        'btn_additional_info': 'Información Adicional',
        'btn_set_password': 'Establecer Contraseña',
        'btn_save_next': 'Guardar y Continuar',

        'msg_user_added_successfully': `Tu ${user_singular} se ha agregado correctamente`,
        'msg_user_updated_successfully': `Tu ${user_singular} se ha actualizado correctamente`,
        'msg_file_size_exceed': 'Solo se permiten archivos de menos de 2MB',
        'msg_sure_to_active_this_user': `¿Estás seguro de que quieres activar este ${user_singular}?`,
        'msg_sure_to_archive_this_user': `¿Estás seguro de que quieres archivar este ${user_singular}?`,
        'msg_user_activated': `${user_singular} activado correctamente`,
        'msg_user_archived': `${user_singular} archivado correctamente`,

        'label_user_first_name': `Ingresa el Primer Nombre de ${user_singular}`,
        'label_user_last_name': `Ingresa el Apellido de ${user_singular}`,
        'label_user_email': `Ingresa el Correo Electrónico de ${user_singular}`,
        'label_user_phone': `Ingresa el Número de Teléfono de ${user_singular}`,
        'label_set_password': 'Establecer Contraseña',
        'label_password': 'Contraseña',
        'label_cnfrm_password': 'Confirmar Contraseña',
        'label_male': 'Masculino',
        'label_female': 'Femenino',
        'label_other': 'Otro',
        'label_state': 'Estado',
        'label_city': 'Ciudad',
        'label_gender': 'Género',
        'label_variables': 'Variables',

        'placeholder_first_name': `Primer Nombre`,
        'placeholder_middle_name': `Segundo Nombre`,
        'placeholder_last_name': `Apellido`,
        'placeholder_display_name': `Nombre a Mostrar`,
        'placeholder_email': `Correo Electrónico`,
        'placeholder_phone': `Número de Teléfono`,
        'placeholder_dob': `Fecha de Nacimiento`,
        'placeholder_gender': `Selecciona Género`,
        'placeholder_search_state': `Buscar Estado`,
        'placeholder_search_city': `Buscar Ciudad`,
        'placeholder_street_address': `Dirección`,
        'placeholder_post_code': `Código Postal`,
        'placeholder_emergency_contact_name': `Nombre del Contacto de Emergencia`,
        'placeholder_emergency_contact_phone': `Número del Contacto de Emergencia`,
        'placeholder_emergency_contact_relation': `Relación con el Contacto de Emergencia`,

        'invalid_user_first_name': `Ingresa el Primer nombre de ${user_singular}`,
        'invalid_user_last_name': `Ingresa el Apellido de ${user_singular}`,
        'invalid_email': `Ingresa el Correo Electrónico de ${user_singular}`,
        'invalid_phone': `Ingresa el Número de Teléfono de ${user_singular}`,
        'invalid_password': `Establece una Contraseña para ${user_singular}`,
        'invalid_dob': `Ingresa una Fecha de Nacimiento válida`,
        'invalid_gender': 'Género no seleccionado',
        'paswword_does_not_match': 'Las contraseñas no coinciden',
        'invalid_cnfrm_password': 'Confirmar Contraseña',
        'invalid_state': 'Selecciona un Estado',
        'invalid_city': 'Selecciona una Ciudad',
        'invalid_street_address': 'Proporciona una Dirección',
        'invalid_post_code': 'Proporciona un Código Postal',
        'invalid_emergency_contact_name': 'Proporciona el Nombre del Contacto de Emergencia',
        'invalid_emergency_contact_phone': 'Proporciona el Número del Contacto de Emergencia',
        'invalid_emergency_contact_relation': 'Proporciona la Relación con el Contacto de Emergencia',
    };
    return userEs
}





export default userEsTrans 