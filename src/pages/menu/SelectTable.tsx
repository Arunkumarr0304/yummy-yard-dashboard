import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SelectTable.css';

interface Table {
  id: string;
  status: 'available' | 'reserved' | 'occupied';
  section: string;
  size?: 'large';
}

interface SelectTableProps {
  onSelectTable: (tableId: string) => void;
  onCancel: () => void;
}

const tables: Table[] = [
  { id: 'T-01', status: 'available', section: 'A' },
  { id: 'T-02', status: 'occupied', section: 'A' },
  { id: 'T-03', status: 'available', section: 'A', size: 'large' },
  { id: 'T-04', status: 'available', section: 'A' },
  { id: 'T-05', status: 'occupied', section: 'A' },
  { id: 'T-06', status: 'available', section: 'B' },
  { id: 'T-07', status: 'occupied', section: 'B' },
  { id: 'T-08', status: 'reserved', section: 'B', size: 'large' },
  { id: 'T-09', status: 'available', section: 'B' },
  { id: 'T-10', status: 'reserved', section: 'B' },
  { id: 'T-11', status: 'reserved', section: 'C' },
  { id: 'T-12', status: 'reserved', section: 'C' },
  { id: 'T-13', status: 'available', section: 'C', size: 'large' },
  { id: 'T-14', status: 'occupied', section: 'C' },
  { id: 'T-15', status: 'available', section: 'C' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return '#3b82f6'; // blue
    case 'reserved': return '#ef4444'; // red
    case 'occupied': return '#22c55e'; // green
    default: return '#3b82f6';
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'available': return '#eff6ff'; // light blue
    case 'reserved': return '#fef2f2'; // light red
    case 'occupied': return '#f0fdf4'; // light green
    default: return '#eff6ff';
  }
};

export default function SelectTable({ onSelectTable, onCancel }: SelectTableProps) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTableClick = (tableId: string) => {
    setSelectedTable(tableId);
  };

  const handleConfirm = () => {
    if (selectedTable) {
      onSelectTable(selectedTable);
    }
  };

  const filteredTables = tables.filter(table => {
    const matchesFilter = filter === 'all' || table.section === filter;
    const matchesSearch = table.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sectionATables = filteredTables.filter(t => t.section === 'A');
  const sectionBTables = filteredTables.filter(t => t.section === 'B');
  const sectionCTables = filteredTables.filter(t => t.section === 'C');

  return (
    <div className="select-table-page">
      <Container fluid className="py-4">
        {/* Header */}
        <div className="select-table-header mb-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h4 className="select-table-title">Select table</h4>
              
              {/* Legend */}
              <div className="d-flex align-items-center gap-4 mt-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></span>
                  <span className="legend-text">Available table</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
                  <span className="legend-text">Reserved table</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="legend-dot" style={{ backgroundColor: '#22c55e' }}></span>
                  <span className="legend-text">Occupied table</span>
                </div>
              </div>
            </div>

            <button 
              className="close-btn"
              onClick={onCancel}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Filter & Search */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <Form.Select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All table</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </Form.Select>
            <div className="position-relative search-wrapper">
              <Form.Control
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <svg 
                className="search-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#9ca3af" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Table Grid Container */}
        <div className="table-layout-container">
          {/* Section A */}
          <div className="table-row">
            <div className="tables-grid">
              {sectionATables.map((table) => (
                <div 
                  key={table.id}
                  className={`table-box ${table.size === 'large' ? 'table-large' : ''} ${selectedTable === table.id ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: selectedTable === table.id ? '#fff' : getStatusBgColor(table.status),
                    borderColor: selectedTable === table.id ? '#3b82f6' : 'transparent',
                    borderWidth: selectedTable === table.id ? '2px' : '1px',
                  }}
                  onClick={() => handleTableClick(table.id)}
                >
                  <span 
                    className="table-number"
                    style={{ color: getStatusColor(table.status) }}
                  >
                    {table.id}
                  </span>
                </div>
              ))}
            </div>
            <div className="section-marker">A</div>
          </div>

          {/* Section B */}
          <div className="table-row">
            <div className="tables-grid">
              {sectionBTables.map((table) => (
                <div 
                  key={table.id}
                  className={`table-box ${table.size === 'large' ? 'table-large' : ''} ${selectedTable === table.id ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: selectedTable === table.id ? '#fff' : getStatusBgColor(table.status),
                    borderColor: selectedTable === table.id ? '#3b82f6' : 'transparent',
                    borderWidth: selectedTable === table.id ? '2px' : '1px',
                  }}
                  onClick={() => handleTableClick(table.id)}
                >
                  <span 
                    className="table-number"
                    style={{ color: getStatusColor(table.status) }}
                  >
                    {table.id}
                  </span>
                </div>
              ))}
            </div>
            <div className="section-marker">B</div>
          </div>

          {/* Section C */}
          <div className="table-row">
            <div className="tables-grid">
              {sectionCTables.map((table) => (
                <div 
                  key={table.id}
                  className={`table-box ${table.size === 'large' ? 'table-large' : ''} ${selectedTable === table.id ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: selectedTable === table.id ? '#fff' : getStatusBgColor(table.status),
                    borderColor: selectedTable === table.id ? '#3b82f6' : 'transparent',
                    borderWidth: selectedTable === table.id ? '2px' : '1px',
                  }}
                  onClick={() => handleTableClick(table.id)}
                >
                  <span 
                    className="table-number"
                    style={{ color: getStatusColor(table.status) }}
                  >
                    {table.id}
                  </span>
                </div>
              ))}
            </div>
            <div className="section-marker">C</div>
          </div>
        </div>

        {/* Confirm Button */}
        {selectedTable && (
          <div className="confirm-section">
            <Button 
              className="confirm-btn"
              onClick={handleConfirm}
            >
              Confirm Selection - {selectedTable}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
