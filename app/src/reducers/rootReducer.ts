const initialState = {
  products: [],
};

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'FIND_ALL_PRODUCTS':
      console.log('action.payload');
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
