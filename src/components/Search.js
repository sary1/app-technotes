import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filteredPostsArr,
  postsArr,
  setFilteredPosts,
} from "../features/postsSlice";
import { useSelector } from "react-redux";

const Search = () => {
  const [inputVal, setInputVal] = useState("");

  const dispatch = useDispatch();

  const posts = useSelector(postsArr);
  let filteredPosts = useSelector(filteredPostsArr);

  const submitHandler = async (e) => {
    e.preventDefault();

    filteredPosts = [];

    posts.map((post) => {
      if (post.title.toLowerCase().includes(inputVal.toLowerCase())) {
        filteredPosts.push(post);
      }
    });
    dispatch(setFilteredPosts(filteredPosts));

    setInputVal("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-1 mx-4 max-w-md rounded-md justify-between bg-white w-4/5 border-l-2 border-r-2 border-red-500 items-center px-2"
    >
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        type="text"
        placeholder="Search by title..."
        className="bg-transparent outline-none text-xs px-2 py-2 flex-1 placeholder-gray-400"
      />
      <SearchIcon
        onClick={submitHandler}
        className=" cursor-pointer w-4 text-red-400"
      />
    </form>
  );
};

export default Search;
