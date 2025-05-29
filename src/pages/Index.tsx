
import { useState } from 'react';
import { EmployeeList } from '@/components/EmployeeList';
import { AddEmployeeForm } from '@/components/AddEmployeeForm';
import { SearchAndFilter } from '@/components/SearchAndFilter';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  email: string;
}

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alice Johnson",
      position: "Senior Developer",
      department: "Engineering",
      salary: 85000,
      email: "alice@company.com"
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Product Manager",
      department: "Product",
      salary: 95000,
      email: "bob@company.com"
    },
    {
      id: 3,
      name: "Carol Davis",
      position: "UX Designer",
      department: "Design",
      salary: 70000,
      email: "carol@company.com"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const addEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const id = Math.max(...employees.map(emp => emp.id), 0) + 1;
    setEmployees([...employees, { ...newEmployee, id }]);
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Employee Management
          </h1>
          <p className="text-gray-600">
            Manage your team efficiently
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterDepartment={filterDepartment}
          setFilterDepartment={setFilterDepartment}
          departments={departments}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmployeeList
              employees={filteredEmployees}
              onDelete={deleteEmployee}
              onUpdate={updateEmployee}
            />
          </div>

          <div>
            <AddEmployeeForm onAdd={addEmployee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
