import { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AccountSetting.css';
import ProfileImage from "../../assets/profile-image.png";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
}

export default function AccountSetting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: 'Kopag resto',
    email: 'kopag@resto.id',
    phone: '+62 8123456789',
    address: 'Bogor - Jawa Barat',
  });

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    console.log('Profile updated:', profileData);
    // Add API call here
  };

  const handleUpdatePassword = () => {
    console.log('Password updated:', passwordData);
    // Add API call here
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="account-setting-page">
      <Container fluid className="py-4">
        {/* Header */}
        <div className="account-header mb-4">
          <div className="header-title-section">
            <h4 className="page-title">Account Setting</h4>
            <p className="page-subtitle">Control your profile setup and integration</p>
          </div>
          
          <div className="header-actions">
            <div className="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>

        <Row>
          {/* Main Content */}
          <Col lg={9}>
            {/* Tabs */}
            <div className="settings-tabs mb-4">
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
              <button 
                className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                Team
              </button>
              <button 
                className={`tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
                onClick={() => setActiveTab('integrations')}
              >
                Integrations
              </button>
              <button 
                className={`tab-btn ${activeTab === 'billings' ? 'active' : ''}`}
                onClick={() => setActiveTab('billings')}
              >
                Billings
              </button>
            </div>

            {/* Profile Setting Card */}
            <div className="setting-card mb-4">
              <div className="card-header">
                <h5 className="card-title">Profile Setting</h5>
                <p className="card-subtitle">These are your personal details, they are visible to the public</p>
              </div>
              
              <Form className="profile-form">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Number phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="form-actions mt-4">
                  <Button variant="outline-secondary" className="cancel-btn">
                    Cancel
                  </Button>
                  <Button className="update-btn" onClick={handleUpdateProfile}>
                    Update
                  </Button>
                </div>
              </Form>
            </div>

            {/* Update Password Card */}
            <div className="setting-card">
              <div className="card-header">
                <h5 className="card-title">Update Password</h5>
                <p className="card-subtitle">Enter your current password to make update</p>
              </div>
              
              <Form className="password-form">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Current password</Form.Label>
                      <div className="password-input-wrapper">
                        <Form.Control
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                          className="form-input"
                        />
                        <button 
                          type="button" 
                          className="password-toggle"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                            {showCurrentPassword && <line x1="1" y1="1" x2="23" y2="23"></line>}
                          </svg>
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">New password</Form.Label>
                      <div className="password-input-wrapper">
                        <Form.Control
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                          className="form-input"
                        />
                        <button 
                          type="button" 
                          className="password-toggle"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                            {showNewPassword && <line x1="1" y1="1" x2="23" y2="23"></line>}
                          </svg>
                        </button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="form-actions mt-4">
                  <Button variant="outline-secondary" className="cancel-btn">
                    Cancel
                  </Button>
                  <Button className="update-btn" onClick={handleUpdatePassword}>
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={3}>
            <div className="profile-sidebar">
              <div className="sidebar-header">
                <span className="sidebar-title">Profile</span>
                <button className="more-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
              
              <div className="profile-info">
                <div className="profile-avatar">
                  <img src={ProfileImage} alt="Profile" />
                </div>
                <h6 className="profile-name">Courtney Henry</h6>
                <p className="profile-role">Designer</p>
              </div>

              <div className="sidebar-divider"></div>

              <nav className="sidebar-nav">
                <button className="nav-item active">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Analytics
                </button>
                <button className="nav-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Account Setting
                </button>
                <button className="nav-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Customer List
                </button>
                <button className="nav-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Report
                </button>
                <button className="nav-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Transaction
                </button>
              </nav>

              <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
