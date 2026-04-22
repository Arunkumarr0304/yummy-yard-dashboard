import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Header */}
        <Navbar user={user} />

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
