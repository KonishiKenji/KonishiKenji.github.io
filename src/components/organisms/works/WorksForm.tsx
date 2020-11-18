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
import initialValues, { WorkValues } from "@initialize/works/initialValues";
import { WorkData, WorkCategories } from "@stores/domain/work/types";
import { SnackbarParams } from "@stores/ui/type";
import { FieldItem } from "@interfaces/ui/form";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import validation from "@initialize/works/validation";
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
import FormikSelect from "@components/molecules/FormikSelect";
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
  categoryCol: {
    width: 332
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
  fetchWorks: () => void;
  postWorks: (values: WorkValues["works"]) => void;
  deleteWork: (id: number) => void;
  showSnackbar: (params: SnackbarParams) => void;
  stopHistory: (flag: boolean) => void;
}

interface StateProps {
  workItems: WorkData[];
  workCategoryList: WorkCategories[];
  isLoggedInSupport: boolean;
  needsStopHistory: boolean;
}

interface MergeProps extends StateProps, DispatchProps {
  workCategoryOptions: FieldItem[];
}

type Props = DispatchProps & MergeProps & WithStyles<typeof styles>;
type ChangeEventAlias = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
interface State {
  openModal: boolean;
  deleteTargetId: number;
  initialValues: WorkValues;
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
    await this.props.fetchWorks();
    this.setState({
      initialValues: initialValues(this.props.workItems),
      version: new Date().getTime()
    });
  }

  private handleChangeField = (
    arrayHelpers: ArrayHelpers,
    form: FormikProps<WorkValues>,
    currentKey: number,
    fieldName: "categoryId" | "workName"
  ) => (e: React.ChangeEvent<HTMLSelectElement> | ChangeEventAlias): void => {
    const { value } = e.target;
    const {
      values: { works }
    } = form;

    const currentWork = { ...works[currentKey], [fieldName]: value };
    // 作業カテゴリがデフォルトになった場合は作業項目をリセット
    if (fieldName === "categoryId" && value === DEFAULT_SELECT_VALUE) {
      form.setFieldValue(`works[${currentKey}].workName`, "");
      currentWork.workName = "";
    }
    // 作業項目のみリアルタイムでバリデーションを行いたい為、onChangeごとにFormikの更新を行う
    if (fieldName === "workName") {
      form.setFieldValue(`works[${currentKey}].workName`, value);
    }
    const tmpWorks = [...works];
    tmpWorks[currentKey] = currentWork;

    // 変更管理
    currentWork.dirty = true;
    if (currentWork.workItemId) {
      currentWork.dirty =
        currentWork.categoryId !==
          this.state.initialValues.works[currentKey].categoryId ||
        currentWork.workName !==
          this.state.initialValues.works[currentKey].workName;
    }
    if (currentWork.dirty !== works[currentKey].dirty) {
      form.setFieldValue(`works[${currentKey}].dirty`, currentWork.dirty);
    }

    if (currentKey === works.length - 1) {
      // 最終行がすべて入力済みなら行追加
      if (
        currentWork.categoryId !== DEFAULT_SELECT_VALUE &&
        !!currentWork.workName
      ) {
        const newWork = initialValues().works[0];
        newWork.key = currentWork.key + 1;
        arrayHelpers.push(newWork);
        tmpWorks.push(newWork);
      }
    }
    // 未入力になった行は削除
    else if (
      !currentWork.workItemId &&
      !currentWork.workName &&
      currentWork.categoryId === DEFAULT_SELECT_VALUE
    ) {
      form.setFieldValue(`works[${currentKey}].delete`, true);
      currentWork.delete = true;
    }

    // 変更管理
    this.confirmDiscardFormChanges({ works: tmpWorks });
  };

  private validate = (values: WorkValues): object | undefined => {
    const { works = [] } = validation(values);
    const errors = works.map((res = {}) => toEffectiveObject(res));
    return errors.filter((e) => e).length === 0 ? {} : { works: errors };
  };

  private submitError = (): void => {
    this.props.showSnackbar({
      open: true,
      message: "入力内容に誤りがあります",
      variant: "warning"
    });
  };

  private onSubmit = async (
    values: WorkValues,
    actions: FormikActions<WorkValues>
  ): Promise<void> => {
    actions.setSubmitting(true);
    // 未削除、変更のある行のみを更新
    await this.props.postWorks(
      values.works.filter(
        (work) =>
          !work.delete && work.categoryId !== DEFAULT_SELECT_VALUE && work.dirty
      )
    );
    await this.props.fetchWorks();
    this.setState({
      initialValues: initialValues(this.props.workItems),
      version: new Date().getTime()
    });
    actions.setSubmitting(false);
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

  private onDelete = async (): Promise<void> => {
    if (this.state.deleteTargetId === 0) return;
    this.setState({ openModal: false, deleteTargetId: 0 });
    await this.props.deleteWork(this.state.deleteTargetId);
    await this.props.fetchWorks();
    this.setState({
      initialValues: initialValues(this.props.workItems),
      version: new Date().getTime()
    });
  };

  private confirmDiscardFormChanges(nextValues: WorkValues): void {
    const hasChange = nextValues.works
      .filter((work) => !work.delete)
      .some((work) => work.dirty);
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
                      <TableCell className={classes.categoryCol}>
                        作業カテゴリ
                      </TableCell>
                      <TableCell>作業項目</TableCell>
                      <TableCell className={classes.deleteCol} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <FieldArray name="works" validateOnChange={false}>
                      {(arrayHelpers): JSX.Element => (
                        <>
                          {formikProps.values.works
                            .filter((work) => !work.delete)
                            .map((work) => (
                              <TableRow
                                key={`${this.state.version}_${work.key}`}
                                className={classes.tableRow}
                              >
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  <FormikSelect
                                    label=""
                                    name={`works[${work.key}].categoryId`}
                                    options={this.props.workCategoryOptions}
                                    onChangeHook={this.handleChangeField(
                                      arrayHelpers,
                                      formikProps,
                                      work.key,
                                      "categoryId"
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  <FormikTextField
                                    name={`works[${work.key}].workName`}
                                    disabled={
                                      work.categoryId === DEFAULT_SELECT_VALUE
                                    }
                                    maxLength={20}
                                    onChangeHook={this.handleChangeField(
                                      arrayHelpers,
                                      formikProps,
                                      work.key,
                                      "workName"
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  className={`gridcell ${classes.cell}`}
                                >
                                  {work.workItemId && (
                                    <DeleteOutlineIcon
                                      data-id={work.workItemId}
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
              title="作業情報を削除します"
              message={dialogMessage}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const workDispatcher = dispatches.workDispatcher(dispatch);
  const uiDispatcher = dispatches.uiDispatch(dispatch);
  return {
    fetchWorks: workDispatcher.fetch,
    postWorks: workDispatcher.post,
    deleteWork: workDispatcher.deleteWork,
    showSnackbar: (params: SnackbarParams): void =>
      uiDispatcher.snackbar(params),
    stopHistory: uiDispatcher.stopHistory
  };
};

const mapStateToProps = (state: AppState): StateProps => ({
  workItems: state.work.workItems,
  workCategoryList: state.work.workCategoryList,
  isLoggedInSupport: state.auth.isSupport,
  needsStopHistory: state.ui.needsStopHistory
});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps
): MergeProps => {
  return {
    workCategoryOptions: [
      { value: DEFAULT_SELECT_VALUE, label: "選択してください" },
      ...stateProps.workCategoryList.map((category) => ({
        value: `${category.categoryId}`,
        label: category.categoryName
      }))
    ],
    ...stateProps,
    ...dispatchProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(WorksForm));
