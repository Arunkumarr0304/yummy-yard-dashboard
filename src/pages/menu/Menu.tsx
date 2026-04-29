import { useState } from 'react';
import { Container, Row, Col, Button, Form, Badge, Modal } from 'react-bootstrap';
import './Menu.css';
import SelectTable from './SelectTable';
import MenuImage1 from "../../assets/menu-image1.png";
import MenuImage2 from "../../assets/menu-image2.png";
import MenuImage3 from "../../assets/menu-image3.png";
import MenuImage4 from "../../assets/menu-image4.png";
import MenuImage5 from "../../assets/menu-image5.png";
import MenuImage6 from "../../assets/menu-image6.png";
import MenuImage7 from "../../assets/menu-image7.png";
import MenuImage8 from "../../assets/menu-image8.png";
import MenuImage9 from "../../assets/menu-image9.png";

interface OrderCard {
  id: string;
  customerName: string;
  orderNumber: string;
  items: string;
  table: string;
  status: 'cancelled' | 'ready' | 'waiting' | 'completed';
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
  sold: number;
  image: string;
  quantity: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const orderCards: OrderCard[] = [
  { id: '1', customerName: 'Vinicius Bayu', orderNumber: '#12532', items: '3 Items', table: 'Table 4A', status: 'cancelled' },
  { id: '2', customerName: 'Cheryl Ayema', orderNumber: '#12532', items: '3 Items', table: 'Table 8B', status: 'ready' },
  { id: '3', customerName: 'Kylian Rex', orderNumber: '#12531', items: '12 Items', table: 'Table 2C', status: 'waiting' },
  { id: '4', customerName: 'Rijal Arudam', orderNumber: '#12529', items: '3 Items', table: 'Table 2A', status: 'completed' },
  { id: '5', customerName: 'Ed Berni', orderNumber: '#12529', items: '3 Items', table: 'Table 1A', status: 'completed' },
];

const menuItemsData: MenuItem[] = [
  { id: '1', name: 'Crispy Dory Sambal Matah', description: 'Deep-fried bite sized fish with sambal matah and creamy sauce...', price: 50.50, available: 12, sold: 6, image: MenuImage1, quantity: 4 },
  { id: '2', name: 'Kopag Benedict', description: 'Deep-fried bite sized balls with creamy meat...', price: 75.50, available: 12, sold: 6, image: MenuImage2, quantity: 0 },
  { id: '3', name: 'Holland Bitterballen', description: 'Deep-fried bite sized mixture of beef and chic...', price: 30.50, available: 12, sold: 6, image: MenuImage3, quantity: 2 },
  { id: '4', name: 'Dory En Oats', description: 'Deep-fried bite sized balls with creamy meat mixture of beef and chic...', price: 101.50, available: 12, sold: 6, image: MenuImage4, quantity: 0 },
  { id: '5', name: 'Lemon Butter Dory', description: 'Deep-fried bite sized mixture of beef and creamy sauce...', price: 50.50, available: 12, sold: 6, image: MenuImage5, quantity: 6 },
  { id: '6', name: 'Spicy Tuna Nachos', description: 'Deep-fried bite sized balls with creamy meat mixture of beef and chic...', price: 42.50, available: 12, sold: 6, image: MenuImage6, quantity: 0 },
  { id: '7', name: 'Alfredo', description: 'Deep-fried bite sized balls with creamy meat mixture of beef and chic...', price: 50.50, available: 12, sold: 6, image: MenuImage7, quantity: 6 },
  { id: '8', name: 'Banana Wrap', description: 'Deep-fried bite sized balls with creamy meat mixture of beef and chic...', price: 50.50, available: 12, sold: 6, image: MenuImage8, quantity: 6 },
  { id: '9', name: 'Blackpapper Chicken', description: 'Deep-fried bite sized balls with creamy meat mixture of beef and chic...', price: 50.50, available: 12, sold: 6, image: MenuImage9, quantity: 6 },
];

const categoryTabs = [
  { key: 'appetizer', label: 'Appetizer' },
  { key: 'main-course', label: 'Main course' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'beverage', label: 'Beverage' },
];

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { className: string; label: string }> = {
    cancelled: { className: 'status-cancelled', label: 'Cancelled' },
    ready: { className: 'status-ready', label: 'Ready to Serve' },
    waiting: { className: 'status-waiting', label: 'Waiting' },
    completed: { className: 'status-completed', label: 'Completed' },
  };

  const config = statusConfig[status] || statusConfig.waiting;
  
  return (
    <Badge className={`order-status-badge ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState('main-course');
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItemsData);
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'Crispy dory sambal matah', price: 101.00, quantity: 2, image: MenuImage1 },
    { id: '2', name: 'Spicy Tuna Nachos', price: 75.00, quantity: 1, image: MenuImage6 },
    { id: '3', name: 'Butterscotch', price: 0, quantity: 1, image: MenuImage9 },
  ]);
  const [customerName, setCustomerName] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableFilter, setTableFilter] = useState('all');
  const [tableSearch, setTableSearch] = useState('');

  const handleAddNote = () => {
    setShowNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setOrderNote('');
  };

  const handleSaveNote = () => {
    // Save the note logic here
    console.log('Order note added:', orderNote);
    setShowNoteModal(false);
    setOrderNote('');
  };

  const handleOpenTableModal = () => {
    setShowTableModal(true);
  };

  const handleCloseTableModal = () => {
    setShowTableModal(false);
  };

  const handleSelectTable = (tableName: string) => {
    setSelectedTable(tableName);
    setShowTableModal(false);
  };

  // Table data
  const tables = [
    { id: 'T-01', status: 'available', section: 'A' },
    { id: 'T-02', status: 'occupied', section: 'A' },
    { id: 'T-03', status: 'available', section: 'A', size: 'large' },
    { id: 'T-04', status: 'available', section: 'A', selected: true },
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

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#3b82f6'; // blue
      case 'reserved': return '#ef4444'; // red
      case 'occupied': return '#22c55e'; // green
      default: return '#3b82f6';
    }
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCartQuantityChange = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  // If showTableModal is true, render SelectTable component as inner page
  if (showTableModal) {
    return (
      <SelectTable 
        onSelectTable={handleSelectTable}
        onCancel={handleCloseTableModal}
      />
    );
  }

  return (
    <div className="menu-page-wrapper">
      <Container fluid className="menu-page py-4">
        {/* Order List Section */}
        <div className="order-list-section mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="section-title mb-0">Order List</h5>
            <Button variant="link" className="see-all-btn">See All</Button>
          </div>
          <div className="order-cards-row">
            {orderCards.map((order) => (
              <div key={order.id} className="order-card">
                <h6 className="customer-name">{order.customerName}</h6>
                <small className="order-number">{order.orderNumber}</small>
                <div className="order-info">
                  {order.items} • {order.table}
                </div>
                {getStatusBadge(order.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs-menu mb-4">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              className={`category-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Section */}
        <div className="menu-section">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="menu-title mb-0">Menu</h5>
            <span className="showing-text">Showing 30 Items</span>
          </div>

          <Row className="g-3">
            {menuItems.map((item) => (
              <Col key={item.id} xs={12} md={6} lg={4}>
                <div className="menu-item-card">
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="menu-item-content">
                    <h6 className="menu-item-name">{item.name}</h6>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-stats">
                      <small className="available-text text-muted">{item.available} Available • {item.sold} Sold</small>
                    </div>
                    <div className="menu-item-footer">
                      <span className="menu-item-price">${item.price.toFixed(2)}</span>
                      <div className="quantity-control">
                        <button 
                          className="qty-btn minus"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn plus"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Process Order Panel */}
      <div className="process-order-panel">
        <h5 className="panel-title">Process Order</h5>

        {/* Order Type */}
        <div className="order-type-tabs mb-4">
          <button 
            className={`type-tab ${orderType === 'dine-in' ? 'active' : ''}`}
            onClick={() => setOrderType('dine-in')}
          >
            Dine in
          </button>
          <button 
            className={`type-tab ${orderType === 'take-away' ? 'active' : ''}`}
            onClick={() => setOrderType('take-away')}
          >
            Take Away
          </button>
        </div>

        {/* Customer Information */}
        <div className="customer-info-section mb-4">
          <h6 className="section-subtitle">Customer Information</h6>
          <Form.Control
            type="text"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="customer-input mb-3"
          />
          <div className="select-table-box" onClick={handleOpenTableModal}>
            <span className={selectedTable ? 'selected' : 'placeholder'}>
              {selectedTable || 'Select table'}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        {/* Add Note */}
        <Button className="add-note-btn mb-4" onClick={handleAddNote}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Add Note
        </Button>

        {/* Order Details */}
        <div className="order-details-section">
          <h6 className="section-subtitle">Order Details</h6>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                </div>
                <div className="cart-item-qty">
                  <button className="qty-btn-sm" onClick={() => handleCartQuantityChange(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn-sm plus" onClick={() => handleCartQuantityChange(item.id, 1)}>+</button>
                </div>
                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span className="total-amount">${total.toFixed(0)}</span>
            </div>
          </div>

          {/* Process Transaction Button */}
          <Button className="process-transaction-btn">
            Proccess Transaction
          </Button>
        </div>
      </div>


      {/* Add Note Modal */}
      <Modal show={showNoteModal} onHide={handleCloseNoteModal} centered className="add-note-modal">
        <Modal.Header className="border-0 pb-0">
          <Modal.Title className="fs-6 fw-semibold">Add note</Modal.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={handleCloseNoteModal}
            aria-label="Close"
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '20px', 
              color: '#ef4444',
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </Modal.Header>
        <Modal.Body className="pt-3">
          <Form>
            <Form.Group>
              <Form.Label className="fs-6 text-dark mb-2">Enter Order Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="What your order note here.."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="note-textarea"
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  resize: 'none'
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="outline-secondary" 
            onClick={handleCloseNoteModal}
            className="cancel-btn"
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleSaveNote}
            className="add-to-order-btn"
            style={{
              background: '#10b981',
              border: 'none',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            Add to Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
