import { useDispatch, useSelector } from "react-redux";
import { setFilteredPosts } from "../features/postsSlice";
import { userEmail, userName, userProfilePic } from "../features/userSlice";
import { db } from "../firebase/firebase";
// import Search from "./Search";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Navbar = () => {
  const loggedUsername = useSelector(userName);
  const loggedUserPP = useSelector(userProfilePic);
  const loggedUserEmail = useSelector(userEmail);

  const dispatch = useDispatch();

  const defaultHandler = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(setFilteredPosts(snapshot.docs.map((doc) => doc.data())));
      });
  };

  return (
    <div className="bg-white p-3 h-12 flex items-center justify-between shadow-md sticky top-0 z-50">
      <h2 onClick={defaultHandler} className="cursor-pointer">
        Tech<span className="font-light text-red-300">notes</span>
      </h2>

      {/* <Search /> */}

      <div className="">
        {loggedUsername ? (
          <div className="flex space-x-2 items-center">
            <div className="hidden sm:flex flex-col items-end">
              <h2 style={{ fontSize: "0.6rem" }} className="">
                {loggedUsername}
              </h2>
              <h3 style={{ fontSize: "0.6rem" }} className="text-gray-300">
                {loggedUserEmail}
              </h3>
            </div>

            <img
              src={loggedUserPP}
              alt="PP"
              className="h-7 rounded-md shadow-lg"
            />
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Navbar;
