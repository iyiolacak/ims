"use client";
import React from "react";
import WelcomeSection from "./components/WelcomeSection";
import Card from "./components/Card";
import DynamicCard from "./components/DynamicCard";
import AddProductButton from "./components/AddProductButton";
import TableComponent from "./components/TableComponent";
import clsx from "clsx";
import { motion } from "framer-motion";

const revenueData = [
  {
    productName: "iMac M3",
    revenue: 287000,
  },
  {
    productName: "Macbook M2",
    revenue: 12000,
  },
];

export const salesData = [
  {
    productName: "iPhone 15",
    sold: 1597,
  },
  {
    productName: "Macbook M4",
    sold: 543,
  },
];

const Dashboard = () => {
  const [isHidden, setIsHidden] = React.useState<boolean>(true);

  return (
    <div className="w-full">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row justify-between"
        >
          <WelcomeSection />
          <AddProductButton className="mt-3" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-grow gap-1.5 shadow-sm"
        >
          <Card
            title="December Report"
            description="Retrieve December report, analyze key data for informed strategic decisions."
            className={clsx({
              block: isHidden,
              hidden: !isHidden,
            })}
          />
          <DynamicCard
            dataMonth="December"
            dataTitle="income"
            dataValue={287000} // Data comes as direct number as like "287000" rather than "287.000"
            dataValuePrefix="$"
            tags={revenueData}
            growthPositive={true}
            percentageChange={18.24}
            className={clsx({
              block: isHidden,
              hidden: !isHidden,
            })}
          />
          <DynamicCard
            dataMonth="December"
            dataTitle="sales"
            dataValue={4.2} // Data comes formatted from the backend as like "4.2" rather than "4286"
            dataValueSuffix="k"
            tags={salesData}
            growthPositive={false}
            percentageChange={9.18}
            className={clsx({
              block: isHidden,
              hidden: !isHidden,
            })}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TableComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
