import * as React from "react";

interface Options {
  printPageHeight: number;
  tableHeadHeight: number;
}

// export interface ExternalProps {}

export interface InjectProps {
  setHeaderRef: (headerElement: HTMLElement | null) => void;
  setTableRowRef: (tableRowElement: HTMLElement | null, index: number) => void;
  tableRowStartEndIndicesInSheet: TableRowStartEndIndice[];
}

export interface TableRowStartEndIndice {
  startIndex: number;
  endIndex: number;
}

const initialState = {
  tableRowStartEndIndicesInSheet: []
};
interface State {
  tableRowStartEndIndicesInSheet: TableRowStartEndIndice[];
}

/**
 * 印刷プレビュー画面で、1つのテーブルが複数ページにまたがる場合に
 * 分割をする
 */
export const previewHOC = (params: Options = {} as Options) => <
  OriginalProps extends {}
>(
  Component: React.ComponentType<OriginalProps & InjectProps>
) => {
  type ResultProps = OriginalProps; // & ExternalProps;
  type arrayItem = HTMLElement | null;

  return class PreviewHOC extends React.Component<
    ResultProps,
    State,
    arrayItem
  > {
    public readonly state = initialState;
    public headerElement?: HTMLElement | null;
    public tableRowElements: arrayItem[];

    public constructor(props: any) {
      super(props);
      this.state = {
        tableRowStartEndIndicesInSheet: []
      };
      this.headerElement = undefined;
      this.tableRowElements = [];
    }

    public componentDidMount() {
      this.separatePage();
    }

    public componentDidUpdate() {
      this.separatePage();
    }

    /**
     * 1ページに入りきる量に列を分割する(1度だけ)
     */
    public separatePage() {
      const { printPageHeight, tableHeadHeight } = params;
      if (
        this.state.tableRowStartEndIndicesInSheet.length > 0 ||
        this.tableRowElements.length === 0
      ) {
        return;
      }
      const tableRowStartEndIndicesInSheet = [];
      const headerHeight = this.headerElement
        ? this.headerElement.offsetHeight
        : 0;

      let total = 0;
      let currentIndex = 0;
      let lastIndex = 0;
      for (const tableRowElement of this.tableRowElements) {
        // 【恒久対応したら消す】面談が無いステータスだとtableRowElementsにnullが入るため飛ばす
        if (tableRowElement !== null) {
          total += tableRowElement.offsetHeight;
        }

        if (
          total >
          (tableRowStartEndIndicesInSheet.length === 0
            ? printPageHeight - (headerHeight + tableHeadHeight)
            : printPageHeight - tableHeadHeight)
        ) {
          tableRowStartEndIndicesInSheet.push({
            startIndex: lastIndex,
            endIndex: currentIndex - 1
          });
          lastIndex = currentIndex;
          if (tableRowElement !== null) {
            total = tableRowElement.offsetHeight;
          }
        }
        currentIndex += 1;
      }
      tableRowStartEndIndicesInSheet.push({
        startIndex: lastIndex,
        endIndex: currentIndex
      });
      this.setState({ tableRowStartEndIndicesInSheet });
    }

    public setHeaderRef = (headerElement: HTMLElement | null) => {
      this.headerElement = headerElement;
    };

    public setTableRowRef = (
      tableRowElement: HTMLElement | null,
      index: number
    ) => {
      this.tableRowElements[index] = tableRowElement;
    };

    public render() {
      return (
        <Component
          tableRowStartEndIndicesInSheet={
            this.state.tableRowStartEndIndicesInSheet
          }
          setHeaderRef={this.setHeaderRef}
          setTableRowRef={this.setTableRowRef}
          {...this.props}
        />
      );
    }
  };
};
