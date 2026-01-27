import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ReportData } from '../../types/reports.types';

interface ReportChartsProps {
  data: ReportData;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export const ReportCharts: React.FC<ReportChartsProps> = ({ data }) => {
  // Take last 30 days of growth data
  const recentGrowth = data.userGrowth.slice(-30);
  
  // Take last 30 days of activity data
  const recentActivity = data.activityData.slice(-30);

  return (
    <div style={{ padding: '20px' }}>
      {/* Statistics Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <StatCard title="Total Users" value={data.statistics.totalUsers} color="#6366f1" />
        <StatCard title="New This Month" value={data.statistics.usersThisMonth} color="#8b5cf6" />
        <StatCard title="New This Week" value={data.statistics.usersThisWeek} color="#ec4899" />
        <StatCard title="Active Last Week" value={data.statistics.activeUsersLastWeek} color="#10b981" />
      </div>

      {/* User Growth Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
          User Growth Over Time
        </h3>
        <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={recentGrowth}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorCumulative)"
                name="Total Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
          Daily Activity (Last 30 Days)
        </h3>
        <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar dataKey="newUsers" fill="#8b5cf6" name="New Users" />
              <Bar dataKey="signIns" fill="#10b981" name="Sign Ins" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Provider Distribution */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
          Authentication Provider Distribution
        </h3>
        <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.statistics.providerBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {data.statistics.providerBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users Table */}
      <div>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
          Recent Users
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Display Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Provider</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Created At</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Last Sign In</th>
              </tr>
            </thead>
            <tbody>
              {data.recentUsers.map((user, index) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    {user.user_metadata?.display_name || 
                     user.user_metadata?.full_name || 
                     user.user_metadata?.name || 
                     '-'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {user.app_metadata?.provider || 
                     user.app_metadata?.providers?.[0] || 
                     'Email'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {user.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleDateString() 
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard: React.FC<{ title: string; value: number; color: string }> = ({ 
  title, 
  value, 
  color 
}) => {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'white', 
      borderRadius: '12px', 
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontSize: '0.875rem', 
        color: '#6b7280', 
        marginBottom: '8px',
        fontWeight: '500'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: color 
      }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
};

export default ReportCharts;
