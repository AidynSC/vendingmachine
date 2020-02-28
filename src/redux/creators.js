import {TOTAL_MONEY, CHOOSE_PRODUCT, REFRESH_MACHINE} from "./actions";

export const TOTALMONEY = (money) => {
  return {
    type: TOTAL_MONEY,
    money
  }
};

export const CHOOSEPRODUCT = (order) => {
  return {
    type: CHOOSE_PRODUCT,
    order
  };
};

export const REFRESHMACHINE = () => {
  return {
    type: REFRESH_MACHINE,
  };
};
