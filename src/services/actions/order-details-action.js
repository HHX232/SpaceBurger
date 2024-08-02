export const ORDER_DETAILS_OPEN = "ORDER_DETAILS_OPEN";
export const ORDER_DETAILS_CLOSE = "ORDER_DETAILS_CLOSE";

export const openOrderDetails = () => ({
  type: ORDER_DETAILS_OPEN
});

export const closeOrderDetails = () => ({
  type: ORDER_DETAILS_CLOSE
});