
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Employee } from '@/pages/Index';
import { EmployeeEditDialog } from './EmployeeEditDialog';
import { Trash2, Edit } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onUpdate: (employee: Employee) => void;
}

export const EmployeeList = ({ employees, onDelete, onUpdate }: EmployeeListProps) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employees ({employees.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            {employees.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No employees found.
              </div>
            ) : (
              employees.map((employee) => (
                <Card key={employee.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {employee.name}
                        </h3>
                        <p className="text-gray-600 mb-1">{employee.position}</p>
                        <p className="text-gray-500 text-sm mb-1">{employee.department}</p>
                        <p className="text-gray-500 text-sm mb-1">{employee.email}</p>
                        <p className="text-gray-900 font-medium">
                          ${employee.salary.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEmployee(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(employee.id)}
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
