import { clearToast, showToast } from '../../redux/toastSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export function useToast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);

  return {
    toast,
    showSuccess: (message: string) => dispatch(showToast({ message, type: 'success' })),
    showError: (message: string) => dispatch(showToast({ message, type: 'error' })),
    showInfo: (message: string) => dispatch(showToast({ message, type: 'info' })),
    clear: () => dispatch(clearToast()),
  };
}
