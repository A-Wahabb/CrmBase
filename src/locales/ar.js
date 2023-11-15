import companyAr from "./company/ar"
import moduleAr from "./module/ar"
import designationAr from "./Designation/ar"
import userRoleAr from "./UserRole/ar"
import userAr from "./User/ar"
import emailTempAr from "./EmailTemplate/ar"
import { moduleIds } from "../Components/constants/modulesIds"
const globalTrans = {
    'btn_submit': 'تقديم',
    'btn_archive': 'نعم، قم بالأرشفة',
    'btn_activate': 'نعم، قم بالتفعيل',
    'btn_close': 'إغلاق',
    'btn_update_details': 'تحديث التفاصيل',
    'msg_well_done': 'عمل رائع',
    'msg_no_data_available': 'لا توجد بيانات متاحة',
    'msg_no_data_matched': 'لا توجد بيانات متطابقة',
    'are_you_sure': 'هل أنت متأكد',
    'view': 'عرض',
    'edit': 'تعديل',
    'add': 'إضافة',
    'set_as_default': 'تعيين كافتراضي',
    'archive': 'أرشفة',
    're_activate': 'إعادة تفعيل',
    'search': 'بحث',
    'reset': 'إعادة تعيين',
    'filter': 'تصفية',
    'url': 'رابط',
    'icon': 'أيقونة',
    'slug': 'اسم مختصر',
    'sort_order': 'ترتيب الفرز',
    'feature': 'ميزة',
    'created_at': 'تاريخ الإنشاء',
    'updated_at': 'تم التحديث في',
    'action': 'إجراء',
    'default': 'افتراضي',
    'save': 'حفظ',
    'close': 'إغلاق',
    'next': 'التالي',
    'permission': 'أذونات',
    'access_denied': 'لا يُسمح لك بالوصول إلى هذه الصفحة. يُرجى التواصل مع مسؤول الشركة',
    'go_to_dashboard': 'الانتقال إلى لوحة التحكم',
    'title': 'العنوان',
    'profile': 'الملف الشخصي',
    'display_name': 'اسم العرض',
    'full_name': 'الاسم الكامل',
    'event': 'حدث',
    'subject': 'موضوع',

    'customizer': 'التخصيص',
    'layout': 'التصميم',
    'choose_layout': 'اختر التصميم الخاص بك',
    'vertical': 'عمودي',
    'horizontal': 'أفقي',
    'two_column': 'عمودين',
    'semi_box': 'صندوق شبه',
    'color_scheme': 'مخطط الألوان',
    'choose_color_scheme': 'اختر مخطط الألوان الفاتح أو الداكن',
    'light': 'فاتح',
    'dark': 'داكن',
    'sidebar_visibility': 'ظهور الشريط الجانبي',
    'choose_sidebar_visibility': 'اختر إظهار الشريط الجانبي أو إخفائه',
    'show': 'إظهار',
    'hidden': 'مخفي',
    'layout_width': 'عرض التصميم',
    'choose_layout_width': 'اختر تصميم سلس أو محدود الحجم',
    'fluid': 'سلس',
    'boxed': 'محدود الحجم',
    'layout_position': 'موضع التصميم',
    'choose_layout_position': 'اختر تثبيت التصميم أو تمريره',
    'fixed': 'ثابت',
    'scrollable': 'قابل للتمرير',
    'top_color': 'لون الشريط العلوي',
    'choose_top_color': 'اختر لون الشريط العلوي الفاتح أو الداكن',
    'sidebar_size': 'حجم الشريط الجانبي',
    'choose_sidebar_size': 'اختر حجم للشريط الجانبي',
    'compact': 'مدمج',
    'icon_view': 'صغير (عرض الأيقونة)',
    'hover_view': 'عرضعند التمرير بالمؤشر',
    'sidebar_view': 'عرض الشريط الجانبي',
    'choose_sidebar_view': 'اختر العرض الافتراضي أو العرض المنفصل للشريط الجانبي',
    'detach': 'منفصل',
    'sidebar_color': 'لون الشريط الجانبي',
    'choose_sidebar_color': 'اختر لون الشريط الجانبي الفاتح أو الداكن',
    'gradient': 'تدرج',
    'sidebar_imgs': 'صور الشريط الجانبي',
    'choose_sidebar_imgs': 'اختر صورة للشريط الجانبي',
    'preloader': 'شاشة التحميل',
    'choose_preloader': 'اختر شاشة تحميل',
    'enable': 'تمكين',
    'disable': 'تعطيل',

    // التحقق من الصحة
    'mandatory_feild': 'هذا الحقل مطلوب',
    'min_8_required': 'مطلوب حد أدنى 8 أحرف',
    'pattren_mismatch': 'المدخل لا يتطابق مع النمط',
};


const getArTrans = (translations) => {




    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-ar`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-ar`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-ar`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-ar`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-ar`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-ar`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-ar`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-ar`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-ar`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-ar`] : '';
    return {
        ...companyAr(company_singular, company_plural),
        ...moduleAr(module_singular, module_plural),
        ...designationAr(designation_singular, designation_plural),
        ...userRoleAr(user_role_singular, user_role_plural),
        ...userAr(user_singular, user_plural),
        ...emailTempAr(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getArTrans