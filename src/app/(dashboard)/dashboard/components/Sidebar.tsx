"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faDashboard,
  faUser,
  faBook,
  faBox,
  faShoppingCart,
  faEllipsisH,
  faCog,
  faQuestionCircle,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import UserMenuButton from "@/components/ui/UserMenuButton";
import { useUser } from "@clerk/clerk-react";

const sidebarData = [
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
      { name: "Orders", icon: faShoppingCart, route: "/dashboard/orders" },
      { name: "More", icon: faEllipsisH, route: "/dashboard/more" },
    ],
  },
  {
    section: "Other Menu",
    items: [
      { name: "Setting", icon: faCog, route: "/dashboard/setting" },
      { name: "Help", icon: faQuestionCircle, route: "/dashboard/help" },
      {
        name: "Subscriptions",
        icon: faReceipt,
        route: "/dashboard/subscriptions",
      },
    ],
  },
];

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [activeTop, setActiveTop] = useState(0);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isLoaded && activeRef.current) {
      setActiveTop(activeRef.current.offsetTop);
    }
  }, [pathname, isLoaded]);

  const setActiveRef = useCallback((node: any) => {
    if (node !== null) {
      setActiveTop(node.offsetTop);
    }
  }, []);

  return (
    <div className={`hidden md:block min-w-[275px] min-h-full bg-background border-r overflow-hidden relative ${className}`}>
      <div>
        <div className="p-3 mt-2">
          <UserMenuButton />
        </div>
        {sidebarData.map((section, index) => (
          <div key={index}>
            <div className="mt-2 mb-2 px-6 uppercase text-slate-400 text-xs font-md">
              {section?.section}
            </div>
            {section.items.map((item, itemIndex) => (
              <Link
                href={item.route}
                key={itemIndex}
                ref={pathname === item.route ? setActiveRef : null}
                className={clsx(
                  "relative flex items-center p-2.5 pl-4 space-x-4 transition-all ",
                  {
                    "text-black hover:text-black": pathname === item.route,
                    "text-slate-600 hover:text-slate-400":
                      pathname !== item.route,
                  }
                )}
                style={{ paddingLeft: "16px" }} // Ensure the same padding on both active and inactive states
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={clsx("size-4", {
                    "text-black hover:text-black": pathname === item.route,
                    "text-slate-400": pathname !== item.route,
                  })}
                />
                <p className="text-md font-medium">{item.name}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <span
        className="absolute left-0 w-[2px] bg-black transition-all duration-300"
        style={{
          top: isLoaded ? activeTop : 0,
          height: !isLoaded ? "0px" : "44px",
        }} // Adjust height as needed
      ></span>
    </div>
  );
};

export default Sidebar;
