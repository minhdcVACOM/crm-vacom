import { StyleSheet } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const styles = StyleSheet.create({
  headerLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E53935',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999'
  },
  default: {
    fontSize: 14
  },
  subText: {
    fontSize: 14,
    color: '#999'
  },
  error: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#E53935"
  }
});
export const VcConstant = {
  colors: {
    primary: '#E53935',
    primaryLight: '#fcebeb',
    primaryDark: '#9e1714',
    secondary: '#f5f5f5',
    white: '#fff',
    black: '#000',
    red: '#E53935',
    blue: "#3498db",
    green: "#2ecc71",
    orange: "#FF8C00",
    yellow: "#f39c12",
    purple: "#967aa1",
    gray: "#a9a9a9",
    grayLight: "#d3d3d3",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
    question: "#9C27B0"
  },
  layout: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    gap: 10,
    padding: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    opacity: 0.6
  },
  stylesText: (type?: 'default' | 'headerLarge' | 'header' | 'subHeader' | 'title' | 'subTitle' | 'subText' | 'error') => {
    const styleMap: { [key: string]: keyof typeof styles } = {
      default: 'default',
      headerLarge: 'headerLarge',
      header: 'header',
      subHeader: 'subHeader',
      title: 'title',
      subTitle: 'subTitle',
      subText: 'subText',
      error: 'error'
    };
    return styles[styleMap[type || 'default']];
  }
};
export const VcApi = {
  urlBase: "http://crm.vacom.vn",
  keyStorage: {
    infoLogin: "INFO_LOGIN",
    token: "TOKEN",
    tenant: "TENANT",
    orgCode: "ORG_CODE",
    urlBase: "URL_BASE"
  },
  api: {
    login: {
      getTenantByName: "/api/abp/multi-tenancy/tenants/by-name/",
      postToken: "/connect/token",
      getListOrgUnit: "/api/app/org-unit/select-to-login",
      getUserPic: "/api/app/user/user-pic",
      postSendOtp: "/api/app/user/request-otp-code",
      postRecoverPass: "/api/app/user/recover-pass"
    },
    window: {
      dataParam: {
        windowId: null,
        menuId: null,
        quickSearch: "",
        start: 0,
        count: 20,
        continue: null,
        filterRows: [],
        filterAdvanced: null,
        tlbparam: []
      },
      post: "/api/app/data-object",
      postPages: "/api/app/data-object/pages",
      getById: "/api/app/data-object/by-id/",
      putById: "/api/app/data-object/",
      deleteById: "/api/app/data-object/",
      getConfigByMenuId: "/api/app/window/config-by-menu-id/",
      postPrint: "/api/app/print-template"
    },
    setting: {
      getCurrentRole: "/api/app/user/current-role",
      getCurrentInfo: "/api/app/user/current-info",
      postSaveCurrentInfo: "/api/app/user/save-current-info",
      postChangePassword: "/api/account/my-profile/change-password",
      postDeleteLogo: "/api/app/user/current-pic-delete",
      postUploadLogo: "/api/app/user/upload-pic"
    },
    ref: {
      getUser: "/api/app/user/data-reference",
      getDepartments: "/api/app/data-object/data-reference?name=Departments&orderby=code&refid=646f28a7163b075e01b935c3&fieldsW=tenantId,orgId",
      getPositions: "/api/app/data-object/data-reference?name=Positions&orderby=code&refid=646f2bdb163b075e01b935c9&fieldsW=tenantId,orgId",
      getSoftwareTypes: "/api/app/data-object/data-reference?name=SoftwareTypes&orderby=code&refid=64d5cdecbc2470bc11c2e530",
    }
  }
}
export const VcLayout = {

}