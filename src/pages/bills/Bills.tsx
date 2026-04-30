import { useState, useMemo } from 'react';
import { Container, Row, Col, InputGroup, Form, Badge, Button, Modal } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
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

// Static bills data
const staticBills: Bill[] = [
  { _id: '1', customerName: 'Courtney Henry', initials: 'CH', tableNumber: 'Table 2A', orderNumber: '#10021', status: 'completed', itemCount: 2, tableInfo: 'Dine in' },
  { _id: '2', customerName: 'Darrell Steward', initials: 'DS', tableNumber: 'Table 2B', orderNumber: '#10022', status: 'pending', itemCount: 2, tableInfo: 'Dine in' },
  { _id: '3', customerName: 'Albert Flores', initials: 'AF', tableNumber: 'Table 3A', orderNumber: '#10023', status: 'completed', itemCount: 1, tableInfo: 'Dine in' },
  { _id: '4', customerName: 'Marvin McKinney', initials: 'MM', tableNumber: 'Table 3B', orderNumber: '#10024', status: 'cancelled', itemCount: 1, tableInfo: 'Take Away' },
  { _id: '5', customerName: 'Jenny Wilson', initials: 'JW', tableNumber: 'Table 4A', orderNumber: '#10025', status: 'completed', itemCount: 1, tableInfo: 'Dine in' },
  { _id: '6', customerName: 'Annette Black', initials: 'AB', tableNumber: 'Table 4B', orderNumber: '#10026', status: 'pending', itemCount: 3, tableInfo: 'Dine in' },
  { _id: '7', customerName: 'Robert Fox', initials: 'RF', tableNumber: 'Table 5A', orderNumber: '#10027', status: 'completed', itemCount: 1, tableInfo: 'Take Away' },
  { _id: '8', customerName: 'Devon Lane', initials: 'DL', tableNumber: 'Table 5B', orderNumber: '#10028', status: 'completed', itemCount: 1, tableInfo: 'Dine in' },
  { _id: '9', customerName: 'Floyd Miles', initials: 'FM', tableNumber: 'Table 6A', orderNumber: '#10029', status: 'pending', itemCount: 2, tableInfo: 'Dine in' },
  { _id: '10', customerName: 'Guy Hawkins', initials: 'GH', tableNumber: 'Table 6B', orderNumber: '#10030', status: 'completed', itemCount: 1, tableInfo: 'Take Away' },
  { _id: '11', customerName: 'Arlene McCoy', initials: 'AM', tableNumber: 'Table 7A', orderNumber: '#10031', status: 'completed', itemCount: 1, tableInfo: 'Dine in' },
  { _id: '12', customerName: 'Esther Howard', initials: 'EH', tableNumber: 'Table 7B', orderNumber: '#10032', status: 'pending', itemCount: 1, tableInfo: 'Dine in' },
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
  const [bills] = useState<Bill[]>(staticBills);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [billToDelete, setBillToDelete] = useState<string | null>(null);
  const [billToPrint, setBillToPrint] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  
  const itemsPerPage = 6;

  // Filter bills based on search query
  const filteredBills = useMemo(() => {
    if (!searchQuery) return bills;
    return bills.filter(bill => 
      bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.tableNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bills, searchQuery]);

  // Calculate pagination
  const totalItems = filteredBills.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBills = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBills.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBills, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle print button click - opens modal
  const handlePrintClick = (billId: string) => {
    setBillToPrint(billId);
    setShowPrintModal(true);
  };

  // Handle confirm print from modal
  const handleConfirmPrint = () => {
    setShowPrintModal(false);
    setShowProcessingModal(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgressInterval(null);
          setTimeout(() => {
            setShowProcessingModal(false);
            setShowSuccessModal(true);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    setProgressInterval(interval);
  };

  // Handle cancel processing - shows failed
  const handleCancelProcessing = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    setShowProcessingModal(false);
    setShowFailedModal(true);
    setProgress(0);
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setBillToPrint(null);
    setActiveAction(null);
  };

  // Handle failed modal replay
  const handleFailedReplay = () => {
    setShowFailedModal(false);
    if (billToPrint) {
      handleConfirmPrint();
    }
  };

  // Handle failed modal close
  const handleFailedClose = () => {
    setShowFailedModal(false);
    setBillToPrint(null);
    setActiveAction(null);
  };

  // Handle cancel print - close modal
  const handleCancelPrint = () => {
    setShowPrintModal(false);
    setBillToPrint(null);
  };

  // Handle delete button click - opens modal
  const handleDeleteClick = (billId: string) => {
    setBillToDelete(billId);
    setShowDeleteModal(true);
  };

  // Handle confirm delete from modal
  const handleConfirmDelete = () => {
    if (billToDelete) {
      setActiveAction({ rowId: billToDelete, action: 'delete' });
      console.log('Deleting bill:', billToDelete);
      // Simulate delete action
      setTimeout(() => {
        setActiveAction(null);
        setShowDeleteModal(false);
        setBillToDelete(null);
      }, 500);
    }
  };

  // Handle cancel delete - close modal
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBillToDelete(null);
  };

  // Handle search input change
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

        {/* Table */}
        <Table columns={columns}>
          {paginatedBills.length > 0 ? (
            paginatedBills.map((bill) => (
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
                      onClick={() => handlePrintClick(bill._id)}
                      disabled={activeAction !== null}
                    >
                      <img src={PrintIcon} alt="Print" />
                    </button>
                    <button 
                      className={`action-btn delete-btn ${activeAction?.rowId === bill._id && activeAction?.action === 'delete' ? 'active' : ''}`}
                      onClick={() => handleDeleteClick(bill._id)}
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={handleCancelDelete}
        centered
        className="delete-confirmation-modal"
        backdrop="static"
      >
        <Modal.Body>
        <div className='headingRow'>
          <div className="delete-icon-wrapper">
            <img src={DeleteIcon} alt="Delete" className="delete-modal-icon" />
          </div>
          <div>
          <h5 className="modal-title">Delete confirmation required.</h5>
          </div>
          </div>
          <p className="modal-description">
            Are you certain about deleting this item? Once deleted, it cannot be recovered. Confirm deletion, please
          </p>
          
          
          <div className="modal-buttons">
            <Button
              className="confirm-btn"
              onClick={handleConfirmDelete}
              disabled={activeAction !== null}
            >
              Confirm
            </Button>
            <Button
              variant="outline-secondary"
              className="cancel-btn"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Print Confirmation Modal */}
      <Modal
        show={showPrintModal}
        onHide={handleCancelPrint}
        centered
        className="print-confirmation-modal"
        backdrop="static"
      >
        <Modal.Body>
          <div className='headingRow'>
          <div className="print-icon-wrapper">
            <img src={PrintIcon} alt="Print" className="print-modal-icon" />
          </div>
          <h5 className="modal-title">Print bills?</h5>
          </div>
          <p className="modal-description">
            Would you like to print bills now? Please confirm to proceed with the printing process.
          </p>
          <div className="modal-buttons">
            <Button
              className="confirm-btn"
              onClick={handleConfirmPrint}
              disabled={activeAction !== null}
            >
              Confirm
            </Button>
            <Button
              variant="outline-secondary"
              className="cancel-btn"
              onClick={handleCancelPrint}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Processing Modal */}
      <Modal
        show={showProcessingModal}
        onHide={handleCancelProcessing}
        centered
        className="processing-modal"
        backdrop="static"
      >
        <Modal.Body>
          <div className='headingRow'>
            <div className="print-icon-wrapper">
              <img src={PrintIcon} alt="Print" className="print-modal-icon" />
            </div>
            <h5 className="modal-title">Prosess print bills</h5>
          </div>
          <p className="modal-description">
            Bills are currently being processed for printing. Please wait for completion. Thank you for your patience.
          </p>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="modal-buttons">
            <Button
              variant="outline-secondary"
              className="cancel-btn"
              onClick={handleCancelProcessing}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={handleSuccessClose}
        centered
        className="success-modal"
        backdrop="static"
      >
        <Modal.Body>
          <div className='headingRow'>
            <div className="success-icon-wrapper">
              <span role="img" aria-label="success">🎉</span>
            </div>
            <h5 className="modal-title">Printing successful!</h5>
          </div>
          <p className="modal-description">
            Your document has been successfully printed. Thank you for using our printing services
          </p>
          <div className="modal-buttons">
            <Button
              className="confirm-btn"
              onClick={handleSuccessClose}
            >
              Back to history
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Failed Modal */}
      <Modal
        show={showFailedModal}
        onHide={handleFailedClose}
        centered
        className="failed-modal"
        backdrop="static"
      >
        <Modal.Body>
          <div className='headingRow'>
            <div className="failed-icon-wrapper">
              <span role="img" aria-label="failed">❌</span>
            </div>
            <h5 className="modal-title">Printing failed!</h5>
          </div>
          <p className="modal-description">
            Your document has been successfully printed. Thank you for using our printing services
          </p>
          <div className="modal-buttons">
            <Button
              className="confirm-btn"
              onClick={handleFailedReplay}
            >
              Replay
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
