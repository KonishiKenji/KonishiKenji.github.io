import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    paper: {
      minHeight: 1123, // ブラウザの印刷に分割を任せるのでminHeightだけで問題ない
      width: 794,
      padding: 38,
      margin: "0 auto 20", // 用紙の間隔の統一のため固定で持つ
      backgroundColor: "#fff",
      boxSizing: "border-box",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      "&:last-child": {
        margin: "0 auto"
      }
    },
    "@media print": {
      paper: {
        width: "auto",
        height: "auto",
        minHeight: 0,
        padding: 0,
        margin: "0 auto",
        boxShadow: "none",
        pageBreakAfter: "always",
        overflow: "hidden",
        "&:last-child": {
          pageBreakAfter: "auto"
        }
      }
    }
  });

type Props = WithStyles<typeof styles>;

/**
 * 印刷ページで使うA4印刷用紙
 */
const PrintingPaper: React.FC<Props> = props => (
  <div className={props.classes.paper}>{props.children}</div>
);

export default withStyles(styles)(PrintingPaper);
