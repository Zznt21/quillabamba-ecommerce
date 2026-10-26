export const TOAST_DURATION = 3000;

// Return the cleanup used both when a notification is replaced and on unmount.
export function scheduleToastDismiss(dismiss) {
  const timer = setTimeout(dismiss, TOAST_DURATION);
  return () => clearTimeout(timer);
}
