let products = [];
// 🔄 Load data from LocalStorage when page opens
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

// ➕ Add Product
function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let count = document.getElementById("count").value;

  if (name === "" || price === "" || count === "") {
    alert("Please fill all fields");
    return;
  }

  let product = { name, price, count };
  products.push(product);

  saveToLocalStorage();
  clearInputs();
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
        <td class ='count'>${product.count}</td>
        <td>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
              <td>
          <button class="plus" onclick = 'plus1()'>+</button>
        </td>
              <td>
          <button class="minus">-</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("tableBody").innerHTML = table;
}

// ❌ Delete Product
function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage();
  displayProducts();
}

// plus count

let count1 = document.querySelector(".count");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");

function plus1() {
  let count1 = document.querySelector(".count");
  count1.innerHTML = `${+count1.innerHTML + 1}`
}

// 🔍 Search Product
function searchProduct() {
  let searchValue = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue),
  );

  displayProducts(filtered);
}

// 🧹 Clear Inputs
function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("count").value = "";
}
