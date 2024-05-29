import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectUIProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
  value: string;
  // ... other props
}

const SelectUI = ({ children, onChange , value }: SelectUIProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectUI;
