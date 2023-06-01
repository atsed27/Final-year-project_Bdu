const qaReducer = (
    state = {
      questions: null,
      answers: null,
      loading: false,
      error: false,
    },
    action
  ) => {
    switch (action.type) {
      // belongs to Discussion.jsx
     // case "FETCHING_CATEGORY_START":
     //   return { ...state.categories, loading: true, error: false };
     // case "FETCHING_CATEGORY_SUCCESS":
    //    return { ...state.categories, categories: action.data, loading: false, error: false };
    //  case "FETCHING_CATEGORY_FAIL":
    //    return { ...state.categories, loading: false, error: true };


      // belongs to DiscussioBox.jsx
      case "QUESTION_FETCH_START":
        return { ...state, loading: true, error: false };
      case "QUESTION_FETCH_SUCCESS":
        return { ...state, questions: action.data, loading: false, error: false };
      case "QUESTION_FETCH_FAIL":
        return { ...state, loading: false, error: true };
      // belongs to AnswerBox.jsx
      case "ANSWER_FETCH_START":
        return { ...state, loading: true, error: false}
      case "ANSWER_FETCH_SUCCESS":
        return { ...state, answers: action.data, loading: false, error: false };
      case "ANSWER_FETCH_FAIL":
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
  };
  
  export default qaReducer;
  