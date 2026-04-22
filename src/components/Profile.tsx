import { BarChart3, Settings, Users, FileText, CreditCard, MoreHorizontal, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Profile from "../assets/profile-image.png";
import './Profile.css';

const profileMenuItems = [
  { path: '/dashboard', icon: BarChart3, label: 'Analytics' },
  { path: '/account', icon: Settings, label: 'Account Setting' },
  { path: '/customers', icon: Users, label: 'Customer List' },
  { path: '/reports', icon: FileText, label: 'Report' },
  { path: '/transactions', icon: CreditCard, label: 'Transaction' },
];

export default function ProfileCard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-card">
        <div className="profile-header">
          <span className="profile-title">Profile</span>
          <button className="more-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>

        <div className="profile-info">
          <img
            src={Profile}
            alt="Profile"
            className="profile-avatar"
          />
          <h3 className="profile-name">{user.username || 'Courtney Henry'}</h3>
          <p className="profile-role">Designer</p>
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
  );
}
