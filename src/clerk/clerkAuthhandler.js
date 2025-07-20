import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/userSlice";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const ClerkAuthHandler = () => {
  const dispatch = useDispatch()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      dispatch(setUser({
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      }));
    }
  }, [user]);

  return null;
};


export default ClerkAuthHandler