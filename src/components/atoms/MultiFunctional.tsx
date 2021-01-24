import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MainFacility, MultipleFacilities } from "@stores/domain/invoice/type";
import { FACILITY_TYPE_NAME_LIST } from "@constants/variables";
import { getLabelFromOptions } from "@utils/dataNormalizer";
const styles = () =>
  createStyles({
    root: {
      backgroundColor: "#f5f5f5",
      padding: "2px 16px",
      marginTop: "16px"
    },
    cellStyle: {
      padding: "0 8px",
      borderBottom: "none"
    },
    hidden: {
      display: "none"
    },
    title: {
      width: "998px",
      height: "16px",
      fontFamily: "Roboto",
      fontSize: "12px",
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "1.33",
      letterSpacing: "0.4px",
      color: "#37474f",
      paddingTop: "1px"
    },
    titleText: {
      marginTop: 16
    },
    warn: {
      marginTop: 16,
      marginBottom: 14,
      fontFamily: "Roboto",
      fontSize: "12px",
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "1.33",
      letterSpacing: "0.4px",
      color: "#f44336"
    },
    inline: {
      display: "inline-block",
      marginTop: 24,
      marginRight: 8,
      width: "23%",
      borderRadius: "16px",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      padding: "5px",
      "&:last-child": {
        marginRight: 0
      }
    },
    multipleText: {
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center"
    }
  });

interface OwnProps {
  hidden?: boolean;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  cellClass?: string;
  facility: MainFacility;
  multiFacilities: MultipleFacilities[];
}

type Props = OwnProps & WithStyles<typeof styles> & React.Props<{}>;

class MultiFunctional extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <p className={classes.titleText}>
            対象事業所(多機能もしくは主従関係)
          </p>
        </div>
        <div>
          <div className={classes.inline}>
            <span className={classes.multipleText}>
              {this.props.facility.name} (
              {getLabelFromOptions(
                this.props.facility.type_service,
                FACILITY_TYPE_NAME_LIST
              )}
              )
            </span>
          </div>
          {this.props.multiFacilities.map((data, i) => (
            <div key={data.id} className={classes.inline}>
              <span className={classes.multipleText}>
                {data.name} (
                {getLabelFromOptions(
                  data.type_service,
                  FACILITY_TYPE_NAME_LIST
                )}
                )
              </span>
            </div>
          ))}
        </div>
        <div className={classes.warn}>
          同一事業所には登録されている全利用者の実績がまとめて確認・ダウンロードされます。「取込送信システム」にはCSVファイルを重複して送信しないようご注意ください。
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MultiFunctional);
