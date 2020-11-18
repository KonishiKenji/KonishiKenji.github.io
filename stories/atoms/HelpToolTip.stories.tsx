import { storiesOf } from "@storybook/react";
import * as React from "react";

import HelpToolTip from "@components/atoms/HelpToolTip";

const stories = storiesOf("Atoms", module);

stories.add(
  "HelpToolTip",
  () => (
    <div>
      <div>
        <HelpToolTip title="このボタンの大きさはsmallです" />
      </div>
      <div>
        <HelpToolTip
          title={
            <div>
              <p>
                前年度の障害基礎年金1級を受給する
                の数が、当該年度における指定就労継続支援A型等の
                数が規定の割合以上の場合に加算対象となる。
              </p>
              <ul>
                <li>(Ⅰ)：前年度において当該年度における利用者数が50%以上</li>
                <li>(Ⅱ)：前年度において当該年度における利用者数が25%以上</li>
              </ul>
            </div>
          }
        />
      </div>
      <hr />
      <div>
        <HelpToolTip title="このボタンの大きさはlargeです" size="large" />
      </div>
    </div>
  )
);
