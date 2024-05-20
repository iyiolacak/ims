import { Button } from "@/components/ui/button";
import { RocketIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import styles from "@/app/card.module.css";

import React from "react";
import Hashtag from "./Hashtag";
import CardGrowthMiniCard from "./CardGrowthMiniCard";
import RevenueChart from "./RevenueChart";
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
const Card2 = () => {
  return (
    <div className="relative z-20 overflow-hidden border bg-white shadow-sm rounded-2xl w-[24rem] h-80 flex flex-col">
      <div className="flex flex-col h-64 justify-start p-6">
        <p className="mt-2 text-slate-400 text-md w-80">December income</p>
        <h2 className="text-5xl font-bold mt-1">$287,000</h2>
        <div className="mt-2 w-content flex gap-2">
          <Hashtag HashtagName="iPhone 15" />
          <Hashtag HashtagName="Macbook M2" />
        </div>
      </div>
      <div className="absolute z-10 bottom-0 right-0 w-64 h-40 pr-0">
        <RevenueChart />
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none fade-effect"></div>
      </div>
      <div className="flex flex-row justify-between items-end p-6 space-x-3">
        <CardGrowthMiniCard growthPositive={true} percent={26.72} />
      </div>
    </div>
  );
};

export default Card2;