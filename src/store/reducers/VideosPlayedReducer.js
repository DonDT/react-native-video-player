const initialState = {
  Indexes: [],
};

const videoIndexs = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_INDEX':
      return {
        ...state,
        Indexes: state.Indexes.includes(action.payload)
          ? [...state.Indexes]
          : [...state.Indexes, action.payload],
      };
    case 'RESET_INDEX':
      return {
        Indexes: state.Indexes.length === 9 ? [] : [...state.Indexes],
      };

    default:
      return state;
  }
};

export default videoIndexs;
