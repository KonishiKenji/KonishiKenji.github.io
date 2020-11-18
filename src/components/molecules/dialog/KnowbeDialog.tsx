import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  isOpn: boolean;
  isShowTitle?: boolean;
  isShowFooter?: boolean;
  title?: string;
  footerContent?: React.ReactNode;
  contentStyle?: React.CSSProperties;
  onCloseDialog: () => void;
}

const KnowbeDialog: React.FunctionComponent<Props> = ({
  isOpn,
  isShowTitle = true,
  isShowFooter = true,
  title,
  children,
  footerContent,
  contentStyle,
  onCloseDialog
}) => {
  return (
    <Dialog open={isOpn} onClose={onCloseDialog} disableBackdropClick={true}>
      <DialogContent style={contentStyle}>
        {isShowTitle && <DialogTitle>{title}</DialogTitle>}
        <div>{children}</div>
      </DialogContent>
      {isShowFooter && <DialogActions>{footerContent}</DialogActions>}
    </Dialog>
  );
};

export default KnowbeDialog;
