import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { Navbar } from '@shared/ui/Navbar';
import { authApi } from '@features/auth/api/auth.api';

export const ConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        await authApi.confirm(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };
    confirmAccount();
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
          <p className="text-gray-900 dark:text-white">Confirming your account...</p>
        </Card>
      </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Confirmation Failed
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Invalid or expired confirmation token.</p>
          <Link to="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </Card>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
          Account Confirmed
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">Your account has been successfully confirmed!</p>
        <Link to="/login">
          <Button className="w-full">Go to Login</Button>
        </Link>
      </Card>
      </div>
    </div>
  );
};

