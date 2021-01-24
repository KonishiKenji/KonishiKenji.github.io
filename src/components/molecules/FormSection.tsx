import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { StyleRules, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import FormLabel from "@material-ui/core/FormLabel";
import DescriptionIcon from "@material-ui/icons/InfoOutlined";

import Checkbox from "@components/atoms/Checkbox";
import DropDown from "@components/atoms/DropDown";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import RadioButtons from "@components/atoms/RadioButtons";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import Switch from "@components/atoms/Switch";
import TextField from "@components/atoms/TextField";
import DateSelectFields from "@components/molecules/DateSelectFields";
import { INPUT_LABEL_COLOR } from "@constants/styles";

import { Field, FieldType } from "@components/atoms/Field";
import { dateInYYYYFormat } from "@utils/date";

const styles = ({ spacing }: Theme): StyleRules =>
  createStyles({
    root: {
      margin: spacing.unit * 2,
      padding: `${spacing.unit * 4}px 0`
    },
    titleWrapper: {
      padding: `0 ${spacing.unit * 4}px`
    },
    formContainer: {
      padding: `0 ${spacing.unit * 4}px`,
      overflow: "hidden"
    },
    descriptionIcon: {
      verticalAlign: "bottom"
    },
    descriptionTitle: {
      paddingLeft: 5
    },
    descriptionLabel: {
      paddingLeft: 16
    },
    label: {
      fontSize: 14,
      color: INPUT_LABEL_COLOR
    },
    itemWrapper: {
      display: "flex",
      alignItems: "center"
    },
    helpMark: {
      marginLeft: `${spacing.unit * 2}px`
    }
  });

interface OwnProps {
  sectionName: string;
  sectionStyle?: object;
  fields: Field[];
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const formSection: React.FunctionComponent<Props> = (props) => (
  <Paper
    className={props.classes.root}
    elevation={0}
    style={props.sectionStyle}
  >
    <div className={props.classes.titleWrapper}>
      <SectionTitle label={props.sectionName} />
    </div>
    <div className={props.classes.formContainer}>
      {props.fields.map((field) => {
        const additionalStyles = field.styles !== undefined ? field.styles : {};

        if (field.type === FieldType.RADIO_BUTTON) {
          return (
            <div key={field.id} style={additionalStyles}>
              <RadioButtons
                name={field.id}
                label={
                  field.label ? (
                    <div className={props.classes.itemWrapper}>
                      {field.label}
                      {field.isHelperTitleTip && (
                        <span className={props.classes.helpMark}>
                          <HelpToolTip
                            title={<HelpTipMessages name={field.id} />}
                          />
                        </span>
                      )}
                    </div>
                  ) : (
                    ""
                  )
                }
                radioItems={field.radioItems}
                value={field.value || ""}
                onChange={field.onChange}
                inputStyle={field.inputStyle}
                helperItemTip={field.helperItemTip}
              />
            </div>
          );
        }
        if (field.type === FieldType.SWITCH) {
          return (
            <div key={field.id} style={additionalStyles}>
              <Switch
                label={
                  field.label ? (
                    <div className={props.classes.itemWrapper}>
                      {field.label}
                      {field.isHelperTitleTip && (
                        <span className={props.classes.helpMark}>
                          <HelpToolTip
                            title={<HelpTipMessages name={field.id} />}
                          />
                        </span>
                      )}
                    </div>
                  ) : (
                    ""
                  )
                }
                checked={field.checked !== undefined ? field.checked : false}
                value={field.value || ""}
                onChange={field.onChange}
              />
            </div>
          );
        }
        if (field.type === FieldType.CHECKBOX) {
          return (
            <div key={field.id} style={additionalStyles}>
              <Checkbox
                label={
                  field.label ? (
                    <div className={props.classes.itemWrapper}>
                      {field.label}
                      {field.isHelperTitleTip && (
                        <span className={props.classes.helpMark}>
                          <HelpToolTip
                            title={<HelpTipMessages name={field.id} />}
                          />
                        </span>
                      )}
                    </div>
                  ) : (
                    ""
                  )
                }
                checked={field.checked !== undefined ? field.checked : false}
                value={field.value || ""}
                inputStyle={field.inputStyle}
                onChange={field.onChange}
              />
            </div>
          );
        }
        if (field.type === FieldType.DROP_DOWN) {
          return (
            <div key={field.id} style={additionalStyles}>
              <DropDown
                id={field.id}
                label={field.label ? field.label : ""}
                options={field.selectItems}
                isDisabled={field.isDisabled}
                value={field.value || ""}
                helperText={
                  field.errorMessage ? field.errorMessage : field.helperText
                }
                isError={
                  field.errorMessage !== undefined &&
                  field.errorMessage.length > 0
                }
                isRequired={
                  field.isRequired !== undefined ? field.isRequired : true
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </div>
          );
        }
        if (field.type === FieldType.DATE_SELECT_FIELDS) {
          let thisYear = +dateInYYYYFormat(new Date());
          if (field.id === "date_end_in_service") {
            thisYear += 1;
          } else if (field.id === "date_pay_end") {
            thisYear += 5;
          }
          return (
            <div key={field.id} style={additionalStyles}>
              <DateSelectFields
                id={field.id}
                label={field.label ? field.label : ""}
                helperText={field.errorMessage ? field.errorMessage : ""}
                value={field.value || ""}
                from={thisYear - 85}
                to={thisYear}
                onChange={field.onChange}
                isError={
                  field.errorMessage !== undefined &&
                  field.errorMessage.length > 0
                }
                isRequired={
                  field.isRequired !== undefined ? field.isRequired : true
                }
                isNoneLeftPadding={field.id === "date_birth"}
              />
            </div>
          );
        }
        if (field.type === FieldType.LABEL) {
          return (
            <div key={field.id} style={additionalStyles}>
              <FormLabel className={props.classes.label} component="label">
                {field.label}
              </FormLabel>
            </div>
          );
        }
        if (field.type === FieldType.DESCRIPTION) {
          return (
            <div key={field.id} style={additionalStyles}>
              <p>
                <DescriptionIcon
                  color="secondary"
                  className={props.classes.descriptionIcon}
                />
                <span className={props.classes.descriptionTitle}>
                  {field.descriptionTitle}
                </span>
              </p>
              <p className={props.classes.descriptionLabel}>
                <FormLabel component="label">{field.label}</FormLabel>
              </p>
            </div>
          );
        }
        return (
          <div key={field.id} style={additionalStyles}>
            <TextField
              id={field.id}
              value={field.value || ""}
              label={field.label ? field.label : ""}
              placeholder={field.placeholder ? field.placeholder : ""}
              startAdornmentLabel={
                field.startAdornmentLabel ? field.startAdornmentLabel : ""
              }
              endAdornmentLabel={
                field.endAdornmentLabel ? field.endAdornmentLabel : ""
              }
              isRequired={
                field.isRequired !== undefined ? field.isRequired : true
              }
              isDisabled={
                field.isDisabled !== undefined ? field.isDisabled : false
              }
              isMultiLine={
                field.isMultiLine !== undefined ? field.isMultiLine : false
              }
              size={field.size ? field.size : "textFieldMedium"}
              type={field.textInputType ? field.textInputType : "text"}
              minLength={field.minLength ? field.minLength : undefined}
              maxLength={field.maxLength ? field.maxLength : undefined}
              helperText={
                field.errorMessage ? field.errorMessage : field.helperText
              }
              isError={
                field.errorMessage !== undefined &&
                field.errorMessage.length > 0
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputStyle={field.inputStyle}
            />
          </div>
        );
      })}
    </div>
  </Paper>
);

export default withStyles(styles)(formSection);
