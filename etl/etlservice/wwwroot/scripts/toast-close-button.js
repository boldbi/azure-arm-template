// Add close button to all toasts (including multiple simultaneous toasts)
function addCloseButtonToToast(toastId) {
    let retryCount = 0;
    const maxRetries = 10;
    
    function attemptAddButton() {
        retryCount++;
        
        // Find all toast containers in the page
        const containers = document.querySelectorAll('.e-toast-container');
        
        if (containers.length > 0) {
            let buttonAdded = false;
            
            // Iterate through ALL containers and toasts
            containers.forEach(container => {
                const toasts = container.querySelectorAll('.e-toast');
                
                toasts.forEach(toast => {
                    // Skip if already has a close button
                    if (toast.querySelector('.close-btn-icon')) {
                        return;
                    }
                    
                    // Ensure the toast has relative positioning
                    if (toast.style.position === 'static' || toast.style.position === '') {
                        toast.style.position = 'relative';
                    }
                    
                    // Determine toast type and colors based on CSS class
                    let buttonColor = '#6C757D';
                    let hoverColor = '#495057';
                    
                    if (toast.classList.contains('e-toast-success')) {
                        buttonColor = '#1E7E34';
                        hoverColor = '#155724';
                    } else if (toast.classList.contains('e-toast-danger')) {
                        buttonColor = '#C1272D';
                        hoverColor = '#A41D1D';
                    } else if (toast.classList.contains('e-toast-warning')) {
                        buttonColor = '#B8860B';
                        hoverColor = '#997708';
                    }
                    
                    // Create the close button
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'close-btn-icon';
                    closeBtn.innerHTML = '×';
                    closeBtn.title = 'Close notification';
                    closeBtn.style.color = buttonColor;
                    
                    // Store original color for reset
                    const originalColor = buttonColor;
                    
                    // Hover effects
                    closeBtn.addEventListener('mouseenter', function() {
                        this.style.opacity = '1';
                        this.style.color = hoverColor;
                        this.style.transform = 'scale(1.1)';
                    });
                    
                    closeBtn.addEventListener('mouseleave', function() {
                        this.style.opacity = '0.7';
                        this.style.color = originalColor;
                        this.style.transform = 'scale(1)';
                    });
                    
                    // Click to close
                    closeBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        // Fade out and remove
                        toast.style.opacity = '0';
                        toast.style.transition = 'opacity 0.3s ease';
                        
                        setTimeout(function() {
                            if (toast.parentNode) {
                                toast.parentNode.removeChild(toast);
                            }
                        }, 300);
                    });
                    
                    // Append the close button to the toast
                    toast.appendChild(closeBtn);
                    buttonAdded = true;
                });
            });
            
            // If we added at least one button, no need to retry
            if (buttonAdded) {
                return true;
            } else if (retryCount < maxRetries) {
                setTimeout(attemptAddButton, 50);
                return;
            }
        } else if (retryCount < maxRetries) {
            setTimeout(attemptAddButton, 50);
            return;
        }
    }
    
    // Start the first attempt
    attemptAddButton();
}
