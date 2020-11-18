import { SERVICE_STATUS } from "@constants/variables";

export const isDispInOutTime = (status: number) => {
  return ![
    SERVICE_STATUS[0][`value`],
    SERVICE_STATUS[4][`value`],
    SERVICE_STATUS[6][`value`],
    SERVICE_STATUS[9][`value`]
  ].includes(status);
};
