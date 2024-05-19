import clsx from "clsx";
import { MoveUpRight } from "lucide-react";
import React from "react";
interface CardGrowthMiniCardInterface {
  growthPositive: boolean;
  percent: number;
}
const CardGrowthMiniCard = ({
  growthPositive,
  percent,
}: CardGrowthMiniCardInterface) => {
  return (
    <div
      className={clsx(
        `flex flex-row py-0.5 px-2 border-2 rounded-md ${growthPositive ? "border-blue-700" : "border-red-500"}`
      )}
    >
      <p
        className={clsx(
          `flex flex-row font-semibold text-sm items-center justify-center', ${growthPositive ? "text-blue-700" : "text-red-500"}`
        )}
      >
        <MoveUpRight size={16} strokeWidth={2} /> &nbsp;
        {percent}
        <span className="pl-[0.25px] font-bold">%</span>
      </p>
    </div>
  );
};

export default CardGrowthMiniCard;
