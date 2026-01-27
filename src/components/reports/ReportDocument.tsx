import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import { ReportData } from '../../types/reports.types';

interface ReportDocumentProps {
  data: ReportData;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #6366f1',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    borderLeft: '4 solid #6366f1',
    paddingLeft: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '23%',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    border: '1 solid #e5e7eb',
  },
  statTitle: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  chartContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  providerList: {
    marginTop: 10,
  },
  providerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 5,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  providerName: {
    fontSize: 11,
    color: '#374151',
  },
  providerCount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
});

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export const ReportDocument: React.FC<ReportDocumentProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Prepare chart data
  const recentGrowth = data.userGrowth.slice(-30).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    users: item.cumulative,
  }));

  const recentActivity = data.activityData.slice(-30).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    newUsers: item.newUsers,
    signIns: item.signIns,
  }));

  const providerData = data.statistics.providerBreakdown.map(item => ({
    name: item.name,
    value: item.count,
  }));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>User Analytics Report</Text>
          <Text style={styles.subtitle}>
            Generated on {formatDateTime(data.generatedAt)}
          </Text>
        </View>

        {/* Statistics Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Total Users</Text>
              <Text style={styles.statValue}>{data.statistics.totalUsers}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>New This Month</Text>
              <Text style={styles.statValue}>{data.statistics.usersThisMonth}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>New This Week</Text>
              <Text style={styles.statValue}>{data.statistics.usersThisWeek}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Active Last Week</Text>
              <Text style={styles.statValue}>{data.statistics.activeUsersLastWeek}</Text>
            </View>
          </View>
        </View>

        {/* User Growth Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Growth Over Time</Text>
          <ReactPDFChart>
            <AreaChart width={520} height={250} data={recentGrowth}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Area 
                isAnimationActive={false}
                type="monotone" 
                dataKey="users" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ReactPDFChart>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Webbin User Analytics Report • Page 1 of 3
        </Text>
      </Page>

      {/* Page 2 - Activity Charts */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Activity & Engagement</Text>
        </View>

        {/* Activity Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Activity (Last 30 Days)</Text>
          <Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 5 }}>Purple: New Users • Green: Sign-Ins</Text>
          <ReactPDFChart>
            <BarChart width={520} height={240} data={recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Bar isAnimationActive={false} dataKey="newUsers" fill="#8b5cf6" />
              <Bar isAnimationActive={false} dataKey="signIns" fill="#10b981" />
            </BarChart>
          </ReactPDFChart>
        </View>

        {/* Provider Distribution Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentication Provider Distribution</Text>
          <ReactPDFChart>
            <PieChart width={520} height={260}>
              <Pie
                isAnimationActive={false}
                data={providerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {providerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ReactPDFChart>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Webbin User Analytics Report • Page 2 of 3
        </Text>
      </Page>

      {/* Page 3 - Recent Users Table */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Recent Users</Text>
        </View>

        {/* Provider Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Provider Breakdown</Text>
          <View style={styles.providerList}>
            {data.statistics.providerBreakdown.map((provider, index) => (
              <View key={index} style={styles.providerItem}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerCount}>
                  {provider.count} users ({((provider.count / data.statistics.totalUsers) * 100).toFixed(1)}%)
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Users Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10 Most Recent Users</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellHeader, { width: '35%' }]}>Email</Text>
              <Text style={[styles.tableCellHeader, { width: '20%' }]}>Provider</Text>
              <Text style={[styles.tableCellHeader, { width: '23%' }]}>Created At</Text>
              <Text style={[styles.tableCellHeader, { width: '22%' }]}>Last Sign In</Text>
            </View>
            {data.recentUsers.map((user, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '35%' }]}>{user.email}</Text>
                <Text style={[styles.tableCell, { width: '20%' }]}>
                  {user.app_metadata?.provider || 
                   user.app_metadata?.providers?.[0] || 
                   'Email'}
                </Text>
                <Text style={[styles.tableCell, { width: '23%' }]}>
                  {formatDate(user.created_at)}
                </Text>
                <Text style={[styles.tableCell, { width: '22%' }]}>
                  {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Webbin User Analytics Report • Page 3 of 3
        </Text>
      </Page>
    </Document>
  );
};

export default ReportDocument;
