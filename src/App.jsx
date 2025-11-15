import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Root from './utils/Root'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route 
          path='/admin-dashboard' 
          element={
            <ProtectedRoutes requireRole={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }>
            <Route index element={
              <h1>Summary of dashboard</h1>
            }/>
            <Route path='categories' element={
              <h1>Categories of dashboard</h1>
            }/>
            <Route path='products' element={
              <h1>Products of dashboard</h1>
            }/>
            <Route path='suppliers' element={
              <h1>Suppliers of dashboard</h1>
            }/>
            <Route path='orders' element={
              <h1>Orders of dashboard</h1>
            }/>
            <Route path='Users' element={
              <h1>Users of dashboard</h1>
            }/>
          </Route>
        <Route path='/staff/dashboard' element={<h1>staff dashboard</h1>}/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/unauthorized' element={ 
          <p className='font-bold text-3xl mt-20 ml-20'>Unauthorized Access</p>
         }/>
      </Routes>
    </Router>
  )
}

export default App
