import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useStore } from '../context/useStore'

export default function Toast() {
  const { toast, hideToast } = useStore()

  if (!toast?.show) return null

  const isError = toast.type === 'error'
  const isInfo = toast.type === 'info'

  return (
    <div className="fixed bottom-6 right-6 z-[999999] pointer-events-auto max-w-sm sm:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl text-xs font-semibold text-white backdrop-blur-md border ${
          isError
            ? 'bg-red-600/95 border-red-400'
            : isInfo
            ? 'bg-[#104360]/95 border-cyan-400/40'
            : 'bg-[#104360]/95 border-emerald-400/50'
        }`}
      >
        {isError ? (
          <AlertCircle size={20} className="text-white shrink-0" />
        ) : isInfo ? (
          <Info size={20} className="text-cyan-300 shrink-0" />
        ) : (
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
        )}
        <span className="flex-1 leading-snug">{toast.message}</span>
        <button
          type="button"
          onClick={hideToast}
          className="ml-2 rounded-full p-1 text-white/60 hover:bg-white/20 hover:text-white transition"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
