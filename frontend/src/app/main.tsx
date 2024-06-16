import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "@/app/store";

import "./index.css";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>,
);
