/**
 * basic.operatingUnitFlag(基本情報 > ２つ以上のユニットを運用している)が有効な時表示
 * ユニット名の追加・削除を行う
 */

import * as React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import { FormikProps, FieldArray } from "formik";
import {
  FacilityValues,
  unitInitialValue
} from "@initialize/mgr/GroupHome/facility/initialValues";
import Button from "@material-ui/core/Button";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import IconAdd from "@material-ui/icons/Add";
import deepEqual from "fast-deep-equal";

const styles = () =>
  createStyles({
    label: {
      display: "flex",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.87)",
      "& > :first-child": {
        width: 526,
        marginRight: 14
      }
    },
    fieldWrapper: {
      "& > :last-child": {
        marginBottom: -4
      }
    },
    field: {
      display: "flex",
      marginBottom: 10,
      "& > div": {
        margin: 0,
        "&:first-child": {
          width: 526,
          marginRight: 16
        }
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

const UnitsFields: React.SFC<Props> = props => {
  const { units } = props.formikProps.values;
  const isDeletedCount = units.filter(x => x.is_deleted).length;
  // 削除は2件以下には出来ない
  const canDelete = units.length - isDeletedCount > 2;
  return (
    <FieldArray name="units">
      {arrayHelpers => {
        const onClickAddUnit = () => {
          arrayHelpers.push(unitInitialValue);
        };
        return (
          <div>
            <div className={props.classes.label}>
              <div>ユニット名</div>
              <div>削除</div>
            </div>
            <div className={props.classes.fieldWrapper}>
              {units.map((unit, i) => (
                <div className={props.classes.field} key={`unit-${i}`}>
                  <FormikTextField
                    name={`units[${i}].unit_name`}
                    placeholder="ユニット名"
                    disabled={unit.is_deleted}
                  />
                  <FormikCheckbox
                    name={`units[${i}].is_deleted`}
                    label=""
                    disabled={!unit.is_deleted && !canDelete}
                  />
                </div>
              ))}
            </div>
            <Button color="secondary" onClick={onClickAddUnit}>
              <IconAdd />
              ユニットを追加
            </Button>
          </div>
        );
      }}
    </FieldArray>
  );
};

export default React.memo(withStyles(styles)(UnitsFields), (prev, next) =>
  deepEqual(prev.formikProps.values.units, next.formikProps.values.units)
);
