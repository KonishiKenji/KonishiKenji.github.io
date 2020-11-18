import * as React from "react";
import * as classNames from "classnames";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconAdd from "@material-ui/icons/Add";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import BreakTimeField from "@components/organisms/mgr/IAB/facility/items/BreakTimeField";
import { FieldArray, FormikProps } from "formik";
import createHoursArray from "@utils/date/createHoursArray";
import createMinutesArray from "@utils/date/createMinutesArray";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

const styles = () =>
  createStyles({
    table: {
      width: "auto",
      tableLayout: "fixed",
      marginBottom: 12
    },
    head: {
      backgroundColor: "#eceff1"
    },
    cell: {
      padding: "0 16px",
      width: 192,
      "&:first-child": {
        fontSize: 16,
        width: 48,
        textAlign: "center"
      },
      "&:last-child": {
        width: 58,
        paddingRight: 16
      },
      "&:nth-last-child(2)": {
        width: 164
      }
    },
    headRow: {
      height: 40
    },
    headCell: {
      color: "#37474f"
    },
    bodyCell: {
      verticalAlign: "top",
      paddingTop: 6,
      paddingBottom: 6,
      "&:first-child": {
        paddingTop: 12
      },
      "&:last-child": {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    timeWrapper: {
      display: "flex",
      marginTop: -16,
      "& > div": {
        width: 72
      }
    },
    empty: {
      textAlign: "center",
      padding: "16px 0",
      fontSize: 14
    }
  });
interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

const BreakTimeFields: React.FC<Props> = ({ classes, formikProps }) => {
  /**
   * 丸数字を返す(50まで)
   * https://www.benricho.org/symbol/tokusyu_03_suuji.html
   */
  const numberSubstitution = React.useCallback((numBefore: number) => {
    if (numBefore > 50) {
      return "";
    }
    let startHtmlCode = 9311;
    if (numBefore > 20 && numBefore <= 35) {
      startHtmlCode = 12860;
    } else if (numBefore > 35) {
      startHtmlCode = 12941;
    }
    return `&#${numBefore + startHtmlCode};`;
  }, []);

  const { workBreakTimes, unitEngrave } = formikProps.values.workingTime;
  const hoursOptions = createHoursArray();
  const minutesOptions = createMinutesArray(Number(unitEngrave));

  // 開始時間や終了時間(分)を変更した時に終了時間(時)のバリデーションを表示させる
  const onChangeWorkBreakTime = (key: number) => (): void => {
    const name = `workingTime.workBreakTimes[${key}].endTimeHour`;
    formikProps.setFieldTouched(name, true);
  };

  return (
    <FieldArray name="workingTime.workBreakTimes">
      {(arrayHelpers) => {
        const addWorkBreakRow = (): void => {
          const addItem: FacilityValues["workingTime"]["workBreakTimes"][0] = {
            index: workBreakTimes.length + 1,
            id: `#new${workBreakTimes.length}`,
            startTimeHour: "",
            startTimeMinute: "",
            endTimeHour: "",
            endTimeMinute: "",
            isDeleted: false
          };
          arrayHelpers.push(addItem);
        };
        return (
          <div>
            <Table className={classes.table}>
              <TableHead className={classes.head}>
                <TableRow className={classes.headRow}>
                  <TableCell className={classNames(classes.cell)} />
                  <TableCell
                    className={classNames(classes.cell, classes.headCell)}
                  >
                    開始
                  </TableCell>
                  <TableCell
                    className={classNames(classes.cell, classes.headCell)}
                  >
                    終了
                  </TableCell>
                  <TableCell
                    className={classNames(classes.cell, classes.headCell)}
                  />
                  <TableCell
                    className={classNames(classes.cell, classes.headCell)}
                  >
                    削除
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workBreakTimes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className={classes.empty}>
                      休憩時間が設定されていません。
                    </TableCell>
                  </TableRow>
                ) : (
                  workBreakTimes.map((workBreakTime, key) => {
                    return (
                      <TableRow key={`${workBreakTime.id}-${key}`}>
                        <TableCell
                          className={classNames(classes.cell, classes.bodyCell)}
                          dangerouslySetInnerHTML={{
                            __html: numberSubstitution(workBreakTime.index)
                          }}
                        />
                        <TableCell
                          className={classNames(classes.cell, classes.bodyCell)}
                        >
                          <div className={classes.timeWrapper}>
                            <FormikSelect
                              label=""
                              size="auto"
                              name={`workingTime.workBreakTimes[${key}].startTimeHour`}
                              options={hoursOptions}
                              style={{ marginBottom: 0 }}
                              onChangeHook={onChangeWorkBreakTime(key)}
                            />
                            <FormikSelect
                              label=""
                              size="auto"
                              name={`workingTime.workBreakTimes[${key}].startTimeMinute`}
                              options={minutesOptions}
                              style={{ margin: 0 }}
                              onChangeHook={onChangeWorkBreakTime(key)}
                            />
                          </div>
                        </TableCell>
                        <TableCell
                          className={classNames(classes.cell, classes.bodyCell)}
                        >
                          <div className={classes.timeWrapper}>
                            <FormikSelect
                              label=""
                              size="auto"
                              name={`workingTime.workBreakTimes[${key}].endTimeHour`}
                              options={hoursOptions}
                              style={{ marginBottom: 0 }}
                            />
                            <FormikSelect
                              label=""
                              size="auto"
                              name={`workingTime.workBreakTimes[${key}].endTimeMinute`}
                              options={minutesOptions}
                              style={{ margin: 0 }}
                              onChangeHook={onChangeWorkBreakTime(key)}
                            />
                          </div>
                        </TableCell>
                        <TableCell
                          className={classNames(classes.cell, classes.bodyCell)}
                        >
                          <BreakTimeField
                            unitEngrave={unitEngrave}
                            breakTimes={[workBreakTime]}
                          />
                        </TableCell>
                        <TableCell
                          className={classNames(classes.cell, classes.bodyCell)}
                        >
                          <FormikCheckbox
                            label=""
                            name={`workingTime.workBreakTimes[${key}].isDeleted`}
                            style={{ margin: 0, width: 20 }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            <Button
              color="secondary"
              onClick={addWorkBreakRow}
              disabled={workBreakTimes.length >= 50}
            >
              <IconAdd />
              休憩時間を追加する
            </Button>
          </div>
        );
      }}
    </FieldArray>
  );
};

export default withStyles(styles)(BreakTimeFields);
