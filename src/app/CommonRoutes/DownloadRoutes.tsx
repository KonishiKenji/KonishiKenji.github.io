import * as React from "react";
import AdminRoute from "@app/Auth/AdminRoute";

import Download from "@components/pages/download/Download";
import JissekiPrint from "@components/pages/download/print/JissekiPrint";
import SeikyuPrint from "@components/pages/download/print/SeikyuPrint";
import UserSeikyuPrint from "@components/pages/download/print/UserSeikyuPrint";
import UserReceiptPrint from "@components/pages/download/print/UserReceiptPrint";
import UserAgencyReceiptPrint from "@components/pages/download/print/UserAgencyReceiptPrint";
import CostAmountListPrint from "@components/pages/download/print/CostAmountListPrint";
import UplimitPrint from "@components/pages/download/print/UplimitPrint";

// v1用
import JissekiPreview from "@components/pages/download/print/JissekiPreview";
import SeikyuPreview from "@components/pages/download/print/SeikyuPreview";
import CostAmountListPreview from "@components/pages/download/print/CostAmountListPreview";
import UplimitPreview from "@components/pages/download/print/UplimitPreview";

/**
 * 請求機能
 */
const DownloadRoutes = [
  <AdminRoute
    key="JissekiPrint"
    exact
    path="/download/print/jisseki/:year/:month"
    component={JissekiPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="SeikyuPrint"
    exact
    path="/download/print/seikyu/:year/:month"
    component={SeikyuPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="UserSeikyuPrint"
    exact
    path="/download/print/user/seikyu/:dataKey"
    component={UserSeikyuPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="UserReceiptPrint"
    exact
    path="/download/print/user/receipt/:dataKey"
    component={UserReceiptPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="UserAgencyReceiptPrint"
    exact
    path="/download/print/user/agency_receipt/:dataKey"
    component={UserAgencyReceiptPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="CostAmountListPrint"
    exact
    path="/download/print/user_cost_amount_list/:year/:month"
    component={CostAmountListPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="UplimitPrint"
    exact
    path="/download/print/uplimit/:year/:month"
    component={UplimitPrint}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="Download"
    exact
    path="/download"
    component={Download}
    groupInvoiceCheck
  />,
  // 旧パス(v1受付用)
  <AdminRoute
    key="JissekiPreview"
    exact
    path="/download/preview/jisseki/:year/:month"
    component={JissekiPreview}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="SeikyuPreview"
    exact
    path="/download/preview/seikyu/:year/:month"
    component={SeikyuPreview}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="CostAmountListPreview"
    exact
    path="/download/preview/user_cost_amount_list/:year/:month"
    component={CostAmountListPreview}
    groupInvoiceCheck
  />,
  <AdminRoute
    key="UplimitPreview"
    exact
    path="/download/preview/uplimit/:year/:month"
    component={UplimitPreview}
    groupInvoiceCheck
  />
];

export default DownloadRoutes;
