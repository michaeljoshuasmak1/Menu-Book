const params = new URLSearchParams(window.location.search);
const totalPrice = parseInt(params.get('total-price'));
const cart = JSON.parse(params.get('cart'));

const serviceCharge = totalPrice * 0.05;
const pb1 = totalPrice * 0.1;

const date = new Date().toLocaleString('id-ID');

let orderQty = 0;

let content = '';

for (let i = 0; i < cart.length; i++) {
    const e = cart[i];

    if (e[0] > 0) {
        orderQty += e[1];
        content += `<div class="row"><div>${e[0]} ${menus[i].title} (${menus[i].prices[0].label})</div><div>${(e[0] * menus[i].prices[0].price * 1000).toLocaleString()}</div></div>`;
    }

    if (e[1] > 0) {
        orderQty += e[1];
        content += `<div class="row"><div>${e[1]} ${menus[i].title} (${menus[i].prices[1].label})</div><div>${(e[1] * menus[i].prices[1].price * 1000).toLocaleString()}</div></div>`;
    }
}

document.getElementById('ordered-menus').innerHTML = content;
