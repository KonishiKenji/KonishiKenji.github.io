import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikSwitch from "@components/molecules/FormikSwitch";
import {
  SUBSIDIZED_UNIT_LIST,
  DEFAULT_SELECT_VALUE,
  DEFAULT_SUBSIDIZED_UNIT
} from "@constants/variables";

const SubsidizedHelpToolTip = (
  <HelpToolTip title={<HelpTipMessages name="subsidized_flg" />} />
);

const styles = (): StyleRules =>
  createStyles({
    switchLabel: {
      "&+span": {
        "& > div": {
          alignItems: "center",
          "& > span": {
            marginRight: 8
          }
        }
      }
    },
    fieldWrapperForm: {
      paddingTop: 10,
      marginBottom: 22,
      "& > div": {
        marginBottom: 0
      }
    },
    fieldWrapperAddress: {
      paddingBottom: 10,
      "& > div > div": {
        marginBottom: 0,
        "&:first-child": {
          "& svg": {
            display: "none"
          }
        },
        "&:last-child": {
          width: 240
        }
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<{
    serviceUse: {
      subsidizedUnit: string;
    };
  }>;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 自治体助成金
 * ※ 全種別に存在するフィールドだが、修正スコープの関係で作成時点での適応範囲は「自立訓練」と「施設入所」のみ
 */
const SubsidizedFields: React.FC<Props> = (props) => {
  /**
   * 自治体助成金対象フラグ管理と、OFFになった時に関連項目をリセット
   */
  const onChangeSubsidizedFlag = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { setFieldValue } = props.formikProps;
      setFieldValue("serviceUse.subsidizedFlag", e.currentTarget.checked);
      if (!e.currentTarget.checked) {
        setFieldValue("serviceUse.subsidizedPercent", "");
        setFieldValue("serviceUse.subsidizedYen", "");
        setFieldValue("serviceUse.subsidizedUnit", DEFAULT_SUBSIDIZED_UNIT);
        setFieldValue("serviceUse.subsidizedCityId", DEFAULT_SELECT_VALUE);
      }
    },
    []
  );

  const { subsidizedUnit } = props.formikProps.values.serviceUse;
  return (
    <FormikSwitch
      name="serviceUse.subsidizedFlag"
      label="自治体助成金対象"
      tooltip={SubsidizedHelpToolTip}
      onChange={onChangeSubsidizedFlag}
      className={props.classes.switchLabel}
    >
      <FormGroup row className={props.classes.fieldWrapperForm}>
        {subsidizedUnit === DEFAULT_SUBSIDIZED_UNIT ? (
          <FormikTextField
            name="serviceUse.subsidizedPercent"
            label="助成金"
            maxLength={9}
            placeholder="0"
          />
        ) : (
          <FormikTextField
            name="serviceUse.subsidizedYen"
            label="金額：円"
            maxLength={11}
            placeholder="0"
          />
        )}
        <FormikSelect
          name="serviceUse.subsidizedUnit"
          label="単位"
          options={SUBSIDIZED_UNIT_LIST}
        />
      </FormGroup>
      <div className={props.classes.fieldWrapperAddress}>
        <FormikAddress
          prefectureIdName="basic.prefectureId"
          cityIdName="serviceUse.subsidizedCityId"
          formikProps={props.formikProps}
          required={false}
          disabledPrefectureId
          showRegionType={false}
        />
      </div>
    </FormikSwitch>
  );
};

export default withStyles(styles)(SubsidizedFields);
