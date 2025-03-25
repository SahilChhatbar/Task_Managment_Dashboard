import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/index";
import Layout from "./layout/Layout";
import Task from "./pages/task/index";
import Mentor from "./pages/mentor/index";
import Settings from "./pages/settings/index";
import Messages from "./pages/messages/index";
import DetailTask from "./pages/task detail/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "task",
        element: <Task />,
      },
      {
        path: "mentor",
        element: <Mentor />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "detailtask",
        element: <DetailTask />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
