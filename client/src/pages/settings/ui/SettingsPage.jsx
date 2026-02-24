import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Navbar } from '@shared/ui/Navbar';
import { useTheme } from '@shared/lib/theme';
import { useI18n } from '@shared/lib/i18n';
import { useApiType } from '@shared/lib/api-type';

const getInitialUser = () => {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useI18n();
  const { apiType, changeApiType } = useApiType();
  const [user] = useState(getInitialUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-200 dark:border-primary-700 border-t-primary-600 dark:border-t-primary-400" />
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('settings')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your application preferences</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('theme')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {t('theme')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('chooseTheme')}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Toggle theme"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t('light')}</span>
                  </div>
                </button>
                <button
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t('dark')}</span>
                  </div>
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('language')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {t('language')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('selectLanguage')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    language === 'en'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">English</span>
                  </div>
                </button>
                <button
                  onClick={() => changeLanguage('uk')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    language === 'uk'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Українська</span>
                  </div>
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('apiType')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {t('apiType')}
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('selectApiType')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => {
                    changeApiType('rest');
                    window.location.reload();
                  }}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    apiType === 'rest'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t('rest')}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeApiType('graphql');
                    window.location.reload();
                  }}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    apiType === 'graphql'
                      ? 'border-primary-500 bg-primary-50 dark:bg-gray-800 dark:border-primary-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{t('graphql')}</span>
                  </div>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

