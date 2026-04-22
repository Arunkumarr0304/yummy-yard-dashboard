import './Navbar.css';
import NotificationIcon from "../assets/notification-icon.svg";
import Profile from "../assets/profile-image.png";

interface NavbarProps {
  user: {
    username?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="page-title">Home</h2>
      </div>
      <div className="header-right">
        <img src={NotificationIcon} className='notification-icon' />
        <div className="user-profile-header">
          <img
            src={Profile}
            alt="Profile"
            className="profile-img"
          />
          <span className="user-name">{user.username || 'User'}</span>
        </div>
      </div>
    </header>
  );
}
