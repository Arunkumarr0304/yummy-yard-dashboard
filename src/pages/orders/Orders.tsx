import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav, Form, InputGroup } from 'react-bootstrap';
import { Search, ChevronRight } from 'lucide-react';
import './Orders.css';
import Arrow from "../../assets/right-arrow.svg";

interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

interface Order {
  id: string;
  customerName: string;
  initials: string;
  avatarColor: string;
  orderNumber: string;
  orderType: string;
  status: 'all' | 'canceled' | 'waiting' | 'ready' | 'completed';
  date: string;
  time: string;
  items: OrderItem[];
  total: string;
}

const ordersData: Order[] = [
  {
    id: '1',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#2261FF',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'canceled',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
  {
    id: '2',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#F56F62',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'waiting',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
  {
    id: '3',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#01B763',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'ready',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
  {
    id: '4',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#01B763',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'ready',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
  {
    id: '5',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#2261FF',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'completed',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
  {
    id: '6',
    customerName: 'Cheryl Ayema',
    initials: 'CA',
    avatarColor: '#F56F62',
    orderNumber: 'Order #1234',
    orderType: 'Dine in',
    status: 'completed',
    date: 'Wed, July 12, 2024',
    time: '10:20 AM',
    items: [
      { name: 'Crispy Dory Sambal Matah', qty: 1, price: '$451.00' },
      { name: 'Spicy Tuna Nachos', qty: 2, price: '$242.00' },
      { name: 'Butterscotch', qty: 3, price: '$132.00' },
    ],
    total: '$542.00',
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { bg: string; text: string; className: string }> = {
    all: { bg: '#f8f9fa', text: '#212529', className: 'status-all' },
    canceled: { bg: '#fee2e2', text: '#dc2626', className: 'status-canceled' },
    waiting: { bg: '#fef3c7', text: '#d97706', className: 'status-waiting' },
    ready: { bg: '#d1fae5', text: '#059669', className: 'status-ready' },
    completed: { bg: '#dbeafe', text: '#2563eb', className: 'status-completed' },
  };

  const config = statusConfig[status] || statusConfig.all;
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge className={`order-status-badge ${config.className}`}>
      {statusLabel === 'All' ? 'All Orders' : statusLabel}
    </Badge>
  );
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'completed', label: 'Completed' },
    { key: 'ready', label: 'Ready to Serve' },
    { key: 'canceled', label: 'Canceled' },
  ];

  const filteredOrders = ordersData.filter((order) => {
    if (activeTab !== 'all' && order.status !== activeTab) return false;
    if (searchQuery && !order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Container fluid className="orders-page py-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="page-title mb-0">Order List</h2>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column flex-sm-row justify-content-md-end gap-3 mt-3 mt-md-0">
          <InputGroup className="search-input-group" style={{ maxWidth: '300px' }}>
            <InputGroup.Text className="bg-white border-end-0">
              <Search size={18} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
          <div className="date-picker d-flex align-items-center gap-2 text-muted">
            <span className="fw-semibold">Date</span>
            <span className='fw-semibold-date'>22/02/2024</span>
            <img src={Arrow} />
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <Nav variant="pills" className="order-tabs mb-4 flex-nowrap overflow-auto">
        {tabs.map((tab) => (
          <Nav.Item key={tab.key}>
            <Nav.Link
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="order-tab-link"
            >
              {tab.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Customer List Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h5 className="customer-list-title mb-0">Customer List</h5>
        </Col>
        <Col xs="auto">
          <span className="showing-text">Showing {filteredOrders.length} items</span>
        </Col>
      </Row>

      {/* Orders Grid */}
      <Row className="g-4">
        {filteredOrders.map((order) => (
          <Col key={order.id} xs={12} lg={6} xl={4}>
            <Card className="order-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="avatar-circle"
                      style={{ backgroundColor: order.avatarColor }}
                    >
                      {order.initials}
                    </div>
                    <div>
                      <h6 className="mb-1 fw-semibold">{order.customerName}</h6>
                      <small className="subtext">
                        {order.orderNumber} / {order.orderType}
                      </small>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Date & Time */}
                <div className="d-flex justify-content-between text-muted small mb-3 py-2 border-bottom">
                  <span className='regular-text date'>{order.date}</span>
                  <span className='regular-text time'>{order.time}</span>
                </div>

                {/* Items Table */}
                <div className="items-table mb-3">
                  <div className="table-header d-flex text-muted small fw-medium py-2 ">
                    <span className="regular-text flex-grow-1">Item</span>
                    <span className="regular-text qty-col text-center">Qty</span>
                    <span className="regular-text price-col text-end">Price</span>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="table-row d-flex py-2">
                      <span className="regular-text flex-grow-1 text-truncate">{item.name}</span>
                      <span className="regular-text qty-col text-center">{item.qty}</span>
                      <span className="regular-text price-col text-end">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="d-flex justify-content-between fw-bold mb-4 pt-2 border-top">
                  <span className='total-text'>Total</span>
                  <span className='total-text-value'>{order.total}</span>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button variant="outline-success" className="see-detail-btn flex-fill">
                    See Detail
                  </Button>
                  <Button className="pay-bills-btn flex-fill">Pay Bills</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredOrders.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p>No orders found</p>
        </div>
      )}
    </Container>
  );
}
