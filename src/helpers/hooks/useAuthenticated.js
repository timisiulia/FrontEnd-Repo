import Cookies from "universal-cookie/lib";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAuthenticated = () => {
  const { exp } = useSelector((state) => state.auth);
  const [left, setLeft] = useState(
    exp
      ? moment(parseInt(`${exp}000`)).diff(moment(), "seconds") <= 0
      : undefined
  );
  const cookie = new Cookies();

  const token = cookie.get("access_token");

  useEffect(() => {
    const timer = setInterval(() => {
      setLeft(exp
        ? moment(parseInt(`${exp}000`)).diff(moment(), "seconds") <= 0
        : undefined)
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [exp]);

  if (!token) {
    return false;
  }

  return !left;
};
