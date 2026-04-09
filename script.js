let cart = JSON.parse(localStorage.getItem("myCart")) || [];
// تحديث الجدول عند تحميل الصفحة
renderCart();
bills();

function addToCart() {
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const qty = parseInt(document.getElementById("prodQty").value);

  if (name && price > 0 && qty > 0) {
    const item = {
      id: Date.now(),
      name: name,
      price: price,
      qty: qty,
      total: price * qty,
    };

    cart.push(item);
    saveAndRender();

    // مسح الحقول بعد الإضافة
    document.getElementById("prodName").value = "";
    document.getElementById("prodPrice").value = "";
    document.getElementById("prodQty").value = "1";
  } else {
    alert("من فضلك أدخل بيانات صحيحة");
  }
}

function renderCart() {
  const body = document.getElementById("billBody");
  body.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item) => {
    grandTotal += item.total;
    body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.total.toFixed(2)}</td>
                <td><button onclick="removeItem(${item.id})" style="background:none; color:red; width:auto;">❌</button></td>
            </tr>
        `;
  });

  document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}

function bills() {
  const body = document.getElementById("tableBody1");
  body.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item) => {
    grandTotal += item.total;
    const today = new Date(); // Creates current date object
    body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.total.toFixed(2)}</td>
                <td>${today.toDateString()}</td>
            </tr>
        `;
  });
}




function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveAndRender();
}

function clearCart() {
  if (confirm("هل تريد مسح الفاتورة بالكامل؟")) {
    cart = [];
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("myCart", JSON.stringify(cart));
  renderCart();
  bills();
}
