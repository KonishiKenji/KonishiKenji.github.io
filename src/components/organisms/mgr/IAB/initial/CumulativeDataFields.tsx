import * as React from "react";
import { FieldArray } from "formik";
import * as ClassNames from "classnames";
import {
  WithStyles,
  withStyles,
  createStyles,
  FormGroup
} from "@material-ui/core";
import FormPaper from "@components/atoms/FormPaper";
import FormikTextField from "@components/molecules/FormikTextField";
import SectionTitle from "@components/atoms/SectionTitle";
import { InitialDataValues } from "@interfaces/mgr/IAB/initial/initialData";
import { FacilityType } from "@constants/variables";

const styles = () =>
  createStyles({
    description: {
      marginBottom: 28
    },
    descriptionCaution: {
      fontSize: 12
    },
    fields: {
      display: "flex",
      alignItems: "center",
      "&:not(:last-child)": {
        marginBottom: 32
      },
      "& > div": {
        marginBottom: 0
      },
      "& > div:not(:first-child)": {
        alignSelf: "normal"
      }
    },
    nameField: {
      width: 158,
      marginRight: 16
    },
    formGroup: {
      "& > div p": {
        color: "rgba(0, 0, 0, 0.87)"
      }
    },
    fontColor: {
      color: "#37474f"
    }
  });

interface OwnProps {
  initialUsers: InitialDataValues["initialData"]["users"];
  serviceType: FacilityType;
}

type Props = OwnProps & WithStyles<typeof styles>;

class FirstInvoiceDataFields extends React.Component<Props> {
  public render() {
    return (
      <FormPaper>
        <div>
          <SectionTitle label="累計データ" />
        </div>
        {this.props.initialUsers.length > 0 ? (
          <>
            <div
              className={ClassNames(
                this.props.classes.description,
                this.props.classes.fontColor
              )}
            >
              {this.props.serviceType === FacilityType.IKOU
                ? "上記初回請求月の前月末時点での利用者毎の「移行準備支援体制(Ⅰ)」の累計（年度内の累計）を入力してください。"
                : "上記初回請求月の前月末時点での利用者毎の「施設外支援」の累計（年度内の累計）を入力してください。"}
              <br />
              <span className={this.props.classes.descriptionCaution}>
                ※上限の180日を超えないように調整の上、入力してください。
              </span>
            </div>
            <FormGroup className={this.props.classes.formGroup}>
              <FieldArray name={"initialData.users"}>
                {() =>
                  this.props.initialUsers.map((user, index) => (
                    <div className={this.props.classes.fields} key={index}>
                      <div className={this.props.classes.nameField}>
                        {`${user.name_sei} ${user.name_mei}`}
                      </div>
                      <FormikTextField
                        name={`initialData.users[${index}].total_days_in_fiscal_year`}
                        endAdornmentLabel="日"
                      />
                    </div>
                  ))
                }
              </FieldArray>
            </FormGroup>
          </>
        ) : (
          <div className={this.props.classes.fontColor}>
            対象となる利用者が登録されている場合に入力できます。
          </div>
        )}
      </FormPaper>
    );
  }
}

export default withStyles(styles)(FirstInvoiceDataFields);
