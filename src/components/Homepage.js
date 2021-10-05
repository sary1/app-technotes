import { useSelector } from "react-redux";
import { userName } from "../features/userSlice";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Notes from "./Notes";
import SignIn from "./SignIn";

const Homepage = () => {
  const signedUser = useSelector(userName);

  return (
    <div className="">
      <Navbar />
      <div className="p-0 sm:p-5 box-border bg-gray-100 flex flex-col items-center min-h-screen h-auto">
        {signedUser ? (
          <AddPost />
        ) : (
          <div className="mt-6 flex flex-col mb-2">
            <SignIn />{" "}
            <span className="mt-1" style={{ fontSize: "0.65rem" }}>
              to start adding notes
            </span>
          </div>
        )}
        <Notes />
        <div className="text-red-400 text-xs my-4">
          Designed & Built by Sary Elmelegy
        </div>
      </div>
    </div>
  );
};

export default Homepage;
