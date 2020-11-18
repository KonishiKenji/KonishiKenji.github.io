export interface ReportInterface {
  // 施設利用者id
  uif_id: number | undefined | null;
  // inoutのid
  inoutRecordsId: number | undefined | null;
  // 利用者名
  name: string | undefined;
  // 日付（日・曜日）
  target_date: string | undefined;
  // サービス提供状況
  status: number | undefined | null;
  // 開始時間
  inTime: string | undefined | null;
  // 終了時間
  outTime: string | undefined | null;
  // 送迎
  travelTime: string | undefined | null;
  // 同一敷地内(送迎)
  pickupPremises: string | undefined | null;
  // 訪問支援
  visitSupport: string | undefined | null;
  // 食事提供
  didGetFood: string | undefined | null;
  // 体験利用支援種別
  trialUsageKind: string | undefined | null;
  // 地域生活支援拠点
  lifeSupportHubInDistrictFlg: string | undefined | null;
  // 施設タイプ
  facilityType: string | undefined | null;
  // 休日フラグ
  is_holiday: boolean;
  // 備考
  memo: string | undefined | null;
  // 新規作成フラグ
  initialFlg: boolean | undefined;
  // 医療連携体制
  medicalCooperation: string | undefined | null;
  // 喀痰吸引等実施
  sputumImplementationFlg: string | undefined | null;
  // 社会生活支援
  helpSocialLifeFlg: string | undefined | null;
  // 短期滞在
  shortStayFlg: string | undefined | null;
  // 精神障害者退院支援
  supportForMentallyIllDischarge: string | undefined | null;
  // 特別地域加算
  specialAreaFlg: string | undefined | null;
}
