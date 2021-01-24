import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { StyleRules, withStyles } from "@material-ui/core/styles";

const styles = (): StyleRules =>
  createStyles({
    message: {
      letterSpacing: 0.4,
      lineHeight: "18px",
      fontWeight: "bold"
    },
    textIndent: {
      paddingLeft: "1em",
      textIndent: "-1em"
    },
    list: {
      paddingLeft: 20,
      listStyle: "none"
    },
    listStyleNone: {
      paddingLeft: 0,
      listStyle: "none"
    },
    listOrder: {
      display: "inline-block",
      width: "10%",
      verticalAlign: "top"
    },
    listContent: {
      display: "inline-block",
      width: "80%"
    },
    textIndentMarginTop: {
      marginBottom: 0,
      paddingLeft: "1em",
      textIndent: "-1em"
    },
    textIndentNonMargin: {
      margin: 0,
      paddingLeft: "1em",
      textIndent: "-1em"
    },
    notMarginTop: {
      marginTop: 0
    },
    notFontWeight: {
      fontWeight: "normal"
    }
  });

interface Props extends WithStyles<typeof styles> {
  name: string;
}

// 事業者情報-[事業者番号]のtips
const officeNumber = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      事業所番号を変更する場合、knowbe業務支援サポートデスクにお問い合わせください。
    </p>
    <p>
      問い合わせ方法はメニューの「お問い合わせ」をクリックし、問い合わせフォームに変更したい事業所番号を入力して送信してください。
    </p>
  </div>
);

// 事業所情報-[一体的な運営を行なっている]のtips
const satellite = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      各都道府県で使用している介護給付費等の算定に係る届出書類において、
      同一敷地内（近接地を含む）にある共同生活住居のこと。
    </p>
  </div>
);

// 事業所情報(生活介護)-[一体的な運営を行なっている]のtips
const satelliteSEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>下記要件を満たした場合、一体的な運営とみなされる</p>
    <ul className={classes.listStyleNone}>
      <li>【人員配置】</li>
      <li>
        一つの事業所としての人員配置のほか、直接サービス提供職員はそれぞれ事務所ごとに専従常勤職員を１以上配置していること
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【事業運営】</li>
      <li>
        <ul className={classes.listStyleNone}>
          <li>
            <span className={classes.listOrder}>①</span>
            <span className={classes.listContent}>
              利用申込みに係る調整、職員に対する技術指導等が一体的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>②</span>
            <span className={classes.listContent}>
              事業所間で相互支援の体制があること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>③</span>
            <span className={classes.listContent}>
              事業の目的や運営方針、営業日・営業時間、利用料等の運営規程が一本化されていること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>④</span>
            <span className={classes.listContent}>
              職員の勤務体制、勤務内容等の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑤</span>
            <span className={classes.listContent}>
              人事、給与・福利厚生、勤務条件等に関する職員の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑥</span>
            <span className={classes.listContent}>
              事務所間の会計管理が一元化されていること
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【地域的範囲】</li>
      <li>
        主たる事業所と従たる事業所が同一の日常生活圏域にあって、サービス管理責任者の業務遂行に支障の無い範囲（通常の移動手段により概ね30分以内で移動可能な範囲を目安とする）であること
      </li>
    </ul>
  </div>
);
// 事業所情報(就労定着支援)-[一体的な運営を行なっている]のtips
const satelliteSHUROTEICHAKU = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>下記要件を満たした場合、一体的な運営とみなされる</p>
    <ul className={classes.listStyleNone}>
      <li>【人員配置】</li>
      <li>
        一つの事業所としての人員配置のほか、直接サービス提供職員はそれぞれ事務所ごとに専従常勤職員を１以上配置していること
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【事業運営】</li>
      <li>
        <ul className={classes.listStyleNone}>
          <li>
            <span className={classes.listOrder}>①</span>
            <span className={classes.listContent}>
              利用申込みに係る調整、職員に対する技術指導等が一体的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>②</span>
            <span className={classes.listContent}>
              事業所間で相互支援の体制があること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>③</span>
            <span className={classes.listContent}>
              事業の目的や運営方針、営業日・営業時間、利用料等の運営規程が一本化されていること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>④</span>
            <span className={classes.listContent}>
              職員の勤務体制、勤務内容等の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑤</span>
            <span className={classes.listContent}>
              人事、給与・福利厚生、勤務条件等に関する職員の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑥</span>
            <span className={classes.listContent}>
              事務所間の会計管理が一元化されていること
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【地域的範囲】</li>
      <li>
        主たる事業所と従たる事業所が同一の日常生活圏域にあって、サービス管理責任者の業務遂行に支障の無い範囲（通常の移動手段により概ね30分以内で移動可能な範囲を目安とする）であること
      </li>
    </ul>
  </div>
);

// 事業所情報-[主従たる事業所]のtips
const masterSubordinate = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>下記要件を満たした場合、一体的な運営とみなされる</p>
    <ul className={classes.listStyleNone}>
      <li>【人員配置】</li>
      <li>
        一つの事業所としての人員配置のほか、直接サービス提供職員はそれぞれ事務所ごとに専従常勤職員を１以上配置していること
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【事業運営】</li>
      <li>
        <ul className={classes.listStyleNone}>
          <li>
            <span className={classes.listOrder}>①</span>
            <span className={classes.listContent}>
              利用申込みに係る調整、職員に対する技術指導等が一体的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>②</span>
            <span className={classes.listContent}>
              事業所間で相互支援の体制があること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>③</span>
            <span className={classes.listContent}>
              事業の目的や運営方針、営業日・営業時間、利用料等の運営規程が一本化されていること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>④</span>
            <span className={classes.listContent}>
              職員の勤務体制、勤務内容等の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑤</span>
            <span className={classes.listContent}>
              人事、給与・福利厚生、勤務条件等に関する職員の管理方法が一元的であること
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>⑥</span>
            <span className={classes.listContent}>
              事務所間の会計管理が一元化されていること
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>【地域的範囲】</li>
      <li>
        主たる事業所と従たる事業所が同一の日常生活圏域にあって、サービス管理責任者の業務遂行に支障の無い範囲（通常の移動手段により概ね30分以内で移動可能な範囲を目安とする）であること
      </li>
    </ul>
  </div>
);

// 事業所情報-[夜勤職員の欠員]のtips
const lackOfNightShiftStaff = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>夜勤職員欠員の減算について</p>
    <ul className={classes.listStyleNone}>
      <li>【減算の適応月と単位】</li>
      <p className={classes.notMarginTop}>
        次のいずれかの場合に、その翌月に利用者全員につき本体報酬を95%（5%減算）に減算する。
      </p>
      <li className={classes.textIndentNonMargin}>
        ・夜勤時間帯において、基準を満たさない状態が連続2日以上発生
      </li>
      <li className={classes.textIndentNonMargin}>
        ・夜勤時間帯において、基準を満たさない状態が4日以上発生（夜勤時間帯：22時から翌5時までを含む連続16時間をいい、施設ごとに設定する。）
      </li>
    </ul>
  </div>
);

// 事業所情報-[従業員の欠員]のtips
const lackOfSupporter = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>従業員の欠員の減算について</p>
    <p className={classes.textIndentMarginTop}>【減算の適応月】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えている場合は翌月から
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えていない場合は翌々月から
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>【減算単位】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応1ヶ月〜2ヶ月目は所定単位の70%(30%減算)
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応3ヶ月目以降は所定単位の50%(50%減算)
        </p>
      </li>
    </ul>
  </div>
);

// 事業所情報-[就労定着支援員等の欠員]のtips
const lackOfLifeSupportMemberSHUROTEICHAKU = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>就労定着支援員等の欠員の減算について</p>
    <p className={classes.textIndentMarginTop}>【減算の適応月】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えている場合は翌月から
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えていない場合は翌々月から
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>【減算単位】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応1ヶ月〜2ヶ月目は所定単位の70%(30%減算)
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応3ヶ月目以降は所定単位の50%(50%減算)
        </p>
      </li>
    </ul>
  </div>
);

// 事業所情報-[刻む単位]のtips
const unitEngrave = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>作業時間を記録する際の打刻単位を設定します。</p>
    <p className={classes.textIndent}>
      例）刻む単位を15分に設定した場合：10:03に通所した場合、作業開始時間が10:15に設定されます。
    </p>
  </div>
);

// 事業所情報-[利用者数]のtips
const numberOfUsers = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>利用者数について</p>
    <p>
      自治体への申請時に申告した利用者数。
      <br />
      算出の方法は以下の通り。
    </p>
    <p className={classes.textIndentMarginTop}>【新設等から6か月未満】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・便宜上、過去3年間で一体的に運営する就労移行支援事業所等を受けた後に就労し、就労を継続している期間が6ヶ月に達した者の数の70％を利用者数とする。
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>
      【新設等から6か月以上1年未満】
    </p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・新設等から6か月間における延べ利用者数を6で割った数とする。
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>【新設等から1年以上経過】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・前年1年間における延べ利用者数を12で割った数とする。
        </p>
      </li>
    </ul>
  </div>
);

// 事業所情報-[作業時間を自動的に入力する利用者]のtips
const userAutomaticallyWorkTime = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      ここで設定した作業時間を、利用実績の編集画面で自動的に入力させたい利用者を選択してください。&nbsp;
    </p>
  </div>
);

// 事業所情報-[生活支援員等欠員]のtips
const lackOfLifeSupportMember = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>生活支援員等の欠員の減算について</p>
    <p className={classes.textIndentMarginTop}>【減算の適応月】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えている場合は翌月から
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・欠員が1割を超えていない場合は翌々月から
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>【減算単位】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応1ヶ月〜2ヶ月目は所定単位の70%(30%減算)
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応3ヶ月目以降は所定単位の50%(50%減算)
        </p>
      </li>
    </ul>
  </div>
);

// 事業所情報-[サービス管理責任者の欠員]のtips
const lackOfResponsiblePerson = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>サービス管理責任者の欠員の減算について</p>
    <p className={classes.textIndentMarginTop}>【減算の適応月】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・人員基準を満たしていない場合は翌々月から
        </p>
      </li>
    </ul>
    <p className={classes.textIndentMarginTop}>【減算単位】</p>
    <ul className={`${classes.listStyleNone} ${classes.notMarginTop}`}>
      <li className={`${classes.list} ${classes.notMarginTop}`}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応1ヶ月〜4ヶ月目は所定単位の70%(30%減算)
        </p>
      </li>
      <li className={classes.list}>
        <p className={classes.textIndentNonMargin}>
          ・減算適応5ヶ月目以降は所定単位の50%(50%減算)
        </p>
      </li>
    </ul>
  </div>
);

// 事業所情報-[職場適応援助者養成研修修了者配置体制加算]のtips
const workPlaceAdaptationAssistant = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>職場適応援助者とは、</p>
    <p className={classes.notMarginTop}>
      障害者が職場に適応するために、障害者本人の他、家族や職場の事業主、上司、同僚に対して必要な援助を行う援助者のこと。
    </p>
    <p className={classes.notMarginTop}>
      この業務に必要なスキルを習得するために、（独）高齢・障害・求職者雇用支援機構と厚生労働大臣が指定する民間の養成研修機関において実施している「職場適応援助者養成研修」を修了した者が加算の対象となる。
    </p>
  </div>
);

// 事業所情報-[福祉専門職員配置等加算]のtips
const welfareCondition = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>福祉専門職員とは、</p>
    <p>
      社会福祉士、介護福祉士、精神保健福祉士または公認心理師の資格を保有し、常勤で配置される従業員のこと。
    </p>
    <p className={classes.textIndent}>
      ※ 就労移行支援施設の場合は、作業療法士も含まれる。
    </p>
    <ul className={classes.list}>
      <li>(Ⅰ)：福祉専門職員の割合が35％以上</li>
      <li>(Ⅱ)：福祉専門職員の割合が25％以上</li>
      <li>
        (Ⅲ)：次の(1)又は(2)のいずれかに該当する場合に加算する。
        <ul className={classes.list}>
          <li>
            <span className={classes.listOrder}>(1)</span>
            <span className={classes.listContent}>
              職業指導員等として配置されている従業者のうち、常勤で配置されている従業者の割合が75%以上であること。
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>(2)</span>
            <span className={classes.listContent}>
              職業指導員等として常勤で配置されている従業者のうち、3年以上従事している従業者の割合が30%以上であること。
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

// 事業所情報（生活介護）-[福祉専門職員配置等加算]のtips
const welfareConditionSEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>福祉専門職員とは、</p>
    <p>
      社会福祉士、介護福祉士、精神保健福祉士または公認心理師の資格を保有し、生活支援等として常勤で配置される従業員のこと。
    </p>
    <ul className={classes.list}>
      <li>(Ⅰ)：福祉専門職員の割合が35％以上</li>
      <li>(Ⅱ)：福祉専門職員の割合が25％以上</li>
      <li>
        (Ⅲ)：次の(1)又は(2)のいずれかに該当する場合に加算する。
        <ul className={classes.list}>
          <li>
            <span className={classes.listOrder}>(1)</span>
            <span className={classes.listContent}>
              職業指導員等として配置されている従業者のうち、常勤で配置されている従業者の割合が75%以上であること。
            </span>
          </li>
          <li>
            <span className={classes.listOrder}>(2)</span>
            <span className={classes.listContent}>
              職業指導員等として常勤で配置されている従業者のうち、3年以上従事している従業者の割合が30%以上であること。
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

// 事業所情報(生活介護)-[常勤看護職員等配置加算]のtips
const fullTimeNursePlace = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p className={classes.textIndent}>
      (Ⅰ)：看護職員を常勤換算方法で１人以上配置しているものとして都道府県知事又は市町村長に届け出た事業所が、利用者に対して指定のサービスを行った場合に算定される加算。
    </p>
    <p className={classes.textIndent}>
      (Ⅱ)：看護職員を常勤換算方法で２人以上配置しているものとして都道府県知事又は市町村長に届け出た事業所が、別に厚生労働大臣が定める利用者に対して指定のサービスを行った場合に算定される加算。
    </p>
  </div>
);

// 事業所情報-[福祉・介護職員処遇改善加算]のtips
const staffTreatment = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      厚生労働大臣が定める基準に適合している福祉・介護職員の賃金の改善等を実施しているものとして、都道府県知事に届け出た事業所が、利用者に対して、サービスを行った場合に算定される加算。
    </p>
  </div>
);

// 事業所情報(生活介護)-[福祉・介護職員処遇改善加算]のtips
const staffTreatmentSEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      キャリアパス要件・職場環境等要件について厚生労働大臣が定める基準に適合している福祉・介護職員の賃金の改善等を実施しているものとして、都道府県知事に届け出た事業所が、利用者に対してサービスを行った場合に算定される加算。
    </p>
  </div>
);

// 事業所情報(A/B)-[重度者支援体制加算]のtips
const severeSupportType = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      前年度の障害基礎年金1級を受給する利用者の数が、当該年度における指定就労継続支援A型等の利用者数が規定の割合以上の場合に加算対象となる。
    </p>
    <ul className={classes.list}>
      <li>(Ⅰ)：前年度において当該年度における利用者数が50%以上</li>
      <li> (Ⅱ)：前年度において当該年度における利用者数が25%以上</li>
    </ul>
  </div>
);

// 事業所情報(A/B)-[精神障害者退院支援施設加算]のtips
const dischargeSupportFacilityType = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      精神障害者退院支援施設である指定就労移行支援事業所において、精神病床におおむね1年以上入院していた精神障害者その他これに準ずる精神障害者に対して、居住の場を提供した場合に算定する。
    </p>
    <ul className={classes.list}>
      <li>(Ⅰ)：夜勤体制を確保している</li>
      <li>(Ⅱ)：宿直体制を確保している</li>
    </ul>
  </div>
);

// 事業所情報-[福祉・介護職員処遇改善加算]のtips
const staffTreatmentSystemType = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      キャリアパス要件・職場環境等要件について厚生労働大臣が定める基準に適合している福祉・介護職員の賃金の改善等を実施しているものとして、都道府県知事に届け出た事業所が、利用者に対してサービスを行った場合に算定される加算。
    </p>
  </div>
);

// 事業所情報-[看護職員・医療連携に関する加算]のtips
const ursingStaffPlacement = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p className={classes.textIndent}>
      ※看護職員：保健師、看護師、准看護師など看護資格を有する人を指す。
    </p>
    <p className={classes.textIndent}>
      ・看護職員配置加算は上記看護職員を常勤換算方法で1以上かつ利用者の数を20で割った数以上配置する必要がある。また日常的な利用者の健康管理、看護の提供、喀痰吸引等に係る指導、医療機関との連絡等を行う。
    </p>
    <p className={classes.textIndent}>
      ・医療連携体制加算(Ⅴ)は看護師を配置、または訪問看護スタッフとの契約により看護師を確保されている必要がある。看護師により24時間連絡できる体制を確保し、日常的な健康管理、医療ニーズが必要となった場合に適切な対応がとれる体制を指す。
    </p>
  </div>
);

// 事業所情報-[夜間支援体制加算]のtips
const nightSupport = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>夜間支援体制加算毎の条件は</p>
    <ul className={classes.list}>
      <li>
        (Ⅰ)：夜間支援従事者を配置し、就寝準備の確認、寝返りや排泄などの支援を行う。
      </li>
      <li>(Ⅱ)：夜間支援従事者を配置する。</li>
      <li>(Ⅲ)：夜間防災体制、または常時の連絡体制を確保している。</li>
    </ul>
  </div>
);

// 事業所情報-[看護職員・医療連携に関する加算]のtips
const commuterLifeSupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      利用者の自活に向けた支援の質の向上を図るため、主に日中において職場での対人関係の調整や相談・援助、金銭管理の指導等、日常生活上の支援を行うこと。
    </p>
    <p>
      一般就労している利用者が50％以上を占める場合に、利用者全員につき日ごとに算定可能。
    </p>
  </div>
);

// 事業所情報(生活介護)-[上記処遇改善を指定障害者支援施設において実施]のtips
const specifiedDisabilitySupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <ul className={classes.listStyleNone}>
      <li>指定障害者支援施設とは、</li>
      <li>
        障害者の日常生活及び社会生活を総合的に支援するための法律により「障害者につき、施設入所支援を行うとともに、施設入所支援以外の施設障害福祉サービスを行う施設」と規定されている施設である。具体的には、障害者に対し、夜間から早朝にかけては「施設入所支援」を提供するとともに、昼間は「生活介護」などの「日中活動系サービス（昼間実施サービス）」を行う、社会福祉施設である。
      </li>
    </ul>
  </div>
);

// 事業所情報-[上記処遇改善を指定障害者支援施設において実施]のtips
const specifiedDisabedSupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <ul className={classes.listStyleNone}>
      <li>指定障害者支援施設とは、</li>
      <li>
        障害者の日常生活及び社会生活を総合的に支援するための法律により「障害者につき、施設入所支援を行うとともに、施設入所支援以外の施設障害福祉サービスを行う施設」と規定されている施設である。
      </li>
      <li>
        具体的には、障害者に対し、夜間から早朝にかけては「施設入所支援」を提供するとともに、昼間は「生活介護」などの「日中活動系サービス（昼間実施サービス）」を行う、社会福祉施設である。
      </li>
    </ul>
  </div>
);

// 事業所情報-[視覚・聴覚言語障害者支援体制加算]のtips
const visualAuditoryLanguageDisabledPeopleSupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>視覚障害者等との意思疎通に専門性を有する職員を一定数加配すること。 </p>
    <p>
      視覚、聴覚、言語障害のある利用者が全利用者の30％以上を占めている場合に、利用者全員につき日ごとに算定可能。&nbsp;
    </p>
  </div>
);

// 事業所情報-[視覚・聴覚言語障害者支援体制加算]のtips
const visualAuditoryLanguageDisabledPeopleSupportSEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      視覚、聴覚、言語障害のある者が全利用者の原則30％以上を占めており、それらの利用者との意思疎通に関する生活支援員を一定数配置した場合、利用者全員につき日ごとに算定される加算。
    </p>
  </div>
);

// 事業所情報-[視覚・聴覚言語障害者支援体制加算]のtips
const seeHearTeam = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      視覚、聴覚、言語障害のある者が全利用者の原則30％以上を占めており、それらの利用者との意思疎通に関する生活支援員を一定数配置した場合、利用者全員につき日ごとに算定される加算。
    </p>
  </div>
);

// 利用者情報-[障害区分]のtips
const disability = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      障害の多様な特性その他の心身の状態に応じて必要とされる標準的な支援の度合いを総合的に示すもので、受給者証に記載されている。
    </p>
  </div>
);

// 生活介護用_利用者情報-[障害区分]のtips
const disabilitySEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      市町村により認定された、障害の多様な特性その他の心身の状態に応じて必要とされる標準的な支援の度合いを総合的に示すもので、受給者証に記載されている。
    </p>
  </div>
);

// 利用者情報-[自治体助成金対象]のtips
const subsidized = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      請求給付金の「総費用額の１割」と「上限額」のどちらか低い金額が利用者負担額となるところを、「総費用額の〇〇%」、又は「総費用額の〇〇円」と「上限額」のどちらか低い金額の負担で済むように、本来の利用者負担額と軽減後の負担額の差額を、市区町村が助成する。
    </p>
    <p className={classes.textIndent}>
      ※自治体助成金制度があるかどうかは各市区町村にお問い合わせください。
    </p>
  </div>
);

// 利用者情報-[地域生活移行個別支援特別加算]のtips
const localLifeSupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      医療観察法に基づく通院決定を受けてから3年を経過していない者、または矯正施設等を退所等してから3年を経過していない者等で、保護観察所等との調整により利用を開始した者が算定対象。
    </p>
    <p>
      事業所として、社会福祉士、精神保健福祉士、または公認心理師を配置し、該当有資格者による指導体制を整える必要がある。
    </p>
  </div>
);

// 利用者情報-[強度行動障害者地域移行特別加算]のtips
const intensitySpecialAddition = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>強度行動障害を有する者に対し算定可能な加算。</p>
    <p>
      事業所として、強度行動障害支援者養成研修、または行動援護従業者養成研修を修了したサービス管理責任者、または生活支援員を1名以上配置必要。
    </p>
  </div>
);

// 利用者情報-[サービス提供開始日]のtips
const inServiceStartDate = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>利用者が施設に通所することが決定し、正式に契約を結んだ日のこと。</p>
  </div>
);

// 利用者情報-[支給決定開始日]のtips
const payStartDate = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      障害者に対し、各市区町村が決定した支援費を支給する期間のこと。利用者の受給者証に記載されているため、参照してください。
    </p>
  </div>
);

// 利用者情報-[作業時間を自動的に入力する]のtips
const defRecordWork = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      事業所情報画面で設定された作業時間が、利用実績の編集画面で自動的に入力されます。
    </p>
  </div>
);

// 利用者情報-[重度障害者支援の個別支援対象者である]のtips
const severeDisabilitySupport = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <ul className={classes.listStyleNone}>
      <li>・対象者とは：</li>
      <li>
        行動関連項目10点以上の利用者（強度行動障害を有する者）で、支援計画シートなどに基づき、指定研修（※）を修了した職員より個別支援を受ける利用者のことを指す。
      </li>
    </ul>
    <p>
      （※）指定研修とは、強度行動障害支援者養成研修（基礎研修）、重度訪問介護従業者養成研修行動障害支援課程、行動援護従業者養成研修
    </p>
    <ul className={classes.listStyleNone}>
      <li>・加算算定開始日とは：</li>
      <li>
        「個別の支援の評価」の算定を開始した日で、入所開始日ではない。加算算定開始日から90日以内の期間について、さらに加算される。
      </li>
    </ul>
  </div>
);

// 事業所情報-[重度障害者支援加算]のtips
const seriousDisability = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <ul className={classes.listStyleNone}>
      <li>重度障害者支援加算（Ⅰ）</li>
      <li className={classes.notFontWeight}>
        医師意見書により特別な治療が必要であるとされる者又はこれに準ずる者の割合が100分の20以上であって、人員基準に加え看護職員又は生活支援員を常勤換算１以上配置している場合
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>重度障害者支援加算（Ⅰ）（重度）</li>
      <li className={classes.notFontWeight}>
        （Ⅰ）を算定している事業所で、区分6かつ気管切開を伴う人工呼吸器による呼吸管理が必要な者、又は重症心身障がい者が2人以上利用している場合
      </li>
    </ul>
    <ul className={classes.listStyleNone}>
      <li>重度障害者支援加算（Ⅱ）</li>
      <li className={classes.notFontWeight}>
        所定の研修修了者が、強度行動障害を有する者に対して（障害者支援施設においては夜間に）個別の支援を行った場合
      </li>
    </ul>
  </div>
);

// 初期設定情報(短期入所)-[短期利用加算の算定開始日]のtips
const calculationStartDate = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      年間上限３０日の短期利用加算の算定回数が最後にリセットされた（ゼロになった）日。算定回数を含む本施設の利用が一度もない場合は空欄。また初回請求月以降の場合も空欄。
    </p>
  </div>
);

// 初期設定情報(短期入所)-[短期利用加算の算定開始日]のtips
const calculationCounts = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      左記の算定開始日から、初回請求月の前月末までに短期利用加算を算定した回数（日数）を30以下で入力。他施設での算定は含めない。
    </p>
  </div>
);

// 事業所情報(生活介護)-[送迎加算(重度)]のtips
const severeTransportationAdditionSEIKATSUKAIGO = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      送迎を利用する利用者のうち、以下を準ずる者が60%以上いる場合、送迎を利用する全員に加算が適応される。
    </p>
    <p className={classes.textIndent}>・障害支援区分が5と6</p>
    <p className={classes.textIndent}>・一定以上の行動障害を有する者</p>
    <p className={classes.textIndent}>・たんの吸引などを必要とする者</p>
  </div>
);

// 振り返り-本人の評価のtips
const selfEvaluation = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      利用者本人の自分自身に対する主観的な評価・振り返りを入力してください。職員からの客観的な評価と比較して、より分かりやすく振り返ることができます。
    </p>
  </div>
);

// 振り返り-職員からの評価のtips
const staffEvaluation = ({
  classes
}: WithStyles<typeof styles>): JSX.Element => (
  <div className={classes.message}>
    <p>
      職員から見た利用者に対する客観的な評価・振り返りを入力してください。利用者本人の主観的な評価と比較して、次の支援に活かすことができます。
    </p>
  </div>
);

const HelpMessages = {
  officeNumber,
  numberOfUsers,
  satelliteTypeFlag: satellite,
  satelliteTypeFlagSEIKATSUKAIGO: satelliteSEIKATSUKAIGO,
  satelliteTypeFlagSHUROTEICHAKU: satelliteSHUROTEICHAKU,
  masterSubordinateFlag: masterSubordinate,
  welfareSpecialistPlacementType: welfareCondition,
  welfareSpecialistPlacementTypeSEIKATSUKAIGO: welfareConditionSEIKATSUKAIGO,
  fullTimeNursePlacementType: fullTimeNursePlace,
  staffTreatmentSystemType: staffTreatment,
  staffTreatmentSystemTypeSEIKATSUKAIGO: staffTreatmentSEIKATSUKAIGO,
  severeSupportTypeFlag: severeSupportType,
  dischargeSupportFacilityTypeFlag: dischargeSupportFacilityType,
  staffTreatmentSystem: staffTreatmentSystemType,
  nursingStaffPlacementSystemFlag: ursingStaffPlacement,
  nightSupportFlag: nightSupport,
  commuterLifeSupportFlag: commuterLifeSupport,
  commuterLifeSupportFlagSEIKATSUKAIGO: specifiedDisabilitySupport,
  specifiedDisabedSupportFlag: specifiedDisabedSupport,
  user_automatically: userAutomaticallyWorkTime,
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: visualAuditoryLanguageDisabledPeopleSupport,
  visualAuditoryLanguageDisabledPeopleSupportSystemFlagSEIKATSUKAIGO: visualAuditoryLanguageDisabledPeopleSupportSEIKATSUKAIGO,
  seeHearTeamFlag: seeHearTeam,
  disability_class: disability,
  disability_class_SEIKATSUKAIGO: disabilitySEIKATSUKAIGO,
  subsidized_flg: subsidized,
  localLifeSpecialAddition: localLifeSupport,
  intensityBehavioralSpecialAddition: intensitySpecialAddition,
  lackOfSupporterFlag: lackOfSupporter,
  lackOfNightShiftStaffFlag: lackOfNightShiftStaff,
  lackOfLifeSupportMemberFlagSHUROTEICHAKU: lackOfLifeSupportMemberSHUROTEICHAKU,
  unitEngraveFlag: unitEngrave,
  lackOfLifeSupportMemberFlag: lackOfLifeSupportMember,
  lackOfResponsiblePersonFlag: lackOfResponsiblePerson,
  workPlaceAdaptationAssistantFlag: workPlaceAdaptationAssistant,
  in_service_start_date: inServiceStartDate,
  pay_start_date: payStartDate,
  def_record_work: defRecordWork,
  severeDisabilitySupportFlag: severeDisabilitySupport,
  seriousDisabilityFlag: seriousDisability,
  calculationStartDateFlg: calculationStartDate,
  calculationCountsFlg: calculationCounts,
  seriousSupporterFlg: severeTransportationAdditionSEIKATSUKAIGO,
  selfEvaluation,
  staffEvaluation
};

const HelpTipMessages: React.FunctionComponent<Props> = ({ name, classes }) => {
  const HelpComponent = HelpMessages[name];
  return <HelpComponent classes={classes} />;
};

export default withStyles(styles)(HelpTipMessages);
