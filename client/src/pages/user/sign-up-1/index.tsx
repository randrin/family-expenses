import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Signup = asyncComponent(
  () => import("../../../modules/userPages/UserPages/Signup")
);
export default AppPage(() => <Signup />);
