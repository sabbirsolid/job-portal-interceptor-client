import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import AuthContext from "../context/AuthContext/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-for-recruiter-part3-six-inky.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext); // Move inside the hook
  const navigate = useNavigate(); // Move inside the hook

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("error caught in interceptor", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("need to logout the user");
          signOutUser()
            .then(() => {
              console.log("logged out user");
              navigate("/signIn");
            })
            .catch((err) => console.log(err));
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [signOutUser, navigate]); // Add dependencies to useEffect

  return axiosInstance;
};

export default useAxiosSecure;
