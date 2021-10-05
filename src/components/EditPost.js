import { useState } from "react";
import { db } from "../firebase/firebase";

const EditPost = ({ category, title, body, editMode, setEditMode, postId }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [newCategory, setNewCategory] = useState(category);

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("posts")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          if (doc.data().postId === postId) {
            db.collection("posts").doc(doc.id).update({
              body: newBody,
              category: newCategory,
              title: newTitle,
            });
          }
        });
      });
    setEditMode(false);
  };

  return (
    <div className="w-full max-w-2xl md:w-4/5 flex bg-red-50 border-l-2 border-r-2 border-red-400 shadow-md sm:rounded-md py-2 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 flex-col justify-evenly relative space-y-2">
      <input
        type="text"
        className="text-sm md:text-md font-semibold bg-white p-1 rounded-md outline-none"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />

      <textarea
        type="text"
        rows="5"
        className="text-xs text-gray-400 outline-none md:text-md font-semibold bg-white p-1 rounded-md"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <div className="px-4 py-2 flex items-center ">
        <label
          htmlFor="category-select"
          className="mr-4 text-gray-400 bg-white p-2 rounded-md font-semibold text-xs"
        >
          Category
        </label>

        <select
          name="categories"
          value={newCategory}
          id="category-select"
          className="cursor-pointer outline-none bg-white p-1 text-xs rounded-md"
          onChange={(e) => setNewCategory(e.target.value)}
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

      <button
        className="bg-red-400 text-white py-1 px-4 text-sm rounded-md w-1/4 m-auto"
        onClick={submitHandler}
      >
        Submit
      </button>
    </div>
  );
};

export default EditPost;
