/**
 * 都道府県〜市区町村フィールド
 * 初回のfetchCityはここではなく、フォームの取得と合わせて行なっているのが前提
 */

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FormikProps, getIn } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import MuiTextField from "@components/molecules/MuiTextField";
import dispatches from "@stores/dispatches";
import { CityState, CityParams } from "@stores/domain/city/type";
import { FieldItem } from "@interfaces/ui/form";
import {
  getSelectedCityGrade,
  getSelectedCityCode
} from "@utils/dataNormalizer";
import { PREFECTURES_LIST, DEFAULT_CITY_STATE } from "@constants/variables";

interface OwnProps {
  prefectureIdName: string;
  cityIdName: string;
  formikProps: FormikProps<any>;
  required?: boolean;
  disabledPrefectureId?: boolean;
  showRegionType?: boolean;
  showCityCode?: boolean;
}

interface DispatchProps {
  fetchCity: (params: CityParams) => void;
}

interface StateProps {
  cityList: CityState[];
}

interface MergeProps extends OwnProps, DispatchProps, StateProps {
  cityOptions: FieldItem[];
  cityGrade: string;
  cityCode: string;
}

type Props = MergeProps;

class FormikAddress extends React.Component<Props> {
  /**
   * 都道府県更新時に市区町村一覧の初期化と再取得を行う
   */
  private handleChangePrefectureHook = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    beforeValue: string
  ): Promise<void> => {
    this.resetSelectCity();
    const nextValue = e.target.value;
    this.ifNeededFetchCity(nextValue, beforeValue);
  };

  /**
   * 市区町村更新時に市区町村番号をセットする
   */
  private handleChangeCityIdHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.props.formikProps.setFieldValue(
      "cityGrade",
      getSelectedCityGrade(this.props.cityList, e.target.value)
    );
    this.props.formikProps.setFieldValue(
      "cityCode",
      getSelectedCityCode(this.props.cityList, e.target.value)
    );
  };

  /**
   * 市区町村及び関連する地域区分と市区町村番号を初期化
   */
  private resetSelectCity = (): void => {
    this.props.formikProps.setFieldValue(
      this.props.cityIdName,
      DEFAULT_CITY_STATE.value
    );
    this.props.formikProps.setFieldValue("cityGrade", "");
    this.props.formikProps.setFieldValue("cityCode", "");
  };

  /**
   * prefectureIdに更新があった時、cityListの再取得を行う
   */
  private ifNeededFetchCity = (
    nextPrefectureId: string,
    prevPrefectureId: string
  ): void => {
    if (
      nextPrefectureId !== DEFAULT_CITY_STATE.value &&
      nextPrefectureId !== prevPrefectureId
    ) {
      this.props.fetchCity({ prefectureName: nextPrefectureId });
    }
  };

  /**
   * cityGradeから地域区分の表示
   */
  private regionType = (): string => {
    if (!this.props.cityCode) {
      return "";
    }
    return this.props.cityGrade ? `${this.props.cityGrade}級地` : "その他";
  };

  public render(): JSX.Element {
    const required = this.props.required !== false;
    const showRegionType = this.props.showRegionType !== false;
    const showCityCode = this.props.showCityCode !== false;
    return (
      <FormGroup row>
        <FormikSelect
          name={this.props.prefectureIdName}
          label="都道府県"
          options={PREFECTURES_LIST}
          required={required}
          disabled={this.props.disabledPrefectureId}
          onChangeHook={this.handleChangePrefectureHook}
        />
        <FormikSelect
          name={this.props.cityIdName}
          label="市区町村"
          options={this.props.cityOptions}
          required={required}
          onChangeHook={this.handleChangeCityIdHook}
        />
        {showRegionType && (
          <MuiTextField
            value={this.regionType()}
            label="地域区分"
            disabled
            size="superSmall"
          />
        )}
        {(showRegionType || showCityCode) && (
          <MuiTextField
            value={this.props.cityCode}
            label="市区町村番号"
            disabled
            size={this.props.cityCode ? "superSmall" : "medium"}
          />
        )}
      </FormGroup>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { cityDispatch } = dispatches;
  const cityDispatches = cityDispatch(dispatch);
  return {
    fetchCity: async (params: CityParams): Promise<void> => {
      await cityDispatches.fetch({
        prefectureName: params.prefectureName
      });
    }
  };
};

const mapStateToProps = (state: any): StateProps => ({
  cityList: state.city
});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  const hasCityList =
    stateProps.cityList && Object.keys(stateProps.cityList).length !== 1;
  // convert: CityState[] => FieldItem[]
  const cityOptions = hasCityList
    ? Object.keys(stateProps.cityList).map((key) => {
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
    ...dispatchProps,
    ...ownProps
  };
};

export default connect<StateProps, DispatchProps, OwnProps, MergeProps>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FormikAddress);
