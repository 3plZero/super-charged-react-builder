
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employee } from '@/pages/Index';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddEmployeeFormProps {
  onAdd: (employee: Omit<Employee, 'id'>) => void;
  departments: string[];
}

export const AddEmployeeForm = ({ onAdd, departments }: AddEmployeeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.position || !formData.department || !formData.salary || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onAdd({
      name: formData.name,
      position: formData.position,
      department: formData.department,
      salary: parseInt(formData.salary),
      email: formData.email,
      phone: formData.phone,
      joinDate: formData.joinDate
    });

    setFormData({
      name: '',
      position: '',
      department: '',
      salary: '',
      email: '',
      phone: '',
      joinDate: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Success!",
      description: "Employee added successfully",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 sticky top-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add New Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="position" className="text-white">Position *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Job title"
              required
            />
          </div>

          <div>
            <Label htmlFor="department" className="text-white">Department *</Label>
            <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="salary" className="text-white">Salary *</Label>
            <Input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Annual salary"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="email@company.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="joinDate" className="text-white">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleInputChange('joinDate', e.target.value)}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
