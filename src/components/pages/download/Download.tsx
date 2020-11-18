import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import dispatches from "@stores/dispatches";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { DownloadFileType } from "@stores/ui/download/type";
import { DownloadableUser } from "@stores/domain/invoice/type";
import AdminTemplate from "@components/templates/AdminTemplate";
import InvoiceExcludedUserDialog from "@components/organisms/mgr/InvoiceExcludedUserDialog";
import InvoiceTargetDateDialog from "@components/organisms/mgr/InvoiceSelectDateDialog";
import DownloadTargetSelect from "@components/organisms/download/DownloadTargetSelect";
import DownloadHistory from "@components/organisms/download/DownloadHistory";
import ErrorsDialog from "@components/organisms/ErrorsDialog";
import { FacilityType, EXIST_INITIAL_PAGE } from "@constants/variables";
import { isEmpty } from "lodash";

interface DispatchProps {
  downloadable: () => void;
  fetchHistory: () => void;
  getMultiFunctionalFacility: () => void;
  downloadJissekiCsv: (
    year: string,
    month: string,
    excluded_user_ids: number[]
  ) => Promise<void>;
  downloadSeikyuCsv: (
    year: string,
    month: string,
    excluded_user_ids: number[]
  ) => Promise<void>;
  downloadUplimitCsv: (
    year: string,
    month: string,
    excluded_user_ids: number[]
  ) => Promise<void>;
  errorInvoice: (
    year: string,
    month: string,
    excluded_user_ids: number[]
  ) => void;
  appDownloadDispatchTargetYearMonth: (yearMonth: string) => void;
  appDownloadIsDisableDownloadButton: (isDisabled: boolean) => void;
  appDownloadIsDisableExcludedUsersButton: (isDisabled: boolean) => void;
  appDownloadReadyFileType: (fileType: DownloadFileType) => void;
  appDownloadIsOpenUserModal: (open: boolean) => void;
  appDownloadExcludedUserIds: (userIds: number[]) => void;
  appDownloadTmpExcludedUserIds: (userIds: number[]) => void;
  appDownloadClearExcludedUserIds: () => void;
  openErrorsDialog: () => void;
  closeErrorsDialog: () => void;
  fetchSEIKATSUKAGIOInitial: () => Promise<void>;
  fetchJIRITSUKUNRENInitial: () => Promise<void>;
  fetchIABInitial: () => Promise<void>;
  fetchSEIKATSUKAGIOInital: () => Promise<void>;
  fetchJIRITSUKUNRENInital: () => Promise<void>;
  fetchTANKINYUSHOInital: () => Promise<void>;
  fetchSHISETSUNYUSHOInitial: () => Promise<void>;
}

interface State {
  actionButtonType: "csv" | "print" | null;
  targetYear: string;
  targetMonth: string;
  downloadReadyFileType: DownloadFileType;
}

interface Props extends DispatchProps, RouteComponentProps, AppState {}

interface State {
  isOpenSelectDateModal: boolean;
  selectedDownloadPath: string;
  selectedDataKey: string;
  selectedDateTitle: string[];
  isDownload: boolean;
  // 初期設定が設定されているかどうか、初期設定がない種別はfalse
  isNotFinishedInitialData: boolean;
}

const initialState: State = {
  isOpenSelectDateModal: false,
  selectedDownloadPath: "",
  selectedDataKey: "",
  selectedDateTitle: [],
  actionButtonType: null,
  targetYear: "",
  targetMonth: "",
  downloadReadyFileType: DownloadFileType.NONE,
  isDownload: false,
  isNotFinishedInitialData: false
};

/**
 * 請求画面
 */
class Download extends React.Component<Props> {
  public readonly state: State = initialState;

  public async componentDidMount() {
    this.props.getMultiFunctionalFacility();
    await this.props.downloadable();
    this.props.fetchHistory();

    // 選択済みの対象請求月が編集で消えることがありえるのでボタンの非活性を行う
    if (
      this.props.appDownload.targetYearMonth &&
      !this.hasTargetUser(this.props.appDownload.targetYearMonth)
    ) {
      this.props.appDownloadIsDisableDownloadButton(true);
      this.props.appDownloadIsDisableExcludedUsersButton(true);
    }
    if (
      this.props.user.facility_type &&
      EXIST_INITIAL_PAGE.includes(this.props.user.facility_type)
    ) {
      this.setIsNotFinishedInitialData(this.props.user.facility_type);
    }
  }

  public componentDidUpdate(nextProps: Props) {
    this.preCheckDownload(nextProps);
  }

  public render() {
    return (
      <AdminTemplate pageName="請求">
        <DownloadTargetSelect
          selected={false}
          months={this.props.invoice.downloadable.months}
          isDisabledSelect={false}
          isDisabledButton={this.props.appDownload.isDisableExcludedUsersButton}
          onChangeSelect={this.onChangeMonthSelect}
          onClickButton={this.onClickButton}
          excludedUserIds={this.props.appDownload.excludedUserIds}
          value={this.props.appDownload.targetYearMonth}
          downloadCsvActions={this.downloadCsvAction()}
          downloadPrintActions={this.downloadPrintAction()}
          facility={this.props.invoice.facilityMultiFunctional.facility}
          multiFacilities={
            this.props.invoice.facilityMultiFunctional.multipleFacilities
          }
          isNotFinishedInitialData={this.state.isNotFinishedInitialData}
        />
        <DownloadHistory
          invoice={this.props.invoice}
          history={this.props.history}
          handleClick={this.onTargetDateDialogOpen}
        />
        <InvoiceTargetDateDialog
          title={this.state.selectedDateTitle}
          isDialogOpen={this.state.isOpenSelectDateModal}
          isError
          onViewPreview={this.onViewPreview}
          onCancel={this.onTargetDateDialogCancel}
        />
        <InvoiceExcludedUserDialog
          open={this.props.appDownload.isOpenUserModal}
          onClose={this.onUserModalClose}
          onSubmit={this.onUserModalSubmitClose}
          labelId="excluded-dialog-title"
          users={this.targetMonthUser()}
          facilityNames={this.targetMonthFacilityName()}
          describeId="excluded-dialog-description"
          excludedUserIds={this.props.appDownload.tmpExcludedUserIds}
          onChangeExcludedUser={this.onChangeExcludedUser}
          onChangeAllExcludedUser={this.onChangeAllExcludedUser}
          onChangeAllExcludedUserMultiple={this.onChangeAllExcludedUserMultiple}
          isMultipleFacility={this.props.user.isMultipleFacility}
          isMasterSubordinate={this.props.user.isMasterSubordinate}
        />
        <ErrorsDialog
          errorsKey="invoice"
          actionButton={
            this.state.actionButtonType === "csv"
              ? {
                  text: "そのままダウンロード",
                  clickHandler: this.handleClickErrorsDialog
                }
              : this.state.actionButtonType === "print"
              ? {
                  text: "そのまま表示",
                  clickHandler: this.handleClickErrorsDialog
                }
              : undefined
          }
        />
      </AdminTemplate>
    );
  }

  private onTargetDateDialogOpen = (
    title: string[],
    path: string,
    dataKey: string
  ) => () => {
    this.setState({
      isOpenSelectDateModal: true,
      selectedDownloadPath: path,
      selectedDataKey: dataKey,
      selectedDateTitle: title
    });
  };

  private onViewPreview = (targetDate: string, noticeDate: string) => {
    const noticeDateQuery = noticeDate && `&notice_date=${noticeDate}`;
    this.props.history.push(
      `/download/print/user/${this.state.selectedDownloadPath}/${this.state.selectedDataKey}?target_date=${targetDate}${noticeDateQuery}`
    );
  };

  private onTargetDateDialogCancel = () => {
    this.setState({
      isOpenSelectDateModal: false
    });
  };

  // 利用者選択を保存した時
  private onUserModalSubmitClose = () => {
    this.props.appDownloadExcludedUserIds(
      this.props.appDownload.tmpExcludedUserIds
    );
    this.props.appDownloadIsOpenUserModal(false);
  };

  // 利用者選択をキャンセルした時
  private onUserModalClose = () => {
    this.props.appDownloadIsOpenUserModal(false);
  };

  /**
   * 請求対象月の変更
   */
  private onChangeMonthSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.appDownloadDispatchTargetYearMonth(event.target.value);
    if (
      event.target.value !== undefined &&
      event.target.value.length > 0 &&
      this.hasTargetUser(event.target.value)
    ) {
      this.props.appDownloadIsDisableDownloadButton(false);
      this.props.appDownloadIsDisableExcludedUsersButton(false);
    } else {
      this.props.appDownloadIsDisableDownloadButton(true);
      this.props.appDownloadIsDisableExcludedUsersButton(true);
    }
    this.props.appDownloadClearExcludedUserIds();
  };

  /**
   * 対象外のユーザー選択モーダルを開く
   */
  private onClickButton = (event: React.MouseEvent<HTMLSelectElement>) => {
    this.props.appDownloadTmpExcludedUserIds(
      this.props.appDownload.excludedUserIds
    );
    this.props.appDownloadIsOpenUserModal(true);
  };

  /**
   * 対象外のユーザーの全て選択
   */
  private onChangeAllExcludedUser = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const monthUsers = this.targetMonthUser();
    const serviceType = event.target.value as FacilityType;
    const users = monthUsers[serviceType];
    const userIds = users.map((user) => user.id);

    if (event.target.checked) {
      this.props.appDownloadTmpExcludedUserIds(
        this.props.appDownload.tmpExcludedUserIds.filter(
          (m) => !userIds.includes(m)
        )
      );
    } else {
      const _userIds = this.props.appDownload.tmpExcludedUserIds.concat(
        userIds
      );
      const res = Array.from(new Set(_userIds)); // unique
      this.props.appDownloadTmpExcludedUserIds(res);
    }
  };

  /**
   * 対象外のユーザーを全て選択(多機能)
   */
  private onChangeAllExcludedUserMultiple = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const monthUsers = this.targetMonthUser();
    let userIds: number[] = [];
    Object.keys(monthUsers).map((key) => {
      const users: DownloadableUser[] = monthUsers[key];
      userIds = userIds.concat(users.map((user) => user.id));
    });
    if (event.target.checked) {
      this.props.appDownloadTmpExcludedUserIds(
        this.props.appDownload.tmpExcludedUserIds.filter(
          (m) => !userIds.includes(m)
        )
      );
    } else {
      const _userIds = this.props.appDownload.tmpExcludedUserIds.concat(
        userIds
      );
      const res = Array.from(new Set(_userIds)); // unique
      this.props.appDownloadTmpExcludedUserIds(res);
    }
  };

  /**
   * 対象外のユーザーのチェックボックスを押した時のボタン
   */
  private onChangeExcludedUser = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // string -> number
    const userId: number = +event.target.value;

    if (event.target.checked) {
      this.props.appDownloadTmpExcludedUserIds(
        this.props.appDownload.tmpExcludedUserIds.filter((m) => m !== userId)
      );
    } else {
      const _userIds = this.props.appDownload.tmpExcludedUserIds.concat(userId);
      const userIds = Array.from(new Set(_userIds)); // unique
      this.props.appDownloadTmpExcludedUserIds(userIds);
    }
  };

  private downloadCsvAction() {
    const isDisabled =
      this.props.appDownload.isDisableDownloadButton ||
      this.props.errors.invoice.loading ||
      this.state.isNotFinishedInitialData;

    return [
      {
        isDisabled,
        label: "サービス提供実績記録票",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.setState({ isDownload: true });
            this.props.appDownloadReadyFileType(DownloadFileType.JISSEKI_CSV);
          }
        }
      },
      {
        isDisabled,
        label: "請求書・明細書",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.setState({ isDownload: true });
            this.props.appDownloadReadyFileType(DownloadFileType.SEIKYU_CSV);
          }
        }
      },
      {
        isDisabled,
        label: "利用者負担上限額管理結果票",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.setState({ isDownload: true });
            this.props.appDownloadReadyFileType(DownloadFileType.UPLIMIT_CSV);
          }
        }
      }
    ];
  }

  private downloadPrintAction() {
    const isDisabled =
      this.props.appDownload.isDisableDownloadButton ||
      this.props.errors.invoice.loading ||
      this.state.isNotFinishedInitialData;
    return [
      {
        isDisabled,
        label: "サービス提供実績記録票",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.props.appDownloadReadyFileType(DownloadFileType.JISSEKI_PRINT);
          }
        }
      },
      {
        isDisabled,
        label: "請求書・明細書",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.props.appDownloadReadyFileType(DownloadFileType.SEIKYU_PRINT);
          }
        }
      },
      {
        isDisabled,
        label: "利用者負担額一覧表",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.props.appDownloadReadyFileType(
              DownloadFileType.USER_COST_AMOUNT_LIST_PRINT
            );
          }
        }
      },
      {
        isDisabled,
        label: "利用者負担上限額管理結果票",
        onClick: () => {
          const { targetYear, targetMonth } = this.props.appDownload;
          if (!!targetYear && !!targetMonth) {
            this.props.errorInvoice(
              targetYear,
              targetMonth,
              this.props.appDownload.excludedUserIds
            );
            this.props.appDownloadReadyFileType(DownloadFileType.UPLIMIT_PRINT);
          }
        }
      }
    ];
  }

  /**
   * 特定の月の、対象ユーザーを事業所種別ごとに取得
   * {[key in FacilityType]: user}
   */
  private targetMonthUser(): { [key in FacilityType]: DownloadableUser[] } {
    const { months } = this.props.invoice.downloadable;
    const { targetYearMonth } = this.props.appDownload;
    const monthes = months.filter((m) => m.date === targetYearMonth);
    const newState = {};
    let index = 0;
    const res = monthes.reduce((acc, month) => {
      const data = month.results.reduce((prev, result) => {
        index += 1;
        newState[index] = result.users;
        return {
          ...acc,
          ...newState
        };
      }, {});
      return {
        ...acc,
        ...data
      };
    }, {} as { [key in FacilityType]: DownloadableUser[] });
    return res;
  }

  /**
   * 特定の月の、対象施設名を事業所種別ごとに取得
   * {[key in FacilityType]: }
   */
  private targetMonthFacilityName(): { [key in FacilityType]: string } {
    const { months } = this.props.invoice.downloadable;
    const { targetYearMonth } = this.props.appDownload;
    const monthes = months.filter((m) => m.date === targetYearMonth);
    const newState = {};
    let index = 0;

    const res = monthes.reduce((acc, month) => {
      const data = month.results.reduce((prev, result) => {
        const { name } = result.facility;
        index += 1;
        newState[index] = name;
        return {
          ...acc,
          ...newState
        };
      }, {});
      return {
        ...acc,
        ...data
      };
    }, {} as { [key in FacilityType]: string });
    return res;
  }

  /**
   * エラーを確認して大丈夫ならば、ファイルをダウンロードや、印刷ページに遷移する
   * @param nextProps
   */
  private preCheckDownload(nextProps: Props) {
    const { downloadReadyFileType } = nextProps.appDownload;
    if (
      downloadReadyFileType !== DownloadFileType.NONE &&
      !nextProps.errors.invoice.loading
    ) {
      // ユーザー任意で実行することがあるためキープしておく
      this.setState({
        targetYear: nextProps.appDownload.targetYear,
        targetMonth: nextProps.appDownload.targetMonth,
        downloadReadyFileType: nextProps.appDownload.downloadReadyFileType
      });

      if (nextProps.errors.invoice.hasError) {
        // エラーが混じっている場合実行出来なくする
        const hasTypeError = nextProps.errors.invoice.data.some((data) =>
          data.errors.some((error) => error.type === "error")
        );
        // CSVかPrintで実行できるアクションを切り替える
        switch (downloadReadyFileType) {
          case DownloadFileType.JISSEKI_CSV:
          case DownloadFileType.SEIKYU_CSV:
          case DownloadFileType.UPLIMIT_CSV:
            this.setState({ actionButtonType: !hasTypeError ? "csv" : null });
            break;
          case DownloadFileType.JISSEKI_PRINT:
          case DownloadFileType.SEIKYU_PRINT:
          case DownloadFileType.USER_COST_AMOUNT_LIST_PRINT:
          case DownloadFileType.UPLIMIT_PRINT:
            this.setState({ actionButtonType: !hasTypeError ? "print" : null });
            break;
          default:
            this.setState({ actionButtonType: null });
        }
        this.props.openErrorsDialog();
      } else {
        this.checkDownload(
          nextProps.appDownload.targetYear,
          nextProps.appDownload.targetMonth,
          nextProps.appDownload.downloadReadyFileType
        );
      }
      this.props.appDownloadReadyFileType(DownloadFileType.NONE);
    }
  }

  private checkDownload = (
    year: string,
    month: string,
    fileType: DownloadFileType
  ) => {
    const downloadReadyFileType = fileType;
    const targetYear = year;
    const targetMonth = month;
    switch (downloadReadyFileType) {
      case DownloadFileType.JISSEKI_CSV:
        if (!this.state.isDownload) break;
        this.setState({ isDownload: false });
        this.props
          .downloadJissekiCsv(
            targetYear,
            targetMonth,
            this.props.appDownload.excludedUserIds
          )
          .then(() => {
            this.props.fetchHistory();
          });
        break;
      case DownloadFileType.SEIKYU_CSV:
        if (!this.state.isDownload) break;
        this.setState({ isDownload: false });
        this.props
          .downloadSeikyuCsv(
            targetYear,
            targetMonth,
            this.props.appDownload.excludedUserIds
          )
          .then(() => {
            this.props.fetchHistory();
          });
        break;
      case DownloadFileType.UPLIMIT_CSV:
        if (!this.state.isDownload) break;
        this.setState({ isDownload: false });
        this.props
          .downloadUplimitCsv(
            targetYear,
            targetMonth,
            this.props.appDownload.excludedUserIds
          )
          .then(() => {
            this.props.fetchHistory();
          });
        break;
      case DownloadFileType.JISSEKI_PRINT:
        this.props.history.push(
          `/download/print/jisseki/${targetYear}/${targetMonth}`
        );
        break;
      case DownloadFileType.SEIKYU_PRINT:
        this.props.history.push(
          `/download/print/seikyu/${targetYear}/${targetMonth}`
        );
        break;
      case DownloadFileType.USER_COST_AMOUNT_LIST_PRINT:
        this.props.history.push(
          `/download/print/user_cost_amount_list/${targetYear}/${targetMonth}`
        );
        break;
      case DownloadFileType.UPLIMIT_PRINT:
        this.props.history.push(
          `/download/print/uplimit/${targetYear}/${targetMonth}`
        );
        break;
    }
  };

  private handleClickErrorsDialog = () => {
    this.checkDownload(
      this.state.targetYear,
      this.state.targetMonth,
      this.state.downloadReadyFileType
    );
    this.props.closeErrorsDialog();
  };

  /**
   * 指定の月に対象利用者が1人以上存在するかを返す
   */
  private hasTargetUser = (selectMonth: string): boolean => {
    const currentMonthData = this.props.invoice.downloadable.months.find(
      (month) => month.date === selectMonth
    );
    if (!currentMonthData || currentMonthData.results.length === 0) {
      return false;
    }

    // 受給者証未発行/見学中の利用者を除外
    const users = currentMonthData.results.map((result) =>
      result.users.filter((user) => user.none_recipient_number_flg === 0)
    );
    const userCounts = users.reduce((acc, val) => acc.concat(val), []).length;
    return userCounts > 0;
  };

  /**
   * 初期設定にて初回請求日を設定しているかどうか
   * 種別ごとに参照するデータが違うためswitchで種別判定を行う。
   */
  private setIsNotFinishedInitialData = (facilityType: FacilityType): void => {
    switch (facilityType) {
      case FacilityType.SEIKATSUKAIGO:
        this.props.fetchSEIKATSUKAGIOInitial().then(() => {
          this.setState({
            isNotFinishedInitialData: isEmpty(
              this.props.SEIKATSUKAIGO.initial.facility.first_time_bill_date
            )
          });
        });
        break;
      case FacilityType.JIRITSUKUNRENSEIKATSU:
        this.props.fetchJIRITSUKUNRENInitial().then(() => {
          this.setState({
            isNotFinishedInitialData: isEmpty(
              this.props.JIRITSUKUNRENSEIKATSU.initial.facility
                .first_time_bill_date
            )
          });
        });
        break;

      case FacilityType.IKOU:
      case FacilityType.A:
      case FacilityType.B:
        this.props.fetchIABInitial().then(() => {
          this.setState({
            isNotFinishedInitialData: isEmpty(
              this.props.IAB.initial.facility.first_time_bill_date
            )
          });
        });
        break;
      case FacilityType.TANKINYUSHO:
        this.props.fetchTANKINYUSHOInital().then(() => {
          this.setState({
            isNotFinishedInitialData: isEmpty(
              this.props.TANKINYUSHO.initial.facility.first_time_bill_date
            )
          });
        });
        break;
      case FacilityType.SHISETSUNYUSHO:
        this.props.fetchSHISETSUNYUSHOInitial().then(() => {
          this.setState({
            isNotFinishedInitialData: isEmpty(
              this.props.SHISETSUNYUSHO.initial.facility.first_time_bill_date
            )
          });
        });
        break;
      default:
        this.setState({
          isNotFinishedInitialData: false
        });
    }
  };
}

const mapStateToProps = (state: AppState): AppState => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    invoiceDispatch,
    errorsDispatcher,
    appDownloadDispatch,
    SEIKATSUKAIGO,
    JIRITSUKUNRENSEIKATSU,
    IAB,
    TANKINYUSHO,
    SHISETSUNYUSHO
  } = dispatches;

  const invoiceDispatched = invoiceDispatch(dispatch);
  const appDownloadDispatched = appDownloadDispatch(dispatch);

  return {
    downloadable: invoiceDispatched.downloadable,
    getMultiFunctionalFacility: invoiceDispatched.getMultiFunctionalFacility,
    fetchHistory: invoiceDispatched.history,
    downloadJissekiCsv: invoiceDispatched.downloadJissekiCsv,
    downloadSeikyuCsv: invoiceDispatched.downloadSeikyuCsv,
    downloadUplimitCsv: invoiceDispatched.downloadUplimitCsv,
    errorInvoice: errorsDispatcher(dispatch).invoice,
    appDownloadDispatchTargetYearMonth: appDownloadDispatched.targetYearMonth,
    appDownloadIsDisableDownloadButton:
      appDownloadDispatched.isDisableDownloadButton,
    appDownloadIsDisableExcludedUsersButton:
      appDownloadDispatched.isDisableExcludedUsersButton,
    appDownloadReadyFileType: appDownloadDispatched.downloadReadyFileType,
    appDownloadIsOpenUserModal: appDownloadDispatched.isOpenUserModal,
    // 対象外ユーザー選択
    appDownloadExcludedUserIds: appDownloadDispatched.excludedUserIds,
    appDownloadTmpExcludedUserIds: appDownloadDispatched.tmpExcludedUserIds,
    appDownloadClearExcludedUserIds: appDownloadDispatched.clearExcludedUserIds,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog()),
    closeErrorsDialog: () => dispatch(errorsDialogActions.hideErrorsDialog()),
    fetchSEIKATSUKAGIOInitial: SEIKATSUKAIGO.initialDataDispatcher(dispatch)
      .fetch,
    fetchJIRITSUKUNRENInitial: JIRITSUKUNRENSEIKATSU.initialDataDispatcher(
      dispatch
    ).fetch,
    fetchIABInitial: IAB.initialDataDispatcher(dispatch).fetch,
    fetchTANKINYUSHOInital: TANKINYUSHO.initialDataDispatcher(dispatch).fetch,
    fetchSHISETSUNYUSHOInitial: SHISETSUNYUSHO.initialDataDispatcher(dispatch)
      .fetch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Download);
