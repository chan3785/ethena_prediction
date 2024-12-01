"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const chainData = [
  { label: "Bitcoin", value: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43" },
  { label: "Ethereum", value: "0x694AA1769357215DE4FAC081bf1f309aDC325306" },
  { label: "Ethena", value: "0xc59E3633BAAC79493d908e63626716e204A45EdF" },
  { label: "Chainlink", value: "0xc59E3633BAAC79493d908e63626716e204A45Edc" },
  { label: "USDe", value: "0x55ec7c3ed0d7CB5DF4d3d8bfEd2ecaf28b4638fb" },
  { label: "sUSDe", value: "0x6f7be09227d98Ce1Df812d5Bc745c0c775507E92" },
  { label: "DAI", value: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19" },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? chainData.find((projId) => projId.value === value)?.label
            : "Select network to get your Asset"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Select network to get your Asset" className="h-9" />
          <CommandList>
            <CommandEmpty>No Network found.</CommandEmpty>
            <CommandGroup>
              {chainData.map((projId) => (
                <CommandItem
                  key={projId.value}
                  value={projId.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {projId.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === projId.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
