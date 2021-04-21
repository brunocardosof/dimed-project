const initialState = {
  products: [],
  fullDataProducts: [],
};

export default function rootReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'FIND_ALL_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        fullDataProducts: action.payload,
      };
    default:
      return state;
  }
}
