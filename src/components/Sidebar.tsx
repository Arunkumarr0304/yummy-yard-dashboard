import { NavLink } from 'react-router-dom';
import sidebarLogo from '../assets/sidebar-logo.svg';
import menuButton from '../assets/menu-buttton.svg';
import dashboardIcon from '../assets/dashboard-icon.svg';
import ordersIcon from '../assets/orders-icon.svg';
import menuIcon from '../assets/menu-icon.svg';
import billsIcon from '../assets/bills-icon.svg';
import historyIcon from '../assets/history-icon.svg';
import productIcon from '../assets/product-icon.svg';
import activeDashboardIcon from '../assets/active-dashboard-icon.svg';
import activeOrdersIcon from '../assets/active-orders-icon.svg';
import activeMenuIcon from '../assets/active-menu-icon.svg';
import activeBillsIcon from '../assets/active-bills-icon.svg';
import activeHistoryIcon from '../assets/active-history-icon.svg';
import activeProductIcon from '../assets/active-product-icon.svg';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: '/dashboard', icon: dashboardIcon, activeIcon: activeDashboardIcon, label: 'Dashboard' },
  { path: '/orders', icon: ordersIcon, activeIcon: activeOrdersIcon, label: 'Orders' },
  { path: '/menu', icon: menuIcon, activeIcon: activeMenuIcon, label: 'Menu' },
  { path: '/bills', icon: billsIcon, activeIcon: activeBillsIcon, label: 'Bills' },
  { path: '/history', icon: historyIcon, activeIcon: activeHistoryIcon, label: 'History' },
  { path: '/products', icon: productIcon, activeIcon: activeProductIcon, label: 'Product Management' },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src={sidebarLogo} alt="Yummy Yard Logo" className="logo-icon" />
          <div className="logo-text-container">
            <span className="logo-text-yummy">Yummy </span>
            <span className="logo-text-yard">Yard</span>
          </div>
        </div>
        <button className="menu-toggle" onClick={onToggle}>
          <img src={menuButton} alt="Toggle menu" className="menu-toggle-icon" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <img 
                  src={isActive ? item.activeIcon : item.icon} 
                  alt={item.label} 
                  className="nav-icon" 
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
