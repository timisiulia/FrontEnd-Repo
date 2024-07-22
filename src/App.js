import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { AdminDashboard, Dashboard } from "./pages";
import { Header } from "./components/shared/Header";
import { ProtectedRoute } from "./services/routing/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { MainPage } from "./pages/MainPage";
import { Profile } from "./pages/Profile";
import { useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import { Notifications } from "./pages/Notifications";
import { useAuthenticated } from "./helpers/hooks/useAuthenticated";
import { removeAuthUser } from "./redux/auth/auth.reducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "moment/locale/ro";
import moment from "moment";

const SOCKET_URL = "http://localhost:8080/ws";
moment.locale("ro");

function App() {
  const dispatch = useDispatch();
  const tokenValid = useAuthenticated();
  const userId = useSelector((state) => state.auth.id);
  const isAdmin = useSelector((state) => state.auth.role === "ADMIN");
  const [topics, setTopics] = useState([]);
  const isLoggedIn = !!userId;
  const [notification, setNotification] = useState(null);

  const onConnected = () => {
    !!userId &&
      setTopics([`/topic/new-event/${userId}`, `/topic/new-accept/${userId}`]);
  };

  const onDisconnected = () => {
    console.log("Disconnected");
  };

  useEffect(() => {
    if (!tokenValid) {
      dispatch(removeAuthUser());
    }
  }, [dispatch, tokenValid]);

  useEffect(() => {
    notification && toast(notification);
  }, [notification]);

  return (
    <>
      <BrowserRouter>
        <SockJsClient
          url={SOCKET_URL}
          topics={topics}
          onConnect={onConnected}
          onDisconnect={onDisconnected}
          autoReconnect
          onMessage={(msg) => setNotification(msg)}
          onConnectFailure={(e) => {
            console.log("EROARE BA");
            console.log({ e });
          }}
          debug={false}
        />
        <Header />
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            paddingTop: 60,
            zIndex: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/dogs.png`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundColor: "#CECECE",
          }}
        >
          <Routes>
            <Route
              index
              path="/"
              element={
                isLoggedIn ? (
                  isAdmin ? (
                    <ProtectedRoute adminRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  ) : (
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  )
                ) : (
                  <MainPage />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
