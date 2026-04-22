import { useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Badge, Button } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import './Bills.css';
import SearchIcon from "../../assets/search-icon.svg";
import ArrowIcon from "../../assets/right-arrow.svg";
import PrintIcon from "../../assets/print-icon.svg";
import DeleteIcon from "../../assets/delete-icon.svg";

interface Bill {
  id: string;
  customerName: string;
  initials: string;
  tableNumber: string;
  orderNumber: string;
  status: 'completed' | 'pending' | 'cancelled';
  itemCount: number;
  tableInfo: string;
}

const billsData: Bill[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  customerName: 'Cheryl Ayema',
  initials: 'CA',
  tableNumber: '10A',
  orderNumber: '#12532',
  status: 'completed' as const,
  itemCount: 3,
  tableInfo: 'Table 3',
}));

interface ActiveAction {
  rowId: string;
  action: 'print' | 'delete';
}

const columns = [
  { key: 'customer', label: 'Name Customer', className: 'customer-col' },
  { key: 'table', label: 'Table', className: 'table-col' },
  { key: 'orderNumber', label: 'Order number', className: 'order-col' },
  { key: 'status', label: 'Status order', className: 'status-col' },
  { key: 'action', label: 'Action', className: 'action-col text-center', align: 'center' as const },
];

const getStatusBadge = (status: string) => {
  const statusClass = `table-status-${status}`;
  return (
    <span className={`table-status-badge ${statusClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function Bills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
  const itemsPerPage = 6;

  // Filter bills based on search
  const filteredBills = billsData.filter((bill) =>
    bill.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBills = filteredBills.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid className="bills-page py-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="page-title mb-0">Bills</h2>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column flex-sm-row justify-content-md-end gap-3 mt-3 mt-md-0">
          <InputGroup className="search-input-group" style={{ maxWidth: '300px' }}>
            <InputGroup.Text className="bg-white border-end-0">
              <img src={SearchIcon} alt="Search" width={18} height={18} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
          <div className="date-picker d-flex align-items-center gap-2">
            <span className="date-label">Date</span>
            <span className="date-value">22/02/2024</span>
            <img src={ArrowIcon} alt="Arrow" />
          </div>
        </Col>
      </Row>

      {/* Bills Card */}
      <div className="bills-card">
        {/* Card Header */}
        <div className="bills-card-header d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-2">
            <h5 className="bills-title mb-0">Bills</h5>
            <Badge className="bills-count">{billsData.length}</Badge>
          </div>
          <Button variant="link" className="p-0 menu-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </Button>
        </div>

        {/* Table */}
        <Table columns={columns}>
          {paginatedBills.map((bill) => (
            <tr key={bill.id}>
              <td>
                <div className="customer-cell-simple">
                  <div className="customer-name">{bill.customerName}</div>
                  <div className="customer-meta">{bill.itemCount} Items • {bill.tableInfo}</div>
                </div>
              </td>
              <td className='usualtd'>{bill.tableNumber}</td>
              <td className='usualtd'>{bill.orderNumber}</td>
              <td>{getStatusBadge(bill.status)}</td>
              <td className="text-center">
                <button 
                  className={`action-btn print-btn ${activeAction?.rowId === bill.id && activeAction?.action === 'print' ? 'active' : ''}`}
                  onClick={() => setActiveAction({ rowId: bill.id, action: 'print' })}
                >
                  <img src={PrintIcon} alt="Print" />
                </button>
                <button 
                  className={`action-btn delete-btn ${activeAction?.rowId === bill.id && activeAction?.action === 'delete' ? 'active' : ''}`}
                  onClick={() => setActiveAction({ rowId: bill.id, action: 'delete' })}
                >
                  <img src={DeleteIcon} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </Table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredBills.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Container>
  );
}
