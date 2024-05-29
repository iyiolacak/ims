import {
    Smartphone,
    Laptop,
    Monitor,
    Tablet,
    Watch,
    Headphones,
    Glasses, // Ensure this is a valid import from lucide-react or replace with a valid icon
  } from "lucide-react";
  
  export const categories = [
    {
      categoryIcon: <Smartphone />,
      categoryName: "Smartphones",
      categoryVolume: 67890,
      categoryValue: "smartphones",
    },
    {
      categoryIcon: <Laptop />,
      categoryName: "Laptops",
      categoryVolume: 23456,
      categoryValue: "laptops",
    },
    {
      categoryIcon: <Monitor />,
      categoryName: "Monitors",
      categoryVolume: 34567,
      categoryValue: "monitors",
    },
    {
      categoryIcon: <Tablet />,
      categoryName: "Tablets",
      categoryVolume: 45678,
      categoryValue: "tablets",
    },
    {
      categoryIcon: <Watch />,
      categoryName: "Watches",
      categoryVolume: 56789,
      categoryValue: "watches",
    },
    {
      categoryIcon: <Headphones />,
      categoryName: "Headphones",
      categoryVolume: 67890,
      categoryValue: "headphones",
    },
    {
      categoryIcon: <Glasses />, // Ensure this icon exists in lucide-react, otherwise use a valid one
      categoryName: "Wearables",
      categoryVolume: 78901,
      categoryValue: "wearables",
    },
  ];
  export const categoriesEmpty = []
  