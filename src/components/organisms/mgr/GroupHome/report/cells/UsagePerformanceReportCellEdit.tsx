import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import DropDown, { OptionInterface } from "@components/atoms/DropDown";
import TextField from "@components/atoms/TextField";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { Report } from "@stores/domain/report/type";
import {
  USAGE_PERFORMANCE_STATUS_TYPE,
  USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE,
  USAGE_PERFORMANCE_HOSPITALIZATION_SUPPORT_TYPE,
  USAGE_PERFORMANCE_GET_HOME_SUPPORT_TYPE,
  USAGE_PERFORMANCE_DAYTIME_SUPPORT_TYPE,
  USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE,
  LIFE_SUPPORT_FLG,
  SERVICE_END_STATUS,
  USAGE_PERFORMANCE_STATUS_TYPE_END_IN_30_DAY,
  USAGE_PERFORMANCE_STATUS_TYPE_FULL
} from "@constants/variables";
import { HOME_CARE_FLG } from "@constants/mgr/GroupHome/variables";

const styles = (): StyleRules =>
  createStyles({
    statusStyle: {
      width: 139,
      marginRight: 0
    },
    smallDropDownStyle: {
      width: 64,
      marginRight: 0
    },
    medicalSupportDropDownStyle: {
      // 医療連携は全て見える幅にする。
      width: 71,
      marginRight: 0
    },
    shortCell: {
      width: 64,
      minWidth: 64,
      boxSizing: "content-box"
    },
    serviceStatusCell: {
      width: 111,
      minWidth: 111,
      boxSizing: "content-box"
    },
    middleCell: {
      width: 130,
      minWidth: 130,
      boxSizing: "content-box"
    },
    longCell: {
      width: 226,
      minWidth: 226,
      boxSizing: "content-box"
    }
  });

interface OwnProps {
  params: Report;
  facility: FacilityState;
  idx: number;
  hasNightSupportType: boolean;
  setStatusType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setNightSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHospitalizationSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setGetHomeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setDaytimeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setMedicalSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setLifeSupportFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHomeCareFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setRemarks: (remarks: string, key: number) => void;
  onChangeDisabled: (errorMessage: string, key: number) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  currentRemarks: string;
  errorMessage: {
    remarks: string;
  };
}

/**
 * サービス提供の状態に応じて各項目の入力禁止が決まる。
 * サービス提供の状況のvalue値を各項目の配列に含めると、対象の項目が非活性になる
 */
const DISABLED_STATUS_TYPE_PATTERN = {
  NIGHT_SUPPORT_TYPE: ["0", "2", "3", "5", "6", "8", "9", "10", "11"],
  HOSPITALIZATION_SUPPORT_TYPE: ["0", "1", "5", "6", "7", "8", "9", "10", "11", "12"], // prettier-ignore
  HOME_SUPPORT_TYPE: ["0", "1", "2", "3", "4", "8", "9", "10", "11", "12"],
  DAYTIME_SUPPORT_TYPE: ["0", "3", "6", "8", "9", "12"],
  MEDICAL_SUPPORT_TYPE: ["0", "3", "6", "8", "9", "12"],
  LIFE_SUPPORT_FLG: ["0", "3", "6", "8", "9", "12"],
  HOME_CARE_FLG: ["0", "12"]
};

class UsagePerformanceReportCellEdit extends React.Component<Props, State> {
  public medicalSupportTypeRadioItems: OptionInterface[];

  constructor(props: Props) {
    super(props);
    this.state = {
      currentRemarks: this.props.params.remarks,
      errorMessage: {
        remarks: ""
      }
    };

    this.medicalSupportTypeRadioItems = this.createMedicalSupportTypeRadioItems();
  }

  /**
   * 医療連携のラジオボタンを事業所情報および、利用実績の登録値を元に生成
   */
  private createMedicalSupportTypeRadioItems = (): OptionInterface[] => {
    const items =
      this.props.facility.nursingStaffPlacementSystemFlag &&
      this.props.facility.nursingStaffPlacementSystemFlag === "2"
        ? this.filterMedicalSupportTypeRadioItems()
        : USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE;
    return items;
  };

  private filterMedicalSupportTypeRadioItems = (): OptionInterface[] => {
    const medicalSupportValue = this.props.params.medicalSupportType || "1";
    return USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE.filter((option) => {
      return (
        option.value === "1" ||
        option.value === "4" ||
        option.value === medicalSupportValue
      );
    });
  };

  private setStatusType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.statusType || "0";
    if (currentValue !== event.target.value) {
      this.props.setStatusType(event, this.props.idx);
      let { currentRemarks } = this.state;

      // サービス提供の状況が「-」or 「体験利用」に変更された場合、
      // 備考欄の入力は居宅介護「あり」->「-」と同様の挙動にする。
      if (
        DISABLED_STATUS_TYPE_PATTERN.HOME_CARE_FLG.includes(event.target.value)
      ) {
        currentRemarks = this.replaceRemarks(currentRemarks, "居宅介護等利用");
      }
      // 入院時支援の場合
      if (
        DISABLED_STATUS_TYPE_PATTERN.HOSPITALIZATION_SUPPORT_TYPE.includes(
          event.target.value
        )
      ) {
        currentRemarks = this.replaceRemarks(currentRemarks, "長期入院時支援");
      }
      // 帰宅支援の場合
      if (
        DISABLED_STATUS_TYPE_PATTERN.HOME_SUPPORT_TYPE.includes(
          event.target.value
        )
      ) {
        currentRemarks = this.replaceRemarks(currentRemarks, "長期帰宅時支援");
      }
      this.setState({ currentRemarks });
      this.props.setRemarks(currentRemarks, this.props.idx);
    }
  };

  private setNightSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.nightSupportType || "1";
    if (currentValue !== event.target.value) {
      this.props.setNightSupportType(event, this.props.idx);
    }
  };

  private setHospitalizationSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.hospitalizationSupportType || "1";
    const targetValue = event.target.value;
    if (currentValue !== targetValue) {
      this.props.setHospitalizationSupportType(event, this.props.idx);
      let { currentRemarks } = this.state;
      currentRemarks = this.replaceRemarks(currentRemarks, "長期入院時支援");
      if (targetValue === "3") {
        currentRemarks = `${currentRemarks}${
          currentRemarks ? " " : ""
        }長期入院時支援`;
      }
      this.setState({ currentRemarks });
      this.props.setRemarks(currentRemarks, this.props.idx);
    }
  };

  private setGetHomeSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.getHomeSupportType || "1";
    const targetValue = event.target.value;
    if (currentValue !== targetValue) {
      this.props.setGetHomeSupportType(event, this.props.idx);
      let { currentRemarks } = this.state;
      currentRemarks = this.replaceRemarks(currentRemarks, "長期帰宅時支援");
      if (targetValue === "3") {
        currentRemarks = `${currentRemarks}${
          currentRemarks ? " " : ""
        }長期帰宅時支援`;
      }
      this.setState({ currentRemarks });
      this.props.setRemarks(currentRemarks, this.props.idx);
    }
  };

  private setDaytimeSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.daytimeSupportType || "1";
    if (currentValue !== event.target.value) {
      this.props.setDaytimeSupportType(event, this.props.idx);
    }
  };

  private setMedicalSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.medicalSupportType || "1";
    if (currentValue !== event.target.value) {
      this.props.setMedicalSupportType(event, this.props.idx);
    }
  };

  private setLifeSupportFlg = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.lifeSupportFlg || "0";
    if (currentValue !== event.target.value) {
      this.props.setLifeSupportFlg(event, this.props.idx);
    }
  };

  private setHomeCareFlg = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentValue = this.props.params.homeCareFlg || "0";
    const { value } = event.target;
    if (currentValue !== value) {
      this.props.setHomeCareFlg(event, this.props.idx);
      let { currentRemarks } = this.state;
      // 「居宅介護等利用」の前に半角スペースがあった場合は一緒に削除
      currentRemarks = this.replaceRemarks(currentRemarks, "居宅介護等利用");
      if (value === "1") {
        currentRemarks = `${currentRemarks}${
          currentRemarks ? " " : ""
        }居宅介護等利用`;
      }
      this.setState({ currentRemarks });
      this.props.setRemarks(currentRemarks, this.props.idx);
    }
  };

  private replaceRemarks = (currentRemarks: string, word: string): string => {
    // 直前に半角スペースがあった場合は一緒に削除
    const reg = new RegExp(`( )*${word}`, "g");
    return currentRemarks.replace(reg, "");
  };

  private onChangeRemarks = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ currentRemarks: event.target.value });
  };

  private onBlurRemarks = (): void => {
    if (this.props.params.remarks !== this.state.currentRemarks) {
      this.props.setRemarks(this.state.currentRemarks, this.props.idx);
    }
  };

  private isDisabledNightSupportType = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.NIGHT_SUPPORT_TYPE
      ) ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
    );
  };

  private isDisabledHospitalizationSupportType = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.HOSPITALIZATION_SUPPORT_TYPE
      ) ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
    );
  };

  private isDisabledHomeSupportType = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.HOME_SUPPORT_TYPE
      ) ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
    );
  };

  private isDisabledDaytimeSupportType = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.DAYTIME_SUPPORT_TYPE
      ) ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
    );
  };

  private isDisabledMedicalSupportType = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.MEDICAL_SUPPORT_TYPE
      ) ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END ||
      params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
    );
  };

  private isDisabledLifeSupportFlg = (): boolean => {
    const { params } = this.props;
    return (
      this.hasDisabledStatusType(
        DISABLED_STATUS_TYPE_PATTERN.LIFE_SUPPORT_FLG
      ) || params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END
    );
  };

  private isDisabledHomeCareFlg = (): boolean => {
    return this.hasDisabledStatusType(
      DISABLED_STATUS_TYPE_PATTERN.HOME_CARE_FLG
    );
  };

  private hasDisabledStatusType = (statusTypeList: string[]): boolean => {
    return (
      !this.props.params.statusType ||
      statusTypeList.some((type) => type === this.props.params.statusType)
    );
  };

  public render(): JSX.Element {
    const { idx, params, hasNightSupportType, classes } = this.props;

    return (
      <>
        {/* サービス提供の状況 */}
        <TableCellWrap
          key={`${idx}-status-type`}
          cellClass={
            hasNightSupportType ? classes.serviceStatusCell : classes.longCell
          }
        >
          <DropDown
            id={`${idx}-status-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={
              params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END_IN_30_DAY
                ? USAGE_PERFORMANCE_STATUS_TYPE_END_IN_30_DAY
                : USAGE_PERFORMANCE_STATUS_TYPE
            }
            onChange={this.setStatusType}
            value={params.statusType || "0"}
            names={USAGE_PERFORMANCE_STATUS_TYPE_FULL}
            helperText=""
            isError={false}
            styles={classes.statusStyle}
            isDisabled={params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END}
          />
        </TableCellWrap>

        {/* 夜間支援 */}
        <TableCellWrap
          key={`${idx}-night-support-type`}
          hidden={!hasNightSupportType}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-night-support-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE}
            onChange={this.setNightSupportType}
            value={params.nightSupportType || "1"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledNightSupportType()}
          />
        </TableCellWrap>

        {/* 入院時支援 */}
        <TableCellWrap
          key={`${idx}-hospitalization-support-type`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-hospitalization-support-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={USAGE_PERFORMANCE_HOSPITALIZATION_SUPPORT_TYPE}
            onChange={this.setHospitalizationSupportType}
            value={params.hospitalizationSupportType || "1"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledHospitalizationSupportType()}
          />
        </TableCellWrap>

        {/* 帰宅時支援 */}
        <TableCellWrap
          key={`${idx}-get-home-support-type`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-get-home-support-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={USAGE_PERFORMANCE_GET_HOME_SUPPORT_TYPE}
            onChange={this.setGetHomeSupportType}
            value={params.getHomeSupportType || "1"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledHomeSupportType()}
          />
        </TableCellWrap>

        {/* 日中支援 */}
        <TableCellWrap
          key={`${idx}-daytime-support-type`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-daytime-support-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={USAGE_PERFORMANCE_DAYTIME_SUPPORT_TYPE}
            onChange={this.setDaytimeSupportType}
            value={params.daytimeSupportType || "1"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledDaytimeSupportType()}
          />
        </TableCellWrap>

        {/* 医療連携 */}
        <TableCellWrap
          key={`${idx}-medical-support-type`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-medical-support-type-dropdown`}
            label=""
            size="textFieldFullSize"
            options={this.medicalSupportTypeRadioItems}
            onChange={this.setMedicalSupportType}
            value={params.medicalSupportType || "1"}
            helperText=""
            isError={false}
            styles={classes.medicalSupportDropDownStyle}
            isDisabled={this.isDisabledMedicalSupportType()}
          />
        </TableCellWrap>

        {/* 自立支援 */}
        <TableCellWrap
          key={`${idx}-life-support-flg`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-life-support-flg-dropdown`}
            label=""
            size="textFieldFullSize"
            options={LIFE_SUPPORT_FLG}
            onChange={this.setLifeSupportFlg}
            value={params.lifeSupportFlg || "0"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledLifeSupportFlg()}
          />
        </TableCellWrap>

        {/* 居宅介護 */}
        <TableCellWrap
          key={`${idx}-home-care-flg`}
          cellClass={classes.shortCell}
        >
          <DropDown
            id={`${idx}-home-care-flg-dropdown`}
            label=""
            size="textFieldFullSize"
            options={HOME_CARE_FLG}
            onChange={this.setHomeCareFlg}
            value={params.homeCareFlg || "0"}
            helperText=""
            isError={false}
            styles={classes.smallDropDownStyle}
            isDisabled={this.isDisabledHomeCareFlg()}
          />
        </TableCellWrap>

        {/* 備考 */}
        <TableCellWrap key={`${idx}-remarks`} cellClass={classes.middleCell}>
          <TextField
            id={`${idx}-remarks-text-field`}
            value={this.state.currentRemarks}
            size="textFieldFullSize"
            type="text"
            helperText={this.state.errorMessage.remarks}
            onChange={this.onChangeRemarks}
            onBlur={this.onBlurRemarks}
            isDisabled={params.isServiceEnd === SERVICE_END_STATUS.SERVICE_END}
            isError={!!this.state.errorMessage.remarks}
          />
        </TableCellWrap>
      </>
    );
  }
}

export default withStyles(styles)(UsagePerformanceReportCellEdit);
