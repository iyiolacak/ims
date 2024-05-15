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
    <div className="border bg-white shadow-sm rounded-xl w-[24rem] h-80 p-6">
        <div className="">

        </div>
        <div className="flex flex-col h-64 justify-end">
            <h2 className="text-3xl font-bold">
                December Report
            </h2>
            <p className="mt-2 text-slate-400 text-md w-80 mb-4">
                Retrieve December report, analyze key data for informed strategic decisions. 
            </p>
            <div className="space-x-3">
                <Button className="h-12 bg-[#4a38ba] rounded-xl" size={"lg"}>Analyze This</Button>
                <Button className="h-12 border bg-[#d1cee5] rounded-xl text-black font-medium" size={"lg"}>Download</Button>
            </div>
        </div>
    </div>
  );
};

export default Card;
