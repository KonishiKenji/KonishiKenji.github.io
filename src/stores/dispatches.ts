import accountDispatch from "@stores/domain/account/dispatch";
import authDispatch from "@stores/auth/dispatch";
import userDispatch from "@stores/domain/user/dispatch";
import invoiceDispatch from "@stores/domain/invoice/dispatch";
import offsiteWorkDispatch from "@stores/domain/offsiteWork/dispatcher";
import errorsDispatcher from "@stores/domain/errors/dispatcher";
import operationsDispatcher from "@stores/domain/operations/dispatcher";

// state
import downloadDispatch from "@stores/ui/download/dispatch";
import cityDispatch from "@stores/domain/city/dispatch";
import uiDispatch from "@stores/ui/dispatch";
import reportDispatch from "@stores/domain/report/dispatch";
import contactDispatch from "@stores/domain/contact/dispatch";
import attendanceDispatch from "@stores/domain/attendance/dispatch";
import workDispatcher from "@stores/domain/work/dispatcher";
import staffDispatcher from "@stores/domain/staff/dispatcher";
import supportPlanDispatcher from "@stores/domain/supportPlan/dispatcher";
import supportsDispatcher from "@stores/domain/supports/dispatcher";
import userSummaryDispatcher from "@stores/domain/userSummary/dispatcher";
import workRecordsDispatcher from "@stores/domain/workRecords/dispatcher";

// pages
import pagesRecordDailyDispatcher from "@stores/pages/record/daily/dispatcher";
import pagesRecordMonthlyDispatcher from "@stores/pages/record/monthly/dispatcher";
import pagesRecordSupportPlanDispatcher from "@stores/pages/record/supportPlan/dispatcher";
import pagesRecordSupportPlanADispatcher from "@stores/pages/record/supportPlanA/dispatcher";
import pagesRecordUserDetailDispatcher from "@stores/pages/record/userDetail/dispatcher";
import pagesReportDailyDispatcher from "@stores/pages/report/daily/dispatcher";
import pagesOffsiteWorkDispatcher from "@stores/pages/record/offsiteWork/dispatcher";

// mgr
import FacilityDispatcher from "@stores/domain/facilities/dispatcher";
import GroupHomeFacilityDispatcher from "@stores/domain/mgr/GroupHome/facility/dispatcher";
import GroupHomeUserInFacilityDispatcher from "@stores/domain/mgr/GroupHome/userInFacility/dispatcher";
import SEIKATSUKAIGOFacilityDispatcher from "@stores/domain/mgr/SEIKATSUKAIGO/facility/dispatcher";
import SEIKATSUKAIGOReportDispatcher from "@stores/domain/mgr/SEIKATSUKAIGO/report/dispatcher";
import SEIKATSUKAIGOUserInFacilityDispatcher from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/dispatcher";
import SEIKATSUKAIGOInitialDispatcher from "@stores/domain/mgr/SEIKATSUKAIGO/initial/dispatcher";
import SHUROTEICHAKUReportDispatcher from "@stores/domain/mgr/SHUROTEICHAKU/report/dispatcher";
import SHUROTEICHAKUUserInFacilityDispatcher from "@stores/domain/mgr/SHUROTEICHAKU/userInFacility/dispatcher";
import SHUROTEICHAKUFacilityDispatcher from "@stores/domain/mgr/SHUROTEICHAKU/facility/dispatcher";
import JIRITSUKUNRENSEIKATSUUserInFacilityDispatcher from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/userInFacility/dispatcher";
import JIRITSUKUNRENSEIKATSUReportDispatcher from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/dispatcher";
import JIRITSUKUNRENSEIKATSUInitialDispatcher from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/initial/dispatcher";
import JIRITSUKUNRENSEIKATSUFacilityDispatcher from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/dispatcher";
import IABFacilityDispatcher from "@stores/domain/mgr/IAB/facility/dispatcher";
import IABReportDispatcher from "@stores/domain/mgr/IAB/report/dispatcher";
import IABUserInFacilityDispatcher from "@stores/domain/mgr/IAB/userInFacility/dispatcher";
import IABInitialDispatcher from "@stores/domain/mgr/IAB/initial/dispatcher";
import TANKINYUSHOFacilityDispatcher from "@stores/domain/mgr/TANKINYUSHO/facility/dispatcher";
import TANKINYUSHOUserInFacilityDispatcher from "@stores/domain/mgr/TANKINYUSHO/userInFacility/dispatcher";
import TANKINYUSHOReportDispatcher from "@stores/domain/mgr/TANKINYUSHO/report/dispatcher";
import TANKINYUSHOInitialDispatcher from "@stores/domain/mgr/TANKINYUSHO/initial/dispatcher";
import SHISETSUNYUSHOFacilityDispatcher from "@stores/domain/mgr/SHISETSUNYUSHO/facility/dispatcher";
import SHISETSUNYUSHOUserInFacilityDispatcher from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/dispatcher";
import SHISETSUNYUSHOReportDispatcher from "@stores/domain/mgr/SHISETSUNYUSHO/report/dispatcher";
import SHISETSUNYUSHOInitialDispatcher from "@stores/domain/mgr/SHISETSUNYUSHO/initial/dispatcher";

export default {
  accountDispatch,
  authDispatch,
  userDispatch,
  invoiceDispatch,
  errorsDispatcher,
  operationsDispatcher,
  FacilityDispatcher,
  cityDispatch,
  uiDispatch,
  reportDispatch,
  contactDispatch,
  attendanceDispatch,
  offsiteWorkDispatch,
  workDispatcher,
  staffDispatcher,
  supportPlanDispatcher,
  supportsDispatcher,
  userSummaryDispatcher,
  workRecordsDispatcher,
  appDownloadDispatch: downloadDispatch,
  pages: {
    recordDailyDispatcher: pagesRecordDailyDispatcher,
    recordMonthlyDispatcher: pagesRecordMonthlyDispatcher,
    recordSupportPlanDispatcher: pagesRecordSupportPlanDispatcher,
    recordSupportPlanADispatcher: pagesRecordSupportPlanADispatcher,
    recordUserDetailDispatcher: pagesRecordUserDetailDispatcher,
    reportDailyDispatcher: pagesReportDailyDispatcher,
    recordOffsiteWorkDispatcher: pagesOffsiteWorkDispatcher
  },
  GroupHome: {
    facilityDispatcher: GroupHomeFacilityDispatcher,
    userInFacilityDispatcher: GroupHomeUserInFacilityDispatcher
  },
  SEIKATSUKAIGO: {
    facilityDispatcher: SEIKATSUKAIGOFacilityDispatcher,
    userInFacilityDispatcher: SEIKATSUKAIGOUserInFacilityDispatcher,
    initialDataDispatcher: SEIKATSUKAIGOInitialDispatcher,
    reportDispacher: SEIKATSUKAIGOReportDispatcher
  },
  SHUROTEICHAKU: {
    reportDispacher: SHUROTEICHAKUReportDispatcher,
    userInFacilityDispatcher: SHUROTEICHAKUUserInFacilityDispatcher,
    facilityDispatcher: SHUROTEICHAKUFacilityDispatcher
  },
  JIRITSUKUNRENSEIKATSU: {
    facilityDispatcher: JIRITSUKUNRENSEIKATSUFacilityDispatcher,
    userInFacilityDispatcher: JIRITSUKUNRENSEIKATSUUserInFacilityDispatcher,
    initialDataDispatcher: JIRITSUKUNRENSEIKATSUInitialDispatcher,
    reportDispacher: JIRITSUKUNRENSEIKATSUReportDispatcher
  },
  IAB: {
    facilityDispatcher: IABFacilityDispatcher,
    userInFacilityDispatcher: IABUserInFacilityDispatcher,
    initialDataDispatcher: IABInitialDispatcher,
    reportDispatcher: IABReportDispatcher
  },
  TANKINYUSHO: {
    facilityDispatcher: TANKINYUSHOFacilityDispatcher,
    userInFacilityDispatcher: TANKINYUSHOUserInFacilityDispatcher,
    initialDataDispatcher: TANKINYUSHOInitialDispatcher,
    reportDispatcher: TANKINYUSHOReportDispatcher
  },
  SHISETSUNYUSHO: {
    facilityDispatcher: SHISETSUNYUSHOFacilityDispatcher,
    userInFacilityDispatcher: SHISETSUNYUSHOUserInFacilityDispatcher,
    initialDataDispatcher: SHISETSUNYUSHOInitialDispatcher,
    reportDispatcher: SHISETSUNYUSHOReportDispatcher
  }
};
