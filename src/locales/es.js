import companyEs from "./company/es"
import moduleEs from "./module/es"
import designationEs from "./Designation/es"
import userRoleEs from "./UserRole/es"
import userEs from "./User/es"
import emailTempEs from "./EmailTemplate/es"
import { moduleIds } from "../Components/constants/modulesIds"


const globalTrans = {
    'btn_submit': 'Enviar',
    'btn_archive': 'Sí, archivar',
    'btn_activate': 'Sí, activar',
    'btn_close': 'Cerrar',
    'btn_update_details': 'Actualizar detalles',
    'msg_well_done': '¡Bien hecho!',
    'msg_no_data_available': 'No hay datos disponibles',
    'msg_no_data_matched': 'No se encontraron datos coincidentes',
    'are_you_sure': '¿Estás seguro?',
    'view': 'Ver',
    'edit': 'Editar',
    'add': 'Agregar',
    'set_as_default': 'Establecer como predeterminado',
    'archive': 'Archivar',
    're_activate': 'Reactivar',
    'search': 'Buscar',
    'reset': 'Restablecer',
    'filter': 'Filtrar',
    'url': 'URL',
    'icon': 'Ícono',
    'slug': 'Slug',
    'sort_order': 'Orden de clasificación',
    'feature': 'Característica',
    'created_at': 'Creado en',
    'updated_at': 'Actualizado el',
    'action': 'Acción',
    'default': 'Predeterminado',
    'save': 'Guardar',
    'close': 'Cerrar',
    'next': 'Siguiente',
    'permission': 'Permiso',
    'access_denied': 'Acceso denegado. Por favor, contacta al administrador de tu empresa',
    'go_to_dashboard': 'Ir al panel de control',
    'title': 'Título',
    'profile': 'Perfil',
    'display_name': 'Nombre de visualización',
    'full_name': 'Nombre completo',
    'event': 'Evento',
    'subject': 'Asunto',

    'customizer': 'Personalizador',
    'layout': 'Diseño',
    'choose_layout': 'Elige tu diseño',
    'vertical': 'Vertical',
    'horizontal': 'Horizontal',
    'two_column': 'Dos columnas',
    'semi_box': 'Semibloque',
    'color_scheme': 'Esquema de colores',
    'choose_color_scheme': 'Elige un esquema de colores claro u oscuro',
    'light': 'Claro',
    'dark': 'Oscuro',
    'sidebar_visibility': 'Visibilidad de la barra lateral',
    'choose_sidebar_visibility': 'Elige si la barra lateral debe mostrarse u ocultarse',
    'show': 'Mostrar',
    'hidden': 'Oculto',
    'layout_width': 'Ancho del diseño',
    'choose_layout_width': 'Elige un diseño fluido o de ancho fijo',
    'fluid': 'Fluido',
    'boxed': 'De ancho fijo',
    'layout_position': 'Posición del diseño',
    'choose_layout_position': 'Elige si el diseño debe ser fijo o desplazable',
    'fixed': 'Fijo',
    'scrollable': 'Desplazable',
    'top_color': 'Color de la barra superior',
    'choose_top_color': 'Elige un color claro u oscuro para la barra superior',
    'sidebar_size': 'Tamaño de la barra lateral',
    'choose_sidebar_size': 'Elige el tamaño de la barra lateral',
    'compact': 'Compacto',
    'icon_view': 'Vista de iconos (tamaño pequeño)',
    'hover_view': 'Vista al pasar el cursor (tamaño pequeño)',
    'sidebar_view': 'Vista de la barra lateral',
    'choose_sidebar_view': 'Elige la vista predeterminada o independiente de la barra lateral',
    'detach': 'Separar',
    'sidebar_color': 'Color de la barra lateral',
    'choose_sidebar_color': 'Elige un color claro u oscuro para la barra lateral',
    'gradient': 'Degradado',
    'sidebar_imgs': 'Imágenes de la barra lateral',
    'choose_sidebar_imgs': 'Elige una imagen para la barra lateral',
    'preloader': 'Precargador',
    'choose_preloader': 'Elige un precargador',
    'enable': 'Habilitar',
    'disable': 'Deshabilitar',

    // Validación
    'mandatory_feild': 'Este campo es obligatorio',
    'min_8_required': 'Se requieren al menos 8 caracteres',
    'pattren_mismatch': 'La entrada no coincide con el patrón',
};

const getEsTrans = (translations) => {


    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-es`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-es`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-es`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-es`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-es`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-es`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-es`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-es`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-es`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-es`] : '';
    return {
        ...companyEs(company_singular, company_plural),
        ...moduleEs(module_singular, module_plural),
        ...designationEs(designation_singular, designation_plural),
        ...userRoleEs(user_role_singular, user_role_plural),
        ...userEs(user_singular, user_plural),
        ...emailTempEs(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getEsTrans