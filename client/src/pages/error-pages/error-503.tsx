import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Error503 = asyncComponent(
  () => import("../../modules/errorPages/Error503")
);
export default AppPage(() => <Error503 />);
