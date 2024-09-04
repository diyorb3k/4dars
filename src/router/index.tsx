import React, { Suspense, lazy, ComponentType } from "react";
import { Spin } from "antd";

// Generik tiplarni belgilash
const withSuspense = <P extends object>(cb: () => Promise<{ default: ComponentType<P> }>) => {
  const LazyComponent = lazy(cb);

  return (props: React.ComponentPropsWithoutRef<ComponentType<P>>) => (
    <Suspense fallback={<Spin fullscreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Lazy yuklangan komponentlar
const Layout = withSuspense(() => import("../layout/layout"));
const Dashboard = withSuspense(() => import("../pages/dashboard/Dashboard"));
const Products = withSuspense(() => import("../pages/products/Products"));
const Users = withSuspense(() => import("../pages/users/Users"));
const Profile = withSuspense(() => import("../pages/profile/Profile"));
const NotFound = withSuspense(() => import("../pages/not-found"));

// Router konfiguratsiyasi
import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";

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
