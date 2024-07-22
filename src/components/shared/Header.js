import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = ({ notification }) => {
  require("./header.scss");

  const navigate = useNavigate();
  const isLoggedIn = !!useSelector((state) => state.auth.id);
  const notificationsNumber = useSelector((state) => state?.events.length);

  const redirect = (path) => {
    navigate(path);
  };

  return (
    <div className="header-wrapper" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/teckle.jpeg`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center'
    }}>
      <div className="left-side">
        <div className="home-icon" onClick={() => redirect("/")}>
          <HomeIcon />
        </div>
      </div>
      <div>
        <span>{notification}</span>
      </div>
      <div className="right-side">
        {isLoggedIn && (
          <div
            className="notification-icon"
            data-notifications={notificationsNumber > 0 ? notificationsNumber : null}
            onClick={() => redirect("/notifications")}
          >
            <NotificationsIcon />
          </div>
        )}
        <div
          className="login-icon"
          onClick={() => redirect(isLoggedIn ? "/profile" : "/login")}
        >
          <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};
