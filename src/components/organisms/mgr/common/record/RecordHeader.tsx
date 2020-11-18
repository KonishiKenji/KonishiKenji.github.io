import * as React from "react";
import * as H from "history";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import KnowbeTabs from "@components/presentational/molecules/KnowbeTabs";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {
  STICKY_BOX_SHADOW,
  STICKY_NONE_BOX_SHADOW,
  DIVIDER_UNSET_BG,
  DIVIDER_BG_COLOR
} from "@constants/styles";

const styles = () =>
  createStyles({
    // 暫定処理 : KnowbeTabs 未選択ボタンの透過対応
    tabWrapper: {
      position: "sticky",
      backgroundColor: "#fff"
    },
    stickyWrapper: {
      position: "sticky",
      zIndex: 10
    },
    stickyCommonWrapper: {
      top: 73
    },
    stickySupportPlanWrapper: {
      top: 16
    },
    header: {
      backgroundColor: "#fff",
      padding: "32px 32px 16px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between"
    },
    title: {
      lineHeight: 1,
      "& > span": {
        marginLeft: 16
      }
    },
    divider: {
      position: "relative",
      margin: "0 32px -2px"
    }
  });

interface OwnProps {
  uifId: string;
  recordType: "support" | "work" | "interview" | "support_plan";
  isEditing: boolean;
  history: H.History;
  pageName: string;
  userName: string;
  hideTitle: boolean;
  button: JSX.Element | JSX.Element[];
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * タブとタイトルヘッダーを表示する役割
 */
const RecordHeader = (props: Props) => {
  const scrollYValue = 335;
  const classWrapper =
    props.recordType === "support_plan"
      ? `${props.classes.stickyWrapper} ${props.classes.stickySupportPlanWrapper}`
      : `${props.classes.stickyWrapper} ${props.classes.stickyCommonWrapper}`;
  const [stickyFlg, setStickyFlg] = React.useState(false);

  React.useEffect(() => {
    let unmounted = false;
    const listenScrollEvent = () => {
      if (unmounted) return;
      if (window.scrollY > scrollYValue) {
        setStickyFlg(true);
      } else {
        setStickyFlg(false);
      }
    };

    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      unmounted = true;
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const handleTabChange = (e: React.ChangeEvent<{}>, value: string): void => {
    props.history.push(`/record/${props.uifId}/${value}`);
  };

  const recordInfo = [
    { label: "個別支援計画", value: "support_plan" },
    { label: "支援記録", value: "support" },
    { label: "作業記録", value: "work" },
    { label: "面談記録", value: "interview" }
  ];

  return (
    <div
      className={classWrapper}
      style={
        stickyFlg
          ? { boxShadow: STICKY_BOX_SHADOW }
          : { boxShadow: STICKY_NONE_BOX_SHADOW }
      }
    >
      <div className={props.classes.tabWrapper}>
        <KnowbeTabs
          key="recordTabs"
          tabInfo={recordInfo}
          value={props.recordType}
          disabled={props.isEditing}
          onChange={handleTabChange}
        />
      </div>
      {!props.hideTitle && (
        <>
          <div className={props.classes.header}>
            <Typography
              variant="h6"
              color="primary"
              className={props.classes.title}
            >
              {props.pageName}
              <span>{props.userName}</span>
            </Typography>
            <div>{props.button}</div>
          </div>
          <Divider
            className={props.classes.divider}
            style={
              stickyFlg
                ? { backgroundColor: DIVIDER_UNSET_BG }
                : { backgroundColor: DIVIDER_BG_COLOR }
            }
          />
        </>
      )}
    </div>
  );
};
export default withStyles(styles)(RecordHeader);
