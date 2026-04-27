import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Nav, Form, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { Search, X } from 'lucide-react';
import './Orders.css';
import Arrow from "../../assets/right-arrow.svg";
import { getOrders } from '../../api/orders';

interface OrderItem {
  name: string;
  qty: number;
  price: string;
  image: string;
  time: string;
  spiciness: string;
}

interface Order {
  _id: string;
  customerName: string;
  initials: string;
  avatarColor: string;
  orderNumber: string;
  orderType: string;
  status: 'all' | 'canceled' | 'waiting' | 'ready' | 'completed';
  date: string;
  time: string;
  items: OrderItem[];
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
}

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'waiting', label: 'Waiting' },
    { key: 'completed', label: 'Completed' },
    { key: 'ready', label: 'Ready to Serve' },
    { key: 'canceled', label: 'Canceled' },
  ];

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getOrders({
        status: activeTab === 'all' ? undefined : activeTab,
        search: searchQuery || undefined
      });
      
      if (response.success) {
        setOrders(response.data);
      } else {
        setError('Failed to load orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when tab or search changes
  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchOrders();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSeeDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading && orders.length === 0) {
    return (
      <Container fluid className="orders-page py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <Spinner animation="border" variant="success" />
          <span className="ms-3">Loading orders...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="orders-page py-4">
        <div className="text-center py-5">
          <p className="text-danger">{error}</p>
          <Button variant="outline-success" onClick={fetchOrders}>Retry</Button>
        </div>
      </Container>
    );
  }

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
            <img src={Arrow} alt="arrow" />
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
          <span className="showing-text">Showing {orders.length} items</span>
        </Col>
      </Row>

      {/* Loading Overlay */}
      {loading && orders.length > 0 && (
        <div className="text-center py-3">
          <Spinner animation="border" size="sm" variant="success" />
          <span className="ms-2">Refreshing...</span>
        </div>
      )}

      {/* Orders Grid */}
      <Row className="g-4">
        {orders.map((order) => (
          <Col key={order._id} xs={12} lg={6} xl={4}>
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
                  <Button 
                    variant="outline-success" 
                    className="see-detail-btn flex-fill"
                    onClick={() => handleSeeDetail(order)}
                  >
                    See Detail
                  </Button>
                  <Button className="pay-bills-btn flex-fill">Pay Bills</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {orders.length === 0 && !loading && (
        <div className="text-center py-5 text-muted">
          <p>No orders found</p>
          <p className="small">Orders will appear here once customers place orders through the mobile app.</p>
        </div>
      )}

      {/* Order Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        className="order-detail-modal"
        backdrop="static"
      >
        {selectedOrder && (
          <>
            <Modal.Header className="border-0 pb-0">
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="avatar-circle"
                    style={{ backgroundColor: selectedOrder.avatarColor }}
                  >
                    {selectedOrder.initials}
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold">{selectedOrder.customerName}</h6>
                    <small className="subtext">
                      {selectedOrder.orderNumber} / {selectedOrder.orderType}
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  {getStatusBadge(selectedOrder.status)}
                  <Button 
                    variant="link" 
                    className="p-0 close-btn" 
                    onClick={handleCloseModal}
                  >
                    <X size={24} className="text-muted" />
                  </Button>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body className="pt-3">
              {/* Date & Time */}
              <div className="d-flex justify-content-between text-muted small mb-4 py-2 border-bottom">
                <span className='regular-text date'>{selectedOrder.date}</span>
                <span className='regular-text time'>{selectedOrder.time}</span>
              </div>

              {/* Order List Title */}
              <h6 className="order-list-title mb-3">Order List</h6>

              {/* Order Items with Images */}
              <div className="order-items-list mb-4">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item-card d-flex gap-3 p-3 mb-2">
                    <div className="order-item-image">
                      <img src={item.image} alt={item.name} className="rounded-3" />
                    </div>
                    <div className="order-item-info flex-grow-1">
                      <h6 className="order-item-name mb-1">{item.name}</h6>
                      <small className="order-item-time d-block text-muted mb-1">{item.time}</small>
                      <span className="order-item-spiciness">{item.spiciness}</span>
                    </div>
                    <div className="order-item-price fw-semibold">{item.price}</div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>{selectedOrder.subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tax (10%)</span>
                  <span>{selectedOrder.tax}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Discount</span>
                  <span>{selectedOrder.discount}</span>
                </div>
                <div className="d-flex justify-content-between pt-3 border-top">
                  <span className="fw-semibold fs-5">Total</span>
                  <span className="total-amount fw-bold fs-5">{selectedOrder.total}</span>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
}
