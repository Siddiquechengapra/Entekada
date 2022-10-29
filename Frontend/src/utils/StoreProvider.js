import React, { createContext, useReducer } from "react";
import logger from "use-reducer-logger";

const initialState = {
  cart: { cartItems: [] },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((x) => x._id === newItem._id);

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, action.payload];

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };

    case "REMOVE_FROM_CART":
      const itemToRemove = action.payload;
      const removedCart = state.cart.cartItems.filter(
        (item) => item._id !== itemToRemove._id
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: removedCart,
        },
      };

    default:
      return state;
  }
};

export const Store = createContext();

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(logger(reducer), initialState); //with logger
  // const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
