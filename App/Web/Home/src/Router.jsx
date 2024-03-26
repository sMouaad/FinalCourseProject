import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Apps from "./Apps";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Sidebar from "./Sidebar";
import Assistant from "./Assistant";
import HomePage from "./HomePage";
import Login from "./Login";
import ToDo from "./ToDo";
import ForgotPassword from "./ForgotPass";
import ResetPassword from "./ResetPassword";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <HomePage />
        </>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "login/forgot-password",
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "login/reset-password/:token",
      element: (
        <>
          <ResetPassword />
        </>
      ),
      errorElement: <div>link expired</div>,
    },
    {
      path: "home",
      element: (
        <>
          <Sidebar />
          <Home />
        </>
      ),
    },
    {
      path: "login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "apps",
      element: (
        <>
          <Sidebar />
          <Apps />
        </>
      ),
    },
    {
      path: "assistant",
      element: (
        <>
          <Sidebar />
          <Assistant />
        </>
      ),
    },
    {
      path: "to-do-list",
      element: (
        <>
          <Sidebar />
          <ToDo />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
