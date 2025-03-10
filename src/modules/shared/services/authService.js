import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5050/login', {
      emailAddress: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUser;