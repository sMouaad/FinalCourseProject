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
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <HomePage />
        </>
      ),
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
      path: "home",
      element: (
        <>
          <Sidebar />
          <Home />
        </>
      ),
      errorElement: <ErrorPage />,
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
