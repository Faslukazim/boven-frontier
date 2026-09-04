import { useState, useRef } from 'react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Star,
  Layers,
} from 'lucide-react'
import { useStore } from '../context/useStore'
import { CATEGORIES } from '../data/productsData'

const DEFAULT_BRANDS = ['LEXONE', 'FABIE PLUS', 'KARE']

function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct, processImageUpload } =
    useStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: 'LEXONE',
    category: 'LAUNDRY CARE',
    tagline: '',
    description: '',
    variants: '500 ml, 1 L',
    image: '',
    scale: 0.82,
    is_featured: false,
    in_stock: true,
  })
  const [imageProcessing, setImageProcessing] = useState(false)
  const fileInputRef = useRef(null)

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tagline &&
        product.tagline.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesBrand =
      selectedBrand === 'ALL' || product.brand === selectedBrand
    const matchesCategory =
      selectedCategory === 'ALL' || product.category === selectedCategory
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
      scale: 0.82,
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
      image: product.image || '',
      scale: product.scale || 0.82,
      is_featured: Boolean(product.is_featured),
      in_stock: product.in_stock !== false,
    })
    setIsModalOpen(true)
  }

  // Image Upload Handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setImageProcessing(true)
      const compressedBase64 = await processImageUpload(file)
      setFormData((prev) => ({ ...prev, image: compressedBase64 }))
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
      variants: parsedVariants,
      image: formData.image.trim() || '/assets/products/lexoneliquiddetergent.png',
      scale: parseFloat(formData.scale) || 0.82,
      is_featured: formData.is_featured,
      in_stock: formData.in_stock,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, payload)
    } else {
      addProduct(payload)
    }

    setIsModalOpen(false)
  }

  const uniqueBrands = ['ALL', ...new Set(products.map((p) => p.brand))]

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-[#172b3f]">
            Product Catalog
          </h2>
          <p className="text-xs text-[#172b3f]/60">
            {products.length} total SKUs across {uniqueBrands.length - 1} brands.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-[#172b3f] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#c9a84c] hover:text-[#172b3f]"
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-12 sm:items-center">
        <div className="relative sm:col-span-6 lg:col-span-5">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by product name, brand or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#172b3f]"
          />
        </div>

        <div className="sm:col-span-3 lg:col-span-3">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-200 py-2 px-3 text-xs outline-none focus:border-[#172b3f]"
          >
            {uniqueBrands.map((b) => (
              <option key={b} value={b}>
                Brand: {b}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3 lg:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-200 py-2 px-3 text-xs outline-none focus:border-[#172b3f]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Product Table / Mobile Cards */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-[#172b3f]">
            <thead className="border-b border-gray-200 bg-[#f8f9fa] text-[9px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="py-3.5 pl-4 pr-2">Product</th>
                <th className="px-3 py-3.5">Brand</th>
                <th className="px-3 py-3.5">Category</th>
                <th className="px-3 py-3.5">Packaging / Sizes</th>
                <th className="px-3 py-3.5 text-center">Featured</th>
                <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/70">
                    <td className="py-3 pl-4 pr-2">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded border border-gray-100 bg-[#f8f8f6] p-1">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {product.tagline || product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-gray-700">
                        {product.brand}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[10px] font-medium text-[#b08d2e]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(product.variants) &&
                          product.variants.map((v) => (
                            <span
                              key={v}
                              className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] text-gray-600"
                            >
                              {v}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {product.is_featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700">
                          <Star size={10} className="fill-amber-500 text-amber-500" />
                          Hero
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="py-3 pl-3 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="rounded p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#172b3f]"
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmationId(product.id)}
                          className="rounded p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Product"
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

        {/* Mobile View (Cards) */}
        <div className="divide-y divide-gray-200 md:hidden">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded border border-gray-100 bg-[#f8f8f6] p-1">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-[#b08d2e]">
                        {product.brand} · {product.category}
                      </span>
                      <h4 className="font-medium text-sm text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmationId(product.id)}
                      className="rounded p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(product.variants) &&
                      product.variants.map((v) => (
                        <span
                          key={v}
                          className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-gray-600"
                        >
                          {v}
                        </span>
                      ))}
                  </div>

                  {product.is_featured && (
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      Hero
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-[#f8f9fa]">
              <div className="flex items-center gap-2 text-[#172b3f]">
                <Layers size={18} className="text-[#c9a84c]" />
                <h3 className="font-medium text-sm sm:text-base">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="LEXONE, FABIE PLUS, KARE..."
                    list="brand-suggestions"
                    className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                  />
                  <datalist id="brand-suggestions">
                    {DEFAULT_BRANDS.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                  >
                    {CATEGORIES.filter((c) => c !== 'ALL').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Liquid Detergent, Glass Cleaner..."
                  className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                  Tagline / Highlights
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  placeholder="e.g. Concentrated low-suds formulation"
                  className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed product information for distributors and buyers..."
                  className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70 mb-1">
                  Sizes / Variants (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.variants}
                  onChange={(e) =>
                    setFormData({ ...formData, variants: e.target.value })
                  }
                  placeholder="250 ml, 500 ml, 1 L, 5 L"
                  className="w-full border border-gray-200 p-2.5 text-xs outline-none focus:border-[#172b3f]"
                />
              </div>

              {/* Image Configuration */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <label className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#172b3f]/70">
                  Product Image
                </label>

                <div className="flex items-center gap-4">
                  {formData.image && (
                    <div className="h-16 w-16 shrink-0 rounded border border-gray-200 bg-[#f8f8f6] p-1">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="Paste image URL or upload below..."
                      className="w-full border border-gray-200 p-2 text-xs outline-none focus:border-[#172b3f]"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={imageProcessing}
                        className="inline-flex items-center gap-1.5 border border-gray-300 bg-gray-50 px-3 py-1.5 text-[10px] font-medium text-gray-700 hover:bg-gray-100"
                      >
                        <Upload size={12} />
                        {imageProcessing ? 'Compressing...' : 'Upload & Compress Photo'}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                      <span className="text-[10px] text-gray-400">
                        PNG or JPG with transparent/white background
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t border-gray-100 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#172b3f] focus:ring-[#172b3f]"
                  />
                  <span>Feature on Hero Carousel</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        in_stock: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#172b3f] focus:ring-[#172b3f]"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#172b3f] px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#c9a84c] hover:text-[#172b3f]"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Confirm Product Deletion
            </h4>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete this product? This will remove it from the public catalog immediately.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmationId)
                  setDeleteConfirmationId(null)
                }}
                className="bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManager
