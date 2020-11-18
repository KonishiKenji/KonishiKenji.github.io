import * as action from "@stores/domain/invoice/action";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";

import invoiceApi from "@api/requests/invoice";
import facilityApi from "@api/requests/facility";

const downloadable = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(action.downloadable.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await invoiceApi
    .getInvoicesDownloadbles()
    .then(res => {
      const data = res.data;
      dispatch(action.downloadable.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadable.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const history = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(action.history.started());
  dispatches.uiDispatch(dispatch).loading(true);

  await invoiceApi
    .getInvoicesHistory()
    .then(res => {
      const data = res.data;
      dispatch(action.history.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.history.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadJissekiCsv = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadJissekiCsv.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesJissekiCsv(year, month, user_ids)
    .then(res => {
      const data = res.data;
      dispatch(
        action.downloadJissekiCsv.done({
          result: {
            data,
            year,
            month
          }
        })
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadJissekiCsv.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadJissekiJson = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadJissekiJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesJissekiJson(year, month, user_ids)
    .then(res => {
      const data = res.data;
      dispatch(action.downloadJissekiJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadJissekiJson.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadSeikyuCsv = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadSeikyuCsv.started());
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesSeikyuCsv(year, month, user_ids)
    .then(res => {
      const data = res.data;
      dispatch(
        action.downloadSeikyuCsv.done({
          result: {
            data,
            year,
            month
          }
        })
      );
    })
    .catch(e => {
      dispatch(action.downloadSeikyuCsv.failed({ error: e }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

const downloadSeikyuJson = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadSeikyuJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesSeikyuJson(year, month, user_ids)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadSeikyuJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadSeikyuJson.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadCostAmountListJson = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadCostAmountListJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesUserCostAmountListJson(year, month, user_ids)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadCostAmountListJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(
        action.downloadCostAmountListJson.failed({ error: e.toString() })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadUplimitJson = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadUplimitJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const user_ids = excluded_user_ids.join(",");
  invoiceApi
    .getInvoicesUpLimitJson(year, month, user_ids)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadUplimitJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadUplimitJson.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadUplimitCsv = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[]
): Promise<void> => {
  dispatch(action.downloadUplimitCsv.started());
  const user_ids = excluded_user_ids.join(",");
  await invoiceApi
    .getInvoicesUpLimitCsv(year, month, user_ids)
    .then(res => {
      const data = res.data;
      dispatch(
        action.downloadUplimitCsv.done({
          result: {
            data,
            year,
            month
          }
        })
      );
    })
    .catch(e => {
      dispatch(action.downloadUplimitCsv.failed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

const downloadUserSeikyuJson = (dispatch: Dispatch) => async (
  dataKey: string
): Promise<void> => {
  dispatch(action.downloadUserSeikyuJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await invoiceApi
    .getInvoicesUserSeikyuJson(dataKey)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadUserSeikyuJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadUserSeikyuJson.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadUserReceiptJson = (dispatch: Dispatch) => async (
  dataKey: string
): Promise<void> => {
  dispatch(action.downloadUserReceiptJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await invoiceApi
    .getInvoicesUserReceiptJson(dataKey)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadUserReceiptJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.downloadUserReceiptJson.failed({ error: e.toString() }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const downloadUserAgencyReceiptJson = (dispatch: Dispatch) => async (
  dataKey: string
): Promise<void> => {
  dispatch(action.downloadUserAgencyReceiptJson.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await invoiceApi
    .getInvoicesUserAgencyReceiptJson(dataKey)
    .then(res => {
      const { data } = res.data;
      dispatch(action.downloadUserAgencyReceiptJson.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(
        action.downloadUserAgencyReceiptJson.failed({ error: e.toString() })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const getMultiFunctionalFacility = (dispatch: Dispatch) => async (): Promise<
  void
> => {
  dispatch(action.getMultiFunctionalFacility.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await facilityApi
    .getFacilityMultiFunctional()
    .then(res => {
      const { data } = res.data;
      dispatch(action.getMultiFunctionalFacility.done({ result: data }));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(
        action.getMultiFunctionalFacility.failed({ error: e.toString() })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

export default function(dispatch: Dispatch) {
  return {
    downloadable: downloadable(dispatch),
    history: history(dispatch),
    downloadJissekiCsv: downloadJissekiCsv(dispatch),
    downloadJissekiJson: downloadJissekiJson(dispatch),
    downloadSeikyuCsv: downloadSeikyuCsv(dispatch),
    downloadSeikyuJson: downloadSeikyuJson(dispatch),
    downloadCostAmountListJson: downloadCostAmountListJson(dispatch),
    downloadUplimitCsv: downloadUplimitCsv(dispatch),
    downloadUplimitJson: downloadUplimitJson(dispatch),
    downloadUserSeikyuJson: downloadUserSeikyuJson(dispatch),
    downloadUserReceiptJson: downloadUserReceiptJson(dispatch),
    downloadUserAgencyReceiptJson: downloadUserAgencyReceiptJson(dispatch),
    getMultiFunctionalFacility: getMultiFunctionalFacility(dispatch)
  };
}
