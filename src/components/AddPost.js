import { PlusCircleIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { db } from "../firebase/firebase";
import makeid from "../helpers/makeid";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import {
  userEmail,
  userID,
  userName,
  userProfilePic,
} from "../features/userSlice";

const AddPost = () => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState(makeid());
  const [category, setCategory] = useState("");
  const [submissionErr, setSubmissionErr] = useState("");

  const postAuthorName = useSelector(userName);
  const postAuthorEmail = useSelector(userEmail);
  const postAuthorPP = useSelector(userProfilePic);
  const postAuthorId = useSelector(userID);

  const addHandler = () => {
    setAdd(!add);
  };

  const submitHandler = () => {
    if (!title || !body || !category) {
      setSubmissionErr("Please, fill in all fields!");
    } else {
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        authorName: postAuthorName,
        authorEmail: postAuthorEmail,
        authorPP: postAuthorPP,
        authorId: postAuthorId,
        body,
        category,
        comments: [],
        ups: [],
        downs: [],
        postId,
        title,
      });
      setSubmissionErr("");
      setTitle("");
      setBody("");
      setCategory("");
      setPostId(makeid());
      setAdd(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <button
        onClick={addHandler}
        className="flex items-center bg-red-400 mt-4 text-white px-4 py-1 rounded-md hover:shadow-lg transform transition-all duration-150 hover:-translate-y-0.5 hover:bg-red-500 text-sm"
      >
        {add ? (
          <>
            Close Add <XIcon className="h-4 ml-2" />
          </>
        ) : (
          <>
            Add Note <PlusCircleIcon className="h-4 ml-2" />
          </>
        )}
      </button>

      {/* Add post section */}
      {add && (
        <div className="w-full max-w-2xl md:w-4/5 h-auto bg-white mt-4 shadow-md sm:rounded-md p-2">
          <div className="title px-4 py-2 flex items-center ">
            <label htmlFor="title" className="mr-4 text-gray-400 text-xs">
              Title
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ resize: "none" }}
              rows="2"
              type="text"
              id="title"
              className="bg-red-50 p-2 flex-1 rounded-md text-sm outline-none"
            />
          </div>
          <div className="title px-4 py-2 flex items-center ">
            <label htmlFor="body" className="mr-4 text-gray-400 text-xs">
              Description
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ resize: "none" }}
              rows="4"
              type="text"
              id="body"
              className="bg-red-50 p-2 flex-1 rounded-md text-sm outline-none"
            />
          </div>
          <div className="px-4 py-2 flex items-center ">
            <label
              htmlFor="category-select"
              className="mr-4 text-gray-400 text-xs"
            >
              Choose category
            </label>

            <select
              name="categories"
              value={category}
              id="category-select"
              className="cursor-pointer outline-none bg-red-50 p-1 text-xs rounded-md"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Please choose an option
              </option>
              <option value="Product Design">Product Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Frontend Dev">Frontend Development</option>
              <option value="Backend Dev">Backend Development</option>
              <option value="Fullstack Dev">Fullstack Development</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="">
            <p></p>
          </div>

          {submissionErr && (
            <div className="flex items-center justify-center my-2">
              <p className="bg-red-400 p-1 rounded-lg w-60 text-white text-xs text-center">
                {submissionErr}
              </p>
            </div>
          )}

          <div className="flex items-center justify-center mb-2">
            <button
              type="submit"
              className="bg-red-400 text-white p-2 rounded-md mt-2 text-xs"
              onClick={submitHandler}
            >
              Submit Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
