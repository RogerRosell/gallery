import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FilterSelect({ id, values, onChangeHandler }: any) {
  return (
    <Select data-id={id} onValueChange={(value) => onChangeHandler(id, value)}>
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
