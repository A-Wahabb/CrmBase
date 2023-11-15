
import {
  Logout,
  postLogin
} from "../../../helpers/backend_helper";

import { convertPhpToJsDateFormat } from '../../../Components/Common/Functions/DataFormat'

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { logoutProfile, profileSuccess } from "../profile/reducer";
import { setAuthorization } from "../../../helpers/api_helper";
import TranslationSetting from "../../../helpers/TranslationSetting";
import { changeLayout, changeLayoutMode, changeLayoutPosition, changeLayoutWidth, changeLeftsidebarSizeType, changeLeftsidebarViewType, changePreLoader, changeSidebarImageType, changeSidebarTheme, changeSidebarVisibility, changeTopbarTheme } from "../../thunks";
import { setLang } from "../../defaults/reducer";

export const loginUser = (user, history) => async (dispatch) => {
  var formData = new FormData();
  formData.append('email', user.email)
  formData.append('password', user.password)

  try {
    let response = postLogin(formData);

    var data = await response;
    console.log({ data })
    let { user } = data?.data
    if (data) {

      localStorage.setItem("authUserToken", data?.data?.token);
      const { date_format, country_id } = data?.data?.login_company;
      const newData = convertPhpToJsDateFormat(date_format)

      // Save newData to local storage
      localStorage.setItem('loggedInCompany', JSON.stringify({ date_format: newData, country_id }));
      if (data?.success) {
        setAuthorization(data?.data?.token)
        dispatch(profileSuccess({ data: user }))
        dispatch(loginSuccess(data?.message));

        localStorage.setItem("I18N_LANGUAGE", user?.default_lang);
        setLang(user?.default_lang)


        //Layout Setting
        if (user?.user_layout_setting) {
          const { id, user_id, created_at, updated_at, ...setting } = user?.user_layout_setting;
          dispatch(changeLayout(setting?.layout_type))
          dispatch(changeLayoutMode(setting?.layout_mode))
          dispatch(changeTopbarTheme(setting?.topbar_theme_type))
          dispatch(changePreLoader(setting?.preloader_type))

          if (setting?.layout_type == 'semibox') {
            dispatch(changeSidebarVisibility(setting?.sidebar_visibility_type))
          }

          if (setting?.layout_type == 'vertical' || (setting?.layout_type == 'semibox' && setting?.sidebar_visibility_type == 'show')) {
            dispatch(changeLeftsidebarSizeType(setting?.left_sidebar_size_type))
            if (setting?.layout_type !== 'semibox') {
              dispatch(changeLeftsidebarViewType(setting?.left_sidebar_view_type))
            }
          }

          if (setting?.layout_type !== "twocolumn") {
            if (['horizontal', 'vertical'].includes(setting?.layout_type)) {
              dispatch(changeLayoutWidth(setting?.layout_width_type))
              dispatch(changeLeftsidebarSizeType(setting?.layout_width_type == 'boxed' ? "sm-hover" : "lg"));
            }
            dispatch(changeLayoutPosition(setting?.layout_position_type))
          }

          if (['twocolumn', 'vertical'].includes(setting?.layout_type) || (setting?.layout_type == 'semibox' && setting?.sidebar_visibility_type == 'show')) {
            dispatch(changeSidebarTheme(setting?.left_sidebar_type))
            dispatch(changeSidebarImageType(setting?.left_sidebar_image_type))
          }


          localStorage.setItem('SiteSetting', JSON.stringify(setting));
        }

        //translation setting
        let translations = {}
        function getTranslations(obj, prefix) {
          const singularTranslations = {};

          for (const key in obj) {
            if (key !== "id" && key !== "sp_type" && key !== "created_at" && key !== "updated_at") {
              const newKey = `${prefix}-${key}`;
              singularTranslations[newKey] = obj[key];
            }
          }

          return singularTranslations;
        }
        function TranslationArr(arr) {
          arr.map(each => {
            translations = { ...translations, ...getTranslations(each?.get_singular, `singular-${each.id}`), ...getTranslations(each?.get_plural, `plural-${each.id}`) }
            if (each?.children?.length > 0) {
              TranslationArr(each.children)
            }
          })

        }
        TranslationArr(data?.data?.modules)
        localStorage.setItem("localization", JSON.stringify(translations));
        TranslationSetting(translations)

        //menu setting


        function removeEmptyChildItems(data) {
          for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i];
            if (item.childItems && item.childItems.length === 1 && item.childItems[0].label === item.label) {
              data[i] = item.childItems[0];
            }
            if (item.subItems && item.subItems.length === 1 && item.subItems[0].label === item.label) {
              data[i] = item.subItems[0];
            }
            if (item.childItems && item.childItems.length === 0) {
              data.splice(i, 1);
            }
            if (item.subItems && item.subItems.length === 0) {
              data.splice(i, 1);
            }
            if (item.subItems && item.subItems.length > 0) {
              removeEmptyChildItems(item.subItems);
            }
            if (item.childItems && item.childItems.length > 0) {
              removeEmptyChildItems(item.childItems);
            }
          }
        }

        removeEmptyChildItems(data?.data?.sidebar)



        data?.data?.sidebar.unshift({
          id: 0,
          label: 'dashboard',
          icon: 'ri-home-line',
          link: '/home',
          type: 'child',
        })
        if (user.is_super_admin) {
          data?.data?.sidebar.push({
            id: 1,
            label: 'all_module',
            icon: 'ri-sound-module-line',
            link: '/module/list',
            type: 'child',
          })
        }
        localStorage.setItem("menu", JSON.stringify(data?.data?.sidebar))

        dispatch(logoutUserSuccess(false));
        history('/home')
      } else {
        dispatch(apiError(data?.message));
      }

    }
  } catch (error) {
    console.log({ error })
    dispatch(apiError({ data: 'Please Check your Credentials' }));
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    let response = Logout();

    var data = await response;
    console.log({ data })
    if (data.success) {
      dispatch(logoutProfile())
      localStorage.clear();
      dispatch(logoutUserSuccess(true));
      navigate('/login')

    }
  } catch (error) {
    dispatch(apiError(error));
  }
};


export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

