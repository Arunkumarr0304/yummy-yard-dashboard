const API_URL = 'http://localhost:6969/api';

const getToken = () => localStorage.getItem('token');

// Get all orders with optional filters
export const getOrders = async (params?: { status?: string; search?: string }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.status && params.status !== 'all') {
      queryParams.append('status', params.status);
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }

    const response = await fetch(`${API_URL}/orders?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get single order by ID
export const getOrderById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
