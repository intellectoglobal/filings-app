const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_REQUESTS":
      return {
        ...state,
        requests: state.requests.filter(
          (requests) => requests.req_id !== action.payload
        ),
      };
    case "FSDELETE_REQUESTS":
      return {
        ...state,
        requests: state.fsrequests.filter(
          (requests) => requests.id !== action.payload
        ),
      };
    case "ENQDELETE_REQUESTS":
      return {
        ...state,
        requests: state.enqrequests.filter(
          (requests) => requests.id !== action.payload
        ),
      };
    case "UPDATE_REQUESTS":
      return {
        ...state,
        requests: action.payload,
      };
    case "UPDATE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        sidebarState: action.payload,
      };
    case "CLOSE_SIDEBAR":
      return {
        ...state,
        sidebarState: action.payload,
      };
    case "LOGGED_IN":
      localStorage.setItem("isLogged", true);
      return {
        ...state,
        isLogged: true,
        
      };
    case "LOGGED_OUT":
      localStorage.removeItem("isLogged");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("apps");
      localStorage.removeItem("user_id");
      return {
        ...state,
        isLogged: false,
        currentUser: null,
        apps: [],
        loginState: [],
      };
    case "IS_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "APPS_ACCESS":
      localStorage.setItem("apps", JSON.stringify(action.payload));
      return {
        ...state,
        apps: action.payload,
      };
    case "CURRENT_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
      };
    case "JS_GETREQUEST":
      return {
        ...state,
        fsrequests: Array.isArray(action.payload) ? action.payload : [],
      };
    case "ENQ_GETREQUEST":
      return {
        ...state,
        enqrequests: action.payload,
      };
    case "HOME":
      return {
        ...state,
        home: action.payload,
      };
    case "CMD_GETREQUEST":
      return {
        ...state,
        cmdrequests: action.payload,
      };
    case "USER_ID":
      // return{
      //   ...state,
      //   user_id: action.payload,
      // }
      const userId = action.payload;
      localStorage.setItem("user_id", userId);
      return { ...state, user_id: userId };
    default:
      throw new Error("No action matched");
  }
};

export default reducer;
