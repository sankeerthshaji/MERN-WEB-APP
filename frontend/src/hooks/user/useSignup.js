import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../../redux/store";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/signup", { email, password });
      const json = response.data;
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      console.log(localStorage.getItem("user"));
      // update the store
      dispatch({ type: "USER_LOGIN", payload: json });
      console.log(store.getState());
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
