// import device from 'current-device';

// Components
import "./filter.js";
import "./fetchProducts.js";

// Global
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.body.classList.add("ios-device");
}
