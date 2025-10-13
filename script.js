// script.js - Basic functionality for TurnThePage Bookstore

// Simple cart counter
let cartCount = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('TurnThePage Bookstore loaded successfully');
    
    // Add event listeners to "Add to Cart" buttons
    setupAddToCartButtons();
    
    // Add event listener to "Browse Collection" button
    setupBrowseButton();
    
    // Add event listener to cart button
    setupCartButton();
});

// Set up "Add to Cart" buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-outline-primary-custom');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const bookTitle = card.querySelector('.card-title').textContent;
            
            // Simple cart counter
            cartCount++;
            updateCartUI();
            
            // Show Bootstrap toast notification
            showToast(`${bookTitle} added to cart!`);
        });
    });
}

// Update cart UI
function updateCartUI() {
    const cartButton = document.querySelector('.navbar .btn-outline-light');
    
    if (cartCount > 0) {
        cartButton.innerHTML = `<i class="fas fa-shopping-cart me-2"></i>Cart (${cartCount})`;
    } else {
        cartButton.innerHTML = `<i class="fas fa-shopping-cart me-2"></i>Cart`;
    }
}

// Set up browse collection button
function setupBrowseButton() {
    const browseButton = document.querySelector('.hero-section .btn');
    
    browseButton.addEventListener('click', function() {
        // Scroll to the featured books section using smooth scroll
        document.querySelector('h2.section-title').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Set up cart button
function setupCartButton() {
    const cartButton = document.querySelector('.navbar .btn-outline-light');
    
    cartButton.addEventListener('click', function() {
        // Show simple cart modal using Bootstrap
        showSimpleCartModal();
    });
}

// Show simple cart modal
function showSimpleCartModal() {
    // Create modal HTML using Bootstrap components
    const modalHTML = `
        <div class="modal fade" id="cartModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Your Cart</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>You have ${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart</p>
                        <p class="text-muted">Cart functionality would be implemented in a full version</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
                        <button type="button" class="btn btn-primary-custom" ${cartCount === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal using Bootstrap
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
    
    // Remove modal from DOM when hidden
    document.getElementById('cartModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Show Bootstrap toast notification
function showToast(message) {
    // Create toast element
    const toastHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Add toast to container
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Show toast using Bootstrap
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remove toast from DOM when hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}