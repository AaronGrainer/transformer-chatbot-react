import { chatbot } from "../actionTypes"

const initialState = {
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case chatbot.LIST: {
      const {  } = action.payload;
      
      return { ...state };
    }
    default:
      return state;
  }
}