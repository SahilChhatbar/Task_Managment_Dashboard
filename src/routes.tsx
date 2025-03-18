import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
