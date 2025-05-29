
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDepartment: string;
  setFilterDepartment: (dept: string) => void;
  departments: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filterDepartment,
  setFilterDepartment,
  departments,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}: SearchAndFilterProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-white/60 h-4 w-4" />
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="text-white/60 h-4 w-4" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="position">Position</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="joinDate">Join Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
