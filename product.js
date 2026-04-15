// ضع هنا الرابط الذي حصلت عليه من الخطوة السابقة
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxVQJr0vcq8Vx7ekMlInFBv_mrvpI4gwQI9DoOQ6Db3XXahX_C8HYrZHIQVVXrW8p_ZCQ/exec";

async function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let count = document.getElementById("count").value;
  let old_price = document.getElementById("old_price").value;
  let profit = old_price - price / count;

  if (name === "" || price === "" || count === "" || old_price === "") {
    alert("برجاء ملء كافة الحقول");
    return;

  }

  let product = { name, price, old_price, count, profit };

  // 1. إرسال البيانات إلى Google Sheets
  try {
    // إظهار تنبيه بسيط للمستخدم أثناء التحميل
    console.log("جاري الحفظ في جوجل شيت...");

    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // ضرورية لتجنب مشاكل CORS مع تطبيقات جوجل
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });


    alert("تم إضافة المنتج بنجاح في الموقع وجوجل شيت!");
  } catch (error) {
    console.error("خطأ في الاتصال:", error);
    alert("حدث خطأ أثناء الاتصال بقاعدة البيانات");
  }

  if (name === "" || price === "" || count === "" || old_price === "") {
    alert("Please fill all fields");
    return;
  }
  if (editIndex === null) {
    // ➕ ADD
    products.push(product);
  } else {
    // ✏️ UPDATE
    products[editIndex] = product;
    editIndex = null;

    document.getElementById("submitBtn").innerText = "Add Product";
  }

  saveToLocalStorage();
  displayProducts();
}


let products = [];
// 🔄 Load data from LocalStorage when page opens
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}


// 💾 Save to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// 📋 Display Products
function displayProducts(list = products) {
  let table = "";

  list.forEach((product, index) => {
    table += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.old_price}</td>
        <td class ='count'>${product.count}</td>
        <td>${(product.old_price - product.price) * product.count}</td>
        <td>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
        <td><button onclick="prepareEdit(${index})" class="edit-btn"><i class="fas fa-edit"></i></button></td>
    `;
  });

  document.getElementById("tableBody").innerHTML = table;
}





// 🔍 Search Product
function searchProduct() {
  let searchValue = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue),
  );

  displayProducts(filtered);
}



function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage();
  displayProducts();
}




let editIndex = null;
function prepareEdit(index) {
  let product = products[index];

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("count").value = product.count;
  document.getElementById("old_price").value = product.old_price;

  editIndex = index;

  document.getElementById("submitBtn").innerText = "Update Product";
}
