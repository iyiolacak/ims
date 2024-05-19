import React from "react";
import IngredientForm from "./components/addIngredientForm";
import WelcomeSection from "./components/WelcomeSection";
import Card from "./components/Card";
import TableComponent from "./components/TableComponent";
import Card2 from "./components/Card2";

const Dashboard = () => {
  return (
    <div className="">
      <div>
        <WelcomeSection />
        <div className="flex gap-1.5">
          <Card
            title="December Report"
            description="Retrieve December report, analyze key data for informed strategic decisions."
            mainContent={"test here"}
            footerContent={"footer content"}
            buttons={<button>Analyze</button>}
            gradient={""}
            illustration=""
          />
          <Card2/>
          <Card
            title="December Report"
            description="Retrieve December report, analyze key data for informed strategic decisions."
            mainContent={"test here"}
            footerContent={"footer content"}
            buttons={<button>Analyze</button>}
            gradient={""}
            illustration=""
          />
        </div>
        <div className="w-full">
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
