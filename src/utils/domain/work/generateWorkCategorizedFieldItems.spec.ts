import { CategorizedFieldItem } from "@interfaces/ui/form";
import { GetWorkResponse } from "@api/requests/work/getWork";
import generateWorkCategorizedFieldItems from "@utils/domain/work/generateWorkCategorizedFieldItems";

describe("generateWorkCategorizedFieldItems", () => {
  it("case:正常に整形できているか", () => {
    const expected: CategorizedFieldItem[] = [
      {
        categoryId: 1,
        categoryName: "作業",
        items: [
          { label: "work01", value: 2 },
          { label: "work02", value: 10 }
        ]
      },
      {
        categoryId: 2,
        categoryName: "プログラム",
        items: [
          { label: "program01", value: 3 },
          { label: "program02", value: 8 }
        ]
      },
      {
        categoryId: 3,
        categoryName: "その他",
        items: [
          { label: "etc01", value: 1 },
          { label: "etc02", value: 12 }
        ]
      }
    ];
    const workData: GetWorkResponse["data"] = [
      {
        id: 1,
        name: "作業",
        items: [
          { id: 2, name: "work01", category_id: 1, facility_id: 1 },
          { id: 10, name: "work02", category_id: 1, facility_id: 1 }
        ]
      },
      {
        id: 2,
        name: "プログラム",
        items: [
          { id: 3, name: "program01", category_id: 2, facility_id: 1 },
          { id: 8, name: "program02", category_id: 2, facility_id: 1 }
        ]
      },
      {
        id: 3,
        name: "その他",
        items: [
          { id: 1, name: "etc01", category_id: 3, facility_id: 1 },
          { id: 12, name: "etc02", category_id: 3, facility_id: 1 }
        ]
      }
    ];
    const actual: CategorizedFieldItem[] = generateWorkCategorizedFieldItems(
      workData
    );
    expect(actual).toEqual(expected);
  });
  it("case:作業情報が未登録の場合", () => {
    const expected: CategorizedFieldItem[] = [];
    const workData: GetWorkResponse["data"] = [];
    const actual: CategorizedFieldItem[] = generateWorkCategorizedFieldItems(
      workData
    );
    expect(actual).toEqual(expected);
  });
});
