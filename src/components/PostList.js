import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function searchingFor(term) {

  console.log('searchingFor '+term) 
  return function (x) {
      console.log(x.name)
      console.log(x.name.toLowerCase().includes(term.toLowerCase()))
      return ( 
          x.name.toLowerCase().includes(term.toLowerCase())  
      ) || 
      (
          !term
      )
  }
}

function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let handleChange = event => {
    setSearchValue(event.target.value);
  }

  return (
    <div>
    {posts.length ? (
      <React.Fragment>
      <p className="headline">
        List of Superheroes:{" "}
      </p>
      <p><input className="searchBar" onChange={handleChange} type='text'/></p>
          <div className="container">
            {posts.filter(searchingFor(searchValue) ).map((post) => {
              return (
                <div className="postContainer">
                  <img src={post.images.sm} alt="" />
                  <div>
                    <h3 key={post.id}>{post.name}</h3>
                    <p>
                      <b>Gender</b> : {post.appearance.gender}{" "}
                    </p>
                    <p>
                      <b>Height</b> : {post.appearance.height[1]}{" "}
                    </p>
                    <p>
                      <b>Weight</b> : {post.appearance.weight[1]}{" "}
                    </p>
                  </div>
                  <button
                    className="detailsButton"
                    onClick={() => navigate(`${post.id}`)}
                  >
                    Read More...
                  </button>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <p className="headline">
          Please wait... Loading...
        </p>
      )}
    </div>
  )
}

export default PostList;
