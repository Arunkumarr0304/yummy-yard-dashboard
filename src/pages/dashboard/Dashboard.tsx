import { useState, useEffect } from 'react';
import { BarChart3, Settings, Users, FileText, CreditCard, MoreHorizontal, LogOut, TrendingUp } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

import './Dashboard.css';
import Profile from "../../assets/profile-image.png";
import SearchIcon from "../../assets/search-icon.svg";
import CommandIcon from "../../assets/command-icon.svg";
import SettingsIcon from "../../assets/settings-icon.svg";
import DataIcon1 from "../../assets/dashboard-icon1.svg";
import DataIcon2 from "../../assets/dashboard-icon2.svg";
import DataIcon3 from "../../assets/dashboard-icon3.svg";
import DataIcon4 from "../../assets/dashboard-icon4.svg";
import Arrow from "../../assets/green-arrow.svg";
import Tomato from "../../assets/tomato.png";
import Dish from "../../assets/dish.png";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-overlay">
    <div className="spinner"></div>
  </div>
);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const percent = ((value / 5000) * 100).toFixed(1);
    return (
      <div className="custom-tooltip">
        <div className="tooltip-value">${value}.04</div>
        <div className="tooltip-percent">
          <TrendingUp size={14} className="tooltip-arrow" />
          <span>{percent}%</span>
        </div>
      </div>
    );
  }
  return null;
};

// TypeScript Interfaces
interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

interface SalesData {
  name: string;
  value: number;
}

interface IncomeData {
  name: string;
  value: number;
  color: string;
}

interface Transaction {
  id: number;
  product: string;
  date: string;
  price: number;
  image: string;
}

interface TrendingItem {
  id: number;
  name: string;
  orders: number;
  percent: number;
  image: string;
}

interface User {
  username?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');

  // Default static stats structure with dynamic values set to 0
  const defaultStats: Stat[] = [
    {
      title: 'Total sale',
      value: '$0',
      change: '0%',
      trend: 'up',
      icon: DataIcon1,
      color: '#22c55e'
    },
    {
      title: 'Total order',
      value: '0',
      change: '0%',
      trend: 'up',
      icon: DataIcon2,
      color: '#f59e0b'
    },
    {
      title: 'Total revenue',
      value: '$0',
      change: '0%',
      trend: 'up',
      icon: DataIcon3,
      color: '#3b82f6'
    },
    {
      title: 'Cancelled order',
      value: '0',
      change: '0%',
      trend: 'down',
      icon: DataIcon4,
      color: '#ef4444'
    },
  ];

  // States for dynamic data
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trendingMenu, setTrendingMenu] = useState<TrendingItem[]>([]);

  // Real API call to backend
  const fetchDashboardData = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const API_URL = 'http://localhost:6969/api';

      // Fetch all dashboard data from backend
      const [statsRes, salesRes, incomeRes, transactionsRes, trendingRes] = await Promise.all([
        fetch(`${API_URL}/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/sales-chart`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/income-chart`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/transactions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/trending`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const statsData = await statsRes.json();
      const salesData = await salesRes.json();
      const incomeData = await incomeRes.json();
      const transactionsData = await transactionsRes.json();
      const trendingData = await trendingRes.json();

      // Update state with dynamic values from backend
      // Static parts (title, icon, color, subtitle) remain hardcoded
      if (statsData.success) {
        const apiStats = statsData.data;
        setStats([
          {
            title: 'Total sale',
            value: apiStats.totalSale.value,
            change: apiStats.totalSale.change,
            trend: apiStats.totalSale.trend,
            icon: DataIcon1,
            color: '#22c55e'
          },
          {
            title: 'Total order',
            value: apiStats.totalOrder.value,
            change: apiStats.totalOrder.change,
            trend: apiStats.totalOrder.trend,
            icon: DataIcon2,
            color: '#f59e0b'
          },
          {
            title: 'Total revenue',
            value: apiStats.totalRevenue.value,
            change: apiStats.totalRevenue.change,
            trend: apiStats.totalRevenue.trend,
            icon: DataIcon3,
            color: '#3b82f6'
          },
          {
            title: 'Cancelled order',
            value: apiStats.cancelledOrder.value,
            change: apiStats.cancelledOrder.change,
            trend: apiStats.cancelledOrder.trend,
            icon: DataIcon4,
            color: '#ef4444'
          },
        ]);
      }

      if (salesData.success) {
        setSalesData(salesData.data);
      }

      if (incomeData.success) {
        setIncomeData(incomeData.data);
        // Calculate total income dynamically
        const total = incomeData.data.reduce((sum: number, item: IncomeData) => sum + item.value, 0);
        setTotalIncome(total);
      }

      if (transactionsData.success) {
        setTransactions(transactionsData.data);
      }

      if (trendingData.success) {
        setTrendingMenu(trendingData.data);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const profileMenuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Analytics' },
    { path: '/account', icon: Settings, label: 'Account Setting' },
    { path: '/customers', icon: Users, label: 'Customer List' },
    { path: '/reports', icon: FileText, label: 'Report' },
    { path: '/transactions', icon: CreditCard, label: 'Transaction' },
  ];

  return (
    <div className="dashboard-container">
      {isLoading && <LoadingSpinner />}
      
      <div className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-left">
            <h1>Hello, {user?.username || 'Rijal'} 👋</h1>
            <p>Here some reports on your dashboard</p>
          </div>
          <div className="welcome-right">
            <div className="search-bar">
              <img src={SearchIcon} alt="Search" className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <button className="icon-btn command-btn">
              <img src={CommandIcon} alt="Command" />
              <span className="notification-dot"></span>
            </button>
            <button className="icon-btn settings-btn">
              <img src={SettingsIcon} alt="Settings" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <img src={stat.icon} className='data-icon'/>
                </div>
                <div>
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-footer">
                    <span className="stat-period">From last week</span>
                    <span className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className='value-Row'>
                <div className="stat-value">{stat.value}</div>
                <img src={Arrow} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card sales-chart">
            <div className="chart-header">
              <h3>Sales</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="dot income"></span>
                  Income
                </span>
                <select className="period-select">
                  <option>Last 6 month</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={true} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => value}
                    domain={[0, 'dataMax + 100']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    baseLine={0}
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card income-chart">
            <div className="chart-header">
              <h3>Income</h3>
              <select className="period-select">
                <option>Jan</option>
              </select>
            </div>
            <div className='chart-row'>
              <div className="income-legend">
                {incomeData.map((item, index) => (
                  <div key={index} className="legend-row">
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-label">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-center">
                  <span>Total</span>
                  <strong>${totalIncome.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="section-card transactions-card">
            <div className="section-header">
              <h3>Transactions</h3>
              <select className="period-select">
                <option>Recent</option>
              </select>
            </div>
            <div className="transactions-list">
              <div className="transaction-header">
                <span>Name products</span>
                <span>Date/Time</span>
                <span>Price</span>
              </div>
              {transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-row">
                  <div className="product-info">
                    <span className="product-image">
                      <img src={transaction.image} alt={transaction.product} />
                    </span>
                    <span className="product-name">{transaction.product}</span>
                  </div>
                  <span className="transaction-date">{transaction.date}</span>
                  <span className="transaction-price">${transaction.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card trending-card">
            <div className="section-header">
              <h3>Trending menu</h3>
              <button className="more-btn">⋮</button>
            </div>
            <div className="trending-list">
              {trendingMenu.map((item) => (
                <div key={item.id} className="trending-item">
                  <div className="trending-info">
                    <span className="trending-image">
                      <img src={item.image} alt={item.name} />
                    </span>
                    <div className="trending-details">
                      <span className="trending-name">{item.name}</span>
                      <span className="trending-orders">Order: {item.orders}</span>
                    </div>
                  </div>
                  <span className="trending-percent positive">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      <aside className="profile-sidebar">
        <div className="profile-card">
          <div className="profile-header">
            <span className="profile-title">Profile</span>
            <button className="more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="profile-info">
            <img
              src={Profile}
              alt="Profile"
              className="profile-avatar"
            />
            <h3 className="profile-name">{user?.username || 'User'}</h3>
            <p className="profile-role">Administrator</p>
          </div>

          <div className="profile-menu">
            {profileMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `profile-menu-item ${isActive ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
