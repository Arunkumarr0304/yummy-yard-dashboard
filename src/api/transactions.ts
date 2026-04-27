const API_URL = 'http://localhost:6969/api';

const getToken = () => localStorage.getItem('token');

// Get all transactions with optional filters
export const getTransactions = async (params?: { 
  search?: string; 
  sort?: string; 
  page?: number; 
  limit?: number 
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.sort) {
      queryParams.append('sort', params.sort);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const response = await fetch(`${API_URL}/transactions?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Get single transaction by ID
export const getTransactionById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};

// Export transactions (CSV/Excel)
export const exportTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions/export`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to export transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error exporting transactions:', error);
    throw error;
  }
};

// Create new transaction
export const createTransaction = async (data: {
  productName: string;
  productImage: string;
  date: string;
  quality: string;
  price: number;
}) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Update transaction
export const updateTransaction = async (id: string, data: Partial<{
  productName: string;
  productImage: string;
  date: string;
  quality: string;
  price: number;
}>) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Delete transaction
export const deleteTransaction = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
