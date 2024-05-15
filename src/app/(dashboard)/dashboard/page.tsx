import React from "react";
import IngredientForm from "./components/addIngredientForm";
import WelcomeSection from "./components/WelcomeSection";
import Card from "./components/Card";

const Dashboard = () => {
  return (
    <div className="">
      <div>
        <WelcomeSection />
        <div className="grid grid-cols-2 gap-6">
        <Card title="December Report" description="Retrieve December report, analyze key data for informed strategic decisions." mainContent={"test here"} footerContent={"footer content"} buttons={<button>Analyze</button>} gradient={""} illustration=""/>
        <Card title="December Report" description="Retrieve December report, analyze key data for informed strategic decisions." mainContent={"test here"} footerContent={"footer content"} buttons={<button>Analyze</button>} gradient={""} illustration=""/>
        <Card title="December Report" description="Retrieve December report, analyze key data for informed strategic decisions." mainContent={"test here"} footerContent={"footer content"} buttons={<button>Analyze</button>} gradient={""} illustration=""/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
