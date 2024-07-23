import {
  faBagShopping,
  faBook,
  faBox,
  faChartColumn,
  faCog,
  faDashboard,
  faEllipsisH,
  faQuestionCircle,
  faReceipt,
  faShoppingCart,
  faSubscript,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarData = [
  {
    items: [
      { name: "Dashboard", icon: faChartColumn, route: "/dashboard" },
      { name: "Analytics", icon: faDashboard, route: "/dashboard/analytics" },
    ],
  },
  {
    section: "Account",
    items: [
      { name: "Account", icon: faUser, route: "/dashboard/account" },
      {
        name: "My Publishing",
        icon: faBook,
        route: "/dashboard/my-publishing",
      },
      { name: "Products", icon: faBox, route: "/dashboard/products" },
      { name: "Orders", icon: faReceipt, route: "/dashboard/orders" },
      { name: "More", icon: faEllipsisH, route: "/dashboard/more" },
    ],
  },
  {
    section: "Other Menu",
    items: [
      { name: "Setting", icon: faCog, route: "/dashboard/setting" },
      { name: "Help", icon: faQuestionCircle, route: "/dashboard/help" },
    ],
  },
];
export default sidebarData;
