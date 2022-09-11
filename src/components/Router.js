import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetails from './PostDetails';
import PostList from './PostList';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />}></Route>
        <Route path='/:postId' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router