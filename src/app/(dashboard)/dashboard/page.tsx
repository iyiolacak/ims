import React from "react";
import IngredientForm from "./components/addIngredientForm";
import WelcomeSection from "./components/WelcomeSection";

const Dashboard = () => {
  return <div className="">
    <div className="pb-4">
    <WelcomeSection/>
    </div>
    <IngredientForm/>
  </div>;
};

export default Dashboard;
