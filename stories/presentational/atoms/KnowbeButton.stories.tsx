import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import { theme } from "@styles/theme";

import KnowbeButton from "@components/presentational/atoms/KnowbeButton";

interface StyledProps {
  children: (other: any) => JSX.Element;
  classes: object;
}

// https://v3.material-ui.com/customization/css-in-js/#render-props-api-11-lines
const createStyled = (styles: object) => {
  const Styled = (props: StyledProps): JSX.Element => {
    const { children, ...other } = props;
    return children(other);
  };
  return withStyles(styles)(Styled);
};

const pageStyle = {
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
    textAlign: "center",
    "& th": {
      padding: "10px"
    },
    "& td": {
      padding: "10px 10px",
      "&:first-child": {
        textAlign: "left"
      },
      "&.gray": {
        backgroundColor: "#eeeeee"
      }
    }
  },
  rightIcon: {
    marginRight: 8
  }
};
const PageStyled = createStyled(pageStyle);

storiesOf("Presentational", module)
  .addDecorator(withKnobs)
  .add(
    "KnowbeButton",
    () => {
      return (
        <MuiThemeProvider theme={theme}>
          <PageStyled>
            {({ classes: pageClasses }): JSX.Element => (
              <table className={pageClasses.table}>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>Enabled</th>
                    <th>Disabled</th>
                    <th>幅:250px指定</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Default</td>
                    <td>
                      <KnowbeButton onClick={action("onClick")}>
                        保存する
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton disabled onClick={action("onClick")}>
                        保存する
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton minWidth={250} onClick={action("onClick")}>
                        保存する
                      </KnowbeButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Outline(透過)</td>
                    <td>
                      <KnowbeButton kind="outline" onClick={action("onClick")}>
                        キャンセル
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton
                        kind="outline"
                        disabled
                        onClick={action("onClick")}
                      >
                        キャンセル
                      </KnowbeButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Outline(gray)</td>
                    <td className="gray">
                      <KnowbeButton kind="outline" onClick={action("onClick")}>
                        キャンセル
                      </KnowbeButton>
                    </td>
                    <td className="gray">
                      <KnowbeButton
                        kind="outline"
                        disabled
                        onClick={action("onClick")}
                      >
                        キャンセル
                      </KnowbeButton>
                    </td>
                    <td className="gray" />
                    <td className="gray" />
                  </tr>
                  <tr>
                    <td>Outline(white)</td>
                    <td className="gray">
                      <KnowbeButton
                        kind="outlineWhite"
                        onClick={action("onClick")}
                      >
                        キャンセル
                      </KnowbeButton>
                    </td>
                    <td className="gray">
                      <KnowbeButton
                        kind="outlineWhite"
                        disabled
                        onClick={action("onClick")}
                      >
                        キャンセル
                      </KnowbeButton>
                    </td>
                    <td className="gray" />
                    <td className="gray" />
                  </tr>
                  <tr>
                    <td>Text</td>
                    <td>
                      <KnowbeButton kind="text" onClick={action("onClick")}>
                        Button
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton
                        kind="text"
                        disabled
                        onClick={action("onClick")}
                      >
                        Button
                      </KnowbeButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Text Delete</td>
                    <td>
                      <KnowbeButton
                        kind="textDelete"
                        onClick={action("onClick")}
                      >
                        Button
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton
                        kind="textDelete"
                        disabled
                        onClick={action("onClick")}
                      >
                        Button
                      </KnowbeButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Icon Text</td>
                    <td>
                      <KnowbeButton kind="iconText" onClick={action("onClick")}>
                        <DeleteIcon
                          fontSize="small"
                          className={pageClasses.rightIcon}
                        />
                        削除する
                      </KnowbeButton>
                    </td>
                    <td>
                      <KnowbeButton
                        kind="iconText"
                        disabled
                        onClick={action("onClick")}
                      >
                        <DeleteIcon
                          fontSize="small"
                          className={pageClasses.rightIcon}
                        />
                        削除する
                      </KnowbeButton>
                    </td>
                  </tr>
                  <tr>
                    <td>Icon Text(gray)</td>
                    <td className="gray">
                      <KnowbeButton kind="iconText" onClick={action("onClick")}>
                        <DeleteIcon
                          fontSize="small"
                          className={pageClasses.rightIcon}
                        />
                        削除する
                      </KnowbeButton>
                    </td>
                    <td className="gray">
                      <KnowbeButton
                        kind="iconText"
                        disabled
                        onClick={action("onClick")}
                      >
                        <DeleteIcon
                          fontSize="small"
                          className={pageClasses.rightIcon}
                        />
                        削除する
                      </KnowbeButton>
                    </td>
                    <td className="gray" />
                    <td className="gray" />
                  </tr>
                </tbody>
              </table>
            )}
          </PageStyled>
        </MuiThemeProvider>
      );
    }
  );
