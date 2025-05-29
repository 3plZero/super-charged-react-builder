
import { useState } from 'react';
import { EmployeeList } from '@/components/EmployeeList';
import { AddEmployeeForm } from '@/components/AddEmployeeForm';
import { EmployeeStats } from '@/components/EmployeeStats';
import { SearchAndFilter } from '@/components/SearchAndFilter';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  email: string;
  phone: string;
  joinDate: string;
}

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alice Johnson",
      position: "Senior Developer",
      department: "Engineering",
      salary: 85000,
      email: "alice@company.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2022-03-15"
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Product Manager",
      department: "Product",
      salary: 95000,
      email: "bob@company.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2021-08-22"
    },
    {
      id: 3,
      name: "Carol Davis",
      position: "UX Designer",
      department: "Design",
      salary: 70000,
      email: "carol@company.com",
      phone: "+1 (555) 345-6789",
      joinDate: "2023-01-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const filteredAndSortedEmployees = employees
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Employee];
      const bValue = b[sortBy as keyof Employee];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Employee Management System
          </h1>
          <p className="text-pink-100 text-lg">
            Advanced employee management with modern design
          </p>
        </div>

        {/* Stats Dashboard */}
        <EmployeeStats employees={employees} />

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterDepartment={filterDepartment}
          setFilterDepartment={setFilterDepartment}
          departments={departments}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="lg:col-span-2">
            <EmployeeList
              employees={filteredAndSortedEmployees}
              onDelete={deleteEmployee}
              onUpdate={updateEmployee}
            />
          </div>

          {/* Add Employee Form */}
          <div className="lg:col-span-1">
            <AddEmployeeForm onAdd={addEmployee} departments={departments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
