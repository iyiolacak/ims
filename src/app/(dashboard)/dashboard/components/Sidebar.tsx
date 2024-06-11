"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@clerk/clerk-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenuButton from "@/components/ui/UserMenuButton";
import sidebarData from "@/app/sidebarData";
import { motion } from "framer-motion";
import Image from "next/image";

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [activeTop, setActiveTop] = useState(0);
  const activeRef = useRef<HTMLAnchorElement | null>(
    null
  ) as MutableRefObject<HTMLAnchorElement | null>;
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
    <motion.div
      initial={{ width: "60px" }}
      animate={{ width: isOpen ? "275px" : "60px" }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "hidden md:block sticky top-0 bg-background shrink-0 border-r overflow-hidden",
        className
      )}
    >
      <div>
        <div className={clsx("flex justify-between my-1 mx-3 items-center", {"px-2": isOpen})}>
          <div className={clsx("", {"block": isOpen, "hidden": !isOpen})}>
            <Link href={"/"} className="text-xl text-slate-700">
            ▲
            </Link>
          </div>
          <Button
            className="hover:bg-white rounded-lg p-2"
            variant={"ghost"}
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </Button>
        </div>
        <div className={clsx("px-3 mt-2", { "mb-6 mt-6": !isOpen})}>
          <UserMenuButton isOpen={isOpen} />
        </div>
        {sidebarData.map((section, index) => (
          <div key={index}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="my-1 px-6 uppercase text-slate-400 text-xs font-medium"
              >
                {section.section}
              </motion.div>
            )}
            {section.items.map((item, itemIndex) => (
              <Link
                href={item.route}
                key={itemIndex}
                ref={pathname === item.route ? setActiveRef : null}
                className={clsx(
                  "relative flex items-center text-sm py-2 transition-all w-full",
                  {
                    " text-black hover:text-black": pathname === item.route,
                    " text-slate-600 hover:text-slate-400":
                      pathname !== item.route,
                    "pl-0 justify-center": !isOpen,
                    "pl-6": isOpen,

                  }
                )}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={clsx({
                    "text-black hover:text-black": pathname === item.route,
                    "text-slate-400": pathname !== item.route,
                  })}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={clsx("text-md font-medium ml-4", {
                    hidden: !isOpen,
                  })}
                >
                  {item.name}
                </motion.p>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <motion.span
        className="absolute left-0 w-[2px] bg-black"
        initial={{ top: 0, height: "0px" }}
        animate={{
          top: isLoaded ? activeTop : 0,
          height: isLoaded ? "44px" : "0px",
        }}
        transition={{ duration: 0.2 }}
      ></motion.span>
    </motion.div>
  );
};

export default Sidebar;
