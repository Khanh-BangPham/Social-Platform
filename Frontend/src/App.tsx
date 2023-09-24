import { TranslateProvider } from '@components/atoms/TranslateProvider';
import { useRoutes } from 'react-router-dom';
import './assets/tailwind.css';
import { AuthProvider } from './components/features/AuthProvider';
import { DarkModeProvider } from './components/features/DarkModeProvider';
import en from './locales/en.json';
import vi from './locales/vi.json';
import { routes } from './routes';

function App() {
  const element = useRoutes(routes);
  return (
    <DarkModeProvider>
      <TranslateProvider defaultLang="en" translate={{ vi, en }}>
        <AuthProvider>{element}</AuthProvider>
      </TranslateProvider>
    </DarkModeProvider>
  );
}

export default App;
