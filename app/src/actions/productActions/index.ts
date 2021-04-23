import api from '../../services/axios';
import {
  DECREMENT_QUANTITY,
  FIND_ALL_PRODUCTS,
  FIND_ITEM_BY_ID,
  INCREMENT_QUANTITY,
} from './types';

export const findAllProducts = () => {
  return (dispatch: any) => {
    return api.get('/api/items').then(({data}) => {
      dispatch({type: FIND_ALL_PRODUCTS, data: data.payload});
    });
  };
};

export const findProductById = (id: number) => {
  return (dispatch: any) => {
    api.get(`/api/items/${id}`).then(({data}) => {
      const totalPrice =
        Object.keys(data.price).length === 1
          ? data.price.originalPrice
          : data.price.dealPrice;
      dispatch({type: FIND_ITEM_BY_ID, data, totalPrice, price: totalPrice});
    });
  };
};
export const incrementQuantityMethod = (quantity: number) => {
  return (dispatch: any) => {
    const incrementQuantity = quantity + 1;
    dispatch({type: INCREMENT_QUANTITY, data: incrementQuantity});
  };
};
export const decrementQuantityMethod = (quantity: number) => {
  return (dispatch: any) => {
    const decrementQuantity = quantity - 1;
    if (decrementQuantity === 0) {
      return false;
    }
    dispatch({type: DECREMENT_QUANTITY, data: decrementQuantity});
  };
};
