import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Receipt, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

// Sample data for charts
const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 450 },
];

const incomeData = [
  { name: 'Main Course', value: 400, color: '#22c55e' },
  { name: 'Beverage', value: 300, color: '#3b82f6' },
  { name: 'Others', value: 200, color: '#f59e0b' },
];

const transactions = [
  { id: 1, product: 'Tomato', date: 'Wed, 04 Jun 2023', price: 30.00, image: '🍅' },
  { id: 2, product: 'Egg', date: 'Wed, 04 Jun 2023', price: 30.00, image: '🥚' },
  { id: 3, product: 'Tomato', date: 'Wed, 04 Jun 2023', price: 30.00, image: '🍅' },
];

const trendingMenu = [
  { id: 1, name: 'Kopag Benedict', orders: 150, percent: 27.4, image: '🍳' },
  { id: 2, name: 'Kopag Benedict', orders: 150, percent: 27.4, image: '🍳' },
  { id: 3, name: 'Kopag Benedict', orders: 150, percent: 27.4, image: '🍳' },
  { id: 4, name: 'Kopag Benedict', orders: 150, percent: 27.4, image: '🍳' },
  { id: 5, name: 'Kopag Benedict', orders: 150, percent: 27.4, image: '🍳' },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const stats = [
    { 
      title: 'Total sale', 
      value: '$24,064', 
      change: '27.4%', 
      trend: 'up',
      icon: DollarSign,
      color: '#22c55e'
    },
    { 
      title: 'Total order', 
      value: '$24,064', 
      change: '27.4%', 
      trend: 'up',
      icon: ShoppingBag,
      color: '#f59e0b'
    },
    { 
      title: 'Total revenue', 
      value: '$24,064', 
      change: '27.4%', 
      trend: 'up',
      icon: Receipt,
      color: '#3b82f6'
    },
    { 
      title: 'Cancelled order', 
      value: '$24,064', 
      change: '27.4%', 
      trend: 'down',
      icon: XCircle,
      color: '#ef4444'
    },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div>
          <h1>Hello, {user.username || 'Rijal'} 👋</h1>
          <p>Here some reports on your dashboard</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className="stat-title">{stat.title}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-footer">
              <span className="stat-period">From last week</span>
              <span className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
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
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
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
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
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
              <strong>$15,490</strong>
            </div>
          </div>
          <div className="income-legend">
            {incomeData.map((item, index) => (
              <div key={index} className="legend-row">
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.name}</span>
              </div>
            ))}
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
                  <span className="product-image">{transaction.image}</span>
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
                  <span className="trending-image">{item.image}</span>
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
  );
}
