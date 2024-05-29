import React from "react";
import FormCard from "./FormCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ProductSettingsSection = () => {
  return (
    <FormCard title="Settings">
      <div className="flex items-center justify-between">
        <Label htmlFor="limited-product" className="data-[state=checked]:bg-blue-700">Limit Product Availability</Label>
        <Switch id="limited-product"/>
      </div>
    </FormCard>
  );
};

export default ProductSettingsSection;
