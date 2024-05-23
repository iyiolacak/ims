import clsx from "clsx";
import { MoveDownLeft, MoveDownRight, MoveUpLeft, MoveUpRight } from "lucide-react";
import React from "react";
interface CardGrowthMiniCardInterface {
  growthPositive: boolean;
  percentageChange: number;
}
const CardGrowthMiniCard = ({
  growthPositive,
  percentageChange,
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
        {growthPositive ? <MoveUpRight size={16} strokeWidth={2} /> : <MoveDownRight size={16} strokeWidth={2} /> }<span className="pl-0.5 select-none">
        {percentageChange}
        <span className="pl-[0.25px] font-bold">%</span></span>
      </p>
    </div>
  );
};

export default CardGrowthMiniCard;
