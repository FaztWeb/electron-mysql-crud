const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");

let window;

const createProduct = async (product) => {
  try {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO product SET ?", product);
    product.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "New Product Saved Successfully",
    }).show();

    // Return the created Product
    return product;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM product ORDER BY id DESC");
  return results;
};

const deleteProduct = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM product WHERE id = ?", id);
  return result;
};

const getProductById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM product WHERE id = ?", id);
  return result[0];
};

const updateProduct = async (id, product) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE product SET ? WHERE Id = ?", [
    product,
    id,
  ]);
  console.log(result)
};

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
};
