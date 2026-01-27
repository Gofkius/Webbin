export interface UserData {
  id: string;
  email: string;
  phone?: string;
  created_at: string;
  last_sign_in_at?: string;
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
  user_metadata?: {
    display_name?: string;
    full_name?: string;
    name?: string;
  };
}

export interface UserStatistics {
  totalUsers: number;
  usersThisMonth: number;
  usersThisWeek: number;
  activeUsersLastWeek: number;
  providerBreakdown: {
    name: string;
    count: number;
  }[];
}

export interface UserGrowthData {
  date: string;
  count: number;
  cumulative: number;
}

export interface ActivityData {
  date: string;
  signIns: number;
  newUsers: number;
}

export interface ReportData {
  generatedAt: string;
  statistics: UserStatistics;
  userGrowth: UserGrowthData[];
  activityData: ActivityData[];
  recentUsers: UserData[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
