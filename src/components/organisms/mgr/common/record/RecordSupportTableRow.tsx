import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from "@material-ui/icons/Create";
import FormikTime from "@components/molecules/FormikTime";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordSupportTableField from "@components/organisms/mgr/common/record/RecordSupportTableField";
import { OperationsState } from "@stores/domain/operations/types";
import { SupportsState } from "@stores/domain/supports/types";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";

import * as format from "date-fns/format";
import * as jaLocale from "date-fns/locale/ja";

import get from "lodash-es/get";
import generateSelectFieldItems from "@utils/dataNormalizer/generateSelectFieldItems";
import generateWorkOptions from "@utils/domain/work/generateWorkOptions";
import { formatTime } from "@utils/date";

import {
  SERVICE_STATUS,
  SUPPLY_PICKUP_SERVICE_LIST
} from "@constants/variables";
import Button from "@material-ui/core/Button";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { FormikProps } from "formik";

const styles = (): StyleRules =>
  createStyles({
    root: {
      padding: 32
    },
    cell: {
      padding: "20px 16px",
      verticalAlign: "top",
      "&:last-child": {
        paddingRight: 16
      }
    },
    hideBottomBorder: {
      padding: "20px 16px",
      verticalAlign: "top",
      "&:last-child": {
        paddingRight: 16
      },
      borderBottom: "none"
    },
    upper_left: {
      marginBottom: 14
    },
    serviceBox: {
      fontSize: 12,
      marginBottom: 8
    },
    serviceBoxText: {
      color: "rgba(0, 0, 0, 0.6)"
    },
    listWrapper: {
      display: "flex",
      flexDirection: "column",
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    interviewTime: {
      display: "flex",
      "& > div": {
        maxWidth: 154
      }
    },
    staffAndEdit: {
      display: "flex",
      alignItems: "center",
      width: 175
    },
    editIcon: {
      marginLeft: 20,
      cursor: "pointer"
    },
    cancelButton: {
      borderColor: "#ccc"
    },
    saveButton: {
      boxShadow: "none"
    },
    button: {
      width: 120,
      marginBottom: 32,
      "&:first-child": {
        marginRight: 8
      }
    },
    buttonCell: {
      textAlign: "right"
      // borderBottom: "none"
    },
    editable: {
      opacity: 1
    },
    unEditable: {
      opacity: 0.5,
      zIndex: 1000,
      pointerEvents: "none"
    }
  });

type DailySupportRecord = Exclude<
  OperationsState["dailyRecord"]["support"],
  null
>[0];
type SupportRecord = Exclude<
  SupportsState["supportsRecord"]["support"],
  null
>[0];

interface BaseProps extends WithStyles<typeof styles> {
  support: DailySupportRecord | SupportRecord;
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  supportRecordItems: { key: string; label: string }[];
  formikFieldNamePrefix: string;
  isEditing: boolean;
  hiddenLabel?: boolean;
  isMeal: boolean;
  isTransfer: boolean;
}
interface AllEditPattern extends BaseProps {
  editType: "all";
  displayType: "name" | "date";
}
interface IndividualEditPattern extends BaseProps {
  editType: "individual";
  recordUserDetail: RecordUserDetailState;
  formikProps: FormikProps<any>;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickCancel: () => void;
  onSubmitError?: () => void;
}

type Props = AllEditPattern | IndividualEditPattern;

/**
 * 支援記録のテーブル
 */
const SupportRecordTableRow = (props: Props): JSX.Element => {
  // state
  const [showInterviewTimeField, setShowInterviewTimeField] = React.useState(
    get(props.support.record, "interview_flg") === "1"
  );

  const { inout } = props.support;

  // 項目のthのあるなしで変える
  const colspan = props.hiddenLabel ? 1 : 2;

  // inout.statusによって表示する項目が変わる
  const inoutStatus = SERVICE_STATUS.find(
    (status) => status.value === inout.status
  );

  React.useEffect(() => {
    const hasInterviewFlg = get(props.support.record, "interview_flg") === "1";
    setShowInterviewTimeField(hasInterviewFlg);
  }, [props.isEditing]);

  // handle
  const onChangeInterviewFlag = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    // formikからはnumberで値がくるがeventはstring
    setShowInterviewTimeField(Number(e.target.value) === 1);
  };

  const displayItem =
    props.editType === "individual" ? "date" : props.displayType;

  const tableRowStyle =
    props.editType === "all" ||
    (props.editType === "individual" &&
      !props.recordUserDetail.isEditingInoutId) ||
    props.isEditing
      ? props.classes.editable
      : props.classes.unEditable;

  const tableCellStyle =
    props.editType === "individual" && props.isEditing
      ? props.classes.hideBottomBorder
      : props.classes.cell;

  // サービス提供下の開始/終了時間表示のロジック
  let supportInTime = "--:--";
  if (inout.in_time) {
    supportInTime = format(inout.in_time, "HH:mm");
  }
  let supportOutTime = "--:--";
  if (inout.out_time) {
    supportOutTime = format(inout.out_time, "HH:mm");
  }
  let supportInOutTime;
  // サービス提供の状態で「欠席時対応」「体験利用支援」「欠席」以外の時に開始/終了時間は表示
  if (inoutStatus && ![5, 7, 10].includes(inoutStatus.value)) {
    supportInOutTime = `${supportInTime} 〜 ${supportOutTime}`;
  }

  return (
    <>
      <TableRow className={tableRowStyle}>
        <TableCell className={tableCellStyle}>
          <div className={props.classes.upper_left}>
            {displayItem === "date" ? (
              format(inout.target_date, "Do（dd）", {
                locale: jaLocale
              })
            ) : (
              <div className={props.classes.upper_left}>{inout.name}</div>
            )}
          </div>

          <div className={props.classes.serviceBox}>
            {inoutStatus && inoutStatus.label}
            <br />
            {supportInOutTime}
          </div>
          {props.isMeal && inout.food && inout.food === "1" && (
            <div className={props.classes.serviceBox}>
              食事
              <br />
              <span className={props.classes.serviceBoxText}>あり</span>
            </div>
          )}
          {props.isTransfer && inout.pickup && inout.pickup !== "0" && (
            <div className={props.classes.serviceBox}>
              送迎
              <br />
              <span className={props.classes.serviceBoxText}>
                {SUPPLY_PICKUP_SERVICE_LIST[inout.pickup].label}
              </span>
            </div>
          )}
        </TableCell>
        <TableCell className={tableCellStyle} colSpan={colspan}>
          <ul className={props.classes.listWrapper}>
            {props.supportRecordItems.map((record) => {
              switch (record.key) {
                // 就労先企業
                case "workplace_company_id": {
                  const checkedCompany = props.support.record
                    ? props.support.record.workplace_company.filter((value) => {
                        return value.is_checked;
                      })
                    : [];
                  const companyOptions = props.support.record
                    ? generateSelectFieldItems(
                        props.support.record.workplace_company,
                        "workplace_name",
                        "workplace_company_id",
                        false
                      )
                    : [];
                  return (
                    <RecordSupportTableField
                      key={record.key}
                      type="select"
                      label={record.label}
                      name={`${props.formikFieldNamePrefix}["${record.key}"]`}
                      value={
                        checkedCompany.length > 0
                          ? checkedCompany[0].workplace_name
                          : ""
                      }
                      defaultValue="未設定"
                      placeholder="未設定"
                      isEditing={props.isEditing}
                      options={companyOptions}
                      hiddenLabel={props.hiddenLabel}
                      isSelectablePlaceholder
                      emptyText="該当する企業の登録がありません。実施報告書画面から企業情報をご確認ください。"
                    />
                  );
                }
                // 作業
                case "support_work_history": {
                  const supportWorkHistory =
                    (props.support.support_work_history as {
                      item_name: string;
                    }[]) || [];
                  const supportWorkHistoryValue = supportWorkHistory
                    .map((history) => history.item_name)
                    .join("、");
                  const workOptions = generateWorkOptions(
                    props.workOptions,
                    props.support.support_work_history
                  );
                  return (
                    <RecordSupportTableField
                      key={record.key}
                      type="multiple"
                      label={record.label}
                      name={`${props.formikFieldNamePrefix}["${record.key}"]["itemIdList"]`}
                      value={supportWorkHistoryValue}
                      defaultValue="未実施"
                      placeholder="選択してください"
                      isEditing={props.isEditing}
                      options={workOptions}
                      hiddenLabel={props.hiddenLabel}
                      emptyText="作業の登録がありません。作業情報画面から作業を登録してください。"
                      maxWidth={690}
                    />
                  );
                }
                // 対応職員
                case "correspondent_staff_id":
                  return (
                    <RecordSupportTableField
                      key={record.key}
                      type="select"
                      label={record.label}
                      name={`${props.formikFieldNamePrefix}["${record.key}"]`}
                      value={
                        get(props.support.record, "correspondent_staff_name") ||
                        ""
                      }
                      defaultValue="-"
                      placeholder="選択してください"
                      isEditing={props.isEditing}
                      options={props.staffOptions}
                      hiddenLabel={props.hiddenLabel}
                      isSelectablePlaceholder
                      emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
                    />
                  );
                // 面談フラグ（編集時のみ）
                case "interview_flg":
                  return (
                    props.isEditing && (
                      <RecordSupportTableField
                        key={record.key}
                        type="select"
                        label={record.label}
                        name={`${props.formikFieldNamePrefix}["${record.key}"]`}
                        value={
                          get(
                            props.support.record,
                            "correspondent_staff_name"
                          ) || ""
                        }
                        defaultValue="なし"
                        placeholder="選択してください"
                        isEditing={props.isEditing}
                        options={[
                          { label: "なし", value: "0" },
                          { label: "あり", value: "1" }
                        ]}
                        onChangeHook={onChangeInterviewFlag}
                        hiddenLabel={props.hiddenLabel}
                      />
                    )
                  );
                // 面談時間（閲覧時のみ）
                case "interview_time_show_only": {
                  // 面談あり and 面談時間の入力あり -> 支援記録(面談)・面談記録(時間)タブ:面談の入力時間を表示
                  // 面談あり and 面談時間の入力なし -> 支援記録タブ(面談):「あり」, 面談記録タブ(時間):「--:--」
                  // 面談なし -> 支援記録タブ(面談):「なし」
                  const emptyTime = "--:--";
                  let interviewFlgValue = "";
                  const defaultValue =
                    props.editType === "individual" ? emptyTime : "なし";
                  if (showInterviewTimeField) {
                    const interviewStartTime =
                      get(props.support.record, "interview_start_time") || "";
                    const interviewEndTime =
                      get(props.support.record, "interview_end_time") || "";
                    if (interviewStartTime || interviewEndTime) {
                      const startTime = interviewStartTime
                        ? formatTime(interviewStartTime)
                        : emptyTime;
                      const endTime = interviewEndTime
                        ? formatTime(interviewEndTime)
                        : emptyTime;
                      interviewFlgValue = `${startTime} ~ ${endTime}`;
                    } else {
                      interviewFlgValue =
                        props.editType === "individual"
                          ? `${emptyTime} ~ ${emptyTime}`
                          : "あり";
                    }
                  }

                  return (
                    !props.isEditing && (
                      <RecordSupportTableField
                        key={record.key}
                        type="text"
                        label={record.label}
                        name=""
                        value={interviewFlgValue}
                        defaultValue={defaultValue}
                        placeholder=""
                        isEditing={false}
                        hiddenLabel={props.hiddenLabel}
                      />
                    )
                  );
                }
                // 面談時間（編集時のみ）
                case "interview_time":
                  return (
                    showInterviewTimeField &&
                    props.isEditing && (
                      <RecordSupportTableField
                        key={record.key}
                        type="custom"
                        label={record.label}
                        hiddenLabel={props.hiddenLabel}
                      >
                        <div className={props.classes.interviewTime}>
                          <FormikTime
                            label="開始"
                            name={`${props.formikFieldNamePrefix}["interview_start_time"]`}
                            placeholder="00:00"
                            maxLength={5}
                            size="fullSize"
                            style={{ marginBottom: 0 }}
                          />
                          <FormikTime
                            label="終了"
                            name={`${props.formikFieldNamePrefix}["interview_end_time"]`}
                            placeholder="00:00"
                            maxLength={5}
                            size="fullSize"
                            style={{ marginBottom: 0 }}
                          />
                        </div>
                      </RecordSupportTableField>
                    )
                  );
                // 面談内容
                case "interview_comment":
                  return (
                    showInterviewTimeField && (
                      <RecordSupportTableField
                        key={record.key}
                        type="text"
                        label={record.label}
                        name={`${props.formikFieldNamePrefix}["${record.key}"]`}
                        value={get(props.support.record, record.key) || ""}
                        defaultValue="-"
                        placeholder="入力してください"
                        isEditing={props.isEditing}
                        hiddenLabel={props.hiddenLabel}
                      />
                    )
                  );
                // 汎用（TextField）
                default:
                  return (
                    <RecordSupportTableField
                      key={record.key}
                      type="text"
                      label={record.label}
                      name={`${props.formikFieldNamePrefix}["${record.key}"]`}
                      value={get(props.support.record, record.key) || ""}
                      defaultValue="-"
                      placeholder="入力してください"
                      isEditing={props.isEditing}
                      hiddenLabel={props.hiddenLabel}
                    />
                  );
              }
            })}
          </ul>
        </TableCell>
        <TableCell className={tableCellStyle}>
          <div className={props.classes.staffAndEdit}>
            <RecordSelect
              name={`${props.formikFieldNamePrefix}["staff_id"]`}
              value={get(props.support.record, "staff_name") || ""}
              options={props.staffOptions}
              defaultValue="未設定"
              placeholder="選択してください"
              isEditable={props.isEditing}
              isSelectablePlaceholder
              emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            />
            {!props.isEditing && props.editType === "individual" && (
              <CreateIcon
                className={props.classes.editIcon}
                color="secondary"
                onClick={props.onClickEdit}
              />
            )}
          </div>
        </TableCell>
      </TableRow>
      {props.isEditing && props.editType === "individual" && (
        <TableRow>
          <TableCell className={props.classes.buttonCell} colSpan={5}>
            <Button
              className={`${props.classes.button} ${props.classes.cancelButton}`}
              variant="outlined"
              color="secondary"
              onClick={props.onClickCancel}
            >
              キャンセル
            </Button>
            <FormikSubmitButton
              className={`${props.classes.button} ${props.classes.saveButton}`}
              buttonName="保存する"
              formikProps={props.formikProps}
              errorAction={props.onSubmitError}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default withStyles(styles)(SupportRecordTableRow);
