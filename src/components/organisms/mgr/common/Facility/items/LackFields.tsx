import * as React from "react";
import { FormikProps, getIn } from "formik";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import HelpIcon from "@material-ui/icons/Help";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectYearMonth from "@components/molecules/FormikSelectYearMonth";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
    radioIcon: {
      position: "relative",
      top: 4,
      left: 16,
      color: "#607d8b"
    },
    icon: {
      height: 16,
      width: 16,
      position: "relative",
      top: 3,
      left: 0,
      color: "#607d8b"
    },
    helpLabel: {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 12
    },
    childContent: {
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 64
    }
  });

interface OwnProps {
  name: string;
  formikProps: FormikProps<any>;
}

export type MuiRadioButtonsProps = OwnProps &
  RadioGroupProps &
  WithStyles<typeof styles>;

// ラジオボタン
const labelStyles = () =>
  createStyles({
    root: {
      padding: 4,
      margin: "0 8px"
    }
  });
const StyledRadio = withStyles(labelStyles)(Radio);

// ラジオボタンのラッパー
const radioGroupStyles = () =>
  createStyles({
    root: {
      margin: "0 28px"
    }
  });
const StyledRadioGroup = withStyles(radioGroupStyles)(RadioGroup);

const LACK_FLAG_RADIO_VALUES = {
  LACK_OF_LIFE_SUPPORT_MEMBER_FLAG: "1",
  LACK_OF_RESPONSIBLE_PERSON_FLAG: "2"
};

/**
 * 人員の欠員情報入力項目
 */
const LackFields: React.FunctionComponent<MuiRadioButtonsProps> = ({
  name,
  style,
  formikProps,
  classes,
  ...props
}) => {
  const onRadioValueChange = (event: React.ChangeEvent<any>) => {
    if (
      event.target.value ===
      LACK_FLAG_RADIO_VALUES.LACK_OF_LIFE_SUPPORT_MEMBER_FLAG
    ) {
      formikProps.setFieldValue(`${name}.lackOfLifeSupportMemberFlag`, 1);
      formikProps.setFieldValue(`${name}.lackOfResponsiblePersonFlag`, 0);
    } else if (
      event.target.value ===
      LACK_FLAG_RADIO_VALUES.LACK_OF_RESPONSIBLE_PERSON_FLAG
    ) {
      formikProps.setFieldValue(`${name}.lackOfLifeSupportMemberFlag`, 0);
      formikProps.setFieldValue(`${name}.lackOfResponsiblePersonFlag`, 1);
    }
  };

  const onLackFlagChange = () => {
    if (getIn(formikProps.values, `${name}.lackFlag`)) {
      formikProps.setFieldValue(`${name}.lackOfLifeSupportMemberFlag`, 0);
      formikProps.setFieldValue(
        `${name}.lackOfLifeSupportMemberStartDate.year`,
        DEFAULT_SELECT_VALUE
      );
      formikProps.setFieldValue(
        `${name}.lackOfLifeSupportMemberStartDate.month`,
        ""
      );
      formikProps.setFieldValue(
        `${name}.lackOfResponsiblePersonStartDate.year`,
        DEFAULT_SELECT_VALUE
      );
      formikProps.setFieldValue(
        `${name}.lackOfResponsiblePersonStartDate.month`,
        ""
      );
      formikProps.setFieldValue(`${name}.lackOfResponsiblePersonFlag`, 0);
      formikProps.setFieldValue(`${name}.lackFlag`, false);
    } else {
      formikProps.setFieldValue(`${name}.lackOfLifeSupportMemberFlag`, 1);
      formikProps.setFieldValue(`${name}.lackFlag`, true);
    }
  };
  const onChangeLackOfLifeSupportMember = () => {
    formikProps.setFieldValue(
      `${name}.lackOfResponsiblePersonStartDate.year`,
      DEFAULT_SELECT_VALUE
    );
    formikProps.setFieldValue(
      `${name}.lackOfResponsiblePersonStartDate.month`,
      ""
    );
  };
  const onChangeLackOfResponsiblePerson = () => {
    formikProps.setFieldValue(
      `${name}.lackOfLifeSupportMemberStartDate.year`,
      DEFAULT_SELECT_VALUE
    );
    formikProps.setFieldValue(
      `${name}.lackOfLifeSupportMemberStartDate.month`,
      ""
    );
  };

  const lackOfLifeSupportMemberFlag = Boolean(
    getIn(formikProps.values, `${name}.lackOfLifeSupportMemberFlag`)
  );
  const lackOfResponsiblePersonFlag = Boolean(
    getIn(formikProps.values, `${name}.lackOfResponsiblePersonFlag`)
  );

  const lackTypeValue = lackOfLifeSupportMemberFlag
    ? LACK_FLAG_RADIO_VALUES.LACK_OF_LIFE_SUPPORT_MEMBER_FLAG
    : lackOfResponsiblePersonFlag
    ? LACK_FLAG_RADIO_VALUES.LACK_OF_RESPONSIBLE_PERSON_FLAG
    : "";

  return (
    <FormikSwitch
      name={`${name}.lackFlag`}
      label="人員の欠員"
      style={{ marginBottom: 24 }}
      onChange={onLackFlagChange}
    >
      <div>
        <FormControl onChange={onRadioValueChange}>
          <StyledRadioGroup
            {...props}
            style={{ marginLeft: 0 }}
            value={lackTypeValue}
          >
            <FormControlLabel
              control={<StyledRadio />}
              value={LACK_FLAG_RADIO_VALUES.LACK_OF_LIFE_SUPPORT_MEMBER_FLAG}
              onChange={onChangeLackOfLifeSupportMember}
              label={
                <span>
                  生活支援員等の欠員
                  <HelpToolTip
                    classes={{ icon: classes.radioIcon }}
                    title={
                      <HelpTipMessages name="lackOfLifeSupportMemberFlag" />
                    }
                  />
                </span>
              }
            />
          </StyledRadioGroup>
        </FormControl>
      </div>
      {lackOfLifeSupportMemberFlag && (
        <div className={classes.childContent}>
          <FormikSelectYearMonth
            name={`${name}.lackOfLifeSupportMemberStartDate`}
            label="減算適応開始月"
            style={{ marginBottom: 0 }}
            addYearTo={1}
          />
          <div className={classes.helpLabel}>
            減算適応月については該当項目の
            <HelpIcon className={classes.icon} fontSize={"small"} />
            を参照してください
          </div>
        </div>
      )}
      <div>
        <FormControl onChange={onRadioValueChange}>
          <StyledRadioGroup
            {...props}
            style={{ marginLeft: 0 }}
            value={lackTypeValue}
          >
            <FormControlLabel
              control={<StyledRadio />}
              value={LACK_FLAG_RADIO_VALUES.LACK_OF_RESPONSIBLE_PERSON_FLAG}
              onChange={onChangeLackOfResponsiblePerson}
              label={
                <span>
                  サービス管理責任者の欠員
                  <HelpToolTip
                    classes={{ icon: classes.radioIcon }}
                    title={
                      <HelpTipMessages name="lackOfResponsiblePersonFlag" />
                    }
                  />
                </span>
              }
            />
          </StyledRadioGroup>
        </FormControl>
      </div>
      {lackOfResponsiblePersonFlag && (
        <div className={classes.childContent}>
          <FormikSelectYearMonth
            name={`${name}.lackOfResponsiblePersonStartDate`}
            label="減算適応開始月"
            style={{ marginBottom: 0 }}
            addYearTo={1}
          />
          <div className={classes.helpLabel}>
            減算適応月については該当項目の
            <HelpIcon className={classes.icon} fontSize={"small"} />
            を参照してください
          </div>
        </div>
      )}
    </FormikSwitch>
  );
};

export default withStyles(styles)(LackFields);
