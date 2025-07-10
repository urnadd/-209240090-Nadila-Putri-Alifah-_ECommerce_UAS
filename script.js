let cartItems = []; 
function addToCart(productName, price) {
  const existingItem = cartItems.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ name: productName, price: price, quantity: 1 });
  }

  alert(`${productName} ditambahkan ke keranjang!`);
  updateCartView();

}

function updateCartView() {
  const cartSection = document.getElementById("cart");
  let html = "";

  if (cartItems.length === 0) {
    html = "<p style='font-size:1.2em;'>Keranjangmu masih kosong. </p>";
  } else {
    let total = 0;
    html = `<div style="display: flex; flex-direction: column; gap: 15px; align-items: center;">`;

    cartItems.forEach((item, idx) => {
      total += item.price * item.quantity;
      html += `
        <div style="
          background-color: #fff;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 400px;
          text-align: center;
        ">
          <h3 style="color: #d63384; margin-bottom: 10px;">${item.name}</h3>
          <p style="margin-bottom: 10px;">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
          <div style="display:flex; justify-content:center; gap:10px;">
            <button onclick="changeQuantity('${item.name}', -1)" style="
              background-color: #ffc0cb;
              border: none;
              color: #fff;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              transition: background-color 0.3s;
            ">–</button>
            <span style="font-size: 1.2em; font-weight: bold;">${item.quantity}</span>
            <button onclick="changeQuantity('${item.name}', 1)" style="
              background-color: #ffc0cb;
              border: none;
              color: #fff;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              transition: background-color 0.3s;
            ">+</button>
          </div>
        </div>`;
    });

    html += `
      <div style="margin-top: 20px; font-size: 1.3em;">
        <strong>Total: Rp ${total.toLocaleString()}</strong><br><br>
        <button onclick="checkoutNow()" style="
          background-color: #d63384;
          color: white;
          padding: 12px 24px;
          font-size: 1em;
          border: none;
          border-radius: 8px;
          cursor: not-allowed;
          opacity: 0.8;
        " title="">Checkout Sekarang</button>  
      </div>
    </div>`;
  }

  cartSection.innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h2 style="color: #d63384;">Keranjang Belanja 🛍️</h2>
      ${html}
    </div>`;
}

function changeQuantity(productName, amount) {
  const item = cartItems.find(i => i.name === productName);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cartItems = cartItems.filter(i => i.name !== productName);
  }
  updateCartView(); 
}
function checkoutNow() {
  const cartSection = document.getElementById("cart");

  cartSection.innerHTML = `
    <div style="padding: 60px; text-align: center;">
      <h2 style="color: #d63384;">Checkout Berhasil! 🎉</h2>
      <p>Terima kasih sudah berbelanja di toko kami 💖</p>
      <p>Pesananmu sedang kami proses yaa ✨</p>
      <br>
      <button onclick="showPage('home')" style="
        background-color: #d63384;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      ">Kembali ke Home</button>
    </div>
  `;

  cartItems = []; // kosongkan keranjang
}
