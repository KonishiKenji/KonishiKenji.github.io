import {
  BASE_BLUE_COLOR,
  BASE_TEXT_COLOR,
  SAVE_BUTTON_AREA_HEIGHT,
  SUCCESS_COLOR,
  WARNING_COLOR
} from "@constants/styles";

// 注: object-rest-spreadでの使用を想定しているため、各スタイルのプロパティ名が被ってしまうと、後に書いたもので上書きされます

export const commonStyle = {
  fontFamily:
    "'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif"
};

export const linkStyle = {
  link: {
    textDecoration: "none"
  }
};

export const wrapperStyle = {
  wrapper: {
    display: "flex",
    margin: "21px 37px 0 37px"
  }
};

export const formStyle = {
  baseForm: {
    color: BASE_TEXT_COLOR,
    padding: "32px 24px 56px 24px",
    width: "100%"
  }
};

export const fieldStyle = {
  field: {
    marginTop: 40
  },
  subField: {
    marginBottom: 16,
    marginLeft: 34
  }
};

export const labelStyle = {
  label: {
    fontSize: 14
  }
};

export const dateFieldStyle = {
  dateField: {
    margin: 0
  }
};

export const textFieldStyle = {
  textField: {
    marginRight: 40,
    alignSelf: "flex-start",
    marginTop: 0,
    marginBottom: 0
  },
  textFieldSuperSmall: {
    width: 100
  },
  textFieldSmall: {
    width: 128
  },
  textFieldMedium: {
    width: 240
  },
  textFieldLong: {
    width: 400
  },
  textFieldHalfSuperLong: {
    width: 544
  },
  textFieldSuperLong: {
    width: 800
  },
  textFieldFullSize: {
    width: "100%"
  },
  textLabel: {
    fontSize: 14
  },
  textLabelSmall: {
    fontSize: 16
  }
};

export const dividerStyle = {
  divider: {
    marginTop: 48,
    marginBottom: 48
  }
};

export const noteStyle = {
  note: {
    fontSize: 14,
    color: "#778899"
  }
};

export const snackbarStyle = {
  snackbar: {
    backgroundColor: SUCCESS_COLOR,
    fontSize: 16
  }
};

export const saveButtonAreaStyle = {
  saveButtonArea: {
    display: "flex",
    flex: "0 0 auto",
    justifyContent: "flex-end",
    width: "100%",
    height: SAVE_BUTTON_AREA_HEIGHT,
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)"
  },
  saveButton: {
    marginRight: 16,
    marginTop: 14,
    marginBottom: 14,
    padding: 0,
    width: 97,
    height: 37,
    boxShadow: "none"
  },
  warning: {
    margin: "auto",
    color: WARNING_COLOR
  },
  warningIcon: {
    position: "relative",
    top: 5
  }
};

export const iconButtonStyle = {
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    color: BASE_BLUE_COLOR,
    fontSize: 26,
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&:disabled": {
      color: "#bababa"
    }
  }
};

export const tooltipStyle = {
  tooltip: {
    backgroundColor: "#78909b",
    color: "rgba(255, 255, 255, 1)",
    padding: "0 8px",
    fontSize: "0.875rem",
    minHeight: 32,
    background: "#616161",
    transition:
      "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    lineHeight: "32px",
    borderRadius: 0
  }
};

export const inputHalfPadding = {
  paddingTop: 6,
  paddingBottom: 6
};
