import { useToast } from './useToast';

function toastClassName(type: 'success' | 'error' | 'info'): string {
  if (type === 'success') {
    return 'border-green-200 bg-green-50 text-green-800';
  }
  if (type === 'error') {
    return 'border-red-200 bg-red-50 text-red-800';
  }
  return 'border-blue-200 bg-blue-50 text-blue-800';
}

export function ToastBar() {
  const { toast, clear } = useToast();

  if (!toast.message) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm shadow ${toastClassName(
          toast.type,
        )}`}
        role="status"
        aria-live="polite"
      >
        <p className="font-medium">{toast.message}</p>
        <button
          type="button"
          onClick={clear}
          className="rounded px-2 py-1 text-xs font-medium hover:bg-black/10"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
