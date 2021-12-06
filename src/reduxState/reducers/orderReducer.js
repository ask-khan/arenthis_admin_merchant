import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_BY_ID_SUCCESS,
  GET_ORDERS_BY_ID_REQUEST,
  GET_ORDERS_BY_ID_FAIL,
  VERIFY_ORDER_REQUEST,
  VERIFY_ORDER_SUCCESS,
  VERIFY_ORDER_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_FAIL,
  RETURN_ORDER_SUCCESS,
  RETURN_ORDER_REQUEST,
  RETURN_ORDER_FAIL,
  COMPLETE_ORDER_SUCCESS,
  COMPLETE_ORDER_REQUEST,
  COMPLETE_ORDER_FAIL,
  RETURN_ORDER_PRODUCTS_SUCCESS,
  RETURN_ORDER_PRODUCTS_REQUEST,
  RETURN_ORDER_PRODUCTS_FAIL,
  CLASH_ORDER_PRODUCTS_SUCCESS,
  CLASH_ORDER_PRODUCTS_REQUEST,
  CLASH_ORDER_PRODUCTS_FAIL,
} from "../constants/orderConstant";
// ************************************ Get Order *************************************
function GetOrderReducer(state = { orders: {} }, action) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true, orders: {} };
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload, success: true };
    case GET_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ************************************ Get Order *************************************
function GetOrderByIdReducer(state = { order: {} }, action) {
  switch (action.type) {
    case GET_ORDERS_BY_ID_REQUEST:
      return { loading: true, orders: {} };
    case GET_ORDERS_BY_ID_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case GET_ORDERS_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
// ************************************ Verify Order *************************************
function verifyOrderReducer(state = { verifyOrders: {} }, action) {
  switch (action.type) {
    case VERIFY_ORDER_REQUEST:
      return { loading: true, verifyOrders: {} };
    case VERIFY_ORDER_SUCCESS:
      return { loading: false, verifyOrders: action.payload, success: true };
    case VERIFY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ************************************ complete  Order *************************************
function completeOrderReducer(state = { completeOrders: {} }, action) {
  switch (action.type) {
    case COMPLETE_ORDER_REQUEST:
      return { loading: true, completeOrders: {} };
    case COMPLETE_ORDER_SUCCESS:
      return {
        loading: false,
        completeOrders: action.payload,
        success: true,
      };
    case COMPLETE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
// ************************************ cancel  Order *************************************
function cancelOrderReducer(state = { cancelOrders: {} }, action) {
  switch (action.type) {
    case CANCEL_ORDER_REQUEST:
      return { loading: true, cancelOrders: {} };
    case CANCEL_ORDER_SUCCESS:
      return { loading: false, cancelOrders: action.payload, success: true };
    case CANCEL_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ************************************Return Order *************************************
function returnOrderReducer(state = { returnOrders: {} }, action) {
  switch (action.type) {
    case RETURN_ORDER_REQUEST:
      return { loading: true, returnOrders: {} };
    case RETURN_ORDER_SUCCESS:
      return { loading: false, returnOrders: action.payload, success: true };
    case RETURN_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ************************************Return Products Order *************************************
function returnProductsReducer(state = { returnProducts: {} }, action) {
  switch (action.type) {
    case RETURN_ORDER_PRODUCTS_REQUEST:
      return { loading: true, returnProducts: {} };
    case RETURN_ORDER_PRODUCTS_SUCCESS:
      return { loading: false, returnProducts: action.payload, success: true };
    case RETURN_ORDER_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ************************************Clash Products Order *************************************
function clashProductsReducer(state = { clashProducts: {} }, action) {
  switch (action.type) {
    case CLASH_ORDER_PRODUCTS_REQUEST:
      return { loading: true, clashProducts: {} };
    case CLASH_ORDER_PRODUCTS_SUCCESS:
      return { loading: false, clashProducts: action.payload, success: true };
    case CLASH_ORDER_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  GetOrderReducer,
  GetOrderByIdReducer,
  verifyOrderReducer,
  completeOrderReducer,
  cancelOrderReducer,
  returnOrderReducer,
  returnProductsReducer,
  clashProductsReducer,
};
