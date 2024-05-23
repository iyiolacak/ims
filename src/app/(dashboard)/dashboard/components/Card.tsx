import { Button } from "@/components/ui/button";
import { RocketIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import styles from "@/app/card.module.css";

import React from "react";
interface CardProps {
  title: string;
  description: string;
}
const Card = ({
  title,
  description,
}: CardProps) => {
  return (
    <div className="flex relative overflow-hidden border bg-white shadow-sm rounded-2xl w-[24rem] h-80 flex-col">
      <div className="absolute z-[1] top-4 left-4 size-14 rounded-full bg-white shadow-md shadow-blue-700/20">
        <RocketIcon className="size-7 mx-auto h-full text-blue-700 "/>
      </div>
      <div className={`bg-white ${styles.card}`}></div>
      <div className="flex flex-col h-64 justify-end p-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-2 text-slate-400 text-md w-80 mb-4">
          {description}
        </p>
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
