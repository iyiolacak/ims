import React from "react";
import { Button } from "@/components/ui/button";
import { RocketIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import styles from "@/app/card.module.css";

interface CardProps {
  title: string;
  description: string;
  className?: string;
}
const Card: React.FC = ({ title, description, className }: CardProps) => {
  return (
    <div
      className={`relative flex h-80 w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${className}`}
    >
      <div className="absolute left-4 top-4 z-[1] size-14 rounded-full bg-white shadow-md shadow-blue-700/20">
        <RocketIcon className="mx-auto size-7 h-full text-blue-700" />
      </div>
      <div className={`bg-white ${styles.card}`}></div>
      <div className="flex h-64 flex-col justify-end p-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-md mb-4 mt-2 w-80 text-slate-400">{description}</p>
        <div className="space-x-3">
          <Button className="bg-blue-700" size={"lg"} variant={"default"}>
            Analyze This &nbsp;
            {<SparklesIcon size={16} />}
          </Button>
          <Button className="font-medium" size={"lg"} variant={"link"}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
