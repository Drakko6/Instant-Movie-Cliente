//Layouts

import LayoutBasic from "../layouts/LayoutBasic";
import LayoutBasic3 from "../layouts/LayoutBasic3";
//Paginas
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import Confirmation from "../pages/Confirmation";
import Explore from "../pages/Explore";
import ExploreLists from "../pages/ExploreLists";

const routes = [
  {
    path: "/",
    layout: LayoutBasic,
    component: Home,
    exact: true,
  },
  {
    path: "/explore-lists",
    layout: LayoutBasic,
    component: ExploreLists,
    exact: true,
  },

  {
    path: "/explore",
    layout: LayoutBasic3,
    component: Explore,
    exact: true,
  },
  // {
  //   path: "/messenger",
  //   layout: LayoutBasic,
  //   component: Messenger,
  //   exact: true,
  // },

  {
    path: "/user/confirm/:token",
    layout: LayoutBasic,
    component: Confirmation,
    exact: true,
  },

  {
    path: "/:username",
    layout: LayoutBasic3,
    component: User,
    exact: true,
  },

  {
    layout: LayoutBasic,
    component: Error404,
  },
];

export default routes;
