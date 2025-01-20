import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegisterTask from './RegisterTask';

// Tworzenie instancji QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    // Opakowujemy naszą aplikację w QueryClientProvider i przekazujemy queryClient
    <QueryClientProvider client={queryClient}>
      <RegisterTask />
    </QueryClientProvider>
  );
}

export default App;
