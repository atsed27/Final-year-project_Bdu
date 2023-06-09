import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import LostAndFound from "../LostAndFound/LostAndFound";
import { useSelector, useDispatch } from "react-redux";
import "./LostAndFounds.css";
import { useParams } from "react-router-dom";
import { PostsData } from "../../Data/PostsData";
import { getAllLostAndFounds } from "../../actions/LostAndFoundActions";

const LostAndFounds = ({location}) => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { lostAndFounds, loading } = useSelector((state) => state.lfReducer);

  useEffect(() => {
    dispatch(getAllLostAndFounds());
  }, []);
  if(!lostAndFounds) return 'No LostAndFounds';

  if(location === "Lost Page") lostAndFounds = lostAndFounds.filter((lf)=> lf.isLostOrFound==="lost")
  if(location === "Found Page") lostAndFounds = lostAndFounds.filter((lf)=> lf.isLostOrFound==="found")

  return (
    <div className="LostAndFounds">
     {loading ? "Fetching Lost & Founds"
     :lostAndFounds.map((lf, id) => {
            return <LostAndFound data={lf} key={id} location={location}/>;
          })}
    </div>
  );
};

export default LostAndFounds;
