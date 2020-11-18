import * as React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import { StyleRules, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import blueGrey from "@material-ui/core/colors/blueGrey";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import FormikTextField from "@components/molecules/FormikTextField";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import { InitialState } from "@stores/domain/mgr/TANKINYUSHO/initial/types";
import { InitialDataValues } from "@interfaces/mgr/TANKINYUSHO/initial/initialData";
import { FormikProps, getIn } from "formik";

const styles = ({ palette, spacing }: Theme): StyleRules =>
  createStyles({
    description: {
      marginBottom: 16
    },
    descriptionCaution: {
      fontSize: 12
    },
    section: {
      marginBottom: 18
    },
    table: {
      width: 1014,
      marginLeft: 16
    },
    tableHead: {
      backgroundColor: blueGrey[300]
    },
    tableHeadCell: {
      color: palette.common.white,
      padding: 16,
      fontSize: 14,
      lineHeight: "14px",
      "&:first-child": {
        paddingRight: 0,
        width: 158
      },
      "&:last-child": {
        paddingLeft: 16
      }
    },
    tableBodyRow: {
      "&:nth-child(2n)": {
        background: "#f5f5f5"
      }
    },
    tableBodyCell: {
      borderBottom: "none",
      padding: "0 0 0 16px",
      "&:first-child": {
        width: 158
      },
      "&:last-child": {
        paddingTop: 16,
        paddingRight: 16,
        "& > div": {
          marginBottom: 0
        }
      },
      "&:not(:first-child)": {
        verticalAlign: "top"
      }
    },
    noData: {
      paddingTop: 16,
      paddingBottom: 16,
      height: 52,
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.6)",
      textAlign: "center",
      backgroundColor: "#f5f5f5"
    },
    toolTip: {
      marginLeft: 8
    }
  });

interface OwnProps {
  initialData: InitialState;
  formikProps: FormikProps<InitialDataValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const ShortTermUsageAdditionFields: React.FunctionComponent<Props> = props => {
  const { classes, initialData, formikProps, setFormikFieldValue } = props;
  const viewFlg =
    formikProps.values.initialData.users &&
    formikProps.values.initialData.users.length > 0 &&
    initialData.users &&
    initialData.users.length > 0;
  const tableList =
    viewFlg &&
    formikProps.values.initialData.users.map((user, index) => {
      const startDate =
        user.users_in_facility_tankinyusho.short_term_usage_addition_start_date;
      const isDisabled =
        startDate.year === DEFAULT_SELECT_VALUE &&
        !startDate.month &&
        !startDate.day;
      if (
        isDisabled &&
        !(
          getIn(
            user,
            "users_in_facility_tankinyusho.short_term_usage_addition_count"
          ) === "0"
        )
      ) {
        setFormikFieldValue(
          `initialData.users[${index}].users_in_facility_tankinyusho.short_term_usage_addition_count`,
          "0"
        );
      }

      return (
        <TableRow key={`table-row-${index}`} className={classes.tableBodyRow}>
          <TableCell key={``} className={classes.tableBodyCell}>
            {initialData.users[index].name_sei}{" "}
            {initialData.users[index].name_mei}
          </TableCell>
          <TableCell className={classes.tableBodyCell}>
            <FormikSelectDateNotSelectedDefault
              name={`initialData.users[${index}].users_in_facility_tankinyusho.short_term_usage_addition_start_date`}
              label=""
              setFormikFieldValue={setFormikFieldValue}
              style={{ marginBottom: 16 }}
            />
          </TableCell>
          <TableCell className={classes.tableBodyCell}>
            <FormikTextField
              name={`initialData.users[${index}].users_in_facility_tankinyusho.short_term_usage_addition_count`}
              label=""
              endAdornmentLabel="回"
              required={false}
              maxLength={2}
              size="medium"
              disabled={isDisabled}
            />
          </TableCell>
        </TableRow>
      );
    });

  return (
    <FormPaper>
      <div className={classes.section}>
        <SectionTitle label="短期利用加算" />
      </div>
      <p className={classes.description}>
        上記初回請求月の前月末までの各利用者における短期入所利用加算の算定開始日、算定回数を入力してください。
        <br />
        <span className={classes.descriptionCaution}>
          ＊本施設の利用が一度もない場合は空欄にしてください。
        </span>
      </p>
      {viewFlg ? (
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>利用者名</TableCell>
              <TableCell className={classes.tableHeadCell}>
                短期利用加算の算定開始日
                <span className={classes.toolTip}>
                  <HelpToolTip
                    title={<HelpTipMessages name="calculationStartDateFlg" />}
                    tableHeader={true}
                  />
                </span>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                算定開始日からの算定回数
                <span className={classes.toolTip}>
                  <HelpToolTip
                    title={<HelpTipMessages name="calculationCountsFlg" />}
                    tableHeader={true}
                  />
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableList}</TableBody>
        </Table>
      ) : (
        <div className={classes.noData}>
          利用者データを登録すると、設定できるようになります
        </div>
      )}
    </FormPaper>
  );
};

export default withStyles(styles)(ShortTermUsageAdditionFields);
