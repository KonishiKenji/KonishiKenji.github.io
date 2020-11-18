import * as React from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { AuthState } from "@stores/auth/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityType } from "@constants/variables";
import { BASE_OLD_VERSION_URL } from "@config";
import { getToken } from "@utils/localStorage";
import AdminRoute from "@app/Auth/AdminRoute";
import UserRoute from "@app/Auth/UserRoute";
import SupportRoute from "@app/Auth/SupportRoute";
import ExpiredTokenModal from "@components/molecules/dialog/ExpiredTokenModal";

// 種別ごとのルーティング
import SEIKATSUKAIGORoutes from "@app/FacilityTypeRoutes/SEIKATSUKAIGORoutes";
import SHUROTEICHAKURoutes from "@app/FacilityTypeRoutes/SHUROTEICHAKURoutes";
import TANKINYUSHORoutes from "@app/FacilityTypeRoutes/TANKINYUSHORoutes";
import JIRITSUKUNRENSEIKATSURoutes from "@app/FacilityTypeRoutes/JIRITSUKUNRENSEIKATSURoutes";
import SHISETSUNYUSHORoutes from "@app/FacilityTypeRoutes/SHISETSUNYUSHORoutes";
import GroupHomeRoutes from "@app/FacilityTypeRoutes/GroupHomeRoutes";
import IABRoutes from "@app/FacilityTypeRoutes/IABRoutes";

// アカウント情報
import Account from "@components/pages/account/Account";

// 勤怠管理
import Attendance from "@components/pages/attendance/Attendance";

// お問い合わせ
import Contact from "@components/pages/contact/Contact";
import ContactComplete from "@components/pages/contact/Complete";

// 請求機能
import DownloadRoutes from "@app/CommonRoutes/DownloadRoutes";

// 施設切替（サポート権限専用）
import SwitchAssociatedFacility from "@components/pages/customer-support/SwitchAssociatedFacility";

interface StateProps {
  auth: AuthState;
  user: UserState;
}

type Props = StateProps;

const AuthRoutes: React.FC<Props> = (props) => {
  const { isLoggedIn, redirectOldVersion } = props.auth;
  const { isAdmin, isSupport, facility_type } = props.user;

  // 移行ABのアカウントの時、envの設定に応じてv1を参照する
  React.useLayoutEffect(() => {
    // 必要なものがない + 移行ABアカウントでなければ実行しない
    if (
      !redirectOldVersion ||
      !isLoggedIn ||
      isAdmin === undefined ||
      isSupport === undefined ||
      !facility_type ||
      !(
        facility_type === FacilityType.A ||
        facility_type === FacilityType.B ||
        facility_type === FacilityType.IKOU
      )
    ) {
      return;
    }

    // 例外設定: 以下のパスの時はv1環境でもv2を参照するのでリダイレクトを止める
    const excludePath = [
      "/account",
      "/attendance",
      "/download/preview",
      "/download/print"
    ];
    const exclusion = excludePath.some(
      (x) => window.location.hash.indexOf(x) > -1
    );
    if (!exclusion) {
      // v1の永続化情報があると正常に動かないので予め消す
      window.localStorage.removeItem("persist:auth");
      window.location.href = `${BASE_OLD_VERSION_URL}/login`;
    }
  }, [redirectOldVersion, isLoggedIn, isAdmin, isSupport, facility_type]);

  // 比較用にstorageとは別にtokenを保持
  const [token] = React.useState(getToken());
  const [openExpiredTokenModal, setOpenExpiredTokenModal] = React.useState(
    false
  );

  // storageを共有する他のタブなどでtokenが変更された時
  React.useEffect(() => {
    const monitoringChangeToken = (): void => {
      const nextToken = getToken();
      if (!nextToken || nextToken !== token) {
        setOpenExpiredTokenModal(true);
      }
    };
    window.addEventListener("storage", monitoringChangeToken, false);
  }, []);

  return (
    <>
      <Switch>
        {/* 請求機能 */}
        {DownloadRoutes}
        {/* アカウント情報 */}
        <AdminRoute path="/account/update" component={Account} exact />
        {/* タイムカード */}
        <UserRoute path="/attendance" exact component={Attendance} />
        {/* お問い合わせ */}
        <AdminRoute path="/contact/complete" component={ContactComplete} />
        <AdminRoute path="/contact" component={Contact} />
        {/* 施設切替 */}
        <SupportRoute
          exact
          path="/customer-support/facility"
          component={SwitchAssociatedFacility}
        />
        {/* 種別ごとのルーティング */}
        {props.user.facility_type === FacilityType.SHISETSUNYUSHO && (
          <SHISETSUNYUSHORoutes user={props.user} />
        )}
        {props.user.facility_type === FacilityType.TANKINYUSHO && (
          <TANKINYUSHORoutes user={props.user} />
        )}
        {props.user.facility_type === FacilityType.SHUROTEICHAKU && (
          <SHUROTEICHAKURoutes user={props.user} />
        )}
        {props.user.facility_type === FacilityType.JIRITSUKUNRENSEIKATSU && (
          <JIRITSUKUNRENSEIKATSURoutes user={props.user} />
        )}
        {props.user.facility_type === FacilityType.SEIKATSUKAIGO && (
          <SEIKATSUKAIGORoutes user={props.user} />
        )}
        {props.user.facility_type === FacilityType.GROUP_HOME && (
          <GroupHomeRoutes />
        )}
        {(props.user.facility_type === FacilityType.A ||
          props.user.facility_type === FacilityType.B ||
          props.user.facility_type === FacilityType.IKOU) && (
          <IABRoutes user={props.user} />
        )}
      </Switch>
      <ExpiredTokenModal open={openExpiredTokenModal} />
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  auth: state.auth,
  user: state.user as UserState
});

export default connect(mapStateToProps)(AuthRoutes);
