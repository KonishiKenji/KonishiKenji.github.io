import { combineReducers } from "redux";
import { isType } from "typescript-fsa";
import { clear } from "@utils/localStorage";
import { logout } from "@stores/auth/action";

// app
import loading from "@stores/loading/reducers";
import { default as auth } from "@stores/auth/reducer";

// domain
import { default as account } from "@stores/domain/account/reducer";
import { default as attendance } from "@stores/domain/attendance/reducer";
import { default as city } from "@stores/domain/city/reducer";
import errors from "@stores/domain/errors/reducers";
import { default as facilities } from "@stores/domain/facilities/reducers";
import { default as invoice } from "@stores/domain/invoice/reducer";
import operations from "@stores/domain/operations/reducers";
import { default as report } from "@stores/domain/report/reducer";
import { default as user } from "@stores/domain/user/reducer";
import { default as offsiteWork } from "@stores/domain/offsiteWork/reducers";
import { default as work } from "@stores/domain/work/reducers";
import { default as staff } from "@stores/domain/staff/reducers";
import supportPlan from "@stores/domain/supportPlan/reducers";
import supports from "@stores/domain/supports/reducers";
import userSummary from "@stores/domain/userSummary/reducers";
import workRecords from "@stores/domain/workRecords/reducers";

// ui
import alertDialog from "@stores/ui/alertDialog/reducers";
import errorsDialog from "@stores/ui/errorsDialog/reducers";
import navigationTransition from "@stores/ui/navigationTransition/reducers";
import responseError from "@stores/ui/responseError/reducers";
import snackbar from "@stores/ui/snackbar/reducers";

// pages
import { default as appDownload } from "@stores/ui/download/reducer";
import recordDaily from "@stores/pages/record/daily/reducers";
import recordMonthly from "@stores/pages/record/monthly/reducers";
import recordSupportPlan from "@stores/pages/record/supportPlan/reducers";
import recordSupportPlanA from "@stores/pages/record/supportPlanA/reducers";
import recordUserDetail from "@stores/pages/record/userDetail/reducers";
import reportDaily from "@stores/pages/report/daily/reducers";
import recordOffsiteWork from "@stores/pages/record/offsiteWork/reducers";

// GroupHome
import GroupHomeFacility from "@stores/domain/mgr/GroupHome/facility/reducers";
import GroupHomeUserInFacility from "@stores/domain/mgr/GroupHome/userInFacility/reducers";

// 生活介護
import SEIKATSUKAIGOFacility from "@stores/domain/mgr/SEIKATSUKAIGO/facility/reducers";
import SEIKATSUKAIGOUserInFacility from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/reducers";
import SEIKATSUKAIGOReport from "@stores/domain/mgr/SEIKATSUKAIGO/report/reducers";
import SEIKATSUKAIGOInitial from "@stores/domain/mgr/SEIKATSUKAIGO/initial/reducers";

// 就労定着支援
import SHUROTEICHAKUUserInFacility from "@stores/domain/mgr/SHUROTEICHAKU/userInFacility/reducers";
import SHUROTEICHAKUFacility from "@stores/domain/mgr/SHUROTEICHAKU/facility/reducers";
import SHUROTEICHAKUReport from "@stores/domain/mgr/SHUROTEICHAKU/report/reducers";

// 自立訓練（生活訓練）
import JIRITSUKUNRENSEIKATSUFacility from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/reducers";
import JIRITSUKUNRENSEIKATSUUserInFacility from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/userInFacility/reducers";
import JIRITSUKUNRENSEIKATSUReport from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/reducers";
import JIRITSUKUNRENSEIKATSUInitial from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/initial/reducers";

// 移行AB
import IABFacility from "@stores/domain/mgr/IAB/facility/reducers";
import IABUserInFacility from "@stores/domain/mgr/IAB/userInFacility/reducers";
import IABReport from "@stores/domain/mgr/IAB/report/reducers";
import IABInitial from "@stores/domain/mgr/IAB/initial/reducers";
import ASupportPlan from "@stores/domain/mgr/A/supportPlan/reducers";

// 短期入所
import TANKINYUSHOFacility from "@stores/domain/mgr/TANKINYUSHO/facility/reducers";
import TANKINYUSHOUserInFacility from "@stores/domain/mgr/TANKINYUSHO/userInFacility/reducers";
import TANKINYUSHOReport from "@stores/domain/mgr/TANKINYUSHO/report/reducers";
import TANKINYUSHOInitial from "@stores/domain/mgr/TANKINYUSHO/initial/reducers";

// 施設入所支援
import SHISETSUNYUSHOFacility from "@stores/domain/mgr/SHISETSUNYUSHO/facility/reducers";
import SHISETSUNYUSHOUserInFacility from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/reducers";
import SHISETSUNYUSHOReport from "@stores/domain/mgr/SHISETSUNYUSHO/report/reducers";
import SHISETSUNYUSHOInitial from "@stores/domain/mgr/SHISETSUNYUSHO/initial/reducers";

const appReducer = combineReducers({
  // app
  loading,
  // domain
  account,
  attendance,
  auth,
  city,
  errors,
  facilities,
  invoice,
  operations,
  report,
  user,
  offsiteWork,
  work,
  staff,
  supportPlan,
  supports,
  userSummary,
  workRecords,
  // ui
  appDownload,
  ui: combineReducers({
    alertDialog,
    errorsDialog,
    responseError,
    snackbar,
    needsStopHistory: navigationTransition
  }),
  // pages
  pages: combineReducers({
    recordDaily,
    recordMonthly,
    recordSupportPlan,
    recordSupportPlanA,
    recordUserDetail,
    reportDaily,
    recordOffsiteWork
  }),
  // domain (mgr)
  GroupHome: combineReducers({
    facility: GroupHomeFacility,
    userInFacility: GroupHomeUserInFacility
  }),
  SEIKATSUKAIGO: combineReducers({
    facility: SEIKATSUKAIGOFacility,
    userInFacility: SEIKATSUKAIGOUserInFacility,
    report: SEIKATSUKAIGOReport,
    initial: SEIKATSUKAIGOInitial
  }),
  SHUROTEICHAKU: combineReducers({
    report: SHUROTEICHAKUReport,
    userInFacility: SHUROTEICHAKUUserInFacility,
    facility: SHUROTEICHAKUFacility
  }),
  JIRITSUKUNRENSEIKATSU: combineReducers({
    facility: JIRITSUKUNRENSEIKATSUFacility,
    userInFacility: JIRITSUKUNRENSEIKATSUUserInFacility,
    report: JIRITSUKUNRENSEIKATSUReport,
    initial: JIRITSUKUNRENSEIKATSUInitial
  }),
  IAB: combineReducers({
    facility: IABFacility,
    userInFacility: IABUserInFacility,
    report: IABReport,
    initial: IABInitial
  }),
  TANKINYUSHO: combineReducers({
    facility: TANKINYUSHOFacility,
    userInFacility: TANKINYUSHOUserInFacility,
    initial: TANKINYUSHOInitial,
    report: TANKINYUSHOReport
  }),
  SHISETSUNYUSHO: combineReducers({
    facility: SHISETSUNYUSHOFacility,
    userInFacility: SHISETSUNYUSHOUserInFacility,
    initial: SHISETSUNYUSHOInitial,
    report: SHISETSUNYUSHOReport
  }),
  A: combineReducers({
    supportPlan: ASupportPlan
  //   facility: AFacility,
  //   userInFacility: AUserInFacility
  })
});

const rootReducer = (state: any, action: any) => {
  if (isType(action, logout)) {
    clear();
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
