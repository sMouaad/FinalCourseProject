import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Apps from "./Apps";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Sidebar from "./Sidebar";
import Assistant from "./Assistant";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <Sidebar />
          <Home />
        </>
      ),
      errorElement: <ErrorPage />,
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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
