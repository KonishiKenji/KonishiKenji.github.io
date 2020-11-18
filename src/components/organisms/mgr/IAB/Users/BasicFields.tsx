import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { FormikProps } from "formik";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikLinkAddress from "@components/molecules/FormikLinkAddress";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import { DEFAULT_CITY_STATE } from "@constants/variables";
import { CityParams } from "@stores/domain/city/type";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { connect } from "react-redux";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";

const styles = () =>
  createStyles({
    sectionTitle: { marginBottom: 30 },
    checkboxContainer: {
      display: "flex",
      flexWrap: "wrap",
      width: 510,
      margin: "6px 0 20px 16px",
      "& > div": {
        width: 170,
        marginBottom: 0
      }
    },
    guardian: {
      float: "left"
    },
    formikActionLabel: {
      "&+span": {
        fontSize: 16
      },
      "& label span": {
        fontSize: 16
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<UsersValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface DispatchProps {
  fetchCity: (params: CityParams) => void;
  clearCity: () => void;
}

type Props = OwnProps & DispatchProps & WithStyles<typeof styles>;

class BasicFields extends React.Component<Props> {
  public render() {
    return (
      <FormPaper>
        <div className={this.props.classes.sectionTitle}>
          <SectionTitle label="基本情報" />
        </div>
        <FormGroup row={true}>
          <FormikTextField
            name="basic.nameSei"
            label="名前"
            placeholder="山田"
            maxLength={255}
            size="medium"
          />
          <FormikTextField
            name="basic.nameMei"
            placeholder="太郎"
            maxLength={255}
            size="medium"
            style={{ paddingTop: 16 }}
          />
        </FormGroup>
        <FormGroup row={true}>
          <FormikTextField
            name="basic.nameSeiKana"
            label="フリガナ"
            placeholder="ヤマダ"
            maxLength={255}
            size="medium"
          />
          <FormikTextField
            name="basic.nameMeiKana"
            placeholder="タロウ"
            maxLength={255}
            size="medium"
            style={{ paddingTop: 16 }}
          />
        </FormGroup>
        <FormikTextField
          name="basic.recipientNumber"
          label="受給者証番号"
          placeholder="0000000000"
          maxLength={10}
          size="medium"
          style={{ marginBottom: 12 }}
          helperText="半角数字を入力"
        />
        <FormikCheckbox
          name="basic.noneRecipientNumberFlag"
          label="受給者証未発行もしくは見学中の利用者（請求対象外）"
          className={this.props.classes.formikActionLabel}
        />
        <Typography>障害種別（複数選択可）</Typography>
        <div className={this.props.classes.checkboxContainer}>
          <FormikCheckbox
            name="basic.classifyPhysicalFlag"
            label="身体障害"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyIntelligenceFlag"
            label="知的障害"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyMindFlag"
            label="精神障害"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyGrowthFlag"
            label="発達障害"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyBrainFlag"
            label="高次脳機能障害"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyHandicappedFlag"
            label="障害児"
            className={this.props.classes.formikActionLabel}
          />
          <FormikCheckbox
            name="basic.classifyIncurableFlag"
            label="難病等対象者"
            className={this.props.classes.formikActionLabel}
          />
        </div>
        <FormikRadioButtons
          name="basic.gender"
          label="性別"
          options={[
            {
              label: "男性",
              value: "1"
            },
            {
              label: "女性",
              value: "2"
            }
          ]}
          className={this.props.classes.formikActionLabel}
        />
        <FormikSelectDateNotSelectedDefault
          name="basic.dateOfBirth"
          label="生年月日"
          setFormikFieldValue={this.props.setFormikFieldValue}
        />
        <FormikPostalCode
          name="basic.postalCode"
          label="郵便番号"
          placeholder="000-0000"
          maxLength={8}
          startAdornmentLabel="〒"
        />
        <FormikLinkAddress
          prefectureIdName="basic.prefectureId"
          cityIdName="basic.cityId"
          formikProps={this.props.formikProps}
          showRegionType={false}
          onChangePrefecture={this.onChangeLinkAddress}
          required={false}
        />
        <FormikTextField
          name="basic.restAddress"
          label="市区町村以降の住所"
          size="superLong"
        />
        <FormikTextField
          name="basic.tel"
          type="tel"
          label="電話番号（任意）"
          placeholder="0000000000"
          helperText="ハイフンなしで入力"
          maxLength={12}
        />
        <FormikTextField
          name="basic.email"
          label="メールアドレス（任意）"
          placeholder="tarou@knowbe.jp"
          size="superLong"
          helperText="半角英数字で入力"
          maxLength={255}
        />
        <div className={this.props.classes.guardian}>
          <FormikTextField
            name="basic.guardianName"
            label="保護者氏名（任意）"
            maxLength={48}
          />
        </div>
        <div className={this.props.classes.guardian}>
          <FormikTextField
            name="basic.guardianRelation"
            label="続柄（任意）"
            maxLength={12}
          />
        </div>
        <FormikTextField
          name="basic.guardianTel"
          label="緊急連絡先（任意）"
          placeholder="0000000000"
          helperText="ハイフンなしで入力"
          maxLength={12}
        />
        <FormikTextField
          name="basic.memo"
          label="備考（任意）"
          size="superLong"
          style={{ marginBottom: 0 }}
          multiline={true}
        />
      </FormPaper>
    );
  }

  // selectBoxのLink
  private onChangeLinkAddress = (
    linkKey: string,
    nextValue: string,
    beforeValue: string
  ): void => {
    this.resetSelectCity(linkKey);
    this.ifNeededFetchCity(nextValue, beforeValue);
  };

  /**
   * prefectureIdに更新があった時、cityListの再取得を行う
   */
  private ifNeededFetchCity = (
    nextPrefectureId: string,
    prevPrefectureId: string
  ) => {
    if (nextPrefectureId === DEFAULT_CITY_STATE.value) {
      this.props.clearCity();
      return;
    }
    if (
      nextPrefectureId !== DEFAULT_CITY_STATE.value &&
      nextPrefectureId !== prevPrefectureId
    ) {
      this.props.fetchCity({ prefectureName: nextPrefectureId });
    }
  };
  /**
   * 市区町村及び関連する地域区分と市区町村番号を初期化
   */
  private resetSelectCity = (cityIdName: string) => {
    this.props.setFormikFieldValue(cityIdName, DEFAULT_CITY_STATE.value);
    const linkList = linkSelectBoxMap[cityIdName];
    if (Array.isArray(linkList)) {
      linkList.forEach(key => {
        this.props.setFormikFieldValue(key, DEFAULT_CITY_STATE.value);
      });
    }
  };
}
// selectBoxのlink情報マップ
const linkSelectBoxMap = {
  "basic.cityId": ["serviceUse.subsidizedCityId"]
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { cityDispatch } = dispatches;
  const cityDispatches = cityDispatch(dispatch);
  return {
    fetchCity: async (params: CityParams) => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    },
    clearCity: () => {
      cityDispatches.clearCity();
    }
  };
};

export default connect<void, DispatchProps>(
  null,
  mapDispatchToProps
)(withStyles(styles)(BasicFields));
