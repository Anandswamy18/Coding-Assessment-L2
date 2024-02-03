async function fetchProductCatalog() {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product catalog:', error);
    return null;
  }
}

function displayProducts(categoryName, products) {
  const categoryElement = document.getElementById(`${categoryName}Products`);
  if (!categoryElement) return;



  products.forEach(product => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    const discountedPrice = Math.round(parseFloat(product.price) * 0.5);
    productContainer.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p id="price">Rs${discountedPrice}</p>
        <p id="vendor">.${product.vendor}</p>
        ${product.badge_text ? `<p id="badge">${product.badge_text}</p>` : ''}
        <s>${product.price} </s>
         <pre>  50% Off</pre>
         <button id="bt">Add to Cart</button>
        
        `;
    categoryElement.appendChild(productContainer);
  });
}


function hideAllProducts() {
  const categories = ['Men', 'Women', 'Kids'];
  categories.forEach(categoryName => {
    const categoryElement = document.getElementById(`${categoryName}Products`);
    if (categoryElement) {
      categoryElement.textContent = '';
    }
  });
}

function setupCategorySelection() {
  const menBlock = document.querySelector('.men-block');
  const womenBlock = document.querySelector('.women-block');
  const kidsBlock = document.querySelector('.kids-block');

  menBlock.addEventListener('click', () => {
    hideAllProducts();
    fetchAndDisplayProducts('Men');




  });

  womenBlock.addEventListener('click', () => {
    hideAllProducts();
    fetchAndDisplayProducts('Women');


  });

  kidsBlock.addEventListener('click', () => {
    hideAllProducts();
    fetchAndDisplayProducts('Kids');

  });
}

async function fetchAndDisplayProducts(categoryName) {
  const productCatalog = await fetchProductCatalog();
  if (productCatalog) {
    const category = productCatalog.categories.find(category => category.category_name.toLowerCase() === categoryName.toLowerCase());
    if (category) {
      displayProducts(categoryName, category.category_products);
    }
  } else {
    console.log('Failed to fetch product catalog.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setupCategorySelection();
});

