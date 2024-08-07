import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Mail = dynamic(() => import("../../../modules/apps/Mail"), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Mail />);
