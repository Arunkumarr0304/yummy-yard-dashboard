import { useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import ProfileCard from '../../components/Profile';
import './History.css';
import SearchIcon from "../../assets/search-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";
import DownloadIcon from "../../assets/download-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import Tomato from "../../assets/tomato.png";
import Tomato2 from "../../assets/dish.png";

interface Transaction {
  id: string;
  productName: string;
  productImage: string;
  date: string;
  quality: string;
  price: string;
}

interface ActiveAction {
  rowId: string;
  action: 'edit' | 'info';
}

const transactionsData: Transaction[] = [
  {
    id: '1',
    productName: 'Tomato',
    productImage: Tomato,
    date: 'Wed, 04 Jun 2023',
    quality: '25/100',
    price: '$30.00',
  },
  {
    id: '2',
    productName: 'Egg',
    productImage: Tomato2,
    date: 'Wed, 04 Jun 2023',
    quality: '45/100',
    price: '$45.00',
  },
  {
    id: '3',
    productName: 'Meat',
    productImage: Tomato,
    date: 'Wed, 04 Jun 2023',
    quality: '85/100',
    price: '$157.00',
  },
  {
    id: '4',
    productName: 'Fish',
    productImage: Tomato2,
    date: 'Wed, 04 Jun 2023',
    quality: '85/100',
    price: '$30.00',
  },
  {
    id: '5',
    productName: 'Chicken',
    productImage: Tomato,
    date: 'Wed, 04 Jun 2023',
    quality: '85/100',
    price: '$30.00',
  },
  {
    id: '6',
    productName: 'Chili',
    productImage: Tomato2,
    date: 'Wed, 04 Jun 2023',
    quality: '85/100',
    price: '$30.00',
  },
  {
    id: '7',
    productName: 'Lemon',
    productImage: Tomato,
    date: 'Wed, 04 Jun 2023',
    quality: '85/100',
    price: '$30.00',
  },
];

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
  const itemsPerPage = 6;

  // Filter transactions based on search
  const filteredTransactions = transactionsData.filter((transaction) =>
    transaction.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            <Button className="add-product-btn">
              <img src={PlusIcon} alt="Plus" width={16} height={16} />
              Add product
            </Button>
            <Button className="download-btn">
              <img src={DownloadIcon} alt="Download" width={16} height={16} />
              Download
            </Button>
          </Col>
        </Row>

        {/* Transactions Card */}
        <div className="history-card">
          {/* Card Header */}
          <div className="history-card-header d-flex align-items-center justify-content-between mb-4">
            <h5 className="history-title mb-0">Transactions</h5>
            <Form.Select className="filter-select">
              <option>Recent</option>
            </Form.Select>
          </div>

          {/* Table */}
          <Table columns={columns}>
            {paginatedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={activeRow === transaction.id ? 'active-row' : ''}
                onMouseEnter={() => setActiveRow(transaction.id)}
                onMouseLeave={() => setActiveRow(null)}
              >
                <td>
                  <div className="product-cell">
                    <img src={transaction.productImage} alt={transaction.productName} className="product-img" />
                    <span className="product-name">{transaction.productName}</span>
                  </div>
                </td>
                <td>{transaction.date}</td>
                <td>{transaction.quality}</td>
                <td className="price-cell">{transaction.price}</td>
                <td className="text-center">
                  <button 
                    className={`action-btn history-edit-btn ${activeAction?.rowId === transaction.id && activeAction?.action === 'edit' ? 'active' : ''}`}
                    onClick={() => setActiveAction({ rowId: transaction.id, action: 'edit' })}
                  >
                    <img src={EditIcon} alt="Edit" />
                  </button>
                  <button 
                    className={`action-btn history-info-btn ${activeAction?.rowId === transaction.id && activeAction?.action === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveAction({ rowId: transaction.id, action: 'info' })}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={40}
            onPageChange={handlePageChange}
            totalItems={filteredTransactions.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </Container>

      {/* Profile Sidebar */}
      <ProfileCard />
    </div>
  );
}
