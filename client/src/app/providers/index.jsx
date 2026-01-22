import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from '@shared/lib/apollo';
import { SocketProvider } from '@shared/lib/socket';
import { ThemeProvider } from '@shared/lib/theme';
import { I18nProvider } from '@shared/lib/i18n';
import { ApiTypeProvider } from '@shared/lib/api-type';

export const AppProviders = ({ children }) => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <ApiTypeProvider>
          <ApolloProvider client={apolloClient}>
            <SocketProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                {children}
              </BrowserRouter>
            </SocketProvider>
          </ApolloProvider>
        </ApiTypeProvider>
      </ThemeProvider>
    </I18nProvider>
  );
};

