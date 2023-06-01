import { Modal, Textarea, useMantineTheme } from "@mantine/core";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../api/QARequests";
import { getAllQuestions } from "../../actions/QAActions";

export default function AskModal({ modalOpened, setModalOpened, category }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
const title = useRef()
const question = useRef()
const { user } = useSelector((state) => state.authReducer.authData);


 // const handleChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
 // };

// form submission
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newQuestion = {
      title : title.current.value,
      questionText : question.current.value,
      category: category.category,
      userId : user._id
    }
    try {
      await createQuestion(newQuestion)
      dispatch(getAllQuestions());
      setModalOpened(false)
     console.log("the question data is",newQuestion)
     resetQuestionForm();
    } catch(error) {
      console.log("error from submitting question",error);
    }
  }

  const resetQuestionForm = () => {
    title.current.value = "";
    question.current.value = ""
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="44rem"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="askForm" onSubmit={handleSubmit}>
        <h3>Put your Question below...</h3>
        <div className="formInputs">
          <div style={{ marginBottom: "1rem" }}>
            <input
             // value={formData.title}
             ref={title}
              style={{ padding: ".5rem", width: "39rem" }}
              type="text"
              className="askInput"
              name="title"
              placeholder="Title for your question"
              required
            />
          </div>
          <div>
            <textarea
              //value={formData.question}
              ref={question}
              style={{ height: "15rem", width: "39.1rem", padding: ".5rem" }}
              type="text"
              className="askInput"
              name="question"
              placeholder="your question"
              required
              
            />
          </div>
          <button
            style={{
              display: "flex",
              width: "7rem",
              height: "2rem",
              marginLeft: "33rem",
            }}
            className="button askButton"
            type="submit"
          >
            Share Question
          </button>
        </div>
      </form>
    </Modal>
  );
}
