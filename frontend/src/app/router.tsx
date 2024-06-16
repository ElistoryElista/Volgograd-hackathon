import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import {
  ConfirmPhone,
  Home,
  NoMatch,
  Login,
  Registration,
  ForgetPassword,
  Profile,
  Constructor,
} from "@/pages";
import { Recommendation } from "@/pages/recommendation";
import { PrivatPolicy } from "@/pages/privat-policy";
import { TermsUse } from "@/pages/terms-use";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "profile", element: <Profile /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "trip", element: <Constructor /> },
      { path: "recommendation", element: <Recommendation /> },
      { path: "policy", element: <PrivatPolicy /> },
      { path: "use-conditions", element: <TermsUse /> },
      {
        path: "confirm/:action",
        element: <ConfirmPhone />,
      },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
