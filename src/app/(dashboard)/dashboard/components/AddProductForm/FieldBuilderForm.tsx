import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TFieldTypeOptions = Record<"combobox" | "checkbox" | "inputbox", string>;

const fieldTypeOptions: TFieldTypeOptions = {
  combobox: "Combobox",
  checkbox: "Checkbox",
  inputbox: "Text Input",
};

interface FieldProps {
  fieldType: keyof TFieldTypeOptions;
  fieldLabel: string;
  fieldOptions: number[] | string[];
}

const FieldBuilderForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldProps>();

  const fieldType = watch("fieldType");
  // onSubmit handler function
  const onSubmit: SubmitHandler<FieldProps> = (data) => {
    console.log(data); // #What to do with the data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-3">
      <Popover open={open} onOpenChange={setOpen} {...register("fieldType")}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {fieldType ? fieldTypeOptions[fieldType] : "Select Field Type"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Type" />
            <CommandList>
              <CommandEmpty>No such type found.</CommandEmpty>
              <CommandGroup>
                {Object.entries(fieldTypeOptions).map(([key, value]) => (
                  <CommandItem
                    key={key}
                    value={value}
                    onSelect={(currentValue) => {
                      setValue("fieldType", key as keyof TFieldTypeOptions);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={clsx("mr-2 hidden size-4", {
                        block: fieldType === key,
                      })}
                    />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {fieldType === "combobox" && (
        <Input placeholder="Add an option" {...register("fieldOptions")} />
      )}
      <Input placeholder="Label" {...register("fieldLabel")} />
      <Button className="" type="submit">
        Create the field
      </Button>
    </form>
  );
};

export default FieldBuilderForm;
