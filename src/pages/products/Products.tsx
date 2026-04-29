import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Table } from '../../components';
import { Pagination } from '../../components';
import { getProducts, createProduct } from '../../api/products';
import './Products.css';
import SearchIcon from "../../assets/search-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";

interface Product {
  _id: string;
  name: string;
  code: string;
  category: string;
  stock: number;
  price: number;
  image?: string;
}

const columns = [
  { key: 'name', label: 'Product name', className: 'name-col' },
  { key: 'code', label: 'Code', className: 'code-col' },
  { key: 'category', label: 'Category', className: 'category-col' },
  { key: 'stock', label: 'Stock', className: 'stock-col' },
  { key: 'price', label: 'Price', className: 'price-col' },
];

const categoryTabs = [
  { key: 'all', label: 'All' },
  { key: 'Main course', label: 'Main course' },
  { key: 'Appetizer', label: 'Appetizer' },
  { key: 'Dessert', label: 'Dessert' },
  { key: 'Beverage', label: 'Beverage' },
];

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="text-center py-5">
    <Spinner animation="border" variant="success" />
  </div>
);

export default function Products() {
  // Product list states
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Add product form states
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [stock, setStock] = useState('0');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 7;

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoryParam = activeTab === 'all' ? undefined : activeTab;
      const response = await getProducts({
        category: categoryParam,
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage
      });

      if (response.success) {
        setProducts(response.data);
        setTotalPages(response.totalPages);
        setTotalItems(response.total);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Error loading products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, activeTab]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
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
    setProductCode('');
    setStock('0');
    setCategory('');
    setUnitPrice('');
    setSelectedImage(null);
    setImagePreview(null);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!productName || !productCode || !unitPrice) {
      setSaveError('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('code', productCode);
      formData.append('category', category || 'Food');
      formData.append('stock', stock);
      formData.append('price', unitPrice);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await createProduct(formData);

      if (response.success) {
        setSaveSuccess(true);
        handleReset();
        fetchProducts(); // Refresh the product list
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(response.message || 'Failed to create product');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error saving product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveEnabled = productName && productCode && unitPrice && !isSaving;

  // Format price with dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="products-page-wrapper">
      <Container fluid className="products-page py-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6}>
            <h2 className="page-title mb-0">Products Management</h2>
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
            <Button className="add-new-menu-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Products Card */}
        <div className="products-card">
          {/* Card Header */}
          <div className="products-card-header d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <h5 className="products-title mb-0">Products</h5>
              <span className="products-count">{totalItems}</span>
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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Table columns={columns}>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="product-name-cell">{product.name}</td>
                      <td>{product.code}</td>
                      <td>{product.category}</td>
                      <td className="stock-cell">{product.stock}</td>
                      <td>{formatPrice(product.price)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No products found
                    </td>
                  </tr>
                )}
              </Table>

              {/* Pagination */}
              {products.length > 0 && (
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

      {/* Add Product Panel */}
      <div className="add-product-panel">
        <h5 className="add-product-title">Add product</h5>
        
        {/* Success/Error Messages */}
        {saveSuccess && (
          <Alert variant="success" className="mb-3">
            Product created successfully!
          </Alert>
        )}
        {saveError && (
          <Alert variant="danger" className="mb-3">
            {saveError}
          </Alert>
        )}
        
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
                <option value="Food">Food</option>
                <option value="Main course">Main course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="form-label">Unit Price *</Form.Label>
              <div className="unit-price-input">
                <span className="currency">$</span>
                <Form.Control
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="price-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Product Name */}
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Product name *</Form.Label>
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
          <Form.Label className="form-label">Code product *</Form.Label>
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
              min="0"
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
          <Button className="reset-btn" onClick={handleReset} disabled={isSaving}>
            Reset
          </Button>
          <Button 
            className={`save-btn ${isSaveEnabled ? '' : 'disabled'}`} 
            onClick={handleSave}
            disabled={!isSaveEnabled}
          >
            {isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
