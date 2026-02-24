import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { Navbar } from '@shared/ui/Navbar';
import { authApi } from '@features/auth/api/auth.api';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      registerSchema.parse(formData);
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
      await authApi.register(formData.email, formData.password);
      setSuccess(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error?.message || 'Registration failed';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="flex items-center justify-center py-6 sm:py-12 px-4">
          <Card className="w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">Registration Successful</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Please check your email to confirm your account. The confirmation link
            will be displayed in the server console (mock mode).
          </p>
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
      <div className="flex items-center justify-center py-6 sm:py-12 px-4">
        <Card className="w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Register</h2>
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
            Login
          </Link>
        </p>
        </Card>
      </div>
    </div>
  );
};

