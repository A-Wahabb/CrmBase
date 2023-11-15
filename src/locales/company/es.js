const companyEsTrans = (company_singular, company_plural) => {

    const companyEs = {
        'company_singular': company_singular,
        'company_plural': company_plural,
        'all_companies': company_plural,
        'company_add_btn': `Agregar ${company_singular}`,
        'company_edit_btn': `Editar ${company_singular}`,
        'company_page_title': `${company_plural}`,
        'company_detail': `Detalles de ${company_singular}`,
        'setup_new_company': `Configurar nueva ${company_singular}`,
        'add_company_modal_title': 'Proporcionar detalles para comenzar',
        'Hours': 'Horas',
        'archive_company_btn': `Archivar ${company_plural}`,
        'active_company_btn': `Activar ${company_plural}`,
        'switch_company': `Cambiar ${company_singular}`,
        'switched_company': `Ya cambiado`,
        'created_date': `Fecha de creación`,



        //messages
        'msg_company_added_successfully': `Tu ${company_singular} se ha agregado correctamente`,
        'msg_company_updated_successfully': `Tu ${company_singular} se ha actualizado correctamente`,
        'msg_file_size_exceed': 'Solo se permiten archivos de menos de 2MB',
        'msg_sure_to_active_this_company': `¿Estás seguro de que quieres activar este ${company_singular}?`,
        'msg_sure_to_archive_this_company': `¿Estás seguro de que quieres archivar este ${company_singular}?`,
        'msg_company_activated': `${company_singular} activado correctamente`,
        'msg_company_archived': `${company_singular} archivado correctamente`,

        //label
        'label_searh_company': `buscar por nombre`,
        'label_company_name': `Nombre de ${company_singular}`,
        'label_upload': 'Cargar',
        'label_reset': 'Restablecer',
        'label_country': 'País',
        'label_date_format': 'Formato de fecha',
        'label_time_format': 'Formato de hora',
        'label_description': 'Descripción',
        'label_back_to_general': 'Volver a General',


        //placeholder
        'placeholder_company_name': `Ingresa el nombre de ${company_singular}`,
        'placeholder_search_country': 'Buscar país',
        'placeholder_date_format': 'Seleccionar formato de fecha',
        'placeholder_time_format': 'Seleccionar formato de hora',
        'placeholder_description': 'Proporcionar descripción',


        //validations
        'invalid_company_name': `Ingresa el nombre de ${company_singular}`,
        'invalid_date_format': 'Selecciona un formato de fecha',
        'invalid_time_format': 'Selecciona un formato de hora',
        'invalid_description': 'Proporciona una descripción válida',
    };

    return companyEs
}





export default companyEsTrans