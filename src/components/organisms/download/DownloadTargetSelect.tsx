import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SectionTitle from "@components/atoms/SectionTitle";

import DownloadTargetSelectPaper from "@components/organisms/download/DownloadTargetSelectPaper";
import DownloadInvoiceSection, {
  DownloadAction
} from "@components/organisms/download/DownloadInvoiceSection";
import MultiFunctional from "@components/atoms/MultiFunctional";
import {
  DownloadableMonth,
  MainFacility,
  MultipleFacilities
} from "@stores/domain/invoice/type";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      margin: spacing.unit * 2,
      padding: "30px 32px 32px"
    },
    divider: {
      marginTop: spacing.unit * 2
    },
    description: {
      color: "#37474f",
      fontSize: "16px"
    }
  });

interface OwnProps {
  selected: boolean;
  months: DownloadableMonth[];
  isDisabledSelect: boolean;
  isDisabledButton: boolean;
  value: string;
  facility: MainFacility;
  multiFacilities: MultipleFacilities[];

  downloadCsvActions: DownloadAction[];
  downloadPrintActions: DownloadAction[];

  excludedUserIds: number[];

  isNotFinishedInitialData: boolean;

  onChangeSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: (event: React.MouseEvent<HTMLSelectElement>) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const targetSelectSection: React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root} elevation={0}>
      <SectionTitle label="請求書類のダウンロード・印刷" />
      <Typography
        component="p"
        variant="caption"
        className={classes.description}
      >
        国保連への請求用書類ダウンロードや、請求内容の確認書類などの印刷ができます。
        <br />
        請求内容は利用実績や各設定をもとに作成されます。あらかじめ利用実績や事業所情報などの設定内容をご確認の上、請求業務を行ってください。
      </Typography>
      {(props.multiFacilities ? props.multiFacilities : []).length > 0 && (
        <MultiFunctional
          facility={props.facility}
          multiFacilities={props.multiFacilities}
        />
      )}
      <DownloadTargetSelectPaper
        months={props.months}
        selected={props.selected}
        isDisabledSelect={props.isDisabledSelect}
        isDisabledButton={props.isDisabledButton}
        value={props.value}
        excludedUserIdCount={props.excludedUserIds.length}
        onChangeSelect={props.onChangeSelect}
        onClickButton={props.onClickButton}
        isNotFinishedInitialData={props.isNotFinishedInitialData}
      />
      <Divider className={classes.divider} />
      <DownloadInvoiceSection
        month={props.value}
        months={props.months}
        downloadCsvActions={props.downloadCsvActions}
        downloadPrintActions={props.downloadPrintActions}
        excludedUserIds={props.excludedUserIds}
      />
    </Paper>
  );
};

export default withStyles(styles)(targetSelectSection);
