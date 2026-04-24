import { useState, useRef } from 'react';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import './Products.css';
import SearchIcon from "../../assets/search-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  stock: number;
  price: string;
}

const productsData: Product[] = [
  { id: '1', name: 'Crispy Dory Sambal Matah', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '2', name: 'Kopag Benedict', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '3', name: 'Dory En Oats', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '4', name: 'Lemon Butter Dory', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '5', name: 'Spicy Tuna Nachos', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '6', name: 'Alfredo', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
  { id: '7', name: 'Blackpapper Chicken', code: '#12345', category: 'Food', stock: 120, price: '$123.00' },
];

const columns = [
  { key: 'name', label: 'Product name', className: 'name-col' },
  { key: 'code', label: 'Code', className: 'code-col' },
  { key: 'category', label: 'Category', className: 'category-col' },
  { key: 'stock', label: 'Stock', className: 'stock-col' },
  { key: 'price', label: 'Price', className: 'price-col' },
];

const categoryTabs = [
  { key: 'all', label: 'All' },
  { key: 'main-course', label: 'Main course' },
  { key: 'appetizer', label: 'Appetizer' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'beverage', label: 'Beverage' },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [stock, setStock] = useState('0');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('0');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const itemsPerPage = 7;

  // Filter products
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = 40;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setProductName('');
    setProductCode('####');
    setStock('0');
    setCategory('');
    setUnitPrice('0');
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSave = () => {
    if (!selectedImage) return;
    console.log('Saving product with image:', selectedImage);
    // Add your save logic here
  };

  const isSaveEnabled = selectedImage !== null;

  return (
    <div className="products-page-wrapper">
      <Container fluid className="products-page py-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6}>
            <h2 className="page-title mb-0">Products Management</h2>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column flex-sm-row justify-content-md-end gap-3 mt-3 mt-md-0">
            <InputGroup className="search-input-group" style={{ }}>
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
            <Button className="add-new-menu-btn">
              <img src={PlusIcon} alt="Plus" width={16} height={16} />
              Add new menu
            </Button>
          </Col>
        </Row>

        {/* Category Tabs */}
        <div className="category-tabs mb-4">
          <div className="tabs-container">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Card */}
        <div className="products-card">
          {/* Card Header */}
          <div className="products-card-header d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <h5 className="products-title mb-0">Products</h5>
              <span className="products-count">100</span>
            </div>
            <button className="menu-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>

          {/* Table */}
          <Table columns={columns}>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="product-name-cell">{product.name}</td>
                <td>{product.code}</td>
                <td>{product.category}</td>
                <td className="stock-cell">{product.stock}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </Table>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </Container>

      {/* Add Product Panel */}
      <div className="add-product-panel">
        <h5 className="add-product-title">Add product</h5>
        
        {/* Image Upload */}
        <div className="image-upload-section mb-4">
          <label className="image-heading">Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div
            className={`image-upload-box ${isDragging ? 'dragging' : ''} ${selectedImage ? 'has-image' : ''}`}
            onClick={handleClickUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="image-preview-wrapper">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button 
                  className="remove-image-btn"
                  onClick={handleRemoveImage}
                  title="Remove image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <span className="upload-text">Upload or drag image</span>
              </>
            )}
          </div>
        </div>

        {/* Category and Unit Price */}
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Select 
                className="form-select-custom"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="form-label">Unit Price</Form.Label>
              <div className="unit-price-input">
                <span className="currency">$</span>
                <Form.Control
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="price-input"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Product Name */}
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Product name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-input"
          />
        </Form.Group>

        {/* Code Product */}
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Code product</Form.Label>
          <Form.Control
            type="text"
            placeholder="####"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="form-input"
          />
        </Form.Group>

        {/* Stock */}
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Stock</Form.Label>
          <div className="stock-input-wrapper">
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="stock-input"
            />
            <button className="stock-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </Form.Group>

        {/* Action Buttons */}
        <div className="action-buttons d-flex gap-3">
          <Button className="reset-btn" onClick={handleReset}>
            Reset
          </Button>
          <Button 
            className={`save-btn ${isSaveEnabled ? '' : 'disabled'}`} 
            onClick={handleSave}
            disabled={!isSaveEnabled}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
