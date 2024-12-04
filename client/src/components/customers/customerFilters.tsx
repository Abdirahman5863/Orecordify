/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerFiltersProps {
  selectedFilters: {
    status: string;
    type: string;
    category: string;
    priority: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function CustomerFilters({ selectedFilters, onFilterChange }: CustomerFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={selectedFilters.status}
          onValueChange={(value) => onFilterChange({ ...selectedFilters, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={selectedFilters.type}
          onValueChange={(value) => onFilterChange({ ...selectedFilters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={selectedFilters.category}
          onValueChange={(value) => onFilterChange({ ...selectedFilters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select
          value={selectedFilters.priority}
          onValueChange={(value) => onFilterChange({ ...selectedFilters, priority: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}