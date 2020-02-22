import { chatbot } from "../actionTypes";

export function list(content) {
  return async function(dispatch) {
    var {  } = content;
    

    dispatch({
      type: chatbot.LIST,
      payload: {
        
      }
    });
  };
}
