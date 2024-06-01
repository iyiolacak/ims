"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

// Define the validation schema
const schema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const FormComponent = () => {
  // Initialize react-hook-form with zod validation
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      terms: false, // Set default value to false
    },
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Handle checkbox change
  const handleCheckedChange = (value: boolean) => {
    setValue("terms", value, { shouldValidate: true });
  };

  // Watch the terms field value
  const terms = watch("terms");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="flex items-center">
        <Checkbox.Root
          id="terms"
          checked={terms}
          onCheckedChange={(value) => handleCheckedChange(value as boolean)}
          {...register("terms")}
          className="mr-2"
        >
          <Checkbox.Indicator className="text-xl">
            <Check className="w-5 h-5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor="terms">I accept terms & conditions</label>
      </div>
      {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
