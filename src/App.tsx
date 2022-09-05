import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyProfile from "./comps/MyProfile";
import NavBar from "./comps/NavBar";
import NoAuthAlert from "./comps/ui/NoAuthAlert";
import UserProfile from "./pages/UserProfile";
import {
  useError,
  useLoading,
  useTypeDispatch,
  useTypeSelector,
} from "./hooks/redux-hooks";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { checkAction } from "./store/actions/auth-actions";
import RecentTradesPage from "./pages/RecentTradesPage";
import MyOffersPage from "./pages/MyOffersPage";
import Loading from "./comps/ui/Loading";
import useAnnounce from "./hooks/useAnnounce";

const App = () => {
  const d = useTypeDispatch();
  const { isLoggedIn } = useTypeSelector((state) => state.auth);
  const error = useError();
  const isLoading = useLoading();
  const cookies = useCookies(["session"])[0];
  const announce = useAnnounce();
  useEffect(() => {
    if (cookies.session) d(checkAction());
  }, []);
  useEffect(() => {
    if (error) announce("error", error);
  }, [error]);
  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <NavBar />
      {!isLoggedIn && <NoAuthAlert />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route
          path="/me"
          element={isLoggedIn ? <MyProfile /> : <Navigate to="/auth" />}
        />
        <Route path="/:id" element={<UserProfile />} />
        <Route path="/recent" element={<RecentTradesPage />} />
        <Route path="/offers" element={<MyOffersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
