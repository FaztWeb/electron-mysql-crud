const { remote } = require("electron");
const main = remote.require("./main");

const productForm = document.querySelector("#productForm");
const productName = document.querySelector("#name");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productsList = document.querySelector("#products");

let products = [];
let editingStatus = false;
let editProductId;

const deleteProduct = async (id) => {
  const response = confirm("Are you sure you want to delete it?");
  if (response) {
    await main.deleteProduct(id);
    await getProducts();
  }
  return;
};

const editProduct = async (id) => {
  const product = await main.getProductById(id);
  productName.value = product.name;
  productPrice.value = product.price;
  productDescription.value = product.description;

  editingStatus = true;
  editProductId = id;
};

productForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const product = {
      name: productName.value,
      price: productPrice.value,
      description: productDescription.value,
    };

    if (!editingStatus) {
      const savedProduct = await main.createProduct(product);
      console.log(savedProduct);
    } else {
      const productUpdated = await main.updateProduct(editProductId, product);
      console.log(productUpdated);

      // Reset
      editingStatus = false;
      editProductId = "";
    }

    productForm.reset();
    productName.focus();
    getProducts();
  } catch (error) {
    console.log(error);
  }
});

function renderProducts(tasks) {
  productsList.innerHTML = "";
  tasks.forEach((t) => {
    productsList.innerHTML += `
      <div class="card card-body my-2 animated fadeInLeft">
        <h4>${t.name}</h4>
        <p>${t.description}</p>
        <h3>${t.price}$</h3>
        <p>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editProduct('${t.id}')">
          EDIT 
        </button>
        </p>
      </div>
    `;
  });
}

const getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

async function init() {
  getProducts();
}

init();
