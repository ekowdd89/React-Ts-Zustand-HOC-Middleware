import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import ProtectedDashboard from './pages/protected/ProtectedDashboard'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='p-4'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path='/signin' element={<SignIn/>} />
              <Route path='/signup' element={<SignUp/>} />
              <Route path='/dashboard' element={<ProtectedDashboard />} />
            </Routes>
          </main>
      </div>
    </>
  )
}

export default App
