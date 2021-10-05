import { useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import {
  filteredPostsArr,
  postsArr,
  setFilteredPosts,
  setPosts,
} from "../features/postsSlice";
import { useDispatch } from "react-redux";
import Search from "./Search";

const Notes = () => {
  const dispatch = useDispatch();
  const filteredPosts = useSelector(filteredPostsArr);
  const posts = useSelector(postsArr);

  const clearHandler = (e) => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(setFilteredPosts(snapshot.docs.map((doc) => doc.data())));
      });
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(setPosts(snapshot.docs.map((doc) => doc.data())));
        dispatch(setFilteredPosts(snapshot.docs.map((doc) => doc.data())));
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Search />
      <p className="mt-4 text-xs">
        <span className="text-red-500">{filteredPosts.length} </span>
        out of <span className="text-red-500">{posts.length}</span> notes{" "}
        <button
          onClick={clearHandler}
          className="text-red-700 bg-red-100 p-1 rounded-md ml-3 hover:bg-red-400 hover:text-white"
        >
          Clear filters
        </button>
      </p>
      <div className="w-full flex flex-col items-center space-y-8 py-5 px-0">
        {filteredPosts &&
          filteredPosts.map(
            ({
              postId,
              authorId,
              authorName,
              authorPP,
              body,
              category,
              comments,
              ups,
              downs,
              timestamp,
              title,
            }) => {
              return (
                <Post
                  key={postId}
                  postId={postId}
                  authorId={authorId}
                  authorName={authorName}
                  authorPP={authorPP}
                  body={body}
                  category={category}
                  comments={comments}
                  ups={ups}
                  downs={downs}
                  timestamp={timestamp}
                  title={title}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default Notes;
