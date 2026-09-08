import { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { StoreContext } from './storeContextInstance'
import { INITIAL_PRODUCTS } from '../data/productsData'
import { INITIAL_BANNERS } from '../data/bannersData'
import { COMPANY } from '../constants'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const PRODUCTS_STORAGE_KEY = 'bf_products_v1'
const BANNERS_STORAGE_KEY = 'bf_banners_v1'
const COMPANY_STORAGE_KEY = 'bf_company_v1'
const ADMIN_PWD_STORAGE_KEY = 'bf_admin_pwd_v1'
const ADMIN_USERS_STORAGE_KEY = 'bf_admin_users_v1'
const INQUIRIES_STORAGE_KEY = 'bf_inquiries'

const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr_aswin_primary',
    name: 'Aswin',
    email: 'aswin@bovenfrontier.co.in',
    role: 'Super Admin',
    createdAt: '2026-03-01T00:00:00.000Z',
    isPrimary: true,
  },
]

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
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').insert([newProduct]).catch(console.warn)
    }
    return newProduct
  }

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    )
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').update(updatedFields).eq('id', id).catch(console.warn)
    }
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').delete().eq('id', id).catch(console.warn)
    }
  }

  const cloneProduct = (id) => {
    const original = products.find((p) => p.id === id)
    if (!original) return null
    const cloned = {
      ...original,
      id: `prod-${Date.now()}`,
      name: `${original.name} (Copy)`,
      sort_order: products.length + 1,
    }
    setProducts((prev) => [cloned, ...prev])
    return cloned
  }

  const toggleProductFeatured = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_featured: !item.is_featured } : item
      )
    )
  }

  const toggleProductStock = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, in_stock: item.in_stock === false } : item
      )
    )
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
    try {
      localStorage.removeItem(PRODUCTS_STORAGE_KEY)
      localStorage.removeItem(BANNERS_STORAGE_KEY)
      localStorage.removeItem('bf_top_badge_v1')
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

  // ==========================================================
  // MULTI-USER TEAM MANAGEMENT (Aswin & Added Admins)
  // ==========================================================
  const [adminUsers, setAdminUsers] = useState(() => {
    try {
      const cached = localStorage.getItem(ADMIN_USERS_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasAswin = parsed.some(
            (u) => u.email?.toLowerCase() === 'aswin@bovenfrontier.co.in'
          )
          if (hasAswin) return parsed
          return [...DEFAULT_ADMIN_USERS, ...parsed]
        }
      }
    } catch (e) {
      console.warn('Failed reading admin users from localStorage:', e)
    }
    return DEFAULT_ADMIN_USERS
  })

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(adminUsers))
    } catch (e) {
      console.warn('Failed saving admin users to localStorage:', e)
    }
  }, [adminUsers])

  const addAdminUser = ({ name, email, role = 'Administrator', password = '' }) => {
    const trimmedEmail = (email || '').trim().toLowerCase()
    if (!trimmedEmail) return { success: false, error: 'Email is required' }

    const exists = adminUsers.some((u) => u.email.toLowerCase() === trimmedEmail)
    if (exists) return { success: false, error: 'User with this email already exists' }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: (name || '').trim() || trimmedEmail.split('@')[0],
      email: trimmedEmail,
      role: role || 'Administrator',
      password: (password || '').trim(),
      createdAt: new Date().toISOString(),
      isPrimary: false,
    }

    setAdminUsers((prev) => [...prev, newUser])
    return { success: true, user: newUser }
  }

  const updateAdminUser = (id, updates) => {
    setAdminUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user
        if (user.isPrimary) {
          return {
            ...user,
            name: updates.name || user.name,
            role: 'Super Admin',
            password: updates.password !== undefined ? updates.password : user.password,
          }
        }
        return { ...user, ...updates }
      })
    )
    return { success: true }
  }

  const deleteAdminUser = (id) => {
    const target = adminUsers.find((u) => u.id === id)
    if (!target) return { success: false, error: 'User not found' }
    if (target.isPrimary || target.email.toLowerCase() === 'aswin@bovenfrontier.co.in') {
      return { success: false, error: 'Cannot delete the primary Super Administrator' }
    }
    setAdminUsers((prev) => prev.filter((u) => u.id !== id))
    return { success: true }
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
    setCompany((prev) => {
      const updated = { ...prev, ...newFields }
      if (isSupabaseConfigured && supabase) {
        supabase
          .from('company_settings')
          .upsert({ id: 'default', data: updated, updated_at: new Date().toISOString() })
          .catch(console.warn)
      }
      return updated
    })
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

  // ==========================================================
  // SUPABASE INITIAL SYNC (WHEN CONFIGURED)
  // ==========================================================
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    async function fetchSupabaseData() {
      try {
        const { data: remoteProducts, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('sort_order', { ascending: true })

        if (!prodErr && remoteProducts && remoteProducts.length > 0) {
          setProducts(remoteProducts)
        }

        const { data: remoteCompany, error: compErr } = await supabase
          .from('company_settings')
          .select('data')
          .eq('id', 'default')
          .single()

        if (!compErr && remoteCompany && remoteCompany.data) {
          setCompany(remoteCompany.data)
        }
      } catch (e) {
        console.warn('Supabase sync notice:', e)
      }
    }

    fetchSupabaseData()
  }, [])

  const value = {
    products,
    banners,
    addProduct,
    updateProduct,
    deleteProduct,
    cloneProduct,
    toggleProductFeatured,
    toggleProductStock,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    resetToDefaults,
    processImageUpload,
    // Editable Company Settings
    company,
    updateCompany,
    resetCompany,
    // Multi-User Team Access
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
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


