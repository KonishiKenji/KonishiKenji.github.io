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
import { FacilityValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/facility/initialValues";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    checkOption: {
      color: "#666666",
      fontSize: "1.0rem"
    },
    row: {
      "&:nth-child(even)": {
        backgroundColor: palette.background.default
      }
    },
    cellStyle: {
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 7,
      paddingLeft: 0,
      borderBottom: "none",
      verticalAlign: "top"
    },
    checkboxCellStyle: {
      paddingTop: 4,
      paddingRight: 0,
      paddingBottom: 4,
      paddingLeft: 18,
      borderBottom: "none",
      verticalAlign: "top"
    },
    weekDayCellStyle: {
      paddingTop: 16,
      paddingRight: 0,
      paddingBottom: 4,
      paddingLeft: 0,
      borderBottom: "none",
      verticalAlign: "top"
    },
    scheduleCellStyle: {
      paddingTop: 16,
      paddingRight: 46,
      paddingBottom: 4,
      paddingLeft: 32,
      borderBottom: "none",
      verticalAlign: "top"
    },
    cellStyleBorder: {
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 7,
      paddingLeft: 0,
      verticalAlign: "top"
    },
    checkboxCellStyleBorder: {
      paddingTop: 4,
      paddingRight: 0,
      paddingBottom: 4,
      paddingLeft: 18,
      verticalAlign: "top"
    },
    weekDayCellStyleBorder: {
      paddingTop: 16,
      paddingRight: 0,
      paddingBottom: 4,
      paddingLeft: 0,
      verticalAlign: "top"
    },
    scheduleCellStyleBorder: {
      paddingTop: 16,
      paddingRight: 46,
      paddingBottom: 4,
      paddingLeft: 32,
      verticalAlign: "top"
    }
  });

interface WeeksInterface {
  label: string;
  name: string;
}
interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}
type Props = OwnProps & WithStyles<typeof styles>;

const createTable = (props: Props, weeks: WeeksInterface[]) => {
  return weeks.map((day: WeeksInterface, index: number) => {
    return (
      <TableRow className={props.classes.row} key={index}>
        <TableCell className={props.classes.checkboxCellStyle}>
          <FormikCheckbox
            label=""
            name={`administration.${day.name}Schedule`}
            style={{ margin: 0 }}
          />
        </TableCell>
        <TableCell className={props.classes.weekDayCellStyle}>
          {day.label}
        </TableCell>
        <TableCell className={props.classes.scheduleCellStyle}>
          {getIn(
            props.formikProps.values,
            `administration.${day.name}Schedule`
          ) ? (
            <div>{"営業"}</div>
          ) : (
            <div style={{ color: "red" }}>{"休日"}</div>
          )}
        </TableCell>
        <TableCell className={props.classes.cellStyle}>
          <FormikTime
            name={`administration.${day.name}StartTime`}
            required={true}
            disabled={
              !getIn(
                props.formikProps.values,
                `administration.${day.name}Schedule`
              )
            }
            maxLength={5}
            style={{ marginBottom: 0 }}
            size="small"
          />
        </TableCell>
        <TableCell className={props.classes.cellStyle}>
          <FormikTime
            name={`administration.${day.name}EndTime`}
            required={true}
            disabled={
              !getIn(
                props.formikProps.values,
                `administration.${day.name}Schedule`
              )
            }
            maxLength={5}
            style={{ marginBottom: 0 }}
            size="small"
          />
        </TableCell>
      </TableRow>
    );
  });
};

const AdministrationScheduleFields: React.FunctionComponent<Props> = props => {
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
  const weeks: WeeksInterface[] = [
    {
      label: "月曜日",
      name: "monday"
    },
    {
      label: "火曜日",
      name: "tuesday"
    },
    {
      label: "水曜日",
      name: "wednesday"
    },
    {
      label: "木曜日",
      name: "thursday"
    },
    {
      label: "金曜日",
      name: "friday"
    },
    {
      label: "土曜日",
      name: "saturday"
    },
    {
      label: "日曜日",
      name: "sunday"
    }
  ];

  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="営業スケジュール" />
      </div>
      <FormGroup row={true} style={{ marginBottom: 16 }}>
        <InfoOutlinedIcon
          style={{
            width: 22,
            height: 22,
            color: "#0277bd",
            marginTop: -4
          }}
        />
        <Typography
          className={props.classes.checkOption}
          component="h2"
          variant="h2"
          style={{ marginLeft: 8 }}
        >
          週間スケジュールの設定について
        </Typography>
      </FormGroup>
      <Typography
        className={props.classes.checkOption}
        style={{ marginBottom: 5 }}
      >
        ここで設定した営業時間を基準に、利用者の通所/退所時間が実績記録票に反映されます。
      </Typography>
      <Typography
        className={props.classes.checkOption}
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
      <TableBody>{createTable(props, weeks)}</TableBody>
    </FormPaper>
  );
};

export default withStyles(styles)(AdministrationScheduleFields);
