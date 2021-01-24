import * as URL from "@constants/url";
import OutlineReceiptIcon from "@images/icons/OutlineReceiptIcon";
import OutlineRestoreIcon from "@images/icons/OutlineRestoreIcon";
import OutlineSettingsIcon from "@images/icons/OutlineSettingsIcon";
import OpenInNew from "@material-ui/icons/OpenInNew";
import HelpOutLine from "@material-ui/icons/HelpOutline";
import { MenuItemList } from "@constants/menu";

const MENU_ITEM_LIST_SHISETSUNYUSHO: MenuItemList = [
  {
    title: "利用実績",
    to: URL.REPORT,
    icon: OutlineRestoreIcon,
    selectedPattern: `^${URL.REPORT}.*$`
  },
  {
    title: "請求",
    to: URL.DOWNLOAD,
    icon: OutlineReceiptIcon
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
      },
      { title: "初期設定情報", to: URL.INITIAL }
    ]
  },
  {
    title: "ヘルプ",
    icon: HelpOutLine,
    to: "",
    children: [
      {
        title: "操作マニュアル",
        to: URL.SHISETSUNYUSHO_MANUAL_URL,
        target: "_blank",
        rightIcon: OpenInNew
      },
      {
        title: "お問い合わせ",
        to: URL.CONTACT,
        target: "_blank",
        rightIcon: OpenInNew
      }
    ]
  }
];

export default MENU_ITEM_LIST_SHISETSUNYUSHO;
