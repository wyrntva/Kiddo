import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import Router from "./routes/Router";
import { AuthProvider } from './auth/AuthContext';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <ThemeModeScript />
      <Toaster position="top-right" />
      <Flowbite theme={{ theme: customTheme }}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Flowbite>
    </>
  );
}

export default App;
