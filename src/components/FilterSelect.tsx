import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TFilter } from "@/dataModel/filter"

export function FilterSelect({ id, value }: TFilter) {
  return (
    <Select data-id={id}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={id.charAt(0).toUpperCase() + id.slice(1)} />
    </SelectTrigger>
    <SelectContent>
      {value.map((item) => (
        <SelectItem key={item} value={item}>
          {item.replace(/_/g, " ")}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  
  )
}
