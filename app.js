// ===================================================
// Sushi Burger App - Real-time Firebase Version
// ===================================================

// State Management
let orders = [];
let availableToppings = ['🥑 אבוקדו', '🥒 מלפפון', '🍤 קנפיו', '🧅 בצל ירוק'];

// Firebase References
let ordersRef;
let toppingsRef;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase is loaded
    if (typeof window.db === 'undefined') {
        console.error('❌ Firebase not initialized! Please check firebase-config.js');
        alert('שגיאה: Firebase לא מוגדר. אנא בדוק את קובץ ההגדרות.');
        return;
    }

    // Initialize Firebase references
    ordersRef = window.db.ref('orders');
    toppingsRef = window.db.ref('toppings');

    // Listen to real-time updates
    setupFirebaseListeners();

    // Form Submit
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addOrder();
    });
});

// Setup Firebase Real-time Listeners
function setupFirebaseListeners() {
    // Listen for changes in orders
    ordersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        orders = data ? Object.values(data) : [];
        renderOrders();
    });

    // Listen for changes in toppings
    toppingsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            availableToppings = data;
            renderToppings();
        } else {
            // Initialize default toppings if none exist
            const defaultToppings = ['🥑 אבוקדו', '🥒 מלפפון', '🍤 קנפיו', '🧅 בצל ירוק'];
            toppingsRef.set(defaultToppings);
        }
    });
}

// Render Available Toppings
function renderToppings() {
    const container = document.getElementById('toppingsContainer');
    container.innerHTML = '';

    availableToppings.forEach((topping, index) => {
        const div = document.createElement('div');
        div.className = 'checkbox-option';
        div.innerHTML = `
            <input type="checkbox" id="topping-${index}" value="${topping}">
            <label for="topping-${index}" class="checkbox-label">${topping}</label>
        `;
        container.appendChild(div);
    });
}

// Add New Topping to Available List
function addNewTopping() {
    const input = document.getElementById('newTopping');
    const toppingName = input.value.trim();

    if (!toppingName) {
        alert('נא להכניס שם תוספת');
        return;
    }

    if (availableToppings.some(t => t.includes(toppingName))) {
        alert('התוספת כבר קיימת');
        return;
    }

    // Add emoji based on content or use default
    const emoji = getEmojiForTopping(toppingName);
    const newTopping = `${emoji} ${toppingName}`;

    // Update Firebase
    const updatedToppings = [...availableToppings, newTopping];
    toppingsRef.set(updatedToppings).then(() => {
        input.value = '';
        showNotification(`התוספת "${toppingName}" נוספה בהצלחה! ✨`);
    }).catch((error) => {
        console.error('Error adding topping:', error);
        alert('שגיאה בהוספת התוספת');
    });
}

// Get Emoji for Topping
function getEmojiForTopping(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('עגבני')) return '🍅';
    if (lowerName.includes('חסה') || lowerName.includes('סלט')) return '🥬';
    if (lowerName.includes('בצל')) return '🧅';
    if (lowerName.includes('פלפל')) return '🌶️';
    if (lowerName.includes('גזר')) return '🥕';
    if (lowerName.includes('כרוב')) return '🥬';
    if (lowerName.includes('שום')) return '🧄';
    if (lowerName.includes('ג\'ינג\'ר') || lowerName.includes('גינגר')) return '🫚';
    if (lowerName.includes('נורי') || lowerName.includes('אצה')) return '🌿';
    if (lowerName.includes('שומשום')) return '🌰';
    return '🌿';
}

// Add Order
function addOrder() {
    const name = document.getElementById('name').value.trim();

    if (!name) {
        alert('נא להכניס שם');
        return;
    }

    // Get salmon choice
    const salmonChoice = document.querySelector('input[name="salmon"]:checked').value;

    // Get selected toppings
    const selectedToppings = [];
    document.querySelectorAll('#toppingsContainer input[type="checkbox"]:checked').forEach(checkbox => {
        selectedToppings.push(checkbox.value);
    });

    // Create order object
    const order = {
        id: Date.now(),
        name: name,
        salmon: salmonChoice,
        toppings: selectedToppings
    };

    // Save to Firebase
    ordersRef.child(order.id.toString()).set(order).then(() => {
        // Reset form
        document.getElementById('orderForm').reset();
        document.getElementById('withSalmon').checked = true;

        // Show success notification
        showNotification(`ההזמנה של ${name} נוספה בהצלחה! 🎉`);
    }).catch((error) => {
        console.error('Error adding order:', error);
        alert('שגיאה בהוספת ההזמנה');
    });
}

// Delete Order
function deleteOrder(id) {
    const order = orders.find(o => o.id === id);
    if (order && confirm(`למחוק את ההזמנה של ${order.name}?`)) {
        ordersRef.child(id.toString()).remove().then(() => {
            showNotification('ההזמנה נמחקה');
        }).catch((error) => {
            console.error('Error deleting order:', error);
            alert('שגיאה במחיקת ההזמנה');
        });
    }
}

// Render Orders
function renderOrders() {
    const container = document.getElementById('ordersContainer');

    if (orders.length === 0) {
        container.innerHTML = '<div class="empty-state">עדיין אין הזמנות... תהיו הראשונים! 🎉</div>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-name">${escapeHtml(order.name)}</div>
                <button class="btn-delete" onclick="deleteOrder(${order.id})">🗑️</button>
            </div>
            <div class="order-main">${order.salmon}</div>
            ${order.toppings && order.toppings.length > 0 ? `
                <div class="order-toppings">
                    ${order.toppings.map(topping => `
                        <span class="topping-tag">${topping}</span>
                    `).join('')}
                </div>
            ` : '<div style="opacity: 0.7; text-align: center; padding: 0.5rem;">ללא תוספות נוספות</div>'}
        </div>
    `).join('');
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        z-index: 1000;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
