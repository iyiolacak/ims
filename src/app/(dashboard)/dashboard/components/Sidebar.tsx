"use client";
import React, { useState, useEffect, useCallback, useRef, MutableRefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
import { useUser } from "@clerk/clerk-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenuButton from "@/components/ui/UserMenuButton";
import sidebarData from "@/app/sidebarData";

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [activeTop, setActiveTop] = useState(0);
  const activeRef = useRef<HTMLAnchorElement | null>(null) as MutableRefObject<HTMLAnchorElement | null>;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const setActiveRef = useCallback((node: HTMLAnchorElement) => {
    if (node !== null) {
      activeRef.current = node;
      setActiveTop(node.offsetTop);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && activeRef.current) {
      setActiveTop(activeRef.current.offsetTop);
    }
  }, [pathname, isLoaded, isOpen]);

  return (
    <div
      className={clsx(
        "hidden md:block sticky top-0 bg-background border-r transition-all overflow-hidden",
        {
          "min-w-[275px]": isOpen,
          "min-w-[60px]": !isOpen,
        },
        className
      )}
    >
      <div>
        <div className="flex justify-end my-1 mx-3">
          <Button
            className="hover:bg-white rounded-lg p-2"
            variant={"ghost"}
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </Button>
        </div>
        <div className="p-3">
          <UserMenuButton isOpen={isOpen} />
        </div>
        {sidebarData.map((section, index) => (
          <div key={index}>
            {isOpen && (
              <div className="mt-2 mb-2 px-6 uppercase text-slate-400 text-xs font-medium transition-opacity duration-300 ease-in-out">
                {section.section}
              </div>
            )}
            {section.items.map((item, itemIndex) => (
              <Link
                href={item.route}
                key={itemIndex}
                ref={pathname === item.route ? setActiveRef : null}
                className={clsx(
                  "relative flex items-center p-2.5 transition-all w-full",
                  {
                    "pl-4 text-black hover:text-black": pathname === item.route,
                    "pl-4 text-slate-600 hover:text-slate-400":
                      pathname !== item.route,
                      "justify-center": !isOpen,
                  }
                )}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={clsx("transition-all", {
                    "text-black hover:text-black": pathname === item.route,
                    "text-slate-400": pathname !== item.route,
                    "size-5": !isOpen,
                    "size-4 border-none p-0": isOpen,
                  })}
                />
                <p
                  className={clsx(
                    "text-md font-medium ml-4 transition-opacity duration-300 ease-in-out",
                    { "opacity-100": isOpen, "opacity-0 hidden": !isOpen }
                  )}
                >
                  {item.name}
                </p>
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
