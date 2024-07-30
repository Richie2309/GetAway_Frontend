import { ToastContainer } from 'react-toastify'
import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'


function App() {

  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <ToastContainer/>
    </>
  )
}

export default App
