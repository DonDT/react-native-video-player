const initialState = {
  LolIndexes: [],
};

const videoIndexs = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_ID':
      return {
        ...state,
        LolIndexes: state.LolIndexes.includes(action.payload)
          ? [...state.LolIndexes]
          : [...state.LolIndexes, action.payload],
      };
    case 'RESET_IDs':
      return {
        LolIndexes: state.LolIndexes.length === 8 ? [] : [...state.LolIndexes],
      };

    default:
      return state;
  }
};

export default videoIndexs;
