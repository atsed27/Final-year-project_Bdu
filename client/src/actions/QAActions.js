import * as QaApi from "../api/QARequests";

export const getAllQuestions = () => async (dispatch) => {
  dispatch({ type: "QUESTION_FETCH_START" });
  try {
    const { data } = await QaApi.getAllQuestions();
    console.log("all fetched questions are",data);
    dispatch({ type: "QUESTION_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "QUESTION_FETCH_FAIL" });
  }
};

export const getAllAnswers = () => async(dispatch) => {
  dispatch({ type: "ANSWER_FETCH_START" });
  try {
    const { data } = await QaApi.getAllAnswers();
    console.log("all fetched answers are",data);
    dispatch({ type: "ANSWER_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ANSWER_FETCH_FAIL" });
  }
};
