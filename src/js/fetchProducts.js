import { truncateText } from "./utils.js";
import axios from "axios";

const fetchProductUrl = "https://dummyjson.com/products?limit=4";
const productListingGrid = document.querySelector(".js-product-listing-grid");

// Fetch data
async function fetchProducts(dataUrl) {
  try {
    const response = await axios.get(dataUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

// Generate product stars rating
function createProductRating(rating) {
  const ratingRoundFull = Math.round(rating);
  let ratingElements = ``;

  for (let i = 0; i < 5; i++) {
    const color = i < ratingRoundFull ? "#52B480FF" : "#dfdfdf";
    ratingElements += `
      <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 21.825L6.12962 26.2305C5.75732 26.4389 5.31184 26.1153 5.39498 25.6968L7.15252 16.85L0.529667 10.726C0.216401 10.4363 0.38654 9.91258 0.810238 9.86233L9.76752 8.8L13.546 0.609201C13.7247 0.221792 14.2753 0.221791 14.454 0.609201L18.2325 8.8L27.1898 9.86233C27.6135 9.91258 27.7836 10.4363 27.4704 10.726L20.8475 16.85L22.6051 25.6968C22.6882 26.1153 22.2427 26.4389 21.8704 26.2305L14 21.825Z"
          fill="${color}"
        />
      </svg>`;
  }

  return ratingElements;
}

// Generate product card html
function createProductCard(product) {
  const productRating = product.rating;
  const ratingElements = createProductRating(productRating);

  const productCard = document.createElement("article");

  productCard.className = "product-card";
  productCard.setAttribute("itemscope", "");
  productCard.setAttribute("itemtype", "http://schema.org/Product");
  productCard.innerHTML = `
    <div class="product-card__img">
      <a
        href="https://designdev.cz/"
        class="product-card__img-link"
      >
        <picture>
          <source
            type="image/avif"
            srcset="assets/img/product-card/product-1.avif"
          />
          <source
            type="image/webp"
            srcset="assets/img/product-card/product-1.webp"
          />
          <img
            src="assets/img/product-card/product-1.png"
            loading="lazy"
            alt="Product name"
            title="Product name"
            width="278"
            height="278"
            itemprop="image"
          />
        </picture>
      </a>
    </div>
   
    <div class="product-card__info">
      <!-- Title start -->
      <h3 class="product-card__title" itemprop="name">
        <a
          href="https://designdev.cz/"
          class="product-card__title-link"
          >${product.title}</a
        >
      </h3>
    
      <p class="product-card__description" itemprop="description">
        ${truncateText(product.description, 35)}
      </p>
     
      <div
        class="product-card__rating"
        itemscope
        itemtype="http://schema.org/AggregateRating"
      >
        <a
          href="https://designdev.cz#rating-section"
          class="product-card__rating-grid"
          aria-label="Rating of 4.8 out of 5"
        >
         ${ratingElements}
        </a>
        <span
          class="product-card__rating-rate"
          itemprop="ratingValue"
          >${product.rating}</span
        >
        <meta itemprop="bestRating" content="5" />
        <meta itemprop="ratingCount" content="12" />
      </div>
    
      <div class="product-card__reviews">
        <a
          href="https://designdev.cz#review-section"
          class="product-card__reviews-link"
          itemprop="reviewCount"
          >${product.reviews.length} reviews</a
        >
      </div>
     
      <div class="product-card__price">
        <strong
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/Offer"
        >
          <span itemprop="priceCurrency" content="USD">$</span>
          <span itemprop="price" content="49.90">${product.price}</span>
        </strong>
      </div>
     
      <div class="product-card__cta">
        <button type="button" class="product-card__cta-button">
          Add to Cart
        </button>
      </div>
  
    </div>          
  `;
  return productCard;
}

// Render products cards
async function renderProductCards(apiUrl, renderContainer) {
  try {
    const { limit, products, skip, total } = await fetchProducts(apiUrl);
    const productGridListing = renderContainer;

    // SetTimeout only for demo
    setTimeout(() => {
      productGridListing.innerHTML = "";
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productGridListing.appendChild(productCard);
      });
    }, 2000);
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (productListingGrid) {
    renderProductCards(fetchProductUrl, productListingGrid);
  }
});
