import { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import ProfileCard from '../../components/Profile';
import { getTransactions, exportTransactions } from '../../api/transactions';
import './History.css';
import SearchIcon from "../../assets/search-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";
import DownloadIcon from "../../assets/download-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";

interface Transaction {
  _id: string;
  productName: string;
  productImage: string;
  date: string;
  quality: string;
  price: number;
}

interface ActiveAction {
  rowId: string;
  action: 'edit' | 'info';
}

const columns = [
  { key: 'product', label: 'Product name', className: 'product-col' },
  { key: 'date', label: 'Date/Time', className: 'date-col' },
  { key: 'quality', label: 'Quality (In Kgs)', className: 'quality-col' },
  { key: 'price', label: 'Price', className: 'price-col' },
  { key: 'action', label: 'Action', className: 'action-col text-center', align: 'center' as const },
];

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('recent');
  const itemsPerPage = 6;

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTransactions({
        search: searchQuery,
        sort: sortOption,
        page: currentPage,
        limit: itemsPerPage
      });

      if (response.success) {
        setTransactions(response.data);
        setTotalPages(response.totalPages);
        setTotalItems(response.total);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Error loading transactions. Please try again.');
      console.error('Error fetching transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, sortOption]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
      fetchTransactions();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      const response = await exportTransactions();
      if (response.success) {
        // TODO: Handle CSV/Excel download
        console.log('Export data:', response.data);
        alert('Export functionality will be implemented soon!');
      }
    } catch (err) {
      console.error('Error exporting transactions:', err);
      alert('Failed to export transactions');
    }
  };

  const handleAddProduct = () => {
    // TODO: Open add product modal or navigate to add product page
    alert('Add product functionality will be implemented soon!');
  };

  // Format price with dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="history-page-wrapper">
        <Container fluid className="history-page py-4 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner animation="border" variant="success" />
        </Container>
        <ProfileCard />
      </div>
    );
  }

  return (
    <div className="history-page-wrapper">
      <Container fluid className="history-page py-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={4}>
            <h2 className="page-title mb-0">Transaction History</h2>
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column flex-sm-row justify-content-md-end gap-3 mt-3 mt-md-0">
            <InputGroup className="search-input-group" style={{ maxWidth: '280px' }}>
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
            <Button className="add-product-btn" onClick={handleAddProduct}>
              <img src={PlusIcon} alt="Plus" width={16} height={16} />
              Add product
            </Button>
            <Button className="download-btn" onClick={handleExport}>
              <img src={DownloadIcon} alt="Download" width={16} height={16} />
              Download
            </Button>
          </Col>
        </Row>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Transactions Card */}
        <div className="history-card">
          {/* Card Header */}
          <div className="history-card-header d-flex align-items-center justify-content-between mb-4">
            <h5 className="history-title mb-0">Transactions</h5>
            <Form.Select 
              className="filter-select" 
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </Form.Select>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
            </div>
          ) : (
            <>
              {/* Table */}
              <Table columns={columns}>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className={activeRow === transaction._id ? 'active-row' : ''}
                      onMouseEnter={() => setActiveRow(transaction._id)}
                      onMouseLeave={() => setActiveRow(null)}
                    >
                      <td>
                        <div className="product-cell">
                          <img 
                            src={transaction.productImage || '/placeholder.png'} 
                            alt={transaction.productName} 
                            className="product-img" 
                          />
                          <span className="product-name">{transaction.productName}</span>
                        </div>
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.quality}</td>
                      <td className="price-cell">{formatPrice(transaction.price)}</td>
                      <td className="text-center">
                        <button 
                          className={`action-btn history-edit-btn ${activeAction?.rowId === transaction._id && activeAction?.action === 'edit' ? 'active' : ''}`}
                          onClick={() => setActiveAction({ rowId: transaction._id, action: 'edit' })}
                        >
                          <img src={EditIcon} alt="Edit" />
                        </button>
                        <button 
                          className={`action-btn history-info-btn ${activeAction?.rowId === transaction._id && activeAction?.action === 'info' ? 'active' : ''}`}
                          onClick={() => setActiveAction({ rowId: transaction._id, action: 'info' })}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No transactions found
                    </td>
                  </tr>
                )}
              </Table>

              {/* Pagination */}
              {transactions.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          )}
        </div>
      </Container>

      {/* Profile Sidebar */}
      <ProfileCard />
    </div>
  );
}
