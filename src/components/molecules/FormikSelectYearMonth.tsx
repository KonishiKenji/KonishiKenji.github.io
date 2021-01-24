import * as React from "react";
import { FastField, FieldProps, FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import createOneToNumberOptions from "@utils/createOneToNumberOptions";
import { dateInYYYYFormat, getWarekiList } from "@utils/date";
import { SelectDateValue } from "@interfaces/ui/form";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  addYearTo?: number;
  overrideYearFrom?: number;
  overrideYearTo?: number;
  style?: React.CSSProperties;
}

interface ClassProps extends Props {
  value: SelectDateValue;
  form: FormikProps<any>; // 使用されるformikPropsがページごとに違うためany
}

interface ClassState {
  yearOptions: { label: string; value: string | number }[];
  monthOptions: { label: string; value: string }[];
}

class FormikSelectYearMonthClass extends React.Component<
  ClassProps,
  ClassState
> {
  public state = {
    yearOptions: [],
    monthOptions: []
  };

  public shouldComponentUpdate(nextProps: ClassProps, nextState: ClassState) {
    return (
      nextProps.value.year !== this.props.value.year ||
      nextProps.value.month !== this.props.value.month ||
      nextState.yearOptions.length !== this.state.yearOptions.length ||
      nextState.monthOptions.length !== this.state.monthOptions.length
    );
  }

  public componentDidMount() {
    const currentYear = +dateInYYYYFormat(new Date());
    const yearFrom = currentYear - 85;
    const from = this.props.overrideYearFrom || yearFrom;
    const to =
      this.props.overrideYearTo || currentYear + (this.props.addYearTo || 0);
    const yearOptions = [
      { label: "選択してください", value: "NOT_SELECTED" },
      ...getWarekiList(from, to)
    ];
    const monthOptions = createOneToNumberOptions(12, "月");
    this.setState({ yearOptions, monthOptions });
  }

  public render() {
    const { label, name, required, style } = this.props;
    return (
      <FormGroup row={true} style={style || { marginBottom: 32 }}>
        <FormikSelect
          name={`${name}.year`}
          label={label}
          required={required}
          options={this.state.yearOptions}
          style={{ marginBottom: 0 }}
        />
        <FormikSelect
          name={`${name}.month`}
          label="月"
          shrink={false}
          size="small"
          options={this.state.monthOptions}
          style={{ marginBottom: 0 }}
        />
      </FormGroup>
    );
  }
}

const FormikSelectDate: React.FunctionComponent<Props> = props => (
  // tslint:disable:jsx-no-lambda
  // FieldProps<any> 使用されるformikPropsがページごとに違うためany
  <FastField
    name={props.name}
    render={({ field, form }: FieldProps<any>) => (
      <FormikSelectYearMonthClass value={field.value} form={form} {...props} />
    )}
  />
);

export default FormikSelectDate;
