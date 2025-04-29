import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post('https://payroll-api-d6uc.onrender.com/login', {
      emailAddress: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUser;