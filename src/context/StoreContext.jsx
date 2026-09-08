import { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { StoreContext } from './storeContextInstance'
import { INITIAL_PRODUCTS } from '../data/productsData'
import { INITIAL_BANNERS } from '../data/bannersData'
import { COMPANY } from '../constants'

const PRODUCTS_STORAGE_KEY = 'bf_products_v1'
const BANNERS_STORAGE_KEY = 'bf_banners_v1'
const COMPANY_STORAGE_KEY = 'bf_company_v1'
const ADMIN_PWD_STORAGE_KEY = 'bf_admin_pwd_v1'
const INQUIRIES_STORAGE_KEY = 'bf_inquiries'

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(PRODUCTS_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.warn('Failed reading products from localStorage:', e)
    }
    return INITIAL_PRODUCTS
  })

  const [banners, setBanners] = useState(() => {
    try {
      const cached = localStorage.getItem(BANNERS_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn('Failed reading banners from localStorage:', e)
    }
    return INITIAL_BANNERS
  })

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
      console.warn('Failed saving products to localStorage:', e)
    }
  }, [products])

  // Persist banners
  useEffect(() => {
    try {
      localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners))
    } catch (e) {
      console.warn('Failed saving banners to localStorage:', e)
    }
  }, [banners])

  // Product CRUD
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-${Date.now()}`,
      sort_order: productData.sort_order || products.length + 1,
      in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  // Banner CRUD
  const addBanner = (bannerData) => {
    const newBanner = {
      ...bannerData,
      id: bannerData.id || `banner-${Date.now()}`,
      is_active: bannerData.is_active !== undefined ? bannerData.is_active : true,
      sort_order: bannerData.sort_order || banners.length + 1,
    }
    setBanners((prev) => [newBanner, ...prev])
    return newBanner
  }

  const updateBanner = (id, updatedFields) => {
    setBanners((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    )
  }

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleBanner = (id) => {
    setBanners((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_active: !item.is_active } : item
      )
    )
  }

  // Reset to initial defaults
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS)
    setBanners(INITIAL_BANNERS)
    setTopBadge(DEFAULT_TOP_BADGE)
    try {
      localStorage.removeItem(PRODUCTS_STORAGE_KEY)
      localStorage.removeItem(BANNERS_STORAGE_KEY)
      localStorage.removeItem(TOP_BADGE_STORAGE_KEY)
      localStorage.removeItem('bf_quote_v1')
    } catch (e) {
      console.error(e)
    }
  }

  // Helper to compress and convert file to base64
  const processImageUpload = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.25, // compress to ~250KB max for fast storage
        maxWidthOrHeight: 900,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(compressedFile)
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
      })
    } catch (error) {
      console.warn('Image compression fallback:', error)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
      })
    }
  }

  // Active top announcement banner
  const activeTopBanner = banners.find(
    (b) => b.is_active && b.position === 'top-bar'
  )

  // ==========================================================
  // EDITABLE TOP BADGE & ANNOUNCEMENT SETTINGS
  // ==========================================================
  const TOP_BADGE_STORAGE_KEY = 'bf_top_badge_v1'
  const DEFAULT_TOP_BADGE = {
    title: 'Direct Factory Wholesale · Manufactured in India · Export Ready to UAE, KSA, GCC',
    subtitle: 'Min. Order: 50 Cartons · Direct Factory Pricing',
    ctaText: 'Export Desk',
    ctaLink: 'https://wa.me/971507355418?text=Hello%20Boven%20Frontier%2C%20I%20would%20like%20to%20enquire%20about%20wholesale%20orders.',
    theme: 'navy', // 'navy' | 'gold' | 'dark'
    is_active: true,
    heroBadge: 'Manufactured in India · Direct Factory Supply',
  }

  const [topBadge, setTopBadge] = useState(() => {
    try {
      const cached = localStorage.getItem(TOP_BADGE_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_TOP_BADGE, ...parsed }
      }
    } catch (e) {
      console.warn('Failed reading top badge from localStorage:', e)
    }
    return DEFAULT_TOP_BADGE
  })

  // Persist top badge
  useEffect(() => {
    try {
      localStorage.setItem(TOP_BADGE_STORAGE_KEY, JSON.stringify(topBadge))
    } catch (e) {
      console.warn('Failed saving top badge to localStorage:', e)
    }
  }, [topBadge])

  const updateTopBadge = (newSettings) => {
    setTopBadge((prev) => ({ ...prev, ...newSettings }))
  }

  // ==========================================================
  // EDITABLE COMPANY CONTACT & LEGAL SETTINGS
  // ==========================================================
  const [company, setCompany] = useState(() => {
    try {
      const cached = localStorage.getItem(COMPANY_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed && typeof parsed === 'object') return { ...COMPANY, ...parsed }
      }
    } catch (e) {
      console.warn('Failed reading company from localStorage:', e)
    }
    return COMPANY
  })

  useEffect(() => {
    try {
      localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company))
    } catch (e) {
      console.warn('Failed saving company to localStorage:', e)
    }
  }, [company])

  const updateCompany = (newFields) => {
    setCompany((prev) => ({ ...prev, ...newFields }))
  }

  const resetCompany = () => {
    setCompany(COMPANY)
    localStorage.removeItem(COMPANY_STORAGE_KEY)
  }

  // ==========================================================
  // ADMIN PASSWORD MANAGEMENT
  // ==========================================================
  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      const cached = localStorage.getItem(ADMIN_PWD_STORAGE_KEY)
      if (cached && typeof cached === 'string' && cached.trim().length > 0) return cached
    } catch (e) {
      console.warn('Failed reading admin password from localStorage:', e)
    }
    return import.meta.env.VITE_ADMIN_PASSWORD || 'Boven@2026'
  })

  const updateAdminPassword = (newPassword) => {
    const trimmed = (newPassword || '').trim()
    if (!trimmed) return false
    setAdminPassword(trimmed)
    try {
      localStorage.setItem(ADMIN_PWD_STORAGE_KEY, trimmed)
    } catch (e) {
      console.warn('Failed saving admin password:', e)
    }
    return true
  }

  // ==========================================================
  // INQUIRIES MANAGEMENT
  // ==========================================================
  const [inquiries, setInquiries] = useState(() => {
    try {
      const cached = localStorage.getItem(INQUIRIES_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn('Failed reading inquiries from localStorage:', e)
    }
    return []
  })

  const deleteInquiry = (id) => {
    setInquiries((prev) => {
      const filtered = prev.filter((inq) => inq.id !== id)
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(filtered))
      return filtered
    })
  }

  const clearInquiries = () => {
    setInquiries([])
    localStorage.removeItem(INQUIRIES_STORAGE_KEY)
  }

  const value = {
    products,
    banners,
    activeTopBanner,
    addProduct,
    updateProduct,
    deleteProduct,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    resetToDefaults,
    processImageUpload,
    // Editable Top Badge
    topBadge,
    updateTopBadge,
    // Editable Company Settings
    company,
    updateCompany,
    resetCompany,
    // Admin Password
    adminPassword,
    updateAdminPassword,
    // Inquiries
    inquiries,
    deleteInquiry,
    clearInquiries,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}


