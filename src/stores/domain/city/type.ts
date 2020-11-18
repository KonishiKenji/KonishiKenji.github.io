export interface CheckParams {
  token: string | null;
}

export interface CityParams {
  prefectureName: string;
}

/**
 * /mgr/city/{name} の結果
 */
export interface CityState {
  label: string;
  value: number;
  cityCode: string;
  grade: number;
}
