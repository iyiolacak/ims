import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";

function AddressForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      addresses: [{ street: "", city: "", zip: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Input
            {...register(`addresses.${index}.street`)}
            placeholder="Street"
          />
          <Input
            {...register(`addresses.${index}.city`)}
            placeholder="City"
          />
          <Input
            {...register(`addresses.${index}.zip`)}
            placeholder="ZIP"
          />
          <button
            type="button"
            onClick={() => remove(index)}
          >
            Remove Address
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ street: "", city: "", zip: "" })}
      >
        Add Address
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddressForm;
