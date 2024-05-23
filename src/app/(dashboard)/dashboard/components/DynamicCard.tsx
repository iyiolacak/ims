import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  Key,
  RocketIcon,
  SparkleIcon,
  SparklesIcon,
} from "lucide-react";
import styles from "@/app/card.module.css";

import React, { createContext, useContext } from "react";
import Hashtag, { Tag } from "./Hashtag";
import CardGrowthMiniCard from "./CardGrowthMiniCard";
import RevenueChart from "./RevenueChart";
import Products from "../products/page";
import Link from "next/link";
import { salesData } from "../page";
import DynamicTitle from "./DynamicTitle";
import { isContext } from "vm";

interface DynamicCardProps {
  dataTitle: string;
  dataMonth: string;
  dataValue: string | number;
  dataValuePrefix?: string;
  dataValueSuffix?: string;
  unit?: string;
  tags: Tag[];
}
const DynamicCard: React.FC<DynamicCardProps> = ({
  dataTitle,
  dataValue,
  dataMonth,
  dataValuePrefix,
  dataValueSuffix,
  unit,
  tags,
}) => {
  const formatDataValue = (value: string | number) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };
  const formattedDataValue = formatDataValue(dataValue);
  return (
    <div className="relative z-20 overflow-hidden border bg-white shadow-sm rounded-2xl w-[24rem] h-80 flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col h-64 justify-start p-6">
          <DynamicTitle dataTitle={dataTitle} dataMonth={dataMonth} />
          <div className="flex w-content rounded-xl cursor-pointer group">
            <h2 className="text-5xl font-bold mt-1 group-hover:text-slate-800 transition-colors">
              {dataValuePrefix && <span>{dataValuePrefix}</span>}
              {formattedDataValue}
              {dataValueSuffix && <span>{dataValueSuffix}</span>}
            </h2>
          </div>
          <div className="mt-2 w-content flex gap-2">
            {tags?.map((tag, index) => <Hashtag key={index} tag={tag} />)}
            {/* <Hashtag HashtagName="iPhone 15" />
            <Hashtag HashtagName="Macbook M2" /> */}
          </div>
        </div>
        <div className="flex items-start justify-end w-full h-full">
          <Button
            className="mr-4 mt-4 px-3 py-1 rounded-xl text-slate-400"
            variant={"ghost"}
          >
            <Ellipsis />
          </Button>
        </div>
      </div>
      <div className="absolute z-10 bottom-0 right-0 w-64 h-40 pr-0">
        <RevenueChart />
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none fade-effect"></div>
      </div>
      <div className="flex flex-row justify-between items-end p-6 space-x-3">
        <CardGrowthMiniCard growthPositive={true} percentageChange={26.72} />
      </div>
    </div>
  );
};

export default DynamicCard;
