import { Button } from "@/components/ui/button";
import React from "react";
interface CardProps {
  title: string;
  description: string;
  mainContent: any;
  footerContent: any;
  buttons: any;
  gradient: any;
  illustration: string;
  icon?: any;
}
const Card = ({
  title,
  description,
  mainContent,
  footerContent,
  buttons,
  icon,
  gradient,
  illustration,
}: CardProps) => {
  return (
    <div className="border bg-white shadow-sm rounded-xl w-[24rem] h-80">
    </div>
  );
};

export default Card;
