import * as React from "react";
import { storiesOf } from "@storybook/react";

import DateSelectFields from "@components/molecules/DateSelectFields";

const stories = storiesOf("Molecules", module);

const initState = {
  date: "",
  date2: ""
};

interface State {
  date: string;
  date2: string;
}

class Select extends React.Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = initState;
  }

  public onChange = (e: any) => {
    console.log("onChange", e.currentTarget.value);
    this.setState({ date: e.currentTarget.value });
  };

  public onChange2 = (e: any) => {
    console.log("onChange2", e.currentTarget.value);
    this.setState({ date2: e.currentTarget.value });
  };

  public render() {
    return (
      <div>
        <div>
          <p>propsの初期化</p>
          <select onChange={this.onChange}>
            <option value="">空白</option>
            <option value="2020-10-01">2020-10-01</option>
            <option value="2018-02-01">2018-02-01</option>
            <option value="1981-05-25">1981-05-25</option>
          </select>
          <DateSelectFields
            id="DateSelect1"
            from={1981}
            to={2020}
            onChange={this.onChange}
            label="誕生日"
            value={this.state.date}
            isError={false}
          />
        </div>
        <hr />
        <div>
          <p>エラー</p>
          <DateSelectFields
            id="DateSelect2"
            from={1981}
            to={2020}
            onChange={this.onChange2}
            label="誕生日"
            value={this.state.date2}
            helperText={"選択してください"}
            isError={true}
          />
        </div>
      </div>
    );
  }
}

stories.add(
  // 年月日登録
  "DateSelectFields",
  () => (
    <div>
      <Select />
    </div>
  )
);
