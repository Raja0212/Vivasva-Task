import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  let navigate = useNavigate();
  let [post, setDetails] = useState(null);

  useEffect(() => {
    fetchDetails(postId);
  }, [postId]);

  let fetchDetails = async (id) => {
    let response = await axios.get(
      `https://akabab.github.io/superhero-api/api/id/${id}.json`
    );
    if (response.status === 200) {
      setDetails(response.data);
    }
    console.log(response);
  };

  return (
    <div>
        <div style={{margin:'2%'}}>
            <button className="backButton" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      {post ? <div className="detailsContainer">
        <div>
            <img src={post.images.md} alt="" />
        </div>
        <div style={{marginLeft:'5%'}}>
          <h3 key={post.id}>{post.name}</h3>
          <p>
            {" "}
            <b>Work</b> : {post.work.occupation}
          </p>
          <p>
            <b>Gender</b> : {post.appearance.gender}{" "}
          </p>
          <p>
            <b>Height</b> : {post.appearance.height[1]}{" "}
          </p>
          <p>
            <b>Weight</b> : {post.appearance.weight[1]}{" "}
          </p>
          <h2><u><i>Power Stats :-</i></u></h2>
          <p><b>Combat :</b> {post.powerstats.combat}</p>
          <p><b>Intelligence :</b> {post.powerstats.intelligence}</p>
          <p><b>Power :</b> {post.powerstats.power}</p>
          <p><b>Speed :</b> {post.powerstats.speed}</p>
          <p><b>Strength :</b> {post.powerstats.strength}</p>
          <p><b>Durability :</b> {post.powerstats.durability}</p>
        </div>
      </div> : <p className="headline">Please wait... Loading... </p>}
    </div>
  );
}

export default PostDetails;
