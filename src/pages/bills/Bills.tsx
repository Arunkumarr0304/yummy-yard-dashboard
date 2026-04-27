import { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Form, Badge, Button, Spinner } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import { getBills, deleteBill, printBill } from '../../api/bills';
import './Bills.css';
import SearchIcon from "../../assets/search-icon.svg";
import ArrowIcon from "../../assets/right-arrow.svg";
import PrintIcon from "../../assets/print-icon.svg";
import DeleteIcon from "../../assets/delete-icon.svg";

interface Bill {
  _id: string;
  customerName: string;
  initials: string;
  tableNumber: string;
  orderNumber: string;
  status: 'completed' | 'pending' | 'cancelled';
  itemCount: number;
  tableInfo: string;
}

interface BillsResponse {
  success: boolean;
  data: Bill[];
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
}

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
  const [bills, setBills] = useState<Bill[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = 6;

  // Fetch bills from API
  const fetchBills = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: BillsResponse = await getBills({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage
      });
      
      if (response.success) {
        setBills(response.data);
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      setError('Failed to fetch bills. Please try again.');
      console.error('Error fetching bills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch bills on component mount and when dependencies change
  useEffect(() => {
    fetchBills();
  }, [currentPage, searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle print action
  const handlePrint = async (billId: string) => {
    setActiveAction({ rowId: billId, action: 'print' });
    
    try {
      const response = await printBill(billId);
      if (response.success) {
        console.log('Bill printed successfully:', response.data);
        // TODO: Show success notification
      }
    } catch (err) {
      console.error('Error printing bill:', err);
      // TODO: Show error notification
    } finally {
      setActiveAction(null);
    }
  };

  // Handle delete action
  const handleDelete = async (billId: string) => {
    setActiveAction({ rowId: billId, action: 'delete' });
    
    try {
      const response = await deleteBill(billId);
      if (response.success) {
        console.log('Bill deleted successfully');
        // Refresh bills list
        fetchBills();
        // TODO: Show success notification
      }
    } catch (err) {
      console.error('Error deleting bill:', err);
      // TODO: Show error notification
    } finally {
      setActiveAction(null);
    }
  };

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
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
              onChange={handleSearchChange}
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
            <Badge className="bills-count">{totalItems}</Badge>
          </div>
          <Button variant="link" className="p-0 menu-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-4">
            <Spinner animation="border" variant="success" />
            <p className="mt-2 text-muted">Loading bills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger mx-3" role="alert">
            {error}
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <Table columns={columns}>
            {bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill._id}>
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
                      className={`action-btn print-btn ${activeAction?.rowId === bill._id && activeAction?.action === 'print' ? 'active' : ''}`}
                      onClick={() => handlePrint(bill._id)}
                      disabled={activeAction !== null}
                    >
                      <img src={PrintIcon} alt="Print" />
                    </button>
                    <button 
                      className={`action-btn delete-btn ${activeAction?.rowId === bill._id && activeAction?.action === 'delete' ? 'active' : ''}`}
                      onClick={() => handleDelete(bill._id)}
                      disabled={activeAction !== null}
                    >
                      <img src={DeleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  No bills found
                </td>
              </tr>
            )}
          </Table>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Container>
  );
}
