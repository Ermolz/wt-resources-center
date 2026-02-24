import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { Navbar } from '@shared/ui/Navbar';
import { useI18n } from '@shared/lib/i18n';

const getInitialUser = () => {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [user] = useState(getInitialUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('profile')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('accountInfo')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('email')}
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('role')}
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('status')}
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {t('active')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">{t('actions')}</h2>
              <div className="space-y-3 sm:space-y-4">
                <Link to="/settings" className="block group">
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {t('settings')}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Manage your preferences</p>
                    </div>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>

                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="block group">
                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 hover:shadow-md">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                          {t('goToAdmin')}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Manage GPU catalog</p>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full block group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-200 hover:shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                        {t('logout')}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Sign out of your account</p>
                    </div>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </Card>
          </div>

          <div>
            <Card className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 break-words px-2">{user.email}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                {user.role === 'ADMIN' ? 'Administrator' : 'User'}
              </p>
              <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('memberSince')} {new Date().toLocaleDateString()}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

