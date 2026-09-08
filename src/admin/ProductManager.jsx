import { useState, useRef } from 'react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Star,
  Copy,
  CheckCircle,
  Package,
  Image as ImageIcon,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { CATEGORIES } from '../data/productsData'

const DEFAULT_BRANDS = ['LEXONE', 'FABIE PLUS', 'KARE']
const PRESET_SIZES = ['250 ml', '500 ml', '750 ml', '1 L', '2 L', '5 L', '20 L', '200 L']

function ProductManager() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    cloneProduct,
    toggleProductFeatured,
    toggleProductStock,
    processImageUpload,
  } = useStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: 'LEXONE',
    category: 'LAUNDRY CARE',
    tagline: '',
    description: '',
    variants: '500 ml, 1 L',
    image: '/assets/products/lexoneliquiddetergent.png',
    is_featured: false,
    in_stock: true,
  })
  const [imageProcessing, setImageProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tagline && product.tagline.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesBrand = selectedBrand === 'ALL' || product.brand === selectedBrand
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory
    return matchesSearch && matchesBrand && matchesCategory
  })

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      brand: 'LEXONE',
      category: 'LAUNDRY CARE',
      tagline: '',
      description: '',
      variants: '500 ml, 1 L',
      image: '/assets/products/lexoneliquiddetergent.png',
      is_featured: false,
      in_stock: true,
    })
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      tagline: product.tagline || '',
      description: product.description || '',
      variants: Array.isArray(product.variants)
        ? product.variants.join(', ')
        : product.variants || '',
      image: product.image || '/assets/products/lexoneliquiddetergent.png',
      is_featured: Boolean(product.is_featured),
      in_stock: product.in_stock !== false,
    })
    setIsModalOpen(true)
  }

  // Quick Duplicate
  const handleClone = (productId) => {
    const cloned = cloneProduct(productId)
    if (cloned) {
      showToast(`Duplicated "${cloned.name}". Ready for quick customization.`)
    }
  }

  // Size Preset Toggle
  const handleToggleSizePreset = (size) => {
    const currentSizes = formData.variants
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    let updated
    if (currentSizes.includes(size)) {
      updated = currentSizes.filter((s) => s !== size)
    } else {
      updated = [...currentSizes, size]
    }
    setFormData((prev) => ({ ...prev, variants: updated.join(', ') }))
  }

  // Image Upload Handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setImageProcessing(true)
      const compressedBase64 = await processImageUpload(file)
      setFormData((prev) => ({ ...prev, image: compressedBase64 }))
      showToast('Image uploaded and optimized successfully!')
    } catch (err) {
      console.error('Image compression error:', err)
      alert('Failed to process image. Please try a smaller file.')
    } finally {
      setImageProcessing(false)
    }
  }

  // Save Product
  const handleSubmit = (e) => {
    e.preventDefault()

    const parsedVariants = formData.variants
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)

    const payload = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      tagline: formData.tagline.trim(),
      description: formData.description.trim(),
      variants: parsedVariants.length > 0 ? parsedVariants : ['Standard Bottle'],
      image: formData.image.trim() || '/assets/products/lexoneliquiddetergent.png',
      scale: 0.82, // auto-preset for gold standard visual ratio
      is_featured: formData.is_featured,
      in_stock: formData.in_stock,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, payload)
      showToast(`Updated "${payload.name}"`)
    } else {
      addProduct(payload)
      showToast(`Added "${payload.name}" to catalog`)
    }

    setIsModalOpen(false)
  }

  const uniqueBrands = ['ALL', ...new Set(products.map((p) => p.brand))]

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in">
          <CheckCircle size={16} className="text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Fast Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Package className="text-[#EF2034]" size={20} />
            <h2 className="text-lg font-semibold text-[#104360]">
              Product Catalog & SKUs
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {products.length} active wholesale SKUs across {DEFAULT_BRANDS.length} verified brands.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EF2034] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#104360] transition shadow-xs self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Quick Search & Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name, brand, or formula..."
            className="w-full rounded-lg border border-gray-200 pl-9 pr-8 py-2 text-xs text-[#104360] placeholder-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360] bg-white"
          >
            {uniqueBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360] bg-white"
          >
            <option value="ALL">ALL CATEGORIES</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table (Desktop & Tablet) */}
      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-2xs">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-[#104360]">
            <thead className="border-b border-gray-200 bg-[#F8FAFC] text-[9px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="py-3.5 pl-6 pr-3">Product</th>
                <th className="px-3 py-3.5">Brand</th>
                <th className="px-3 py-3.5">Category</th>
                <th className="px-3 py-3.5">Available Sizes</th>
                <th className="px-3 py-3.5 text-center">Hero Showcase</th>
                <th className="px-3 py-3.5 text-center">Catalog Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-normal">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition">
                    {/* Product Name & Thumbnail */}
                    <td className="py-3.5 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-[#F8FAFC] p-1 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {product.tagline || product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Brand Badge */}
                    <td className="px-3 py-3.5">
                      <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-gray-700">
                        {product.brand}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3.5">
                      <span className="text-[11px] font-semibold text-[#EF2034]">
                        {product.category}
                      </span>
                    </td>

                    {/* Sizes / Variants */}
                    <td className="px-3 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(product.variants) &&
                          product.variants.map((v) => (
                            <span
                              key={v}
                              className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-gray-600"
                            >
                              {v}
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* Hero Featured 1-Click Toggle */}
                    <td className="px-3 py-3.5 text-center">
                      <button
                        onClick={() => toggleProductFeatured(product.id)}
                        title={product.is_featured ? 'Click to remove from Hero' : 'Click to showcase in Hero'}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                          product.is_featured
                            ? 'bg-amber-50 border border-amber-200 text-amber-800'
                            : 'bg-gray-50 text-gray-400 hover:text-amber-600 hover:bg-amber-50/50'
                        }`}
                      >
                        <Star
                          size={11}
                          className={product.is_featured ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}
                        />
                        <span>{product.is_featured ? 'Hero' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Stock Status 1-Click Toggle */}
                    <td className="px-3 py-3.5 text-center">
                      <button
                        onClick={() => toggleProductStock(product.id)}
                        title="Click to toggle Active / Paused status"
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                          product.in_stock !== false
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.in_stock !== false ? 'bg-emerald-500' : 'bg-gray-400'
                          }`}
                        />
                        <span>{product.in_stock !== false ? 'Active' : 'Paused'}</span>
                      </button>
                    </td>

                    {/* Fast Actions: Duplicate, Edit, Delete */}
                    <td className="py-3.5 pl-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleClone(product.id)}
                          title="Quick Duplicate / Clone SKU"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360] transition"
                        >
                          <Copy size={14} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(product)}
                          title="Edit Product Details"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360] transition"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmationId(product.id)}
                          title="Delete Product"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Touch-Optimized Cards) */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-[#F8FAFC] p-1 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#EF2034]">
                        {product.brand} · {product.category}
                      </span>
                      <h4 className="font-semibold text-xs text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleClone(product.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360]"
                      title="Clone"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#104360]"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmationId(product.id)}
                      className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(product.variants) &&
                      product.variants.map((v) => (
                        <span
                          key={v}
                          className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-gray-600"
                        >
                          {v}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleProductFeatured(product.id)}
                      className="text-xs"
                    >
                      <Star
                        size={14}
                        className={product.is_featured ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                      />
                    </button>
                    <button
                      onClick={() => toggleProductStock(product.id)}
                      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                        product.in_stock !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {product.in_stock !== false ? 'Active' : 'Paused'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Trash2 size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Delete Product?</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Are you sure you want to permanently remove this product from the catalog? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmationId)
                  setDeleteConfirmationId(null)
                  showToast('Product deleted.')
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Intuitive 2-Column Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-[#F8FAFC]">
              <div className="flex items-center gap-2 text-[#104360]">
                <Package size={18} className="text-[#EF2034]" />
                <h3 className="font-semibold text-sm sm:text-base">
                  {editingProduct ? 'Edit Product Details' : 'Add New Product to Catalog'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Column: Product Info (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  {/* Product Title */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Liquid Detergent Active Fresh"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                    />
                  </div>

                  {/* Brand & Category Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Brand *
                      </label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360] bg-white"
                      >
                        {DEFAULT_BRANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360] bg-white"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subtitle / Tagline */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Tagline / Highlights
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Deep cleaning action with antibacterial protection"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Specification & Usage Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Formulated with balanced surfactant active matter for domestic and commercial washing machines..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                    />
                  </div>

                  {/* Packaging Sizes with Quick Click Pills */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Packaging Sizes / Bottles
                    </label>

                    {/* Quick Preset Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {PRESET_SIZES.map((size) => {
                        const isSelected = formData.variants
                          .split(',')
                          .map((s) => s.trim())
                          .includes(size)

                        return (
                          <button
                            type="button"
                            key={size}
                            onClick={() => handleToggleSizePreset(size)}
                            className={`rounded-md px-2 py-1 text-[10px] font-semibold transition ${
                              isSelected
                                ? 'bg-[#104360] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {isSelected ? `✓ ${size}` : `+ ${size}`}
                          </button>
                        )
                      })}
                    </div>

                    <input
                      type="text"
                      value={formData.variants}
                      onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
                      placeholder="e.g. 500 ml, 1 L, 5 L (comma separated)"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-[#104360] outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
                    />
                  </div>
                </div>

                {/* Right Column: Image & Status (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  {/* Image Preview & Upload */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Product Bottle Image
                    </label>

                    <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-4 text-center">
                      <div className="mx-auto h-40 w-full max-w-[160px] flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <ImageIcon size={28} className="mx-auto mb-1 opacity-50" />
                            <span className="text-[10px]">No image selected</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={imageProcessing}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#104360] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#EF2034] transition shadow-2xs"
                        >
                          <Upload size={13} />
                          <span>{imageProcessing ? 'Optimizing...' : 'Upload Image'}</span>
                        </button>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-400">
                        PNG transparent background recommended.
                      </p>
                    </div>
                  </div>

                  {/* Showcase & Stock Settings */}
                  <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-4 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-[#EF2034] focus:ring-[#EF2034]"
                      />
                      <div>
                        <span className="block text-xs font-semibold text-gray-900">
                          Showcase in Hero Banner
                        </span>
                        <span className="block text-[10px] text-gray-500">
                          Featured in top rotating 3D visual showcase
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none pt-2 border-t border-gray-200">
                      <input
                        type="checkbox"
                        checked={formData.in_stock}
                        onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="block text-xs font-semibold text-gray-900">
                          Active in Public Catalog
                        </span>
                        <span className="block text-[10px] text-gray-500">
                          Ready for container orders & enquiries
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Form Footer Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#104360] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#EF2034] transition shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManager
