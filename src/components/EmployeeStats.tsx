
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee } from '@/pages/Index';
import { Users, DollarSign, Building2, TrendingUp } from 'lucide-react';

interface EmployeeStatsProps {
  employees: Employee[];
}

export const EmployeeStats = ({ employees }: EmployeeStatsProps) => {
  const totalEmployees = employees.length;
  const averageSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees || 0;
  const totalDepartments = new Set(employees.map(emp => emp.department)).size;
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Average Salary",
      value: `$${Math.round(averageSalary).toLocaleString()}`,
      icon: DollarSign,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: Building2,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Total Payroll",
      value: `$${totalPayroll.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
