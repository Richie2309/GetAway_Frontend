import { useLocation } from 'react-router-dom';
import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'


function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdmin ? <AdminRoutes /> : <UserRoutes />}
    </>
  );
}

export default App;
