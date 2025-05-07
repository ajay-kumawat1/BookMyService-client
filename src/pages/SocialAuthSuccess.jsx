import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const SocialAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, , , login] = useAuth();

  useEffect(() => {
    const handleSocialLogin = async () => {
      try {
        // Get token from URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          showErrorToast('Authentication failed. No token received.');
          navigate('/login');
          return;
        }

        // Fetch user data using the token
        const response = await fetch('https://bookmyservice.onrender.com/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        if (data.success && data.data) {
          // Login the user
          login(data.data, token);
          showSuccessToast(`Welcome, ${data.data.firstName || 'User'}!`);
          
          // Redirect based on user role
          if (data.data.role === 'Owner' || data.data.role === 'SuperAdmin') {
            navigate('/business-profile');
          } else {
            navigate('/');
          }
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Social Auth Error:', error);
        showErrorToast(error.message || 'Authentication failed');
        navigate('/login');
      }
    };

    handleSocialLogin();
  }, [location.search, login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authenticating...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we complete your authentication.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthSuccess;
