import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../firebase/firebase";
import { signinUser } from "../features/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const signinHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          signinUser({
            userName: user.displayName,
            userEmail: user.email,
            userProfilePic: user.photoURL,
            userID: user.uid,
          })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <button
      className="bg-red-400 px-2 py-1 rounded-md text-white font-medium hover:bg-red-500 transition duration-200 outline-none text-sm min-w-max"
      onClick={signinHandler}
      style={{ fontSize: "0.6rem" }}
    >
      Google login
    </button>
  );
};

export default SignIn;
