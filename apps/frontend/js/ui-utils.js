// Helper functions for UI updates and user feedback
export class UIUtils {
  // Show status messages to the user
  static showStatus(message, type = 'info') {
    const statusResult = document.getElementById('status-result');

    // Different styles for different message types
    const statusClasses = {
      success: 'success-message',
      error: 'error-message',
      info: 'bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md',
      warning:
        'bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md',
    };

    statusResult.innerHTML = `<div class="${statusClasses[type]}">${message}</div>`;

    // Auto-hide info messages after 5 seconds
    if (type === 'info') {
      setTimeout(() => {
        statusResult.innerHTML = '';
      }, 5000);
    }

    // Scroll to status message so user sees it
    statusResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Clear all status messages
  static clearStatus() {
    document.getElementById('status-result').innerHTML = '';
  }

  // Show loading state on a button
  static setButtonLoading(button, isLoading, originalText = null) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Loading...';
      button.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      button.disabled = false;
      button.textContent =
        originalText || button.dataset.originalText || button.textContent;
      button.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}
