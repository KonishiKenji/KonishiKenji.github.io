import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";

// ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// stores
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import initialValues, { StaffValues } from "@initialize/staffs/initialValues";
import { StaffData } from "@stores/domain/staff/types";
import { SnackbarParams } from "@stores/ui/type";
import validation from "@initialize/staffs/validation";
import { toEffectiveObject } from "@utils/object";

// formik
import {
  Formik,
  Form,
  FormikActions,
  FieldArray,
  ArrayHelpers,
  FormikProps
} from "formik";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";

import ContentHeaderRight from "@components/molecules/ContentHeaderRight";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import ConfirmDialog from "@components/atoms/ConfirmDialog";
import FormPaper from "@components/atoms/FormPaper";

const styles = createStyles({
  tableHeader: {
    backgroundColor: "#90a4ae",
    "& tr th": {
      fontSize: 14,
      lineHeight: "24px",
      color: "#fff",
      padding: "12px 0 12px 16px"
    },
    "& tr th:last-child": {
      paddingRight: 0
    }
  },
  tableRow: {
    "&:first-child td.gridcell": {
      paddingTop: 24
    }
  },
  cell: {
    fontSize: 16,
    padding: "0 0 4px 16px",
    borderBottom: "none",
    "&:last-child": {
      paddingRight: 0
    },
    "& div": {
      margin: 0
    },
    "& > div": {
      height: 52,
      width: "100%"
    }
  },
  roleCol: {
    width: 419
  },
  deleteCol: {
    width: 32
  },
  deleteIcon: {
    minWidth: 24,
    padding: 0,
    color: "#0277bd",
    cursor: "pointer",
    "&:hover": {
      color: "rgb(1, 83, 132)",
      backgroundColor: "transparent"
    }
  },
  disabledIcon: {
    color: "rgba(0, 0, 0, 0.12)",
    pointerEvents: "none"
  },
  paperWrapper: {
    "& > section": {
      paddingBottom: 8,
      marginTop: 8
    }
  },
  wrapper: {
    height: 60,
    "& > div": {
      paddingRight: 16,
      paddingLeft: 16,
      minHeight: 60
    }
  },
  button: { width: 120 }
});

interface DispatchProps {
  fetchStaffs: () => void;
  postStaffs: (values: StaffValues["staffs"]) => void;
  deleteStaff: (id: number) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  staffItems: StaffData[];
  isLoggedInSupport: boolean;
  needsStopHistory: boolean;
}

type Props = DispatchProps & StateProps & WithStyles<typeof styles>;

interface State {
  openModal: boolean;
  deleteTargetId: number;
  initialValues: StaffValues;
  version: number;
}

class WorksForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openModal: false,
      deleteTargetId: 0,
      initialValues: initialValues(),
      version: new Date().getTime()
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchStaffs();
    this.setState({
      initialValues: initialValues(this.props.staffItems),
      version: new Date().getTime()
    });
  }

  private handleChangeField = (
    arrayHelpers: ArrayHelpers,
    form: FormikProps<StaffValues>,
    currentKey: number,
    fieldName: "roleName" | "staffName"
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { value } = e.target;
    const {
      values: { staffs }
    } = form;

    const currentStaff = { ...staffs[currentKey], [fieldName]: value };
    const tmpStaffs = [...staffs];
    tmpStaffs[currentKey] = currentStaff;

    // 変更管理
    currentStaff.dirty = true;
    if (currentStaff.staffItemId) {
      currentStaff.dirty =
        currentStaff.roleName !==
          this.state.initialValues.staffs[currentKey].roleName ||
        currentStaff.staffName !==
          this.state.initialValues.staffs[currentKey].staffName;
    } else {
      currentStaff.dirty =
        currentStaff.roleName !== "" || currentStaff.staffName !== "";
    }
    if (currentStaff.dirty !== staffs[currentKey].dirty) {
      form.setFieldValue(`staffs[${currentKey}].dirty`, currentStaff.dirty);
    }

    if (currentKey === staffs.length - 1) {
      // 最終行がすべて入力済みなら行追加
      if (!!currentStaff.roleName && !!currentStaff.staffName) {
        const newStaff = initialValues().staffs[0];
        newStaff.key = currentStaff.key + 1;
        arrayHelpers.push(newStaff);
        tmpStaffs.push(newStaff);
      }
    } else if (
      !currentStaff.staffItemId &&
      !currentStaff.roleName &&
      !currentStaff.staffName
    ) {
      // 未入力になった行は削除
      form.setFieldValue(`staffs[${currentKey}].delete`, true);
      currentStaff.delete = true;
    }

    // 変更管理
    this.confirmDiscardFormChanges({ staffs: tmpStaffs });
  };

  private handleClickDelete = (e: React.MouseEvent<SVGElement>): void => {
    if (!e.currentTarget.dataset.id) return;
    this.setState({
      openModal: true,
      deleteTargetId: parseInt(e.currentTarget.dataset.id, 10)
    });
  };

  private handleCancel = (): void => {
    this.setState({ openModal: false, deleteTargetId: 0 });
  };

  private validate = (values: StaffValues): object | undefined => {
    const { staffs = [] } = validation(values);
    const errors = staffs.map((res = {}) => toEffectiveObject(res));
    return errors.filter((e) => e).length === 0 ? {} : { staffs: errors };
  };

  private onSubmit = async (
    values: StaffValues,
    actions: FormikActions<StaffValues>
  ): Promise<void> => {
    actions.setSubmitting(true);
    // 未削除、変更のある行のみを更新
    await this.props.postStaffs(
      values.staffs.filter(
        (staff) => !staff.delete && !!staff.roleName && staff.dirty
      )
    );
    await this.props.fetchStaffs();
    this.setState({
      initialValues: initialValues(this.props.staffItems),
      version: new Date().getTime()
    });
    actions.setSubmitting(false);
  };

  private onDelete = async (): Promise<void> => {
    if (this.state.deleteTargetId === 0) return;
    this.setState({ openModal: false, deleteTargetId: 0 });
    await this.props.deleteStaff(this.state.deleteTargetId);
    await this.props.fetchStaffs();
    this.setState({
      initialValues: initialValues(this.props.staffItems),
      version: new Date().getTime()
    });
  };

  private submitError = (): void => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private confirmDiscardFormChanges(nextValues: StaffValues): void {
    const hasChange = nextValues.staffs
      .filter((staff) => !staff.delete)
      .some((staff) => staff.dirty);
    if (this.props.needsStopHistory !== hasChange) {
      this.props.stopHistory(hasChange);
    }
  }

  public render(): JSX.Element {
    const { classes, isLoggedInSupport, needsStopHistory } = this.props;
    const dialogMessage = (
      <span>
        この操作を実行するとデータが完全に削除され、復元できません。
        <br />
        よろしいですか？
      </span>
    );
    return (
      <Formik
        initialValues={this.state.initialValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
        enableReinitialize
      >
        {(formikProps): JSX.Element => (
          <Form>
            <ContentHeader
              position="sticky"
              classes={{ wrapper: classes.wrapper }}
            >
              <ContentHeaderRight>
                <FormikSubmitButton
                  buttonName="保存する"
                  formikProps={formikProps}
                  errorAction={this.submitError}
                  className={classes.button}
                />
              </ContentHeaderRight>
            </ContentHeader>
            <div className={classes.paperWrapper}>
              <FormPaper>
                <Table>
                  <TableHead className={classes.tableHeader}>
                    <TableRow>
                      <TableCell className={classes.roleCol}>役職</TableCell>
                      <TableCell>職員名</TableCell>
                      <TableCell className={classes.deleteCol} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray name="staffs" validateOnChange={false}>
                      {(arrayHelpers): JSX.Element => (
                        <>
                          {formikProps.values.staffs
                            .filter((staff) => !staff.delete)
                            .map((staff) => (
                              <TableRow
                                key={`${this.state.version}_${staff.key}`}
                                className={classes.tableRow}
                              >
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  <FormikTextField
                                    name={`staffs[${staff.key}].roleName`}
                                    maxLength={15}
                                    onChangeHook={this.handleChangeField(
                                      arrayHelpers,
                                      formikProps,
                                      staff.key,
                                      "roleName"
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  <FormikTextField
                                    name={`staffs[${staff.key}].staffName`}
                                    maxLength={20}
                                    onChangeHook={this.handleChangeField(
                                      arrayHelpers,
                                      formikProps,
                                      staff.key,
                                      "staffName"
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  {staff.staffItemId && (
                                    <DeleteOutlineIcon
                                      data-id={staff.staffItemId}
                                      onClick={this.handleClickDelete}
                                      className={`${classes.deleteIcon} ${
                                        needsStopHistory || isLoggedInSupport
                                          ? classes.disabledIcon
                                          : ""
                                      }`}
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </>
                      )}
                    </FieldArray>
                  </TableBody>
                </Table>
              </FormPaper>
            </div>
            <ConfirmDialog
              isOpen={this.state.openModal}
              onDelete={this.onDelete}
              onCancel={this.handleCancel}
              title="職員情報を削除します"
              message={dialogMessage}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const staffDispatcher = dispatches.staffDispatcher(dispatch);
  const uiDispatcher = dispatches.uiDispatch(dispatch);
  return {
    fetchStaffs: staffDispatcher.fetch,
    postStaffs: staffDispatcher.post,
    deleteStaff: staffDispatcher.deleteStaff,
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatcher.snackbar(params),
    stopHistory: uiDispatcher.stopHistory
  };
};

const mapStateToProps = (state: AppState): StateProps => ({
  staffItems: state.staff.staffItems,
  isLoggedInSupport: state.auth.isSupport,
  needsStopHistory: state.ui.needsStopHistory
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorksForm));
