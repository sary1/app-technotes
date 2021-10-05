import {
  ChatIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilAltIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredPostsArr,
  postsArr,
  setFilteredPosts,
} from "../features/postsSlice";
import { userID } from "../features/userSlice";
import { db } from "../firebase/firebase";
import EditPost from "./EditPost";

const Post = ({
  postId,
  authorName,
  authorId,
  body,
  category,
  ups,
  downs,
  timestamp,
  title,
}) => {
  const [errorMsg] = useState("Please login first!");
  const [isErr, setIsErr] = useState(false);
  const loggedUserId = useSelector(userID);
  const [upVoter, setUpVoter] = useState(false);
  const checkUpVote = () => {
    db.collection("posts")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          if (doc.data().postId === postId) {
            if (doc.data().ups.includes(loggedUserId)) {
              setUpVoter(true);
            }
          }
        });
      });
  };
  const [downVoter, setDownVoter] = useState(false);
  const checkDownVote = () => {
    db.collection("posts")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          if (doc.data().postId === postId) {
            if (doc.data().downs.includes(loggedUserId)) {
              setDownVoter(true);
            }
          }
        });
      });
  };
  const [duration, setDuration] = useState(0);
  const [durationTxt, setDurationTxt] = useState(
    duration < 60 ? "A few seconds" : "A few minutes"
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(postsArr);
  let filteredPosts = useSelector(filteredPostsArr);

  const deleteHandler = (e) => {
    if (loggedUserId) {
      e.preventDefault();
      db.collection("posts")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (doc.data().postId === postId) {
              db.collection("posts").doc(doc.id).delete();
              return;
            }
          });
        });
    } else {
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 5000);
    }
  };

  const editHandler = (e) => {
    if (loggedUserId) {
      e.preventDefault();
      setEditMode(!editMode);
    } else {
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 5000);
    }
  };

  const timeOptimization = (timestamp) => {
    let newDuration = new Date().getTime() / 1000 - timestamp.seconds;
    setDuration(newDuration);
    if (newDuration > 60 && newDuration < 3600) {
      let formattedDuration = Math.trunc(newDuration / 60);
      formattedDuration === 1
        ? setDurationTxt(`${formattedDuration} minute`)
        : setDurationTxt(`${formattedDuration} minutes`);
    } else if (newDuration > 3600 && newDuration < 86400) {
      let formattedDuration = Math.trunc(newDuration / 60 / 60);
      formattedDuration === 1
        ? setDurationTxt(`${formattedDuration} hour`)
        : setDurationTxt(`${formattedDuration} hours`);
    } else if (newDuration > 86400) {
      let formattedDuration = Math.trunc(newDuration / 60 / 60 / 24);
      formattedDuration === 1
        ? setDurationTxt(`${formattedDuration} day`)
        : setDurationTxt(`${formattedDuration} days`);
    }
  };

  setInterval(() => {
    if (timestamp) {
      timeOptimization(timestamp);
    }
  }, 60000);

  const upArrowHandler = () => {
    if (loggedUserId) {
      db.collection("posts")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (
              doc.data().postId === postId &&
              doc.data().ups.includes(loggedUserId) === false
            ) {
              db.collection("posts")
                .doc(doc.id)
                .update({ ups: [...ups, loggedUserId] });
            }
            if (
              doc.data().postId === postId &&
              doc.data().downs.includes(loggedUserId)
            ) {
              let newArr = [...doc.data().downs].filter(
                (item) => item !== loggedUserId
              );
              db.collection("posts").doc(doc.id).update({ downs: newArr });
              setDownVoter(false);
            }
          });
        });
    } else {
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 5000);
    }
  };

  const downArrowHandler = () => {
    if (loggedUserId) {
      db.collection("posts")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (
              doc.data().postId === postId &&
              doc.data().downs.includes(loggedUserId) === false
            ) {
              db.collection("posts")
                .doc(doc.id)
                .update({ downs: [...downs, loggedUserId] });
            }
            if (
              doc.data().postId === postId &&
              doc.data().ups.includes(loggedUserId)
            ) {
              let newArr = [...doc.data().ups].filter(
                (item) => item !== loggedUserId
              );
              db.collection("posts").doc(doc.id).update({ ups: newArr });
              setUpVoter(false);
            }
          });
        });
    } else {
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 5000);
    }
  };

  const categoryFilteringHandler = (e) => {
    e.preventDefault();

    filteredPosts = [];

    posts.map((post) => {
      if (post.category === category) {
        filteredPosts.push(post);
      }
    });
    dispatch(setFilteredPosts(filteredPosts));
  };

  const authorFilteringHandler = (e) => {
    e.preventDefault();

    filteredPosts = [];

    posts.map((post) => {
      if (post.authorName === authorName) {
        filteredPosts.push(post);
      }
    });
    dispatch(setFilteredPosts(filteredPosts));
  };

  checkUpVote();
  checkDownVote();

  useEffect(() => {
    if (timestamp) {
      timeOptimization(timestamp);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl md:w-4/5 flex bg-white shadow-md sm:rounded-md py-2">
        {/* Left */}
        <div className="w-6 h-full px-6 py-2 flex flex-col justify-center items-center whitespace-nowrap">
          <span
            onClick={upArrowHandler}
            className="border-2 border-gray-300 border-opacity-50 p-1 cursor-pointer group"
          >
            <ChevronUpIcon
              className={
                "h-6 ease-in-out duration-150 transition-all group-hover:text-red-400 " +
                (upVoter ? "text-red-400" : "")
              }
            />
          </span>
          <p className="text-xl ">{ups.length - downs.length}</p>
          <span
            onClick={downArrowHandler}
            className="border-2 border-gray-300 border-opacity-50 p-1 cursor-pointer group"
          >
            <ChevronDownIcon
              className={
                "h-6 ease-in-out duration-150 transition-all group-hover:text-red-500 " +
                (downVoter ? "text-red-400" : "")
              }
            />
          </span>
        </div>

        {/* Middle */}
        <div className="flex-1 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 flex flex-col justify-evenly relative">
          {isErr ? (
            <p className="bg-red-400 text-white p-1 px-4 rounded-lg w-40 text-xs absolute top-3 left-1/2 shadow-lg">
              {errorMsg}
            </p>
          ) : (
            <></>
          )}
          <h1 className="text-sm md:text-md font-semibold">{title}</h1>
          <p className="text-xs text-gray-300 my-2">{body}</p>
          <div className="flex items-center">
            <h2
              className={
                "mr-2 py-1 px-2 rounded-xl text-white text-xs cursor-pointer " +
                (category === "Fullstack Dev" ? "bg-blue-400" : "") +
                (category === "Product Design" ? "bg-yellow-400" : "") +
                (category === "UI/UX Design" ? "bg-green-400" : "") +
                (category === "Backend Dev" ? "bg-red-400" : "") +
                (category === "Frontend Dev" ? "bg-purple-500" : "") +
                (category === "Other" ? "bg-black" : "")
              }
              onClick={categoryFilteringHandler}
            >
              {category}
            </h2>
            <p
              onClick={authorFilteringHandler}
              className="cursor-pointer mr-2 text-red-400 font-semibold border-b-2 border-red-400 text-xs"
            >
              {authorName}
            </p>
            <span className="h-1 w-1 bg-gray-400 rounded-full  mr-2 hidden sm:inline-flex"></span>
            <p className="mr-2 text-gray-400 hidden sm:inline-flex text-xs">
              {durationTxt}
            </p>
          </div>
        </div>

        {/* Right */}
        {loggedUserId && authorId === loggedUserId && (
          <div className="w-6 h-full px-6 py-2 flex flex-col justify-center items-center whitespace-nowrap">
            <XCircleIcon
              onClick={deleteHandler}
              className="h-5 text-gray-300 cursor-pointer hover:text-red-400"
            />
            <PencilAltIcon
              onClick={editHandler}
              className="h-5 text-gray-300 cursor-pointer hover:text-green-400 mt-2"
            />
          </div>
        )}
      </div>

      {editMode && (
        <EditPost
          category={category}
          title={title}
          body={body}
          editMode={editMode}
          setEditMode={setEditMode}
          postId={postId}
        />
      )}
    </div>
  );
};

export default Post;
