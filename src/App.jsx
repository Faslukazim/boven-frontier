import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollProgress from './components/ScrollProgress'
import BackToTopButton from './components/BackToTopButton'
import Toast from './components/Toast'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden flex-col bg-white text-[#104360]">
      <ScrollProgress />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <BackToTopButton />
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toast />
        <Routes>
          {/* Public Pages with Main Header */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquire" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Management Portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App