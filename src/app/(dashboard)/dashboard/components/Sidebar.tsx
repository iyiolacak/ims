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
import useShortcut from "@/hooks/useShortcut";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Logo from "./Logo";

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [activeTop, setActiveTop] = useState(0);
  const activeRef = useRef<HTMLAnchorElement | null>(
    null,
  ) as MutableRefObject<HTMLAnchorElement | null>;
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useShortcut("s", toggleSidebar);

  const setActiveRef = useCallback((node: HTMLAnchorElement) => {
    if (node !== null) {
      activeRef.current = node;
      console.log("Node offsetTop:", node.offsetTop); // Log offsetTop
      setActiveTop(node.offsetTop);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && activeRef.current) {
      console.log("ActiveRef offsetTop:", activeRef.current.offsetTop); // Log activeRef offsetTop
      setActiveTop(activeRef.current.offsetTop);
    }
  }, [pathname, isLoaded, isOpen]);

  const bezierCurve = [0, 0.33, 0.28, 1]; // Apple-like easing

  return (
    <motion.div
      initial={{ width: "275px" }}
      animate={{ width: isOpen ? "275px" : "60px" }}
      transition={{ duration: 0.3, ease: bezierCurve }}
      className={clsx(
        "sticky top-0 z-50 hidden shrink-0 overflow-hidden border-r bg-background md:block",
        className,
      )}
    >
      <div>
        <div
          className={clsx("mx-3 my-1 flex items-center justify-between", {
            "pl-2": isOpen,
          })}
        >
            {isOpen && <Logo />}

          {/* Shrink sidebar button */}
          <HoverCard openDelay={0} closeDelay={-1}>
            <HoverCardTrigger>
              <Button
                className={clsx(
                  "rounded-lg p-2 hover:bg-white hover:text-black",
                )}
                variant={"ghost"}
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <ChevronsLeft size={16} />
                ) : (
                  <ChevronsRight size={16} />
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
            
              side="right"
              className="flex h-full w-full items-center justify-center border-none rounded-xl border border-neutral-700 bg-neutral-900 px-2 py-1.5"
            >
              <div className="flex items-center">
                <span className="flex justify-center text-center text-xs text-white">
                  {isOpen ? "Shrink" : "Expand"} the sidebar
                </span>
                <span className="ml-1 items-center justify-center rounded-md border bg-white px-1.5 py-0.5 text-xs font-semibold">
                  S
                </span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className={clsx("mt-2 px-3", { "mb-6 mt-6": !isOpen })}>
          <UserMenuButton isOpen={isOpen} />
        </div>
        {sidebarData.map((section, index) => (
          <div key={index}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}

                transition={{ duration: 0.3, ease: bezierCurve }}
              >
                <div className="my-1 text-nowrap px-6 text-xs font-medium uppercase text-slate-400">
                  {section.section}
                </div>
              </motion.div>
            )}
            {section.items.map((item, itemIndex) => (
              // the sidebar elements dropping down animation
              <motion.div
                key={itemIndex}
                initial={{
                  opacity: 0,
                  height: 1,
                  margin: 0,
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  margin: "8px 0",
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, height: 1, margin: 0, filter: "blur(2px)" }}
                transition={{
                  duration: 0.5,
                  ease: bezierCurve,
                  filter: { duration: 0.4, ease: bezierCurve },
                }}
              >
                <Link
                  href={item.route}
                  ref={pathname === item.route ? setActiveRef : null}
                  className={clsx(
                    "relative flex w-full items-start py-2 pl-6 text-sm transition-all",
                    {
                      "text-black hover:text-black": pathname === item.route,
                      "text-slate-600 hover:text-slate-400":
                        pathname !== item.route,
                    },
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
                    initial={{ opacity: 0, transform: "translateX(-20px)", filter: "blur(2px)" }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                      filter: isOpen ? "blur(0px)" : "blur(2px)",

                    }}
                    transition={{ duration: 0.2, ease: bezierCurve, filter: {duration: 0.1, bezier: bezierCurve } }}
                    className={clsx("text-md ml-4 text-nowrap font-medium", {
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
