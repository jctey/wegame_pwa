type UndevelopedDialogProps = {
  open: boolean
  onClose: () => void
}

export function UndevelopedDialog({ open, onClose }: UndevelopedDialogProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="undeveloped-title"
        className="w-full max-w-xs rounded-lg border border-accent bg-panel px-6 py-8 text-center"
      >
        <h2 id="undeveloped-title" className="text-lg font-bold">
          功能未开发
        </h2>
        <button
          type="button"
          className="focus-ring mt-6 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-black"
          onClick={onClose}
        >
          确定
        </button>
      </div>
    </div>
  )
}
