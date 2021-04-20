import api from '../services/axios';

export const findAllProducts = () => {
  return (dispatch: any) => {
    api.get('/api/items').then(({data}) => {
      dispatch({type: 'FIND_ALL_PRODUCTS', payload: data.payload});
    });
  };
};
