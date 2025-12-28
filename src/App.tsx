import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ServiceInfo from './pages/ServiceInfo';
import Login from './pages/Login';

// 路由守卫组件
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页面 */}
        <Route path="/login" element={<Login />} />

        {/* 受保护的路由 */}
        <Route 
          path="/" 
          element={
            <AuthRoute>
              <MainLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Navigate to="/service/info" replace />} />
          <Route path="service/info" element={<ServiceInfo />} />
          {/* 这里可以继续添加受保护的子路由 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
