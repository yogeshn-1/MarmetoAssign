async function fetchProducts() {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  products = await response.json();
  console.log(products);
  productCategories = await products.categories;
  console.log(products);
  selectProducts("Men");
}

async function displayProducts(items) {
  const container = document.querySelector(".product-container");
  container.innerHTML = "";
  console.log("In display products");
  console.log(items);
  items.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("class", "card");
    div.innerHTML = `
    ${
      item.badge_text !== null
        ? `<span class="badge">${item.badge_text}</span>`
        : ""
    }
    <img src=${item.image} width="220px" height="280px">
    <div style="display: flex;gap:7px">
        <h3 class=product_name>${item.title}</h3>
        <p style="font-size: small;align-self:flex-end;"> &#149; ${
          item.vendor
        }</p>
    </div>
    <div style="display:flex;gap:10px">
        <p>Rs ${item.price}</p>
        <p class="compare_price">${item.compare_at_price}</p>
        <p style="color:red">50% off</p>
    </div>
    <button>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function selectProducts(category) {
  console.log(productCategories);
  const filteredProducts = productCategories.filter(
    (product) => product.category_name === category
  );
  console.log(filteredProducts);
  showProduct = filteredProducts[0].category_products;
  displayProducts(showProduct);
}

fetchProducts();
