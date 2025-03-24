
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  options?: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  children?: React.ReactNode;
}

const MultiSelect = ({
  options,
  selected,
  onChange,
  className,
  children,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);
  
  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children || (
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            <div className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">Select items...</span>
              ) : (
                selected.map((item) => {
                  const option = options?.find((o) => o.value === item);
                  return (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="mr-1 mb-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnselect(item);
                      }}
                    >
                      {option?.label || item}
                      <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnselect(item);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  );
                })
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent
        className="w-full p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {options?.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface MultiSelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MultiSelectTrigger = React.forwardRef<HTMLButtonElement, MultiSelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      role="combobox"
      className={cn("w-full justify-between", className)}
      {...props}
    >
      {children}
      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
    </Button>
  )
);
MultiSelectTrigger.displayName = "MultiSelectTrigger";

interface MultiSelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
}

const MultiSelectValue = ({ placeholder, children }: MultiSelectValueProps) => (
  <div className="flex flex-wrap gap-1 overflow-hidden">
    {children || <span className="text-muted-foreground">{placeholder}</span>}
  </div>
);

interface MultiSelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MultiSelectContent = React.forwardRef<HTMLDivElement, MultiSelectContentProps>(
  ({ className, children, ...props }, ref) => (
    <PopoverContent
      ref={ref}
      className={cn("w-full p-0", className)}
      style={{ width: "var(--radix-popover-trigger-width)" }}
      {...props}
    >
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandEmpty>No item found.</CommandEmpty>
        <CommandGroup>{children}</CommandGroup>
      </Command>
    </PopoverContent>
  )
);
MultiSelectContent.displayName = "MultiSelectContent";

// Create context for MultiSelect
interface MultiSelectContextProps {
  selected: string[];
  handleSelect: (value: string) => void;
}

const MultiSelectContext = React.createContext<MultiSelectContextProps>({
  selected: [],
  handleSelect: () => {},
});

interface MultiSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const MultiSelectItem = ({ value, children, ...props }: MultiSelectItemProps) => {
  const context = React.useContext(MultiSelectContext);
  
  return (
    <CommandItem
      value={value}
      onSelect={() => context.handleSelect(value)}
      {...props}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          context.selected.includes(value) ? "opacity-100" : "opacity-0"
        )}
      />
      {children}
    </CommandItem>
  );
};

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
};
