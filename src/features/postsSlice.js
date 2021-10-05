import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  filteredPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
  },
});

export const { setPosts, setFilteredPosts } = postsSlice.actions;

export const postsArr = (state) => state.posts.posts;
export const filteredPostsArr = (state) => state.posts.filteredPosts;

export default postsSlice.reducer;
