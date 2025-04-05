import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const testApi = async () => {
  try {
    console.log('Testing API endpoints...');
    
    // Test categories endpoint
    console.log('\nTesting /categories endpoint:');
    try {
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      console.log('Categories response:', categoriesResponse.data);
    } catch (error: any) {
      console.error('Error fetching categories:', error.response?.data || error.message);
    }
    
    // Test products endpoint
    console.log('\nTesting /products endpoint:');
    try {
      const productsResponse = await axios.get(`${API_URL}/products`);
      console.log('Products response:', productsResponse.data);
    } catch (error: any) {
      console.error('Error fetching products:', error.response?.data || error.message);
    }
    
    console.log('\nAPI testing completed.');
  } catch (error) {
    console.error('Error testing API:', error);
  }
};

// Run the test
testApi(); 