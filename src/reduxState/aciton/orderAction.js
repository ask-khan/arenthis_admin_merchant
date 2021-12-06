import instance from "../../Config/axios";
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

import { setAlert } from "./AlertAction";

//****************************************** Get Order ***********************************/

const GetOrderAction = (query) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const { data } = await instance.post(`/api/orders`, query);

    dispatch({ type: GET_ORDERS_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAIL, payload: error.response });
  }
};

const GetOrderByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_BY_ID_REQUEST });
    const { data } = await instance.get(`/api/orders/${id}`);

    dispatch({
      type: GET_ORDERS_BY_ID_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({ type: GET_ORDERS_BY_ID_FAIL, payload: error.response.data });
  }
};

const verifyOrderAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_ORDER_REQUEST });
    const { data } = await instance.put(`/api/orders/verify-order/${orderId}`);

    dispatch({
      type: VERIFY_ORDER_SUCCESS,
      payload: data,
      success: true,
    });

    setAlert("Good job!", "Order status Verified!", "success");
  } catch (error) {
    dispatch({ type: VERIFY_ORDER_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data ? error.response.data.error : "Something went wrong", "error");
  }
};

const completeOrderAction = (orderId, toutId) => async (dispatch) => {
  try {
    dispatch({ type: COMPLETE_ORDER_REQUEST });
    const { data } = await instance.put(`/api/orders/complete/${orderId}/${toutId}`);

    dispatch({
      type: COMPLETE_ORDER_SUCCESS,
      payload: data,
      success: true,
    });
    setAlert("Good job!", "Order status Complete!", "success");
  } catch (error) {
    dispatch({ type: COMPLETE_ORDER_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data ? error.response.data.error : "Something went wrong", "error");
  }
};

const returnOrderAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: RETURN_ORDER_REQUEST });
    const { data } = await instance.put(`/api/orders/return/${orderId}`);

    dispatch({
      type: RETURN_ORDER_SUCCESS,
      payload: data,
      success: true,
    });
    setAlert("Good job!", "Order status Return!", "success");
  } catch (error) {
    dispatch({ type: RETURN_ORDER_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data.error, "error");
  }
};

const cancelOrderAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    const { data } = await instance.put(`/api/orders/cancel/${orderId}`);

    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
      success: true,
    });
    setAlert("Good job!", "Order status Cancel!", "success");
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data ? error.response.data.error : "Something went wrong", "error");
  }
};

const returnProdcutAction = (orderId, toutId, returnRemarks) => async (dispatch) => {
  try {
    const query = {
      orderProductStatus: "return",
      returnRemarks,
    };

    dispatch({ type: RETURN_ORDER_PRODUCTS_REQUEST });
    const { data } = await instance.put(`/api/orders/status/${orderId}/${toutId}`, query);

    dispatch({
      type: RETURN_ORDER_PRODUCTS_SUCCESS,
      payload: data,
      success: true,
    });
    setAlert("Good job!", "Product status Return!", "success");
  } catch (error) {
    dispatch({ type: RETURN_ORDER_PRODUCTS_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data ? error.response.data.error : "Something went wrong", "error");
  }
};

const clashProdcutAction = (orderId, toutId, clashRemarks) => async (dispatch) => {
  try {
    const query = {
      clashRemarks,
    };

    dispatch({ type: CLASH_ORDER_PRODUCTS_REQUEST });
    const { data } = await instance.put(`/api/orders/clash/${orderId}/${toutId}`, query);

    dispatch({
      type: CLASH_ORDER_PRODUCTS_SUCCESS,
      payload: data,
      success: true,
    });
    setAlert("Good job!", "Product status Return!", "success");
  } catch (error) {
    dispatch({ type: CLASH_ORDER_PRODUCTS_FAIL, payload: error.response.data });
    setAlert("Oops!", error.response.data ? error.response.data.error : "Something went wrong", "error");
  }
};

export {
  GetOrderAction,
  GetOrderByIdAction,
  verifyOrderAction,
  completeOrderAction,
  returnOrderAction,
  cancelOrderAction,
  //   Products Order
  returnProdcutAction,
  clashProdcutAction,
};
