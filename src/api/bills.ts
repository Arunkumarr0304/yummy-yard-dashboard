const API_URL = 'http://localhost:6969/api';

const getToken = () => localStorage.getItem('token');

// Get all bills with optional filters and pagination
export const getBills = async (params?: { status?: string; search?: string; page?: number; limit?: number }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.status && params.status !== 'all') {
      queryParams.append('status', params.status);
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

    const response = await fetch(`${API_URL}/bills?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bills');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

// Get single bill by ID
export const getBillById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/bills/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bill');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching bill:', error);
    throw error;
  }
};

// Delete bill
export const deleteBill = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/bills/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete bill');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting bill:', error);
    throw error;
  }
};

// Print bill
export const printBill = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/bills/${id}/print`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to print bill');
    }

    return await response.json();
  } catch (error) {
    console.error('Error printing bill:', error);
    throw error;
  }
};
