import React from "react";
import WelcomeSection from "./components/WelcomeSection";
import Card from "./components/Card";
import DynamicCard from "./components/DynamicCard";
import AddProductButton from "./components/AddProductButton";
import TableComponent from "./components/TableComponent";

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
  return (
    <div className="">
      <div>
        <div className="flex flex-row justify-between">
          <WelcomeSection />
          <AddProductButton className="mt-3" />
        </div>
        <div className="flex gap-1.5 *:shadow-sm">
          <Card
            title="December Report"
            description="Retrieve December report, analyze key data for informed strategic decisions."
          />
          <DynamicCard
            dataMonth="December"
            dataTitle="income"
            dataValue={287000} // Data comes as direct number as like "287000" rather than "287.000"
            dataValuePrefix="$"
            tags={revenueData}
            growthPositive={true}
            percentageChange={18.24}
          />
          <DynamicCard
            dataMonth="December"
            dataTitle="sales"
            dataValue={4.2} // Data comes formatted from the backend as like "4.2" rather than "4286"
            dataValueSuffix="k"
            tags={salesData}
            growthPositive={false}
            percentageChange={9.18}
          />
        </div>
        <TableComponent />
      </div>
    </div>
  );
};

export default Dashboard;
