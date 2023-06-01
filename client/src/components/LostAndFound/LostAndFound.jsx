import React, { useEffect, useState } from "react";
import "./LostAndFound.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/Like.png";
import NotLike from "../../img/Notlike.png";
import { likePost } from "../../api/PostsRequests";
import { deletePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import menuIcon from "../../img/menu.png";
import DeleteModal from "../DeleteModal/DeleteModal";

const LostAndFound = ({ data }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [postOption, setPostOption] = useState(false);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [editStatusOpened, setEditStatusOpened] = useState(false);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="LostAndFound">
      <div className="detail">
        <div>
          <img
            src={
              publicFolder + data.lfOwnerData[0].profilePicture ?
              publicFolder + data.lfOwnerData[0].profilePicture :
              publicFolder + "defaultProfile.png"
            }
            alt="profile"
            className="followerImage"
          />
          <div className="name">
          <Link
              to={`/profile/${data?.lfOwnerData[0]._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <span title="click to go to user profile">@{data?.lfOwnerData[0].username}</span>  
          </Link>
          </div>
        </div>
        <div style={{background: data?.status === "solved" ? "gray": "orange", borderRadius: ".3rem", padding: ".2rem"}} className="status">
            <span style={{fontSize: "12px", display: editStatusOpened ? "none": "flex"}}>{data?.status === "solved" ? "Solved" : "pending"}</span>
      <div style={{display: editStatusOpened? "flex": "none"}}>
        <select>
        <option>Pending</option>
        <option>Solved</option>
      </select>
      </div>
      
        </div>
        {data.userId === user._id && (
          
            <div>
              <img
                src={menuIcon}
                alt=""
                title={postOption? "hide options" : "show options"}
                style={{ cursor: "pointer", height: "1.5rem", width: "1.5rem" }}
                onClick={() => setPostOption((postOption) => !postOption)}
              />

            <div style={{display: postOption? "flex" : "none", gap:".5rem"}}>
              <button className="button" onClick={()=> setEditStatusOpened((prev)=>!prev)}>
                Update
              </button>
              <button style={{background: "red"}} className="button" onClick={() => setDelModalOpened(true)}>
                delete
              </button>
            </div>
            <DeleteModal delModalOpened={delModalOpened} setDelModalOpened={setDelModalOpened} data={data} user={user}/>

          </div>
        )}
      </div>
      <div className="description">
        <p># {data?.lostAndFoundText}</p>
      </div>

      <img
        src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
    </div>
  );
};

export default LostAndFound;
