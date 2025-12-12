import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Components
import ErrorBoundary from '@/components/ErrorBoundary';

// Pages
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import { UserManagement } from '@/pages/UserManagement';
import { UserForm } from '@/pages/UserForm';
import ProductList from '@/pages/ProductList';
import ProductMaintenance from '@/pages/ProductMaintenance';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            {/* Root route */}
            <Route path="/" element={<ProductList />} />

            {/* Additional Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/add" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<ProductMaintenance />} />
            <Route path="/:id/edit" element={<ProductMaintenance />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: 'black',
                border: '1px solid #e5e7eb',
              },
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
