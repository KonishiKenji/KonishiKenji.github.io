import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import {
  createStyles,
  withStyles,
  TableBody,
  TableRow,
  TableCell,
  WithStyles,
  Typography,
  FormGroup
} from "@material-ui/core";
import FormikTime from "@components/molecules/FormikTime";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import { FormikProps, getIn } from "formik";
import { FacilityValues } from "@initialize/mgr/SEIKATSUKAIGO/facility/initialValues";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    checkOption: {
      color: "#666666",
      fontSize: "1.0rem"
    },
    row: {
      backgroundColor: palette.background.default
    },
    cellStyle: {
      padding: "10px 20px 7px 0px",
      borderBottom: "none",
      verticalAlign: "top"
    },
    checkboxCellStyle: {
      padding: "4px 0px 4px 18px",
      borderBottom: "none",
      verticalAlign: "top"
    },
    weekDayCellStyle: {
      padding: "16px 0px 4px 0px",
      borderBottom: "none",
      verticalAlign: "top"
    },
    scheduleCellStyle: {
      padding: "16px 46px 4px 32px",
      borderBottom: "none",
      verticalAlign: "top"
    },
    cellStyleBorder: {
      padding: "10px 20px 7px 0px",
      verticalAlign: "top"
    },
    checkboxCellStyleBorder: {
      padding: "4px 0px 4px 18px",
      verticalAlign: "top"
    },
    weekDayCellStyleBorder: {
      padding: "16px 0px 4px 0px",
      verticalAlign: "top"
    },
    scheduleCellStyleBorder: {
      padding: "16px 46px 4px 32px",
      verticalAlign: "top"
    }
  });
interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

class AdministrationScheduleFields extends React.Component<Props> {
  public render() {
    const header: HeaderProps = {
      tabIndex: 0,
      key: 0,
      selected: false,
      items: [
        {
          align: "left",
          label: ""
        },
        {
          align: "left",
          label: "曜日"
        },
        {
          align: "left",
          label: ""
        },
        {
          align: "left",
          label: "始業時間"
        },
        {
          align: "left",
          label: "終業時間"
        }
      ]
    };

    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="営業スケジュール" />
        </div>
        <FormGroup row={true} style={{ marginBottom: 16 }}>
          <InfoOutlinedIcon
            style={{
              width: "22px",
              height: "22px",
              color: "#0277bd",
              marginTop: -4
            }}
          />
          <Typography
            className={this.props.classes.checkOption}
            component="h2"
            variant="h2"
            style={{ marginLeft: 8 }}
          >
            週間スケジュールの設定について
          </Typography>
        </FormGroup>
        <Typography
          className={this.props.classes.checkOption}
          style={{ marginBottom: 5 }}
        >
          ここで設定した営業時間を基準に、利用者の通所/退所時間が実績記録票に反映されます。
        </Typography>
        <Typography
          className={this.props.classes.checkOption}
          style={{ marginBottom: 20 }}
        >
          例）設定が10:00-16:00の場合、9:50-16:05の勤怠記録は、10:00-16:00として実績記録票に反映されます。
        </Typography>
        <TableHead
          role={undefined}
          ariaChecked={undefined}
          tabIndex={0}
          key={0}
          selected={false}
          items={header.items}
          rowStyle={undefined}
        />
        <TableBody>
          <TableRow>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.mondaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"月曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.mondaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.mondayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.mondaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.mondayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.mondaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow className={this.props.classes.row}>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.tuesdaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"火曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.tuesdaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.tuesdayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.tuesdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.tuesdayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.tuesdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.wednesdaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"水曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.wednesdaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.wednesdayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.wednesdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.wednesdayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.wednesdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow className={this.props.classes.row}>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.thursdaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"木曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.thursdaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.thursdayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.thursdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.thursdayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.thursdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.fridaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"金曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.fridaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.fridayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.fridaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.fridayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.fridaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow className={this.props.classes.row}>
            <TableCell className={this.props.classes.checkboxCellStyle}>
              <FormikCheckbox
                label=""
                name={"administration.saturdaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyle}>
              {"土曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyle}>
              {getIn(
                this.props.formikProps.values,
                "administration.saturdaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.saturdayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.saturdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyle}>
              <FormikTime
                name={"administration.saturdayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.saturdaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={this.props.classes.checkboxCellStyleBorder}>
              <FormikCheckbox
                label=""
                name={"administration.sundaySchedule"}
                style={{ margin: 0 }}
              />
            </TableCell>
            <TableCell className={this.props.classes.weekDayCellStyleBorder}>
              {"日曜日"}
            </TableCell>
            <TableCell className={this.props.classes.scheduleCellStyleBorder}>
              {getIn(
                this.props.formikProps.values,
                "administration.sundaySchedule"
              ) ? (
                <div>{"営業"}</div>
              ) : (
                <div style={{ color: "red" }}>{"休日"}</div>
              )}
            </TableCell>
            <TableCell className={this.props.classes.cellStyleBorder}>
              <FormikTime
                name={"administration.sundayStartTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.sundaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
            <TableCell className={this.props.classes.cellStyleBorder}>
              <FormikTime
                name={"administration.sundayEndTime"}
                required={true}
                disabled={
                  !getIn(
                    this.props.formikProps.values,
                    "administration.sundaySchedule"
                  )
                }
                maxLength={5}
                style={{ marginBottom: 0 }}
                size="small"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </FormPaper>
    );
  }
}

export default withStyles(styles)(AdministrationScheduleFields);
