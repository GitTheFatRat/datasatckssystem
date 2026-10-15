import { Users, Package, TrendingUp, Clock } from 'lucide-react';
import './MetricCard.css';

const iconMap = {
  users: Users,
  package: Package,
  'trending-up': TrendingUp,
  history: Clock,
};

export default function MetricCard({ title, value, change, isPositive, timeframe, icon, color }) {
  const Icon = iconMap[icon] || Users;

  return (
    <div className="metric-card">
      <div className="metric-card-top">
        <div className="metric-card-info">
          <span className="metric-card-label">{title}</span>
          <span className="metric-card-value">{value}</span>
        </div>
        <div className="metric-card-icon" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
      <div className="metric-card-bottom">
        <span className={`metric-card-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {change}
        </span>
        <span className="metric-card-timeframe">{timeframe}</span>
      </div>
    </div>
  );
}
