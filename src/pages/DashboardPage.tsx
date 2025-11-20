import DashboardLayout from '../layouts/DashboardLayout';
import KpiCard from '../components/KpiCard';
import type { KpiCardProps } from '../components/KpiCard';
import NewUsers from '../components/NewUsers';
import QuickActions from '../components/QuickActions';
import { DollarSign, Users, FileText, BarChart } from 'lucide-react';

const kpiData: KpiCardProps[] = [
  {
    title: 'Revenu mensuel',
    value: '€12,450',
    icon: <DollarSign size={24} />,
    change: '+12.5%',
    changeType: 'increase',
  },
  {
    title: 'Utilisateurs actifs',
    value: '1,234',
    icon: <Users size={24} />,
    change: '+2.1%',
    changeType: 'increase',
  },
  {
    title: 'Templates créés',
    value: '289',
    icon: <FileText size={24} />,
    change: '-0.5%',
    changeType: 'decrease',
  },
  {
    title: 'Taux de conversion',
    value: '18.7%',
    icon: <BarChart size={24} />,
    change: '+1.2%',
    changeType: 'increase',
  },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} isPrimary={kpi.title === 'Revenu mensuel'} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div>
            <NewUsers />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
