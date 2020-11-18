import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as format from "date-fns/format";
import isEqual from "lodash-es/isEqual";
import omitBy from "lodash-es/omitBy";

import { toEffectiveObject } from "@utils/object";
import { dateInYYYYFormat } from "@utils/date";

import { GetWorkplaceCompanyResponse } from "@api/requests/offsiteWork/getWorkplaceCompany";
import { PostWorkplaceCompanyBody } from "@api/requests/offsiteWork/postWorkplaceCompany";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { SnackbarParams } from "@stores/ui/type";

import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

// form
import { Formik, Form, FormikProps, FormikActions } from "formik";
import SectionTitle from "@components/atoms/SectionTitle";
import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import IncludeUserDialog from "@components/molecules/dialog/IncludeUserDialog";
import FormGroup from "@material-ui/core/FormGroup";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikSelectDate from "@components/molecules/FormikSelectDate";
import MuiTextField from "@components/molecules/MuiTextField";

import initialValues, {
  WorkplaceCompanyValues
} from "@initialize/record/workplaceCompany/initialValues";
import validation from "@initialize/record/workplaceCompany/validation";
import { SelectDateValue } from "@interfaces/ui/form";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ConfirmDialog from "@components/atoms/ConfirmDialog";
import { SECONDARY_BLUE_COLOR } from "@constants/styles";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: 0
    },
    header: {
      padding: 0
    },
    sectionTitle: {
      marginBottom: 32
    },
    companyName: {
      width: 506
    },
    date: {
      fontSize: 14,
      marginTop: 32,
      marginBottom: 16
    },
    section: {
      marginLeft: 16
    },
    paper: {
      margin: 0,
      padding: spacing.unit * 4
    },
    button: {
      borderColor: "#ccc",
      padding: "3px 16px",
      fontSize: 14
    },
    submitButton: {
      width: 120
    },
    cancel: {
      borderColor: "rgba(0, 0, 0, 0.12)",
      color: "#0277bd",
      marginRight: 16,
      width: 120
    },
    deleteButton: {
      boxShadow: "none",
      color: SECONDARY_BLUE_COLOR,
      backgroundColor: "rgba(98, 2, 238, 0)",
      padding: "6px 6px 6px 0px",
      marginLeft: 16
    },
    deleteOutline: {
      color: SECONDARY_BLUE_COLOR,
      marginRight: 7
    },
    left: {
      position: "absolute"
    },
    delete: {
      paddingTop: spacing.unit * 2
    }
  });

interface DispatchProps {
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  initValues: (
    value: GetWorkplaceCompanyResponse["data"]
  ) => WorkplaceCompanyValues;
  needsStopHistory: boolean;
}

interface OwnProps {
  cancelAction: (e: React.MouseEvent<HTMLElement>) => void;
  deleteAction: () => void;
  submitAction: (values: PostWorkplaceCompanyBody) => void;
  workplaceCompany: GetWorkplaceCompanyResponse["data"];
  editMode: boolean;
}

type Props = DispatchProps & StateProps & OwnProps & WithStyles<typeof styles>;

const WorkplaceCompanyForm: React.FC<Props> = (props: Props) => {
  const { classes, editMode, workplaceCompany, initValues } = props;

  const confirmDiscardFormChanges = async (
    nextValues: WorkplaceCompanyValues
  ): Promise<void> => {
    const hasChange = !isEqual(nextValues, initValues);
    if (hasChange) {
      props.stopHistory(true);
    }
  };

  const dateFormat = (s: SelectDateValue): string | null => {
    const { year, month, day } = s;
    if (year === "" || month === "" || day === "") {
      return null;
    }
    return format(
      new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)),
      "YYYY-MM-DD"
    );
  };

  const normalize = (
    workplaceValues: WorkplaceCompanyValues
  ): PostWorkplaceCompanyBody => {
    const postData: PostWorkplaceCompanyBody["workplace_company"] = {
      name: workplaceValues.name,
      address: workplaceValues.address,
      postal_code: workplaceValues.postal_code,
      city_id: parseInt(workplaceValues.city_id, 10),
      tel: workplaceValues.tel,
      contract_begin_date: dateFormat(workplaceValues.contract_begin_date),
      contract_end_date: dateFormat(workplaceValues.contract_end_date),
      working_day: workplaceValues.working_day,
      working_time: workplaceValues.working_time,
      working_description: workplaceValues.working_description,
      other: workplaceValues.other,
      remarks: workplaceValues.remarks
    };
    const usersInFacility = workplaceValues.users_in_facility_workplace_company.map(
      (userId) => {
        return {
          users_in_facility_id: parseInt(userId, 10)
        };
      }
    );
    if (workplaceValues.id) {
      // 差分を抽出する
      const workPlaceData = omitBy(postData, (value, key) =>
        isEqual(value, workplaceCompany.workplace_company[key])
      );
      workPlaceData.id = parseInt(workplaceValues.id, 10);

      return {
        workplace_company: workPlaceData,
        users_in_facility_workplace_company: usersInFacility // 利用者一覧は差分更新しない
      };
    }
    return {
      workplace_company: postData,
      users_in_facility_workplace_company: usersInFacility
    };
  };

  const users = workplaceCompany.users_in_facility.map(
    (v: GetWorkplaceCompanyResponse["data"]["users_in_facility"][0]) => {
      return {
        id: v.users_in_facility_id,
        recipientNumber: v.recipient_number,
        name: `${v.name_sei} ${v.name_mei}`
      };
    }
  );

  const validate = (
    workplaceCompanyValues: WorkplaceCompanyValues
  ): void | object => {
    const validationResult = validation(workplaceCompanyValues);
    const error = toEffectiveObject(validationResult);
    if (!props.needsStopHistory) {
      confirmDiscardFormChanges(workplaceCompanyValues);
    }
    return error;
  };

  const onSubmit = async (
    workplaceCompanyValues: WorkplaceCompanyValues,
    actions: FormikActions<WorkplaceCompanyValues>
  ): Promise<void> => {
    await props.stopHistory(false);
    actions.setSubmitting(true);
    props.submitAction(normalize(workplaceCompanyValues));
    actions.setSubmitting(false);
  };

  const submitError = (): void => {
    props.showSnackbar({
      open: true,
      message: "入力に誤りがあります",
      variant: "warning"
    });
  };

  // modal
  const [openModal, setOpenModal] = React.useState(false);
  const setModalFunc = (isOpen: boolean) => (): void => setOpenModal(isOpen);

  const allUserCount = workplaceCompany.users_in_facility.length;

  const setIncludeUserIds = (
    formikProps: FormikProps<WorkplaceCompanyValues>
  ) => (ids: number[]): void => {
    formikProps.setFieldValue("users_in_facility_workplace_company", ids);
    setOpenModal(false);
  };

  const includedUserIds = (
    formikProps: FormikProps<WorkplaceCompanyValues>
  ): number[] => {
    return formikProps.values.users_in_facility_workplace_company.map((u) =>
      parseInt(u, 10)
    );
  };

  // 削除モーダル
  const [openDeleteModal, setDeleteModal] = React.useState(false);
  const onCloseDeleteModal = (): void => {
    setDeleteModal(false);
  };
  const onOpenDeleteModal = (): void => {
    setDeleteModal(true);
  };
  const values = initialValues(workplaceCompany);
  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(formikProps): JSX.Element => (
        <Form>
          <ContentHeader
            position="sticky"
            classes={{ wrapper: classes.wrapper }}
          >
            <ContentHeaderRight classes={{ flex: classes.header }}>
              {editMode ? (
                <Button
                  variant="outlined"
                  className={`${classes.cancel} ${classes.left}`}
                  onClick={props.cancelAction}
                >
                  戻る
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className={classes.cancel}
                  onClick={props.cancelAction}
                >
                  キャンセル
                </Button>
              )}
              <FormikSubmitButton
                className={classes.submitButton}
                buttonName="保存する"
                formikProps={formikProps}
                errorAction={submitError}
              />
            </ContentHeaderRight>
          </ContentHeader>
          <Paper elevation={0} className={classes.paper}>
            <div className={classes.sectionTitle}>
              <SectionTitle label="就労先企業情報" />
            </div>
            <div className={classes.companyName}>
              <FormikTextField
                name="name"
                label="企業名"
                placeholder=""
                maxLength={30}
                size="fullSize"
                helperText="全半角30文字まで"
              />
            </div>
            <FormikPostalCode
              name="postal_code"
              label="郵便番号"
              placeholder="000-0000"
              maxLength={8}
              size="smallMedium"
              startAdornmentLabel="〒"
            />
            <FormikAddress
              prefectureIdName="prefecture_name"
              cityIdName="city_id"
              required={false}
              formikProps={formikProps}
              showRegionType={false}
              showCityCode={false}
            />
            <FormikTextField
              name="address"
              label="市区町村以降の住所"
              maxLength={48}
              size="superLong"
              helperText="全半角48文字まで"
            />
            <FormikTextField
              name="tel"
              label="電話番号"
              placeholder="0000000000"
              size="medium"
              helperText="ハイフンなしで入力"
              maxLength={12}
            />
            <Typography variant="h6" className={classes.date}>
              契約期間
            </Typography>
            <div className={classes.section}>
              <FormikSelectDate
                name="contract_begin_date"
                label="契約開始日"
                style={{ marginBottom: 16 }}
                addYearTo={0}
                overrideYearFrom={+dateInYYYYFormat(new Date()) - 30}
              />
              <FormikSelectDate
                name="contract_end_date"
                label="契約終了日（任意）"
                addYearTo={5}
                overrideYearFrom={+dateInYYYYFormat(new Date()) - 30}
              />
            </div>
            <Typography variant="h6" className={classes.date}>
              契約内容
            </Typography>
            <div className={classes.section}>
              <FormikTextField
                name="working_day"
                label="作業日"
                size="superLong"
                maxLength={50}
                placeholder="月曜日〜金曜日　ただし、祝日・第２金曜日は休み"
                helperText="全半角50文字まで"
              />
              <FormikTextField
                name="working_time"
                label="作業時間"
                size="superLong"
                maxLength={50}
                placeholder="10〜16時（12〜13時休憩）実働5時間"
                helperText="全半角50文字まで"
              />
              <FormikTextField
                name="working_description"
                label="作業内容"
                size="superLong"
                maxLength={1000}
                multiline
              />
            </div>
            <Typography variant="h6" className={classes.date}>
              利用予定者
            </Typography>
            <div className={classes.section}>
              <FormGroup row>
                <MuiTextField
                  label="対象利用者数"
                  value={`${formikProps.values.users_in_facility_workplace_company.length} 名 / ${allUserCount}名`}
                  InputLabelProps={{ shrink: true }}
                  disabled
                  size="small"
                  style={{ marginBottom: 0 }}
                />
                <Button
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                  disabled={false}
                  onClick={setModalFunc(true)}
                >
                  利用者選択
                </Button>
                <IncludeUserDialog
                  title="利用者を選択してください"
                  open={openModal}
                  includedUserIds={includedUserIds(formikProps)}
                  users={users}
                  onSubmit={setIncludeUserIds(formikProps)}
                  onClose={setModalFunc(false)}
                />
              </FormGroup>
            </div>
            <Typography variant="h6" className={classes.date}>
              その他内容
            </Typography>
            <div className={classes.section}>
              <FormikTextField
                name="other"
                multiline
                label="その他（任意）"
                size="superLong"
                placeholder="○○日に個別支援計画の見直しを行った"
              />
              <FormikTextField
                name="remarks"
                multiline
                rows="3"
                label="補足欄（任意）"
                size="superLong"
              />
            </div>
          </Paper>
          {editMode ? (
            <div className={props.classes.delete}>
              <Button
                className={props.classes.deleteButton}
                variant="contained"
                onClick={onOpenDeleteModal}
              >
                <DeleteOutline className={classes.deleteOutline} />
                就労先企業情報を削除する
              </Button>
              <ConfirmDialog
                isOpen={openDeleteModal}
                onDelete={props.deleteAction}
                onCancel={onCloseDeleteModal}
                title="企業データを削除しますか？"
                message="企業データを削除します。削除すると完全に削除され、復元できません。削除してよろしいですか？"
              />
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);

  return {
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatches.snackbar(params),
    stopHistory: uiDispatches.stopHistory
  };
};

const mapStateToProps = (state: AppState): StateProps => ({
  initValues: initialValues,
  needsStopHistory: state.ui.needsStopHistory
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkplaceCompanyForm));
