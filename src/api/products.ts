const API_URL = 'http://localhost:6969/api';

const getToken = () => localStorage.getItem('token');

// Get all products with optional filters
export const getProducts = async (params?: { 
  category?: string; 
  search?: string; 
  page?: number; 
  limit?: number 
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Create new product
export const createProduct = async (data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: data
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: data
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
