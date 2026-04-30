import { useState } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Reports.css';
import ProfileImage from "../../assets/profile-image.png";

interface ReportData {
  id: string;
  date: string;
  paymentMethod: string;
  totalCollected: number;
}

const reportData: ReportData[] = [
  { id: '1', date: 'Wed, 04 Jun 2023', paymentMethod: 'Debit/Credit card', totalCollected: 753.50 },
  { id: '2', date: 'Wed, 04 Jun 2023', paymentMethod: 'Cash', totalCollected: 453.20 },
  { id: '3', date: 'Wed, 04 Jun 2023', paymentMethod: 'Cash', totalCollected: 453.20 },
  { id: '4', date: 'Wed, 04 Jun 2023', paymentMethod: 'Qris', totalCollected: 453.20 },
  { id: '5', date: 'Wed, 04 Jun 2023', paymentMethod: 'Debit/Credit card', totalCollected: 753.50 },
  { id: '6', date: 'Wed, 04 Jun 2023', paymentMethod: 'Debit/Credit card', totalCollected: 753.50 },
  { id: '7', date: 'Wed, 04 Jun 2023', paymentMethod: 'Cash', totalCollected: 753.50 },
  { id: '8', date: 'Wed, 04 Jun 2023', paymentMethod: 'Qris', totalCollected: 453.20 },
  { id: '9', date: 'Wed, 04 Jun 2023', paymentMethod: 'Debit/Credit card', totalCollected: 453.20 },
];

export default function Reports() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('Daily');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="reports-page">
      <Container fluid className="py-4">
        {/* Header */}
        <div className="reports-header mb-4">
          <h4 className="page-title">Report</h4>
          
          <div className="header-actions">
            <div className="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <button className="download-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
          </div>
        </div>

        <Row>
          {/* Main Content */}
          <Col lg={9}>
            <div className="reports-card">
              {/* Report Header */}
              <div className="reports-card-header">
                <h5 className="card-title">Report</h5>
                <Form.Select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </Form.Select>
              </div>

              {/* Reports Table */}
              <div className="table-responsive">
                <Table className="reports-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Date/Time
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </div>
                      </th>
                      <th>Payment method</th>
                      <th className="text-end">Total collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row) => (
                      <tr key={row.id}>
                        <td className="date-cell">{row.date}</td>
                        <td className="payment-method-cell">{row.paymentMethod}</td>
                        <td className="amount-cell text-end">${row.totalCollected.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="pagination-wrapper">
                <span className="showing-text">Page 1 of 30</span>
                <div className="pagination">
                  <button 
                    className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </button>
                  <button 
                    className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                    onClick={() => handlePageChange(2)}
                  >
                    2
                  </button>
                  <button 
                    className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
                    onClick={() => handlePageChange(3)}
                  >
                    3
                  </button>
                  <button 
                    className={`page-btn ${currentPage === 4 ? 'active' : ''}`}
                    onClick={() => handlePageChange(4)}
                  >
                    4
                  </button>
                  <button className="page-btn next" onClick={() => handlePageChange(currentPage + 1)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
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
                <button className="nav-item" onClick={() => navigate('/dashboard')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Analytics
                </button>
                <button className="nav-item" onClick={() => navigate('/account-setting')}>
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
                <button className="nav-item active">
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
