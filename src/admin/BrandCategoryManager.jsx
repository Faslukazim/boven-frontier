import { useState } from 'react'
import {
  Tag,
  Building,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  Package,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { useStore } from '../context/useStore'

export default function BrandCategoryManager() {
  const {
    products,
    brands,
    addBrand,
    updateBrand,
    deleteBrand,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useStore()

  // New item input states
  const [newBrandName, setNewBrandName] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')

  // Inline editing states
  const [editingBrand, setEditingBrand] = useState(null)
  const [editingBrandVal, setEditingBrandVal] = useState('')
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingCategoryVal, setEditingCategoryVal] = useState('')

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState(null) // { type: 'brand' | 'category', name: string, count: number }

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 3500)
  }

  // Count products for each brand
  const getProductCountForBrand = (brandName) => {
    return products.filter((p) => p.brand?.toLowerCase() === brandName?.toLowerCase()).length
  }

  // Count products for each category
  const getProductCountForCategory = (catName) => {
    return products.filter((p) => p.category?.toLowerCase() === catName?.toLowerCase()).length
  }

  // Handlers for Brand
  const handleAddBrand = (e) => {
    e.preventDefault()
    const res = addBrand(newBrandName)
    if (res.success) {
      showToast(`Brand "${res.brand}" added successfully!`)
      setNewBrandName('')
    } else {
      showToast(res.error, 'error')
    }
  }

  const handleStartEditBrand = (brand) => {
    setEditingBrand(brand)
    setEditingBrandVal(brand)
  }

  const handleSaveEditBrand = (oldBrand) => {
    const res = updateBrand(oldBrand, editingBrandVal)
    if (res.success) {
      showToast(`Brand updated to "${res.brand}". Associated products updated.`)
      setEditingBrand(null)
    } else {
      showToast(res.error, 'error')
    }
  }

  const handleConfirmDelete = () => {
    if (!deleteModal) return
    if (deleteModal.type === 'brand') {
      const res = deleteBrand(deleteModal.name)
      if (res.success) {
        showToast(`Brand "${deleteModal.name}" deleted.`)
      } else {
        showToast(res.error, 'error')
      }
    } else if (deleteModal.type === 'category') {
      const res = deleteCategory(deleteModal.name)
      if (res.success) {
        showToast(`Category "${deleteModal.name}" deleted.`)
      } else {
        showToast(res.error, 'error')
      }
    }
    setDeleteModal(null)
  }

  // Handlers for Category
  const handleAddCategory = (e) => {
    e.preventDefault()
    const res = addCategory(newCategoryName)
    if (res.success) {
      showToast(`Category "${res.category}" added successfully!`)
      setNewCategoryName('')
    } else {
      showToast(res.error, 'error')
    }
  }

  const handleStartEditCategory = (cat) => {
    setEditingCategory(cat)
    setEditingCategoryVal(cat)
  }

  const handleSaveEditCategory = (oldCat) => {
    const res = updateCategory(oldCat, editingCategoryVal)
    if (res.success) {
      showToast(`Category updated to "${res.category}". Associated products updated.`)
      setEditingCategory(null)
    } else {
      showToast(res.error, 'error')
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-xl text-xs font-semibold text-white ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-[#104360]'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} className="text-emerald-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header & Overview */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#104360] text-white">
                <Tag size={18} />
              </div>
              <h2 className="text-lg font-bold text-[#104360]">Brands & Categories Manager</h2>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Control the wholesale brand taxonomy and product category classification across your entire catalog.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#104360]">
              <Building size={14} className="text-[#EF2034]" />
              <strong>{brands.length}</strong> Brands
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#104360]">
              <Tag size={14} className="text-[#104360]" />
              <strong>{categories.length}</strong> Categories
            </span>
          </div>
        </div>

        {/* Global Sync Notice */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-blue-50/60 border border-blue-100 p-3 text-xs text-blue-900">
          <Info size={16} className="shrink-0 text-blue-600 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Seamless Integration:</strong> Any brand or category created or edited here updates immediately in the <strong>Product Add/Edit modal</strong>, product filter pills, and client-facing catalog without requiring code changes.
          </p>
        </div>
      </div>

      {/* Two Column Grid: Brands (Left) & Categories (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ========================================================
            COLUMN 1: BRANDS MANAGEMENT
        ======================================================== */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#104360]">
                <Building size={16} className="text-[#EF2034]" />
                <h3 className="font-semibold text-sm">Wholesale Brands</h3>
              </div>
              <span className="text-[11px] font-semibold text-gray-400">
                {brands.length} Total
              </span>
            </div>

            {/* Quick Add Brand Form */}
            <form onSubmit={handleAddBrand} className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="e.g. BOVEN CARE, GLEAM, SUPRA"
                className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs text-[#104360] placeholder:text-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#104360] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0D2B3E] transition shadow-xs shrink-0"
              >
                <Plus size={14} />
                <span>Add Brand</span>
              </button>
            </form>

            {/* Brands List */}
            <div className="mt-5 space-y-2">
              {brands.map((brand) => {
                const prodCount = getProductCountForBrand(brand)
                const isEditing = editingBrand === brand

                return (
                  <div
                    key={brand}
                    className="group flex items-center justify-between rounded-xl border border-gray-100 bg-[#F8FAFC] p-3 transition hover:border-gray-200 hover:bg-white hover:shadow-xs"
                  >
                    {/* Brand Name or Edit Input */}
                    {isEditing ? (
                      <div className="flex flex-1 items-center gap-2 mr-2">
                        <input
                          type="text"
                          value={editingBrandVal}
                          onChange={(e) => setEditingBrandVal(e.target.value)}
                          className="flex-1 rounded-lg border border-[#104360] bg-white px-2.5 py-1 text-xs font-bold text-[#104360] outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEditBrand(brand)}
                          className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
                          title="Save Changes"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingBrand(null)}
                          className="rounded-lg bg-gray-200 p-1.5 text-gray-600 hover:bg-gray-300"
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#104360] font-bold text-[10px]">
                          {brand.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#104360] tracking-wide">{brand}</h4>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                            <Package size={10} />
                            {prodCount} {prodCount === 1 ? 'product' : 'products'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!isEditing && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEditBrand(brand)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360] transition"
                          title="Rename Brand"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ type: 'brand', name: brand, count: prodCount })}
                          className={`rounded-lg p-1.5 transition ${
                            prodCount > 0
                              ? 'text-gray-300 hover:text-amber-600'
                              : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                          }`}
                          title={prodCount > 0 ? `${prodCount} products linked (cannot delete)` : 'Delete Brand'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Wholesale Lineup</span>
            <span>All brand names automatically normalized to uppercase</span>
          </div>
        </div>

        {/* ========================================================
            COLUMN 2: CATEGORIES MANAGEMENT
        ======================================================== */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#104360]">
                <Tag size={16} className="text-[#104360]" />
                <h3 className="font-semibold text-sm">Product Categories</h3>
              </div>
              <span className="text-[11px] font-semibold text-gray-400">
                {categories.length} Total
              </span>
            </div>

            {/* Quick Add Category Form */}
            <form onSubmit={handleAddCategory} className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. AUTOMOTIVE CARE, HOSPITALITY"
                className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs text-[#104360] placeholder:text-gray-400 outline-none focus:border-[#104360] focus:ring-1 focus:ring-[#104360]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#104360] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0D2B3E] transition shadow-xs shrink-0"
              >
                <Plus size={14} />
                <span>Add Category</span>
              </button>
            </form>

            {/* Categories List */}
            <div className="mt-5 space-y-2">
              {categories.map((cat) => {
                const prodCount = getProductCountForCategory(cat)
                const isEditing = editingCategory === cat

                return (
                  <div
                    key={cat}
                    className="group flex items-center justify-between rounded-xl border border-gray-100 bg-[#F8FAFC] p-3 transition hover:border-gray-200 hover:bg-white hover:shadow-xs"
                  >
                    {/* Category Name or Edit Input */}
                    {isEditing ? (
                      <div className="flex flex-1 items-center gap-2 mr-2">
                        <input
                          type="text"
                          value={editingCategoryVal}
                          onChange={(e) => setEditingCategoryVal(e.target.value)}
                          className="flex-1 rounded-lg border border-[#104360] bg-white px-2.5 py-1 text-xs font-bold text-[#104360] outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEditCategory(cat)}
                          className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
                          title="Save Changes"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="rounded-lg bg-gray-200 p-1.5 text-gray-600 hover:bg-gray-300"
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#EF2034] font-bold text-[10px]">
                          #
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#104360] tracking-wide">{cat}</h4>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                            <Package size={10} />
                            {prodCount} {prodCount === 1 ? 'product' : 'products'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!isEditing && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEditCategory(cat)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#104360] transition"
                          title="Rename Category"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ type: 'category', name: cat, count: prodCount })}
                          className={`rounded-lg p-1.5 transition ${
                            prodCount > 0
                              ? 'text-gray-300 hover:text-amber-600'
                              : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                          }`}
                          title={prodCount > 0 ? `${prodCount} products linked (cannot delete)` : 'Delete Category'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Filter Taxonomy</span>
            <span>Controls website catalog pills and tags</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Trash2 size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Delete {deleteModal.type === 'brand' ? 'Brand' : 'Category'}?
              </h3>
            </div>

            {deleteModal.count > 0 ? (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 space-y-1">
                <p className="font-semibold">Cannot Delete Active Item</p>
                <p>
                  There are <strong>{deleteModal.count} product(s)</strong> currently assigned to "
                  {deleteModal.name}". Please reassign or delete those products first before deleting this {deleteModal.type}.
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">
                Are you sure you want to delete <strong>"{deleteModal.name}"</strong>? This action cannot be undone.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteModal(null)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                {deleteModal.count > 0 ? 'Close' : 'Cancel'}
              </button>
              {deleteModal.count === 0 && (
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-xs"
                >
                  Confirm Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
