import React, { useRef, useState } from "react";
import "./QuestionBox.css";
import AnswerBox from "../AnswerBox/AnswerBox";
import { createAnswer } from "../../api/QARequests";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnswers} from "../../actions/QAActions";
import { Link } from "react-router-dom";

const Question = ({ question, answers }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [viewAnsClicked, setViewAnsClicked] = useState(false);
  const [giveAnsClicked, setGiveAnsClicked] = useState(false);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const ansValue = useRef();
  answers = answers?.filter((answer) => answer.questionId === question._id);

  const submitAnswer = async () => {
    const questionId = question._id
    const newAnswer = {
      answerText: ansValue.current.value,
      userId: user._id,
    };
    try {
      await createAnswer(questionId, newAnswer);
      dispatch(getAllAnswers());
      setGiveAnsClicked(()=>false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="eachQuestion">
      <div className="questionText">
        <div style={{ display: "flex" }}>
          <img
            src={
              publicFolder + question.questionOwnerData[0].profilePicture
                ? publicFolder + question.questionOwnerData[0].profilePicture
                : publicFolder + "defaultProfile.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.9rem" }}>
          <Link
              to={`/profile/${question?.questionOwnerData[0]._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <span title="click to go to user profile">@{question.questionOwnerData[0].username}</span>  
          </Link>
          </div>
          <div style={{paddingTop :".9rem", marginLeft:"10rem"}}>
            <span>Status: {answers?.length === 0 ? "pending" : "answered"}</span>
          </div>
          
        </div>
        <hr style={{ width: "100%", border: "0.1px solid 01ef" }} />
        <div style={{ paddingBottom: ".1rem" }}>
          <b> Category: </b>
          <i>{question.category}</i>
        </div>

        <div style={{ paddingBottom: "1rem" }}>
          <b>Title: </b>
          <i></i>
          {question.title}
        </div>

        <div style={{ fontSize: "1.3rem" }}>{question.questionText}</div>
      </div>
      <div className="answerButtons">
        <div>
          <button
            style={{
              padding: ".4rem",
              borderRadius: "12px",
              display: "flex",
            }}
            onClick={() =>
              answers?.length === 0
                ? window.alert("This question is not answered yet!!!")
                : setViewAnsClicked((viewAnsClicked) => !viewAnsClicked)
            }
            className={viewAnsClicked ? "" : "button"}
          >
            {viewAnsClicked ? "Hide Answers" : "Show Answers "}
            <div style={{ display: viewAnsClicked ? "none" : "flex" }}>
              ({answers?.length})
            </div>{" "}
          </button>
        </div>
        <div>
          <button
            style={{
              padding: ".4rem",
              borderRadius: "12px",
              background: giveAnsClicked ? "red" : "",
            }}
            onClick={() =>
              setGiveAnsClicked((giveAnsClicked) => !giveAnsClicked)
            }
            className={giveAnsClicked ? "" : "button"}
          >
            {giveAnsClicked ? "X close" : "Give Answer "}
          </button>
        </div>
      </div>
      <div
        style={{ display: giveAnsClicked ? "flex" : "none", marginTop: "1rem" }}
        className="giveAnswer"
      >
        <div className="answerTextArea">
          <textarea
            ref={ansValue}
            style={{
              height: "10rem",
              width: "30rem",
              padding: ".5rem",
              borderRadius: "1rem",
            }}
            required
            type="text"
            className="answerInput"
            name="Answer"
            placeholder="your answer"
          />
        </div>
        <div className="answerSubmit">
          <button
            onClick={() => submitAnswer()}
            style={{ marginLeft: "27rem", marginTop: "1rem", padding: ".3rem" }}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="allAnswers">
        {answers?.map((answer, id) => (
          <AnswerBox key={id} viewAnsClicked={viewAnsClicked} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default Question;
