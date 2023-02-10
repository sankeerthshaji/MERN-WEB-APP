import { useDispatch } from "react-redux";

function useLogout() {
  const dispatch = useDispatch();
  const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem("admin");

    // remove user from redux store
    dispatch({ type: "ADMIN_LOGOUT" });
  };

  return {logout};
}
export default useLogout;
