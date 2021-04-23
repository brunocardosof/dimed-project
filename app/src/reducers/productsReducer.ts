import {
  DECREMENT_QUANTITY,
  FIND_ALL_PRODUCTS,
  FIND_ITEM_BY_ID,
  INCREMENT_QUANTITY,
} from '../actions/productActions/types';

const initialState = {
  products: [],
  fullDataProducts: [],
  quantity: 1,
  totalPrice: 0,
  price: 0,
};

export const productsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FIND_ALL_PRODUCTS:
      return {
        ...state,
        products: action.data,
        fullDataProducts: action.data,
      };
    case FIND_ITEM_BY_ID:
      return {
        ...state,
        product: action.data,
        totalPrice: action.totalPrice,
        price: action.totalPrice,
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        quantity: action.data,
        totalPrice: state.totalPrice + state.price,
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        quantity: action.data,
        totalPrice: state.totalPrice - state.price,
      };
    default:
      return state;
  }
};
