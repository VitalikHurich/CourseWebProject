import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardClient from "views/DashboardClient/DashboardClient.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";

const dashboardRoutes = [
  {
    path: "/statistics",
    name: "Главная",
    rtlName: "Главная",
    icon: Dashboard,
    component: DashboardClient,
    layout: "/rtl"
  },
  {
    path: "/user",
    name: "Профиль",
    rtlName: "Профиль",
    icon: Person,
    component: UserProfile,
    layout: "/rtl"
  },
  {
    path: "/table",
    name: "Расписание",
    rtlName: "Расписание",
    icon: "content_paste",
    component: TableList,
    layout: "/rtl"
  },
];

export default dashboardRoutes;
