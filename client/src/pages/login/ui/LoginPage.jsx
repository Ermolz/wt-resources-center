import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { Navbar } from '@shared/ui/Navbar';
import { authApi } from '@features/auth/api/auth.api';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      loginSchema.parse(formData);
    } catch (error) {
      const zodErrors = {};
      error.errors.forEach((err) => {
        zodErrors[err.path[0]] = err.message;
      });
      setErrors(zodErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate(response.data.user.role === 'ADMIN' ? '/admin' : '/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error?.message || 'Login failed';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="flex items-center justify-center py-8 sm:py-16 px-4">
        <Card className="w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-gray-900 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-1">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          {errors.submit && (
            <p className="text-red-600 text-sm mb-4">{errors.submit}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
            Register
          </Link>
        </p>
        </Card>
      </div>
    </div>
  );
};

