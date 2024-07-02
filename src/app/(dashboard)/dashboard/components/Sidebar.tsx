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
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [activeTop, setActiveTop] = useState(0);
  const activeRef = useRef<HTMLAnchorElement | null>(
    null
  ) as MutableRefObject<HTMLAnchorElement | null>;
  const [isOpen, setIsOpen] = useState(true);

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

  const bezierCurve = [0, 0, 0.58, 1.0]; // Apple-like easing
  const bezierBlurCurve = [0.42, 0, 0.58, 1.0] // Apple initial blur curve

  return (
    <motion.div
      initial={{ width: "275px" }}
      animate={{ width: isOpen ? "275px" : "60px" }}
      transition={{ duration: 1, ease: bezierCurve }}
      className={clsx(
        "hidden md:block sticky top-0 bg-background shrink-0 border-r overflow-hidden",
        className
      )}
    >
      <div>
        <div className={clsx("flex justify-between my-1 mx-3 items-center", { "px-2": isOpen })}>
          <div className={clsx("", { "block": isOpen, "hidden": !isOpen })}>
            <Link href={"/"} className="text-xl text-slate-700">
              ▲
            </Link>
          </div>
          <Button
            className={clsx("hover:bg-white hover:text-black rounded-lg p-2")}
            variant={"ghost"}
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </Button>
        </div>
        <div className={clsx("px-3 mt-2", { "mb-6 mt-6": !isOpen })}>
          <UserMenuButton isOpen={isOpen} />
        </div>
        {sidebarData.map((section, index) => (
          <div key={index}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, filter: "blur(3px)" }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.05, ease: bezierCurve, filter: { duration: 0.1, ease: bezierCurve } }}
                  className="my-1 px-6 uppercase text-slate-400 text-xs font-medium text-nowrap"
                >
                  {section.section}
                </motion.div>
              )}
            </AnimatePresence>
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, height: 1, margin: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, height: "auto", margin: "8px 0", filter: "blur(0px)" }}
                exit={{ opacity: 0, height: 1, margin: 0, filter: "blur(3px)" }}
                transition={{ duration: 0.7, ease: bezierCurve, filter: { duration: 0.4, ease: bezierCurve } }}
              >
                <Link
                  href={item.route}
                  ref={pathname === item.route ? setActiveRef : null}
                  className={clsx(
                    "relative flex items-start text-sm py-2 transition-all w-full pl-6",
                    {
                      " text-black hover:text-black": pathname === item.route,
                      " text-slate-600 hover:text-slate-400": pathname !== item.route,
                    }
                  )}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={clsx({
                      "text-black hover:text-black": pathname === item.route,
                      "text-slate-400": pathname !== item.route,
                    })}
                    size="lg"
                  />
                  <motion.p
                    initial={{ opacity: 0, transform: "translateX(-20px)" }}
                    animate={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "translateX(0)" : "translateX(-20px)" }}
                    transition={{ duration: 0.3 }}
                    className={clsx("text-md font-medium ml-4 text-nowrap", {
                      hidden: !isOpen,
                    })}
                  >
                    {item.name}
                  </motion.p>
                </Link>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      {/* Black line - active sidebar element indicator */}
      <motion.span
        className="absolute left-0 w-[2px] bg-black"
        initial={{ top: 0, height: "0px" }}
        animate={{
          top: activeTop,
          height: "44px", // Adjust this height to match the height of your sidebar items
        }}
        transition={{ duration: 0.3, ease: bezierCurve }}
      ></motion.span>
    </motion.div>
  );
};

export default Sidebar;
