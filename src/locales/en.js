import designationEn from "./Designation/en"
import userRoleEn from "./UserRole/en"
import userEn from "./User/en"
import emailTempEn from "./EmailTemplate/en"
import { moduleIds } from "../Components/constants/modulesIds"
let companyEn = require("./company/en").default
let moduleEn = require('./module/en').default
let vrible = 'new'

let globalTrans = {

    'btn_submit': 'Submit',
    'btn_archive': 'Yes, Archive it',
    'btn_activate': 'Yes, Activate it',
    'btn_close': 'Close',
    'btn_update_details': 'Update Details',
    'msg_well_done': 'Well Done',
    'msg_no_data_available': 'No Data Available',
    'msg_no_data_matched': 'No Data Matched',
    'are_you_sure': 'Are You Sure',
    'view': 'View',
    'edit': 'Edit',
    'add': 'Add',
    'set_as_default': 'Set as default',
    'archive': 'Archive',
    're_activate': 'Re-Activate',
    'search': 'Search',
    'reset': 'Reset',
    'filter': 'Filter',
    'url': 'Url',
    'icon': 'Icon',
    'slug': 'Slug',
    'sort_order': 'Sort Order',
    'feature': 'Feature',
    'created_at': 'Created At',
    'updated_at': 'Updated At',
    'action': 'Action',
    'default': 'Default',
    'save': 'Save',
    'close': 'Close',
    'next': 'Next',
    'permission': 'Permissions',
    'access_denied': 'You are not allowed to access this page, Contact your company admin',
    'go_to_dashboard': 'Go to Dasboard',
    'title': 'Title',
    'profile': 'Profile',
    'display_name': 'Display Name',
    'full_name': 'Full Name',
    'event': 'Event',
    'subject': 'Subject',
    'dashboard': 'Dashboard', //To be

    'customizer': 'Customizer',
    'layout': 'Layout',
    'choose_layout': 'Choose your layout',
    'vertical': 'Vertical',
    'horizontal': 'Horizontal',
    'two_column': 'Two Column',
    'semi_box': 'Semi Box',
    'color_scheme': 'Color Scheme',
    'choose_color_scheme': 'Choose Light or Dark Scheme',
    'light': 'Light',
    'dark': 'Dark',
    'sidebar_visibility': 'Sidebar Visibility',
    'choose_sidebar_visibility': 'Choose show or Hidden sidebar',
    'show': 'Show',
    'hidden': 'Hidden',
    'layout_width': 'Layout Width',
    'choose_layout_width': 'Choose Fluid or Boxed layout',
    'fluid': 'Fluid',
    'boxed': 'Boxed',
    'layout_position': 'Layout Position',
    'choose_layout_position': 'Choose Fixed or Scrollable Layout Position',
    'fixed': 'Fixed',
    'scrollable': 'Scrollable',
    'top_color': 'Topbar Color',
    'choose_top_color': 'Choose Light or Dark Topbar Color.',
    'sidebar_size': 'Sidebar Size',
    'choose_sidebar_size': 'Choose a size of Sidebar.',
    'compact': 'Compact',
    'icon_view': 'Small (Icon View)',
    'hover_view': 'Small Hover View',
    'sidebar_view': 'Sidebar View',
    'choose_sidebar_view': 'Choose Default or Detached Sidebar view.',
    'detach': 'Detached',
    'sidebar_color': 'Sidebar Color',
    'choose_sidebar_color': 'Choose Light or Dark Sidebar Color.',
    'gradient': 'Gradient',
    'sidebar_imgs': 'Sidebar Images',
    'choose_sidebar_imgs': 'Choose a Images for Sidebar.',
    'preloader': 'Preloader',
    'choose_preloader': 'Choose a preloader.',
    'enable': 'Enable',
    'disable': 'Disable',




    // validation
    'mandatory_feild': 'This Feild is Required',
    'min_8_required': 'Minimmum 8 Characters are required',
    'pattren_mismatch': 'Input doesnot match the pattern',

}


const getEngTrans = (translations) => {


    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-en`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-en`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-en`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-en`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-en`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-en`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-en`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-en`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-en`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-en`] : '';
    return {
        ...companyEn(company_singular, company_plural),
        ...moduleEn(module_singular, module_plural),
        ...designationEn(designation_singular, designation_plural),
        ...userRoleEn(user_role_singular, user_role_plural),
        ...userEn(user_singular, user_plural),
        ...emailTempEn(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getEngTrans