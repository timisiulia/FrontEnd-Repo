import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { logoutAction } from "../redux/auth/auth.actions";

export const Profile = () => {
  require("./../components/profile/profile.scss");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  const { firstName, lastName, username, email } = userData;

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="profile-data">
        <div className="item">
          <div className="title">Email</div>
          <div className="value">{email}</div>
        </div>
        <div className="item">
          <div className="title">Nume de utilizator</div>
          <div className="value">{username}</div>
        </div>
        <div className="item">
          <div className="title">Prenume</div>
          <div className="value">{firstName}</div>
        </div>
        <div className="item">
          <div className="title">Nume</div>
          <div className="value">{lastName}</div>
        </div>
      </div>
      <div className="logout-container">
        <div className="logout-button" onClick={handleLogout}>
          Delogheaza-te
        </div>
      </div>
    </div>
  );
};
