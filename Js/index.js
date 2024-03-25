var productName = document.getElementById("pn");
var productPrice = document.getElementById("pp");
var productCategory = document.getElementById("pc");
var productDesc = document.getElementById("pd");
var allProducts = [];
var kobry = 0;

if (localStorage.getItem("allProducts") != null) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  displayAllProducts();
}

function addNewElement() {
  if (document.getElementById("addBtn").innerHTML == "Add") {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    allProducts.push(product);
    console.log(allProducts);
    console.log(product);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    clearForm();
    displayAllProducts();
  } else {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    allProducts.splice(kobry, 1, product);
    displayAllProducts();
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    document.getElementById("addBtn").innerHTML = "Add";
    clearForm();
  }
}

function clearForm() {
  (productName.value = ""),
    (productPrice.value = ""),
    (productCategory.value = ""),
    (productDesc.value = "");
}

function displayAllProducts() {
  var cartoona = "";

  for (var i = 0; i < allProducts.length; i++) {
    cartoona += ` <tr>
        <td>${allProducts[i].name} </td>
        <td>${allProducts[i].price} </td>
        <td> ${allProducts[i].category}  </td>
        <td>${allProducts[i].desc}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartoona;
}

function deleteProduct(index) {
  allProducts.splice(index, 1);
  displayAllProducts();
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}

function search() {
  var term = document.getElementById("search").value;
  var cartoona = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().indexOf(term) == 0) {
      cartoona += ` <tr>
                <td>${allProducts[i].name} </td>
                <td>${allProducts[i].price} </td>
                <td> ${allProducts[i].category}  </td>
                <td>${allProducts[i].desc}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
            </tr>`;
    }
    document.getElementById("tbody").innerHTML = cartoona;
  }
}

function updateProduct(index) {
  kobry = index;
  productName.value = allProducts[index].name;
  productPrice.value = allProducts[index].price;
  productCategory.value = allProducts[index].category;
  productDesc.value = allProducts[index].desc;

  document.getElementById("addBtn").innerHTML = "Edit";
}
