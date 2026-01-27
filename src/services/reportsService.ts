import { supabase } from '../components/App';
import {
  UserData,
  UserStatistics,
  UserGrowthData,
  ActivityData,
  ReportData,
} from '../types/reports.types';

/**
 * Fetches all users from Supabase via RPC function
 */
export async function fetchAllUsers(): Promise<UserData[]> {
  try {
    // Try using RPC function first
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_users_for_reports');
    
    if (!rpcError && rpcData) {
      return rpcData.map((user: any) => ({
        id: user.id,
        email: user.email || '',
        phone: user.phone || undefined,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at || undefined,
        app_metadata: user.raw_app_meta_data || {},
        user_metadata: user.raw_user_meta_data || {},
      }));
    }

    console.log('RPC function not found, trying users table...');
    
    // Fallback: try querying users table directly
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      console.log('Please run the SQL setup script in SETUP_REPORTS.md');
      return [];
    }
    
    return (data || []).map(user => ({
      id: user.id,
      email: user.email || '',
      phone: user.phone || undefined,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || undefined,
      app_metadata: user.raw_app_meta_data || {},
      user_metadata: user.raw_user_meta_data || {},
    }));
  } catch (err) {
    console.error('Exception fetching users:', err);
    console.log('Please run the SQL setup script in SETUP_REPORTS.md');
    return [];
  }
}

/**
 * Calculates user statistics from user data
 */
export function calculateStatistics(users: UserData[]): UserStatistics {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const totalUsers = users.length;
  
  const usersThisMonth = users.filter(
    (u) => new Date(u.created_at) >= oneMonthAgo
  ).length;
  
  const usersThisWeek = users.filter(
    (u) => new Date(u.created_at) >= oneWeekAgo
  ).length;
  
  const activeUsersLastWeek = users.filter(
    (u) => u.last_sign_in_at && new Date(u.last_sign_in_at) >= oneWeekAgo
  ).length;

  // Provider breakdown
  const providerMap: Record<string, number> = {};
  users.forEach((user) => {
    const provider = user.app_metadata?.provider || 
                     user.app_metadata?.providers?.[0] || 
                     'email';
    providerMap[provider] = (providerMap[provider] || 0) + 1;
  });

  const providerBreakdown = Object.entries(providerMap).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count,
  }));

  return {
    totalUsers,
    usersThisMonth,
    usersThisWeek,
    activeUsersLastWeek,
    providerBreakdown,
  };
}

/**
 * Generates user growth data over time
 */
export function generateUserGrowthData(users: UserData[]): UserGrowthData[] {
  const sortedUsers = [...users].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const growthMap: Record<string, number> = {};
  let cumulative = 0;

  sortedUsers.forEach((user) => {
    const date = new Date(user.created_at).toISOString().split('T')[0];
    growthMap[date] = (growthMap[date] || 0) + 1;
  });

  return Object.entries(growthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => {
      cumulative += count;
      return {
        date,
        count,
        cumulative,
      };
    });
}

/**
 * Generates activity data (sign-ins and new users per day)
 */
export function generateActivityData(users: UserData[]): ActivityData[] {
  const activityMap: Record<string, { signIns: number; newUsers: number }> = {};

  // Track new users
  users.forEach((user) => {
    const date = new Date(user.created_at).toISOString().split('T')[0];
    if (!activityMap[date]) {
      activityMap[date] = { signIns: 0, newUsers: 0 };
    }
    activityMap[date].newUsers += 1;
  });

  // Track sign-ins
  users.forEach((user) => {
    if (user.last_sign_in_at) {
      const date = new Date(user.last_sign_in_at).toISOString().split('T')[0];
      if (!activityMap[date]) {
        activityMap[date] = { signIns: 0, newUsers: 0 };
      }
      activityMap[date].signIns += 1;
    }
  });

  return Object.entries(activityMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      signIns: data.signIns,
      newUsers: data.newUsers,
    }));
}

/**
 * Main function to generate complete report data
 */
export async function generateReportData(): Promise<ReportData> {
  const users = await fetchAllUsers();
  
  const statistics = calculateStatistics(users);
  const userGrowth = generateUserGrowthData(users);
  const activityData = generateActivityData(users);
  
  // Get 10 most recent users
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  return {
    generatedAt: new Date().toISOString(),
    statistics,
    userGrowth,
    activityData,
    recentUsers,
  };
}
