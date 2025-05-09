import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import React, { lazy, Suspense } from "react";
import "./App.css";
import Spinner from "./components/Spinner";

const Login = lazy(() => import("./pages/login/Login"));

const Home = lazy(() => import("./pages/home/Home"));
const Menu = lazy(() => import("./pages/menu/Menus"));
const AddMenu = lazy(() => import("./pages/add-menu/AddMenu"));

const routes = createRoutesFromElements(
  <Route>
    <Route path="/login" element={<Login />} />

    <Route path="/" element={<Home />} />
    <Route path="/menus" element={<Menu />} />
    <Route path="/menus/add" element={<AddMenu />} />
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
