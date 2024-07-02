import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
type FormValues = {
  cart: {
    name: string;
    amount: number;
  }[];
};
const FieldBuilderForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      cart: [{ name: "", amount: 0 }],
    },
  });
  const { fields } = useFieldArray({
    name: "cart",
    control,
  });
  return (
    <div>
      <form
        onSubmit={(data) => {
          console.log("Submit data", data);
        }}
      >
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>
              <span>Name</span>
            </label>
            <input {...register(`cart.${index}.name`)} />
            <label>
              <span>Amount</span>
            </label>
            <input
              type="number"
              {...register(`cart.${index}.amount`, { valueAsNumber: true })}
            />
          </section>
        ))}
        <button type="submit">Submit</button>
      </form>
      <div>FieldBuilderForm</div>
    </div>
  );
};

export default FieldBuilderForm;
