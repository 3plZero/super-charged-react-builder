
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/pages/Index';
import { EmployeeEditDialog } from './EmployeeEditDialog';
import { Trash2, Edit, Mail, Phone, Calendar } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onUpdate: (employee: Employee) => void;
}

export const EmployeeList = ({ employees, onDelete, onUpdate }: EmployeeListProps) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'bg-blue-500',
      'Product': 'bg-green-500',
      'Design': 'bg-purple-500',
      'Marketing': 'bg-orange-500',
      'Sales': 'bg-red-500',
      'HR': 'bg-pink-500'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            Employee Directory ({employees.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            {employees.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                No employees found matching your criteria.
              </div>
            ) : (
              employees.map((employee) => (
                <Card
                  key={employee.id}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {employee.name}
                          </h3>
                          <Badge className={`${getDepartmentColor(employee.department)} text-white`}>
                            {employee.department}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p className="text-white/80">
                              <strong>Position:</strong> {employee.position}
                            </p>
                            <p className="text-white/80">
                              <strong>Salary:</strong> ${employee.salary.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/80">
                              <Mail className="h-4 w-4" />
                              {employee.email}
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <Phone className="h-4 w-4" />
                              {employee.phone}
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <Calendar className="h-4 w-4" />
                              Joined: {new Date(employee.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEmployee(employee)}
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(employee.id)}
                          className="bg-red-500/80 hover:bg-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {editingEmployee && (
        <EmployeeEditDialog
          employee={editingEmployee}
          isOpen={!!editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
