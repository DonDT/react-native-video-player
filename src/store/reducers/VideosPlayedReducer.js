const initialState = {
  Indexes: [],
  CompleteIndexArray: [],
};

const videoIndexs = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_INDEX':
      return {
        ...state,
        Indexes: state.Indexes.includes(action.payload)
          ? [...state.Indexes]
          : [...state.Indexes, action.payload],
        Indexes:
          state.CompleteIndexArray.length === 9 ||
          action.payload === 'BgZh5T4nG_w'
            ? []
            : state.Indexes.includes(action.payload)
            ? [...state.Indexes]
            : [...state.Indexes, action.payload],
      };
    case 'RESET_INDEX':
      return {
        //Indexes: [],
        Indexes: state.Indexes.length === 9 ? [] : [...state.Indexes],
        CompleteIndexArray:
          state.Indexes.length === 9 ? [...state.Indexes] : [],
      };
    case 'ORIGINAL_LIST':
      return {
        Indexes: [],
      };

    default:
      return state;
  }
};

export default videoIndexs;
