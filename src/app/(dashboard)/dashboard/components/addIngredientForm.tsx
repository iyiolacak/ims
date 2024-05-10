"use client";
import { useMutation } from 'convex/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { addIngredientToInventory } from '@/../convex/ingredientFunctions';
import { api } from '@/../convex/_generated/api';

interface IngredientFormInputs {
  name: string;
  quantity: number;
  unit: string;
  supplierId: string;
  costPerUnit: number;
}

const IngredientForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IngredientFormInputs>();
  const addIngredient = useMutation(api.ingredientFunctions.addIngredientToInventory);  // Directly use the mutation function

  const onSubmit = async (data: IngredientFormInputs) => {
    try {
      const result = await addIngredient(data);
      console.log('Ingredient added successfully', result);
      reset();  // Reset form fields after submission
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex justify-between rounded-xl bg-gray-100">
      <div>
        <label>Name</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" {...register("quantity", { required: "Quantity is required", valueAsNumber: true})} />
        {errors.quantity && <p className='text-red-600 text-sm'>{errors.quantity.message}</p>}
      </div>
      <div>
        <label>Unit</label>
        <input {...register("unit", { required: "Unit is required" })} />
        {errors.unit && <p className='text-red-600 text-sm'>{errors.unit.message}</p>}
      </div>
      <div>
        <label>Supplier ID</label>
        <input {...register("supplierId", { required: "Supplier ID is required" })} />
        {errors.supplierId && <p className='text-red-600 text-sm'>{errors.supplierId.message}</p>}
      </div>
      <div>
        <label>Cost Per Unit</label>
        <input type="number" {...register("costPerUnit", { required: "Cost per unit is required", valueAsNumber: true} )} />
        {errors.costPerUnit && <p className='text-red-600 text-sm'>{errors.costPerUnit.message}</p>}
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Ingredient</button>
    </form>
  );
};

export default IngredientForm;
