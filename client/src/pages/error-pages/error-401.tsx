import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Error401 = asyncComponent(
  () => import("../../modules/errorPages/Error401")
);
export default AppPage(() => <Error401 />);
