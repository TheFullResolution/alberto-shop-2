// Simple frontend application
console.log('Frontend application loaded');

// Server check functionality
const checkServerButton = document.getElementById('check-server');
const statusResult = document.getElementById('status-result');

checkServerButton.addEventListener('click', async () => {
    try {
        statusResult.innerHTML = 'Checking server...';
        
        const response = await fetch('http://localhost:3001/health');
        const data = await response.json();
        
        statusResult.innerHTML = `
            <div class="success">
                <strong>Server Status:</strong> ${data.status}<br>
                <strong>Timestamp:</strong> ${data.timestamp}
            </div>
        `;
    } catch (error) {
        statusResult.innerHTML = `
            <div class="error">
                <strong>Error:</strong> Could not connect to server<br>
                <small>${error.message}</small>
            </div>
        `;
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - App initialized');
});