import React from 'react';
import TodoApp from './TodoApp';
import { AuthProvider } from './auth.jsx';
import AuthGate from './AuthGate';

function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <TodoApp />
      </AuthGate>
    </AuthProvider>
  );
}

export default App;
