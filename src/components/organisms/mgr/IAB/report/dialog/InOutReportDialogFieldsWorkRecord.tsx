import * as React from "react";
import { FormikProps } from "formik";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import MuiTextField from "@components/molecules/MuiTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTime from "@components/molecules/FormikTime";
import FormikTextField from "@components/molecules/FormikTextField";
import WorkDataChangeLog from "@components/organisms/mgr/IAB/report/dialog/WorkDataChangeLog";
import naturalNumber from "@validator/rules/naturalNumber";
import checkTime from "@validator/rules/checkTime";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";
import { SERVICE_STATUS } from "@constants/variables";
import formatMinutes from "@utils/date/formatMinutes";
import * as differenceInMinutes from "date-fns/difference_in_minutes";

const styles = (): StyleRules =>
  createStyles({
    errorWorkTime: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.6)",
      textAlign: "center",
      marginBottom: 33
    },
    checkbox: {
      "& > div > label > span": {
        fontSize: "16px"
      }
    },
    workTime: {
      width: 135
    },
    tableContainer: {
      margin: "32px 0 24px"
    },
    labelColor: {
      color: "#37474f"
    },
    fullWidth: {
      "& > div": {
        width: "100%"
      }
    }
  });

type OwnProps = {
  formikProps: FormikProps<InitialDataValues>;
  isWorkRecordDisplay: boolean;
  isTimeInputRequired: boolean;
  facility: FacilityState;
};
type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportDialogFieldsWorkRecord: React.FC<Props> = (props) => {
  const { status } = props.formikProps.values.initial;

  if (!props.isWorkRecordDisplay) {
    let errorText = "サービス提供の状況を選択してください。";
    if (status !== "1") {
      const currentService = SERVICE_STATUS.find(
        (service) => service.value === Number(status)
      );
      const serviceName = currentService ? currentService.label : "";
      errorText = `${serviceName}のため、作業時間の記録はありません。`;
    }
    return <div className={props.classes.errorWorkTime}>{errorText}</div>;
  }

  // 合計休憩時間の表示
  const [totalWorkTime, setTotalWorkTime] = React.useState("-");
  const { startTime, endTime, breakTime } = props.formikProps.values.workRecord;
  React.useEffect(() => {
    // 時刻が成立していなかったらリセットして中断 (空文字では中断しない)
    if (!!checkTime(startTime) || !!checkTime(endTime)) {
      setTotalWorkTime("-");
      return;
    }

    // 作業間の分を取得
    let totalMinutes = differenceInMinutes(
      `2020-01-01 ${endTime}`,
      `2020-01-01 ${startTime}`
    );
    if (!naturalNumber(breakTime)) {
      totalMinutes -= Number(breakTime);
    }
    totalMinutes = totalMinutes >= 0 ? totalMinutes : 0;
    setTotalWorkTime(formatMinutes(totalMinutes));
  }, [startTime, endTime, breakTime]);

  // validationErrorが出るテキストはリアルタイムにする
  const handleChangeText = React.useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
      beforeValue: string,
      autoCorrectValue: string
    ) => {
      props.formikProps.setFieldValue(e.target.name, autoCorrectValue);
    },
    []
  );

  const { worked } = props.formikProps.values.workRecord;
  return (
    <div>
      <div className={props.classes.checkbox}>
        <FormikCheckbox
          name="workRecord.worked"
          label="作業を実施した"
          disabled={false}
        />
      </div>
      {worked && (
        <>
          <FormGroup row>
            <div className={props.classes.workTime}>
              <FormikTime
                name="workRecord.startTime"
                label="作業開始時間"
                required={props.isTimeInputRequired}
                placeholder="00:00"
                size="smallMedium"
                maxLength={5}
                disabled={false}
                style={{ width: "auto" }}
                onChangeHookTime={handleChangeText}
              />
            </div>
            <div className={props.classes.workTime}>
              <FormikTime
                name="workRecord.endTime"
                label="作業終了時間"
                placeholder="00:00"
                size="smallMedium"
                maxLength={5}
                disabled={false}
                style={{ width: "auto" }}
                onChangeHookTime={handleChangeText}
              />
            </div>
            <div className={props.classes.workTime}>
              <FormikTextField
                name="workRecord.breakTime"
                label="休憩時間"
                placeholder="-"
                maxLength={4}
                disabled={false}
                style={{ width: "auto" }}
                endAdornmentLabel="分"
              />
            </div>
            <div className={props.classes.workTime}>
              <MuiTextField
                label="作業合計時間"
                type="text"
                value={totalWorkTime}
                disabled
                maxLength={4}
                style={{ width: "auto" }}
              />
            </div>
          </FormGroup>
          <div className={props.classes.fullWidth}>
            <FormikTextField
              name="workRecord.memo"
              label="メモ"
              disabled={false}
              size="quarterSuperLong"
              style={{ marginBottom: 32 }}
              multiline
            />
          </div>
          {props.formikProps.values.workRecord.histories &&
            props.formikProps.values.workRecord.histories.length > 0 && (
              <div className={props.classes.tableContainer}>
                <div className={props.classes.labelColor}>変更履歴</div>
                <WorkDataChangeLog
                  data={props.formikProps.values.workRecord.histories}
                />
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(InOutReportDialogFieldsWorkRecord);
