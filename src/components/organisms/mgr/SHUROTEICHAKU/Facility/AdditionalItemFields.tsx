import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";

const AdditionalItemFields: React.FunctionComponent = () => {
  return (
    <div style={{ marginBottom: 103 }}>
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="加算対象" />
        </div>
        <FormikCheckbox
          name="additionalItem.workHardenesResultFlag"
          label="就労定着実績体制加算"
        />
        <FormikCheckbox
          name="additionalItem.workPlaceAdaptationAssistantFlag"
          label="職場適応援助者養成研修修了者体制加算"
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="workPlaceAdaptationAssistantFlag" />
              }
            />
          }
        />
      </FormPaper>
    </div>
  );
};

export default AdditionalItemFields;
