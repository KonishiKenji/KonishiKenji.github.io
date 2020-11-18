/**
 * basic.operatingUnitFlag(基本情報 > ２つ以上のユニットを運用している)が有効な時表示
 * UnitsFieldsと連動してユニットごとの夜間支援体制加算の管理を行う
 */

import * as React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import { FormikProps, FieldArray } from "formik";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import { NIGHT_SUPPORT_TYPE_ALL_OPTIONS } from "@constants/mgr/GroupHome/variables";
import deepEqual from "fast-deep-equal";

const styles = () =>
  createStyles({
    label: {
      display: "flex",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.87)",
      "& > :nth-child(1)": {
        width: 524,
        marginRight: 16
      },
      "& > :nth-child(2)": {
        width: 240,
        marginRight: 16
      },
      "& > :nth-child(3)": {
        width: 144
      }
    },
    field: {
      display: "flex",
      "& > div": {
        marginBottom: 16
      },
      "& > :nth-child(1)": {
        width: 524,
        marginRight: 16
      },
      "& > :nth-child(3)": {
        width: 144
      },
      "&:first-child": {
        "& label": {
          color: "inherit"
        }
      },
      "&:not(:first-child)": {
        "& > :nth-child(2)": {
          marginTop: -16
        }
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

const UnitsNightSupportFields: React.SFC<Props> = props => {
  const { units } = props.formikProps.values;
  return (
    <FieldArray name="units">
      {arrayHelpers => (
        <div>
          <div className={props.classes.label}>
            <div>ユニット名</div>
            <div>夜間支援体制加算</div>
            <div>前年度の平均実績</div>
          </div>
          {units.map((unit, i) => {
            // 削除フラグがあれば描画しない
            if (unit.is_deleted) {
              return null;
            }
            return (
              <div
                className={props.classes.field}
                key={`unitNightSupport-${i}`}
              >
                <ReadonlyTextField
                  value={unit.unit_name}
                  defaultValue=""
                  placeholder="ユニット名"
                />
                <FormikSelect
                  label=""
                  name={`units[${i}].night_support_type`}
                  options={NIGHT_SUPPORT_TYPE_ALL_OPTIONS}
                />
                <FormikTextField
                  name={`units[${i}].ave_users_last_fiscal_year`}
                  placeholder="0"
                  endAdornmentLabel="人"
                  disabled={
                    unit.night_support_type ===
                    NIGHT_SUPPORT_TYPE_ALL_OPTIONS[0].value
                  } // なしの時
                />
              </div>
            );
          })}
        </div>
      )}
    </FieldArray>
  );
};

export default React.memo(
  withStyles(styles)(UnitsNightSupportFields),
  (prev, next) =>
    deepEqual(prev.formikProps.values.units, next.formikProps.values.units)
);
