import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { AdminPage } from '@pages/admin';
import { GpuDetailPage } from '@pages/gpu-detail';
import { ConfirmPage } from '@pages/confirm';
import { ProfilePage } from '@pages/profile';
import { SettingsPage } from '@pages/settings';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/confirm/:token" element={<ConfirmPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/gpu/:id" element={<GpuDetailPage />} />
    </Routes>
  );
};

export default App;
export { AppProviders } from './providers';

