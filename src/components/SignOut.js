import { useDispatch } from "react-redux";
import { signoutUser } from "../features/userSlice";
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
  const dispatch = useDispatch();

  const signoutHandler = (e) => {
    e.preventDefault();
    console.log("Clicked");
    dispatch(signoutUser());
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log("An error happened: ", error);
      });
  };

  return (
    <button
      className="px-2 py-1 rounded-md text-red-400 outline-none text-sm box-border hover:bg-red-400 hover:text-white hover:shadow-md"
      onClick={signoutHandler}
      style={{ fontSize: "0.6rem" }}
    >
      Logout
    </button>
  );
};

export default SignOut;
