const medicines = {
    analgesics: [
        { name: "Paracetamol", price: 10, image: "images/Paracetamol-1-1.jpg" },
        { name: "Ibuprofen", price: 15, image: "images/ibuprofen.jpg" },
        { name: "Aspirin", price: 12, image: "images/aspirin.jpg" },
        { name: "Codeine", price: 20, image: "images/codeine.webp" },
        { name: "Tramadol", price: 25, image: "images/tramadol.webp" },
        { name: "Naproxen", price: 18, image: "images/naproxen.webp" }
    ],
    antibiotics: [
        { name: "Amoxicillin", price: 30, image: "images/amoxcilin.jpeg" },
        { name: "Ciprofloxacin", price: 25, image: "images/ciprofloxacin.jpg" },
        { name: "Azithromycin", price: 35, image: "images/azithromycin.webp" },
        { name: "Doxycycline", price: 20, image: "images/Doxycycline.png" },
        { name: "Clindamycin", price: 28, image: "images/Clindamycin.webp" },
        { name: "Metronidazole", price: 22, image: "images/Metronidazole.jpeg" }
    ],
    Antidepressants: [
        { name: "Escitalopram", price: 30, image: "images/Escitalopram.webp" },
        { name: "Fluoxetine", price: 25, image: "images/Fluoxetine.jpg" },
        { name: "Sertraline", price: 35, image: "images/Sertraline.jpg" },
        { name: "Paroxetine", price: 20, image: "images/Paroxetine.jpeg" },
        { name: "Amitriptyline", price: 28, image: "images/Amitriptyline.jpg" },
        { name: "Imipramine", price: 22, image: "images/Metronidazole.jpeg" }
    ],
    Antihistamines: [
        { name: "Cetirizine", price: 30, image: "images/cetirizine.webp" },
        { name: "Loratadine", price: 25, image: "images/Fluoxetine.jpg" },
        { name: "Diphenhydramine", price: 35, image: "images/benadryl.webp" },
        { name: "Fexofenadine", price: 20, image: "images/fexo.webp" },
    ],
    Antihypertensives: [
        { name: "Lisinopril", price: 30, image: "images/Escitalopram.webp" },
        { name: "Amlodipine", price: 25, image: "images/Fluoxetine.jpg" },
        { name: "Losartan", price: 35, image: "images/losa.jpeg" },
        { name: "Metoprolol", price: 20, image: "images/Paroxetine.jpeg" },
        { name: "Valsartan", price: 28, image: "images/Amitriptyline.jpg" },
        { name: "Clonidine", price: 22, image: "images/Metronidazole.jpeg" }
    ]

};

let cart = [];

// Populate the categories
function populateCategories() {
    const categoriesDiv = document.getElementById('categories');
    for (const category in medicines) {
        const section = document.createElement('section');
        section.innerHTML = `<h3>${capitalize(category)}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'grid-container';
        medicines[category].forEach((medicine, idx) => {
            grid.innerHTML += `
                <div>
                    <img src="${medicine.image}" alt="${medicine.name}">
                    <p>${medicine.name}</p>
                    <p>Price: $${medicine.price}</p>
                    <button onclick="addToCart('${category}', ${idx})">Add to Cart</button>
                </div>`;
        });
        section.appendChild(grid);
        categoriesDiv.appendChild(section);
    }
}

// Add item to cart
function addToCart(category, idx) {
    const medicine = medicines[category][idx];
    const existing = cart.find(item => item.name === medicine.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...medicine, quantity: 1 });
    }
    renderCart();
}

// Render the cart
function renderCart() {
    const cartTable = document.getElementById('cart');
    const totalElem = document.getElementById('total');
    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach((item, idx) => {
        total += item.quantity * item.price;
        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.quantity * item.price}</td>
                <td><button onclick="removeFromCart(${idx})">Remove</button></td>
            </tr>`;
    });
    totalElem.textContent = `$${total}`;
}

// Remove item from cart
function removeFromCart(idx) {
    cart.splice(idx, 1);
    renderCart();
}

// Save to favorites
document.getElementById('saveFavorites').addEventListener('click', () => {
    localStorage.setItem('favorites', JSON.stringify(cart));
    alert('Favorites saved!');
});

// Apply favorites
document.getElementById('applyFavorites').addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
        cart = favorites;
        renderCart();
    } else {
        alert('No favorites found!');
    }
});

// Buy Now
document.getElementById('buyNow').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});

// Capitalize category names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

populateCategories();
