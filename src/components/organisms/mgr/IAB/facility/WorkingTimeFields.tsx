import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRulesCallback
} from "@material-ui/core/styles";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikSwitch from "@components/molecules/FormikSwitch";
import WorkingTimeItemsFields from "@components/organisms/mgr/IAB/facility/items/WorkingTimeItemsFields";
import WorkBreakTimesFields from "@components/organisms/mgr/IAB/facility/items/WorkBreakTimesFields";
import ChangeEverydayFields from "@components/organisms/mgr/IAB/facility/items/ChangeEverydayFields";
import UsersRecordWorkFields from "@components/organisms/mgr/IAB/facility/items/UsersRecordWorkFields";
import { UNIT_ENGRAVE } from "@constants/mgr/IAB/variables";
import { FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

type ChangeEventAlias = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

const styles: StyleRulesCallback = () =>
  createStyles({
    info: {
      fontSize: 16,
      color: "#666",
      marginBottom: 32
    },
    infoIcon: {
      color: "#0277bd",
      width: 20,
      height: 20,
      marginRight: 6
    },
    caption: {
      color: "#37474f",
      display: "flex",
      alignItems: "center"
    },
    description: {
      margin: "8px 16px"
    },
    label: {
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      marginBottom: 12,
      "& :first-child": {
        marginRight: 6
      }
    },
    section: {
      marginBottom: 32
    },
    indentation: {
      marginLeft: 16
    },
    workTimeItems: {
      marginLeft: -32
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

const WorkingTimeFields: React.FC<Props> = ({ classes, formikProps }) => {
  /**
   * 刻む値の対象じゃない値を消す
   * @param name FormikValueのフィールド名
   * @param value FomikValueに設定されている値
   * @param unitEngrave 刻む値
   */
  const updateMinute = (
    name: string,
    value: string,
    unitEngrave: string
  ): void => {
    if (!value) {
      return;
    }
    if (Number(value) % Number(unitEngrave) !== 0) {
      formikProps.setFieldValue(name, "");
      formikProps.setFieldTouched(name, true);
    }
  };

  /**
   * 刻む時間が変更されたときに、選択肢に入らない値を消す
   */
  const onChangeUnitEngrave = React.useCallback(
    (facilityValue: FacilityValues) => {
      return (e: ChangeEventAlias): void => {
        const { name, value } = e.target;
        if (name !== "workingTime.unitEngrave") {
          return;
        }

        const { workBreakTimes, workTimeItems } = facilityValue.workingTime;

        workBreakTimes.forEach((v, idx) => {
          updateMinute(
            `workingTime.workBreakTimes[${idx}].startTimeMinute`,
            v.startTimeMinute,
            value
          );
          updateMinute(
            `workingTime.workBreakTimes[${idx}].endTimeMinute`,
            v.endTimeMinute,
            value
          );
        });
        workTimeItems.forEach((v, idx) => {
          updateMinute(
            `workingTime.workTimeItems[${idx}].startTimeMinute`,
            v.startTimeMinute,
            value
          );
          updateMinute(
            `workingTime.workTimeItems[${idx}].endTimeMinute`,
            v.endTimeMinute,
            value
          );
        });
      };
    },
    [formikProps.values.workingTime.unitEngrave]
  );

  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="作業時間" />
      </div>

      <div className={classes.info}>
        <div className={classes.caption}>
          <InfoOutlinedIcon className={classes.infoIcon} />
          作業・休憩時間の設定について
        </div>
        <p className={classes.description}>
          ここで設定した作業時間と休憩時間を基準に、利用者の作業合計時間が算出されます。
          <br />
          例）作業時間が8時間で休憩の合計時間を1時間に設定した場合、作業合計時間は休憩の合計時間を差し引いた7時間となります。
        </p>
      </div>

      <section>
        <div className={classes.label}>
          <span>刻む単位</span>
          <HelpToolTip title={<HelpTipMessages name="unitEngraveFlag" />} />
        </div>
        <div className={classes.indentation}>
          <FormikSelect
            name="workingTime.unitEngrave"
            label=""
            options={UNIT_ENGRAVE}
            style={{ marginTop: -16 }}
            onChangeHook={onChangeUnitEngrave(formikProps.values)}
          />
        </div>
      </section>

      <section>
        <div className={classes.label}>作業時間</div>
        <div className={classes.indentation}>
          <WorkingTimeItemsFields formikProps={formikProps} />
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.label}>休憩時間</div>
        <div className={classes.indentation}>
          <WorkBreakTimesFields formikProps={formikProps} />
        </div>
      </section>

      <FormikSwitch
        name="workingTime.dayOfWeekFlag"
        label="曜日ごとに作業時間と休憩時間を設定する"
      >
        <div className={classes.workTimeItems}>
          <ChangeEverydayFields formikProps={formikProps} />
        </div>
      </FormikSwitch>

      <section>
        <div className={classes.label}>
          <span>作業時間を自動的に入力する利用者</span>
          <HelpToolTip title={<HelpTipMessages name="user_automatically" />} />
        </div>
        <div className={classes.indentation}>
          <UsersRecordWorkFields formikProps={formikProps} />
        </div>
      </section>
    </FormPaper>
  );
};

export default withStyles(styles)(WorkingTimeFields);
