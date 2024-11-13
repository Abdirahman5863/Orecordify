import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Label } from "@/components/ui/label";
  
  interface NotesFilterProps {
    selectedType: string;
    selectedPriority: string;
    onTypeChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
  }
  
  export default function NotesFilter({
    selectedType,
    selectedPriority,
    onTypeChange,
    onPriorityChange,
  }: NotesFilterProps) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Filter by Type</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="order">Order</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
            </SelectContent>
          </Select>
        </div>
  
        <div className="space-y-2">
          <Label>Filter by Priority</Label>
          <Select value={selectedPriority} onValueChange={onPriorityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }