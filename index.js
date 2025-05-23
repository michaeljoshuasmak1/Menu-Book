let totalPrice = 0;
let cart = [];

reset();

function addQty(menuIndex, priceIndex) {
    cart[menuIndex][priceIndex] = cart[menuIndex][priceIndex] + 1;

    totalPrice += menus[menuIndex].prices[priceIndex].price;

    document.getElementById("checkout").innerHTML = "Rp " + (totalPrice * 1000).toLocaleString();

    document.getElementById("qty" + menuIndex + priceIndex).innerHTML = cart[menuIndex][priceIndex];
}

function substractQty(menuIndex, priceIndex) {
    if (cart[menuIndex][priceIndex] > 0) {
        cart[menuIndex][priceIndex] = cart[menuIndex][priceIndex] - 1;

        totalPrice -= menus[menuIndex].prices[priceIndex].price;
        document.getElementById("checkout").innerHTML = "Rp " + (totalPrice * 1000).toLocaleString();

        document.getElementById("qty" + menuIndex + priceIndex).innerHTML = cart[menuIndex][priceIndex];
    }
}

function checkout() {
    if (totalPrice > 0) {
        let url = `order-confirmation/index.html?`;
        url += `total-price=${totalPrice}`;
        url += `&cart=${JSON.stringify(cart)}`;

        window.location.href = url;
        reset();
    } else {
        alert('Pesan dulu minimal 1');
    }
}

function reset() {
    totalPrice = 0;
    cart = [];
    document.getElementById("checkout").innerHTML = "Rp 0"

    for (let i = 0; i < menus.length; i++) {
        cart.push([0, 0]);
    }

    let menuArea = "";

    for (let i = 0; i < menus.length; i++) {
        const e = menus[i];
        let menuPrices = "";

        for (let j = 0; j < e.prices.length; j++) {
            const f = e.prices[j];
            menuPrices += `
                <div class="menu-price-row">
                    <span class="price-description">${f.label}</span>
                    <div class="price-and-qty">
                        <span class="price">${f.price}</span>
                        <button onclick='substractQty(${i},${j})'>
                            <img src="assets/circle-minus.png" width="16" height="16" alt="minus-circle" />
                        </button>
                        <span class="qty" id="qty${i}${j}">0</span>
                        <button onclick='addQty(${i},${j})'>
                            <img src="assets/circle-plus.png" width="16" height="16" alt="plus-circle" />
                        </button>
                    </div>
                </div>
            `;
        }

        menuArea += `
            <div class="menu-tile">
                <div class="menu-photo">
                    <img src="${e.photoUrl}" alt="${e.title}">
                </div>
                <div class="menu-tile-name">${e.title}</div>
                <div class="menu-tile-description">${e.description}</div>
                ${menuPrices}
            </div>
        `;
    }

    document.getElementById("menu-area").innerHTML = menuArea;
}