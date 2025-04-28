import { toast } from 'react-toastify';

// Toast configuration options
const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Success toast
export const showSuccessToast = (message) => {
  toast.success(message, toastOptions);
};

// Error toast
export const showErrorToast = (message) => {
  toast.error(message, toastOptions);
};

// Info toast
export const showInfoToast = (message) => {
  toast.info(message, toastOptions);
};

// Warning toast
export const showWarningToast = (message) => {
  toast.warning(message, toastOptions);
};

// Default toast
export const showToast = (message) => {
  toast(message, toastOptions);
};
