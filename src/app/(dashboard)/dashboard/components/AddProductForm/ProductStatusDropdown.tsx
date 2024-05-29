"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import { BookCheck, Check, ChevronsUpDown, SquarePen } from "lucide-react";
import React from "react";
const productStatusOptions = [
  {
    value: "draft",
    label: "Draft (Unpublished)",
  },
  {
    value: "publish",
    label: "Published (Live)",
  },
];

const ProductStatusDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-xl bg-white  hover:bg-white py-6"
        >
          {value
            ? productStatusOptions.find(
                (statusOption) => statusOption.value === value
              )?.label
            : "Set status..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command className="">
          <CommandInput placeholder="Set status..." />
          <CommandEmpty>No status option found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {productStatusOptions.map((statusOption) => (
                <CommandItem
                  className="flex flex-row items-center py-4"
                  key={statusOption.value}
                  value={statusOption.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={clsx(
                      "mr-2 size-4",
                      value === statusOption.value ? "opacity 100" : "opacity-0"
                    )}
                  />
                  {statusOption.label}{" "}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductStatusDropdown;
