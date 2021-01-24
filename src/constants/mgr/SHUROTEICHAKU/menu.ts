import * as URL from "@constants/url";
import OutlineReceiptIcon from "@images/icons/OutlineReceiptIcon";
import OutlineRestoreIcon from "@images/icons/OutlineRestoreIcon";
import OutlineSettingsIcon from "@images/icons/OutlineSettingsIcon";
import OpenInNew from "@material-ui/icons/OpenInNew";
import HelpOutLine from "@material-ui/icons/HelpOutline";
import { MenuItemList } from "@constants/menu";

const MENU_ITEM_LIST_SHUROTEICHAKU: MenuItemList = [
  {
    title: "利用実績",
    to: URL.REPORT,
    icon: OutlineRestoreIcon,
    selectedPattern: `^${URL.REPORT}.*$`
  },
  {
    title: "請求",
    to: URL.DOWNLOAD,
    icon: OutlineReceiptIcon,
    selectedPattern: `^${URL.DOWNLOAD}.*$`
  },
  {
    title: "設定",
    icon: OutlineSettingsIcon,
    to: "",
    children: [
      { title: "事業所情報", to: URL.FACILITY, key: "facility" },
      {
        title: "利用者情報",
        to: URL.USERS,
        key: "users",
        selectedPattern: `^${URL.USERS}.*$`
      }
    ]
  },
  {
    title: "ヘルプ",
    icon: HelpOutLine,
    to: "",
    children: [
      {
        title: "操作マニュアル",
        to: URL.SHUROTEICHAKU_MANUAL_URL,
        target: "_blank",
        rightIcon: OpenInNew
      },
      {
        title: "お問い合わせ",
        to: URL.CONTACT,
        rightIcon: OpenInNew
      }
    ]
  }
];

export default MENU_ITEM_LIST_SHUROTEICHAKU;
