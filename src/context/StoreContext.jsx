import { useEffect, useState, useRef } from 'react'
import imageCompression from 'browser-image-compression'
import { StoreContext } from './storeContextInstance'
import { INITIAL_PRODUCTS } from '../data/productsData'
import { INITIAL_BANNERS } from '../data/bannersData'
import { COMPANY } from '../constants'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const PRODUCTS_STORAGE_KEY = 'bf_products_v1'
const BANNERS_STORAGE_KEY = 'bf_banners_v1'
const COMPANY_STORAGE_KEY = 'bf_company_v1'
const ADMIN_USERS_STORAGE_KEY = 'bf_admin_users_v1'
const INQUIRIES_STORAGE_KEY = 'bf_inquiries'
const BRANDS_STORAGE_KEY = 'bf_brands_v1'
const CATEGORIES_STORAGE_KEY = 'bf_categories_v1'

const DEFAULT_BRANDS = ['LEXONE', 'FABIE PLUS', 'KARE']
const DEFAULT_CATEGORIES = [
  'LAUNDRY CARE',
  'FLOOR CARE',
  'SURFACE CARE',
  'DISINFECTION',
  'PERSONAL CARE',
  'FABRIC CARE',
]

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

  // Global Toast Notification System
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const toastTimerRef = useRef(null)

  const showToast = (message, type = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ show: true, message, type })
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 3800)
  }

  const hideToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ show: false, message: '', type: 'success' })
  }

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
      supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.warn('Supabase updateProduct error:', error)
        })
        .catch(console.warn)
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
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').insert([cloned]).catch(console.warn)
    }
    return cloned
  }

  const toggleProductFeatured = (id) => {
    const target = products.find((p) => p.id === id)
    const nextValue = target ? !target.is_featured : false

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_featured: nextValue } : item
      )
    )
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('products')
        .update({ is_featured: nextValue })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.warn('Supabase toggleProductFeatured error:', error)
        })
        .catch(console.warn)
    }
    return nextValue
  }

  const setSoleHeroProduct = (id) => {
    setProducts((prev) =>
      prev.map((item) => ({
        ...item,
        is_featured: item.id === id,
      }))
    )
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('products')
        .update({ is_featured: false })
        .neq('id', id)
        .then(({ error: clearErr }) => {
          if (clearErr) console.warn('Supabase setSoleHeroProduct clear error:', clearErr)
          return supabase
            .from('products')
            .update({ is_featured: true })
            .eq('id', id)
        })
        .then((res) => {
          if (res?.error) console.warn('Supabase setSoleHeroProduct set error:', res.error)
        })
        .catch(console.warn)
    }
  }

  const toggleProductStock = (id) => {
    const target = products.find((p) => p.id === id)
    const nextValue = target ? target.in_stock === false : true

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, in_stock: nextValue } : item
      )
    )
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('products')
        .update({ in_stock: nextValue })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.warn('Supabase toggleProductStock error:', error)
        })
        .catch(console.warn)
    }
    return nextValue
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
    const productBrands = INITIAL_PRODUCTS.map((p) => p.brand).filter(Boolean)
    const productCategories = INITIAL_PRODUCTS.map((p) => p.category).filter(Boolean)
    setBrands(Array.from(new Set([...DEFAULT_BRANDS, ...productBrands])))
    setCategories(Array.from(new Set([...DEFAULT_CATEGORIES, ...productCategories])))
    try {
      localStorage.removeItem(PRODUCTS_STORAGE_KEY)
      localStorage.removeItem(BANNERS_STORAGE_KEY)
      localStorage.removeItem(BRANDS_STORAGE_KEY)
      localStorage.removeItem(CATEGORIES_STORAGE_KEY)
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

  const addAdminUser = ({ name, email, role = 'Administrator' }) => {
    const trimmedEmail = (email || '').trim().toLowerCase()
    if (!trimmedEmail) return { success: false, error: 'Email is required' }

    const exists = adminUsers.some((u) => u.email.toLowerCase() === trimmedEmail)
    if (exists) return { success: false, error: 'User with this email already exists' }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: (name || '').trim() || trimmedEmail.split('@')[0],
      email: trimmedEmail,
      role: role || 'Administrator',
      createdAt: new Date().toISOString(),
      isPrimary: false,
    }

    setAdminUsers((prev) => [...prev, newUser])
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('admin_users')
        .insert([
          {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        ])
        .catch(console.warn)
    }
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
          }
        }
        return {
          ...user,
          name: updates.name !== undefined ? updates.name : user.name,
          role: updates.role !== undefined ? updates.role : user.role,
        }
      })
    )
    if (isSupabaseConfigured && supabase) {
      const allowedUpdates = {}
      if (updates.name !== undefined) allowedUpdates.name = updates.name
      if (updates.role !== undefined) allowedUpdates.role = updates.role
      if (Object.keys(allowedUpdates).length > 0) {
        supabase.from('admin_users').update(allowedUpdates).eq('id', id).catch(console.warn)
      }
    }
    return { success: true }
  }

  const deleteAdminUser = (id) => {
    const target = adminUsers.find((u) => u.id === id)
    if (!target) return { success: false, error: 'User not found' }
    if (target.isPrimary || target.email.toLowerCase() === 'aswin@bovenfrontier.co.in') {
      return { success: false, error: 'Cannot delete the primary Super Administrator' }
    }
    setAdminUsers((prev) => prev.filter((u) => u.id !== id))
    if (isSupabaseConfigured && supabase) {
      supabase.from('admin_users').delete().eq('id', id).catch(console.warn)
    }
    return { success: true }
  }

  // ==========================================================
  // DYNAMIC BRANDS & CATEGORIES MANAGEMENT
  // ==========================================================
  const [brands, setBrands] = useState(() => {
    try {
      const cached = localStorage.getItem(BRANDS_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.warn('Failed reading brands from localStorage:', e)
    }
    const productBrands = INITIAL_PRODUCTS.map((p) => p.brand).filter(Boolean)
    return Array.from(new Set([...DEFAULT_BRANDS, ...productBrands]))
  })

  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem(CATEGORIES_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.warn('Failed reading categories from localStorage:', e)
    }
    const productCategories = INITIAL_PRODUCTS.map((p) => p.category).filter(Boolean)
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...productCategories]))
  })

  useEffect(() => {
    try {
      localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands))
    } catch (e) {
      console.warn('Failed saving brands to localStorage:', e)
    }
  }, [brands])

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories))
    } catch (e) {
      console.warn('Failed saving categories to localStorage:', e)
    }
  }, [categories])

  const addBrand = (brandName) => {
    const trimmed = (brandName || '').trim()
    if (!trimmed) return { success: false, error: 'Brand name is required.' }
    const exists = brands.some((b) => b.toLowerCase() === trimmed.toLowerCase())
    if (exists) return { success: false, error: `Brand "${trimmed}" already exists.` }

    const formatted = trimmed.toUpperCase()
    setBrands((prev) => [...prev, formatted])
    if (isSupabaseConfigured && supabase) {
      supabase.from('brands').insert([{ name: formatted }]).catch(console.warn)
    }
    return { success: true, brand: formatted }
  }

  const updateBrand = (oldName, newName) => {
    const trimmed = (newName || '').trim().toUpperCase()
    if (!trimmed) return { success: false, error: 'Brand name is required.' }
    if (trimmed === oldName) return { success: true, brand: trimmed }
    const exists = brands.some(
      (b) => b.toLowerCase() === trimmed.toLowerCase() && b.toLowerCase() !== oldName.toLowerCase()
    )
    if (exists) return { success: false, error: `Brand "${trimmed}" already exists.` }

    setBrands((prev) => prev.map((b) => (b === oldName ? trimmed : b)))
    setProducts((prev) =>
      prev.map((p) => (p.brand === oldName ? { ...p, brand: trimmed } : p))
    )
    if (isSupabaseConfigured && supabase) {
      supabase.from('brands').update({ name: trimmed }).eq('name', oldName).catch(console.warn)
      supabase.from('products').update({ brand: trimmed }).eq('brand', oldName).catch(console.warn)
    }
    return { success: true, brand: trimmed }
  }

  const deleteBrand = (brandName) => {
    const associatedCount = products.filter((p) => p.brand === brandName).length
    if (associatedCount > 0) {
      return {
        success: false,
        error: `Cannot delete "${brandName}" because ${associatedCount} product(s) are assigned to it.`,
      }
    }
    setBrands((prev) => prev.filter((b) => b !== brandName))
    if (isSupabaseConfigured && supabase) {
      supabase.from('brands').delete().eq('name', brandName).catch(console.warn)
    }
    return { success: true }
  }

  const addCategory = (categoryName) => {
    const trimmed = (categoryName || '').trim()
    if (!trimmed) return { success: false, error: 'Category name is required.' }
    const exists = categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())
    if (exists) return { success: false, error: `Category "${trimmed}" already exists.` }

    const formatted = trimmed.toUpperCase()
    setCategories((prev) => [...prev, formatted])
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').insert([{ name: formatted }]).catch(console.warn)
    }
    return { success: true, category: formatted }
  }

  const updateCategory = (oldName, newName) => {
    const trimmed = (newName || '').trim().toUpperCase()
    if (!trimmed) return { success: false, error: 'Category name is required.' }
    if (trimmed === oldName) return { success: true, category: trimmed }
    const exists = categories.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase() && c.toLowerCase() !== oldName.toLowerCase()
    )
    if (exists) return { success: false, error: `Category "${trimmed}" already exists.` }

    setCategories((prev) => prev.map((c) => (c === oldName ? trimmed : c)))
    setProducts((prev) =>
      prev.map((p) => (p.category === oldName ? { ...p, category: trimmed } : p))
    )
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').update({ name: trimmed }).eq('name', oldName).catch(console.warn)
      supabase.from('products').update({ category: trimmed }).eq('category', oldName).catch(console.warn)
    }
    return { success: true, category: trimmed }
  }

  const deleteCategory = (categoryName) => {
    const associatedCount = products.filter((p) => p.category === categoryName).length
    if (associatedCount > 0) {
      return {
        success: false,
        error: `Cannot delete "${categoryName}" because ${associatedCount} product(s) are assigned to it.`,
      }
    }
    setCategories((prev) => prev.filter((c) => c !== categoryName))
    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').delete().eq('name', categoryName).catch(console.warn)
    }
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
        if (parsed && typeof parsed === 'object') {
          const markets = Array.isArray(parsed.markets)
            ? parsed.markets
            : typeof parsed.markets === 'string'
            ? parsed.markets.split('·').map((s) => s.trim()).filter(Boolean)
            : COMPANY.markets
          return { ...COMPANY, ...parsed, markets }
        }
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
    if (isSupabaseConfigured && supabase) {
      supabase.from('inquiries').delete().eq('id', id).catch(console.warn)
    }
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
          const raw = remoteCompany.data
          const markets = Array.isArray(raw.markets)
            ? raw.markets
            : typeof raw.markets === 'string'
            ? raw.markets.split('·').map((s) => s.trim()).filter(Boolean)
            : COMPANY.markets
          setCompany((prev) => ({ ...COMPANY, ...prev, ...raw, markets }))
        }

        const { data: remoteBrands, error: brandErr } = await supabase
          .from('brands')
          .select('name')

        if (!brandErr && remoteBrands && remoteBrands.length > 0) {
          setBrands(remoteBrands.map((b) => b.name))
        }

        const { data: remoteCategories, error: catErr } = await supabase
          .from('categories')
          .select('name')

        if (!catErr && remoteCategories && remoteCategories.length > 0) {
          setCategories(remoteCategories.map((c) => c.name))
        }

        // Fetch team members if authenticated
        const { data: remoteUsers, error: userErr } = await supabase
          .from('admin_users')
          .select('*')

        if (!userErr && remoteUsers && remoteUsers.length > 0) {
          setAdminUsers(remoteUsers)
        }

        // Fetch customer inquiries if authenticated
        const { data: remoteInquiries, error: inqErr } = await supabase
          .from('inquiries')
          .select('*')
          .order('submitted_at', { ascending: false })

        if (!inqErr && remoteInquiries && remoteInquiries.length > 0) {
          setInquiries(
            remoteInquiries.map((inq) => ({
              id: inq.id,
              name: inq.name,
              company: inq.company,
              email: inq.email,
              phone: inq.phone,
              region: inq.region,
              buyerType: inq.buyer_type,
              product: inq.product,
              message: inq.message,
              submittedAt: inq.submitted_at,
            }))
          )
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
    setSoleHeroProduct,
    toggleProductStock,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    resetToDefaults,
    processImageUpload,
    // Global Toast Notification
    toast,
    showToast,
    hideToast,
    // Editable Company Settings
    company,
    updateCompany,
    resetCompany,
    // Multi-User Team Access
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    // Inquiries
    inquiries,
    deleteInquiry,
    clearInquiries,
    // Dynamic Brands & Categories
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}


