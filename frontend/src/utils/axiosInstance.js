import axios from 'axios';

// Create an axios instance with a base URL for all requests
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Use your backend API base URL here
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;