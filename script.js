// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.benefit-card, .review-card, .feature-card, .recipe-card, .story-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// API Configuration
const API_BASE = 'http://localhost:5000/api';

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Buy Now buttons
    const buyButtons = document.querySelectorAll('.btn-primary');
    buyButtons.forEach(button => {
        if (button.textContent.includes('Buy Now') || button.textContent.includes('Order Now')) {
            button.addEventListener('click', function() {
                showOrderForm();
            });
        }
    });
    
    // See Ingredients button
    const ingredientsButton = document.querySelector('.btn-secondary');
    if (ingredientsButton) {
        ingredientsButton.addEventListener('click', function() {
            document.querySelector('#ingredients').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Form validation (if contact forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add to cart functionality (for future e-commerce integration)
function addToCart(productId, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem('aurawill_cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: 'Aurawill Health Mix',
            price: 300,
            weight: '900g',
            quantity: quantity
        });
    }
    
    localStorage.setItem('aurawill_cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('aurawill_cart') || '[]');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart badge if it exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Order form functionality
function showOrderForm() {
    const orderForm = `
        <div id="orderModal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">
            <div style="background:white;padding:30px;border-radius:15px;max-width:500px;width:90%;">
                <h3>Order Aurawill Health Mix</h3>
                <form id="orderForm">
                    <input type="text" placeholder="Full Name" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:5px;">
                    <input type="email" placeholder="Email" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:5px;">
                    <input type="tel" placeholder="Phone Number" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:5px;">
                    <textarea placeholder="Address" required style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:5px;height:80px;"></textarea>
                    <div style="display:flex;gap:10px;margin-top:20px;">
                        <button type="submit" style="flex:1;padding:12px;background:#2c5530;color:white;border:none;border-radius:5px;cursor:pointer;">Place Order - ₹300</button>
                        <button type="button" onclick="closeOrderForm()" style="flex:1;padding:12px;background:#ccc;color:black;border:none;border-radius:5px;cursor:pointer;">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', orderForm);
    
    document.getElementById('orderForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderData = {
            customerInfo: {
                name: e.target[0].value,
                email: e.target[1].value,
                phone: e.target[2].value,
                address: { street: e.target[3].value }
            },
            items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1, price: 300 }],
            totalAmount: 300
        };
        
        try {
            const response = await fetch(`${API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const result = await response.json();
            alert('Order placed successfully! Order ID: ' + result._id);
            closeOrderForm();
        } catch (error) {
            alert('Order failed. Please try again.');
        }
    });
}

function closeOrderForm() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.remove();
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Product size selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const sizeCards = document.querySelectorAll('.size-card');
    
    sizeCards.forEach(card => {
        card.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            const price = this.getAttribute('data-price');
            const imageUrl = this.getAttribute('data-image');
            
            sizeCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const productImage = document.getElementById('productImage');
            const productPrice = document.getElementById('productPrice');
            const productWeight = document.getElementById('productWeight');
            
            if (productImage) {
                productImage.style.opacity = '0.7';
                productImage.src = imageUrl;
                productImage.onload = function() {
                    this.style.opacity = '1';
                };
            }
            
            if (productPrice) productPrice.textContent = price;
            if (productWeight) productWeight.textContent = size;
        });
    });
});