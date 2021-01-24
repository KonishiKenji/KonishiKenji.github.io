import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import FormikTime from "@components/molecules/FormikTime";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import { FormikProps, getIn } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";
import * as classNames from "classnames";
import { CellParam } from "@components/molecules/Table";

const styles = (): StyleRules =>
  createStyles({
    checkOption: {
      color: "#666666",
      fontSize: "1.0rem"
    },
    table: {
      width: 438,
      tableLayout: "fixed"
    },
    headCell: {
      height: 48,
      fontSize: 14,
      fontWeight: 500,
      boxSizing: "content-box",
      "&:first-child": {
        width: 38
      },
      "&:nth-child(2)": {
        width: 85,
        padding: 0
      },
      "&:nth-child(3)": {
        paddingLeft: 23,
        width: 98
      },
      "&:nth-child(4)": {
        paddingLeft: 32
      }
    },
    bodyRow: {
      height: 48,
      "&:nth-last-child(1)": {
        borderBottom: "1px solid rgba(224, 224, 224, 1)"
      }
    },
    evenRowBackColor: {
      backgroundColor: "#f5f5f5"
    },
    bodyCell: {
      height: 48,
      fontSize: 16,
      padding: "0 8px",
      borderBottom: "none",
      boxSizing: "content-box",
      "&:nth-child(2)": {
        whiteSpace: "nowrap",
        padding: 0
      },
      "&:nth-child(3)": {
        paddingLeft: 23
      },
      "&:nth-child(4)": {
        paddingLeft: 32
      }
    },
    checkboxCellStyle: {
      padding: "0px 19px",
      borderBottom: "none",
      verticalAlign: "top",
      "& div > label": {
        marginLeft: -16
      }
    }
  });
interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

class AdministrationScheduleFields extends React.Component<Props> {
  private commonHeaderItems: CellParam = {
    align: "left",
    label: "",
    className: classNames(this.props.classes.headCell)
  };

  private header: HeaderProps = {
    tabIndex: 0,
    key: 0,
    selected: false,
    items: [
      {
        ...this.commonHeaderItems
      },
      {
        ...this.commonHeaderItems,
        label: "曜日"
      },
      {
        ...this.commonHeaderItems,
        label: "始業時間"
      },
      {
        ...this.commonHeaderItems,
        label: "終業時間"
      }
    ]
  };

  private checkboxAppendStyle = {
    margin: "0px"
  };

  private evenRowStyle = classNames(
    this.props.classes.bodyRow,
    this.props.classes.evenRowBackColor
  );

  private weekFormats = {
    monday: { label: "月" },
    tuesday: { label: "火" },
    wednesday: { label: "水" },
    thursday: { label: "木" },
    friday: { label: "金" },
    saturday: { label: "土" },
    sunday: { label: "日" }
  };

  private createTableRow = (dayOfWeek: string, index: number): JSX.Element => {
    const { classes } = this.props;
    const isWorkDay = getIn(
      this.props.formikProps.values,
      `administration.${dayOfWeek}Schedule`
    );
    const weekFmt = this.weekFormats[dayOfWeek];

    return (
      <TableRow
        key={dayOfWeek}
        className={(index + 1) % 2 === 0 ? this.evenRowStyle : classes.bodyRow}
      >
        <TableCell className={classes.checkboxCellStyle}>
          <FormikCheckbox
            label=""
            name={`administration.${dayOfWeek}Schedule`}
            style={this.checkboxAppendStyle}
          />
        </TableCell>
        <TableCell className={classNames(classes.bodyCell)}>
          {weekFmt.label}
          {isWorkDay ? (
            <span style={{ color: "green", marginLeft: 16 }}>営業</span>
          ) : (
            <span style={{ color: "red", marginLeft: 16 }}>休日</span>
          )}
        </TableCell>
        <TableCell className={classes.bodyCell}>
          <FormikTime
            name={`administration.${dayOfWeek}StartTime`}
            disabled={!isWorkDay}
            maxLength={5}
            style={{ marginBottom: 0, width: 106 }}
            size="small"
          />
        </TableCell>
        <TableCell className={classes.bodyCell}>
          <FormikTime
            name={`administration.${dayOfWeek}EndTime`}
            disabled={!isWorkDay}
            maxLength={5}
            style={{ marginBottom: 0, width: 106 }}
            size="small"
          />
        </TableCell>
      </TableRow>
    );
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="営業スケジュール" />
        </div>
        <FormGroup row style={{ marginBottom: 16 }}>
          <InfoOutlinedIcon
            style={{
              width: "22px",
              height: "22px",
              color: "#0277bd",
              marginTop: -4
            }}
          />
          <Typography
            className={classes.checkOption}
            component="h2"
            variant="h2"
            style={{ marginLeft: 8 }}
          >
            週間スケジュールの設定について
          </Typography>
        </FormGroup>
        <Typography className={classes.checkOption} style={{ marginBottom: 5 }}>
          ここで設定した営業時間を基準に、利用者の通所/退所時間が実績記録票に反映されます。
        </Typography>
        <Typography
          className={classes.checkOption}
          style={{ marginBottom: 20 }}
        >
          例）設定が10:00-16:00の場合、9:50-16:05の勤怠記録は、10:00-16:00として実績記録票に反映されます。
        </Typography>
        <Table className={classes.table}>
          <TableHead
            role={undefined}
            ariaChecked={undefined}
            tabIndex={0}
            key={0}
            selected={false}
            items={this.header.items}
            rowStyle={undefined}
          />
          <TableBody>
            {Object.keys(this.weekFormats).map((k, index) =>
              this.createTableRow(k, index)
            )}
          </TableBody>
        </Table>
      </FormPaper>
    );
  }
}

export default withStyles(styles)(AdministrationScheduleFields);
