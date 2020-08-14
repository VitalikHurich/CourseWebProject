import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Courses/Typography.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Главная",
    rtlName: "Главная 1",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Управление пользователями",
    rtlName: "Профиль 1",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Редактирование расписания",
    rtlName: "Расписание 1",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Управление курсами",
    rtlName: "Курсы 1",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
];

export default dashboardRoutes;
