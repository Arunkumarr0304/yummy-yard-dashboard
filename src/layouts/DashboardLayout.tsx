import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  UtensilsCrossed, 
  Receipt, 
  History, 
  Package,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  BarChart3,
  Users,
  FileText,
  CreditCard,
  MoreHorizontal
} from 'lucide-react';
import './DashboardLayout.css';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/bills', icon: Receipt, label: 'Bills' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/products', icon: Package, label: 'Product Management' },
];

const profileMenuItems = [
  { path: '/dashboard', icon: BarChart3, label: 'Analytics' },
  { path: '/account', icon: Settings, label: 'Account Setting' },
  { path: '/customers', icon: Users, label: 'Customer List' },
  { path: '/reports', icon: FileText, label: 'Report' },
  { path: '/transactions', icon: CreditCard, label: 'Transaction' },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <UtensilsCrossed size={24} />
            </div>
            <span className="logo-text">Yummy Yard</span>
          </div>
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h2 className="page-title">Home</h2>
          </div>
          
          <div className="header-center">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search" />
            </div>
          </div>

          <div className="header-right">
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn">
              <Settings size={20} />
            </button>
            <div className="user-profile-header">
              <img 
                src={`https://ui-avatars.com/api/?name=${user.username || 'User'}&background=22c55e&color=fff`}
                alt="Profile"
                className="profile-img"
              />
              <span className="user-name">{user.username || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Content with Right Sidebar */}
        <div className="content-with-sidebar">
          {/* Page Content */}
          <main className="page-content">
            <Outlet />
          </main>

          {/* Right Profile Sidebar */}
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
                  src={`https://ui-avatars.com/api/?name=${user.username || 'User'}&background=e2e8f0&color=64748b&size=80`}
                  alt="Profile"
                  className="profile-avatar"
                />
                <h3 className="profile-name">{user.username || 'User'}</h3>
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
      </div>
    </div>
  );
}
