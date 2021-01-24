/**
 * 都道府県〜市区町村フィールド
 * 初回のfetchCityはここではなく、フォームの取得と合わせて行なっているのが前提
 * 他で使用する都道府県〜市区町村フィールドと市区町村フィールドにおいてリンクできるようになっている
 * リンク時の動作はOrganismで行うことが前提
 */

import * as React from "react";
import { connect } from "react-redux";
import { FormikProps, getIn } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import MuiTextField from "@components/molecules/MuiTextField";
import { CityState } from "@stores/domain/city/type";
import { FieldItem } from "@interfaces/ui/form";
import {
  getSelectedCityGrade,
  getSelectedCityCode
} from "@utils/dataNormalizer";
import { PREFECTURES_LIST, DEFAULT_CITY_STATE } from "@constants/variables";
import { AppState } from "@stores/type";

interface OwnProps {
  prefectureIdName: string;
  cityIdName: string;
  formikProps: FormikProps<any>; // 使用されるformikPropsがページごとに違うためany
  required?: boolean;
  disabledPrefectureId?: boolean;
  showRegionType?: boolean;
  onChangePrefecture: (
    linkKey: string,
    nextValue: string,
    beforeValue: string
  ) => void;
}

interface StateProps {
  cityList: CityState[];
}

interface MergeProps extends OwnProps, StateProps {
  cityOptions: FieldItem[];
  cityGrade: string;
  cityCode: string;
}

type Props = MergeProps;

class FormikLinkAddress extends React.Component<Props> {
  public static defaultProps = {
    required: true,
    showRegionType: true
  };

  public render() {
    return (
      <FormGroup row={true}>
        <FormikSelect
          name={this.props.prefectureIdName}
          label="都道府県"
          options={PREFECTURES_LIST}
          required={this.props.required}
          disabled={this.props.disabledPrefectureId}
          onChangeHook={this.handleChangePrefectureHook}
        />
        <FormikSelect
          name={this.props.cityIdName}
          label="市区町村"
          options={this.props.cityOptions}
          required={this.props.required}
          onChangeHook={this.handleChangeCityIdHook}
        />
        {this.props.showRegionType && (
          <MuiTextField
            value={this.regionType()}
            label="地域区分"
            disabled={true}
            size="superSmall"
          />
        )}
        <MuiTextField
          value={this.props.cityCode}
          label="市区町村番号"
          disabled={true}
          size={this.props.showRegionType ? "superSmall" : "medium"}
        />
      </FormGroup>
    );
  }

  /**
   * 都道府県更新時に市区町村一覧の初期化と再取得を行う
   */
  private handleChangePrefectureHook = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    beforeValue: string
  ) => {
    this.props.onChangePrefecture(
      this.props.cityIdName,
      e.target.value,
      beforeValue
    );
    this.setState({ cityGrade: "", cityCode: "" });
  };

  /**
   * 市区町村更新時に市区町村番号をセットする
   */
  private handleChangeCityIdHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      cityGrade: getSelectedCityGrade(this.props.cityList, e.target.value),
      cityCode: getSelectedCityCode(this.props.cityList, e.target.value)
    });
  };

  /**
   * cityGradeから地域区分の表示
   */
  private regionType = () => {
    return this.props.cityGrade ? `${this.props.cityGrade}級地` : "その他";
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  cityList: state.city
});

const mergeProps = (
  stateProps: StateProps,
  {},
  ownProps: OwnProps
): MergeProps => {
  const hasCityList =
    stateProps.cityList && Object.keys(stateProps.cityList).length !== 1;
  // convert: CityState[] => FieldItem[]
  const cityOptions = hasCityList
    ? Object.keys(stateProps.cityList).map(key => {
        const { label, value } = stateProps.cityList[key];
        return { label, value };
      })
    : [DEFAULT_CITY_STATE];
  // 地域区分 & 市区町村番号
  const cityId = getIn(ownProps.formikProps.values, ownProps.cityIdName);
  const cityGrade =
    cityId && hasCityList
      ? getSelectedCityGrade(stateProps.cityList, cityId)
      : "";
  const cityCode =
    cityId && hasCityList
      ? getSelectedCityCode(stateProps.cityList, cityId)
      : "";

  return {
    cityOptions,
    cityGrade,
    cityCode,
    ...stateProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(FormikLinkAddress);
