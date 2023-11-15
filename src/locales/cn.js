import companyCn from "./company/cn"
import moduleCn from "./module/cn"
import designationCn from "./Designation/cn"
import userRoleCn from "./UserRole/cn"
import userCn from "./User/cn"
import emailTempCn from "./EmailTemplate/cn"
import { moduleIds } from "../Components/constants/modulesIds"


const globalTrans = {
    'btn_submit': '提交',
    'btn_archive': '是的，归档',
    'btn_activate': '是的，激活',
    'btn_close': '关闭',
    'btn_update_details': '更新详情',
    'msg_well_done': '做得好',
    'msg_no_data_available': '没有可用数据',
    'msg_no_data_matched': '没有匹配的数据',
    'are_you_sure': '您确定吗',
    'view': '查看',
    'edit': '编辑',
    'add': '添加',
    'set_as_default': '设为默认',
    'archive': '归档',
    're_activate': '重新激活',
    'search': '搜索',
    'reset': '重置',
    'filter': '筛选',
    'url': '网址',
    'icon': '图标',
    'slug': '短标识',
    'sort_order': '排序顺序',
    'feature': '特性',
    'created_at': '创建于',
    'updated_at': '更新于',
    'action': '操作',
    'default': '默认',
    'save': '保存',
    'close': '关闭',
    'next': '下一步',
    'permission': '权限',
    'access_denied': '您无权访问此页面，请联系您的公司管理员',
    'go_to_dashboard': '前往仪表盘',
    'title': '标题',
    'profile': '个人资料',
    'display_name': '显示名称',
    'full_name': '全名',
    'event': '事件',
    'subject': '主题',

    'customizer': '自定义',
    'layout': '布局',
    'choose_layout': '选择您的布局',
    'vertical': '垂直',
    'horizontal': '水平',
    'two_column': '两列',
    'semi_box': '半框',
    'color_scheme': '颜色方案',
    'choose_color_scheme': '选择浅色或深色方案',
    'light': '浅色',
    'dark': '深色',
    'sidebar_visibility': '侧边栏可见性',
    'choose_sidebar_visibility': '选择显示或隐藏侧边栏',
    'show': '显示',
    'hidden': '隐藏',
    'layout_width': '布局宽度',
    'choose_layout_width': '选择流式或盒状布局',
    'fluid': '流式',
    'boxed': '盒状',
    'layout_position': '布局位置',
    'choose_layout_position': '选择固定或可滚动的布局位置',
    'fixed': '固定',
    'scrollable': '可滚动',
    'top_color': '顶部栏颜色',
    'choose_top_color': '选择浅色或深色顶部栏颜色',
    'sidebar_size': '侧边栏尺寸',
    'choose_sidebar_size': '选择侧边栏尺寸',
    'compact': '紧凑',
    'icon_view': '小尺寸（图标视图）',
    'hover_view': '小尺寸悬停视图',
    'sidebar_view': '侧边栏视图',
    'choose_sidebar_view': '选择默认或独立侧边栏视图',
    'detach': '独立',
    'sidebar_color': '侧边栏颜色',
    'choose_sidebar_color': '选择浅色或深色侧边栏颜色',
    'gradient': '渐变',
    'sidebar_imgs': '侧边栏图片',
    'choose_sidebar_imgs': '选择侧边栏图片',
    'preloader': '预加载',
    'choose_preloader': '选择预加载器',
    'enable': '启用',
    'disable': '禁用',

    // 验证
    'mandatory_feild': '此字段为必填项',
    'min_8_required': '至少需要8个字符',
    'pattren_mismatch': '输入与模式不匹配',
};


const getCnTrans = (translations) => {


    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-cn`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-cn`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-cn`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-cn`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-cn`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-cn`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-cn`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-cn`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-cn`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-cn`] : '';
    return {
        ...companyCn(company_singular, company_plural),
        ...moduleCn(module_singular, module_plural),
        ...designationCn(designation_singular, designation_plural),
        ...userRoleCn(user_role_singular, user_role_plural),
        ...userCn(user_singular, user_plural),
        ...emailTempCn(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getCnTrans