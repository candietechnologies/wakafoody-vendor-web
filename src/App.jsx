import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import React, { lazy, Suspense } from "react";
import "./App.css";
import Spinner from "./components/Spinner";
import { useAuth } from "./context/auth";

const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/forgot-password/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/reset-password/ResetPassword")
);

const Home = lazy(() => import("./pages/home/Home"));
const Menu = lazy(() => import("./pages/menu/Menus"));
const AddMenu = lazy(() => import("./pages/add-menu/AddMenu"));
const Orders = lazy(() => import("./pages/orders/Order"));
const ViewOrder = lazy(() => import("./pages/view-order/ViewOrder"));
const Payout = lazy(() => import("./pages/payout/Payout"));
const Verify = lazy(() => import("./pages/verify/Verify"));
const Onboarding = lazy(() => import("./pages/onboarding/Onboarding"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Analytics = lazy(() => import("./pages/analytics/Analytics"));

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  const unauth = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify",
    "/complete-onboarding",
  ];

  const isUnauthPath = unauth.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!isAuthenticated && !isUnauthPath) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const routes = createRoutesFromElements(
  <Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify" element={<Verify />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/menus" element={<Menu />} />
      <Route path="/menus/add" element={<AddMenu />} />

      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<ViewOrder />} />

      <Route path="/payouts" element={<Payout />} />
      <Route path="/analytics" element={<Analytics />} />

      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
