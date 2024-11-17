import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterSelectProps = {
  id: string;
  value?: string;
  values: string[];
  onChangeHandler: (id: string, value: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FilterSelect({ id, value, values, onChangeHandler }: FilterSelectProps) {
  const selectedValue = values.length === 1 ? values[0] : value;
  return (
    <Select data-id={id} value={selectedValue} onValueChange={(value) => onChangeHandler(id, value)}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={id.charAt(0).toUpperCase() + id.slice(1)} />
    </SelectTrigger>
    <SelectContent >
      {values.map((item: string) => (
        <SelectItem key={item} value={item}>
          {item.replace(/_/g, " ")}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>  
  )
}
