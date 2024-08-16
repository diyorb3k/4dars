import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import { Spin } from "antd";
import { Suspense, lazy } from "react";

const withSuspense = (cb) => {
  const L = lazy(cb);

  return (props) => (
    <Suspense fallback={<Spin fullscreen />}>
      <L {...props} />
    </Suspense>
  );
};

const Layout = withSuspense(() => import("../layout/layout"));
const Dashboard = withSuspense(() => import("../pages/dashboard/Dashboard"));
const Products = withSuspense(() => import("../pages/products/Products"));
const Users = withSuspense(() => import("../pages/users/Users"));
const Profile = withSuspense(() => import("../pages/profile/Profile"));
const NotFound = withSuspense(() => import("../pages/not-found"));

export const routes = createBrowserRouter([
  {
    path: paths.HOME,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: paths.PRODUCTS,
        element: <Products />,
      },
      {
        path: paths.USERS,
        element: <Users />,
      },
      {
        path: paths.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: paths.NOT_FOUND,
    element: <NotFound />,
  },
]);
