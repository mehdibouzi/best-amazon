// scripts.js

// تغيير خلفية الرأس تلقائيًا
const images = [
    'https://th.bing.com/th/id/R.7592a79bceda3705e588e05dfe250000?rik=7mD1jHlEiwoa9g&riu=http%3a%2f%2fa.abcnews.com%2fimages%2fBusiness%2fgty_amazon_walmart_wg_150715_12x5_1600.jpg&ehk=p6uxLPiekubwEb%2b%2bOEHF9CKazYM8Buh61IcFXS0I6lw%3d&risl=&pid=ImgRaw&r=0',
    'https://api.time.com/wp-content/uploads/2014/11/127515379.jpg',
    'https://images8.alphacoders.com/138/thumb-1920-1388603.jpg',
    'https://www.wkrg.com/wp-content/uploads/sites/49/2020/03/b106badd76904fed9450d76ac91a27b7.jpg?w=876&h=493&crop=1',
    'https://www.techspot.com/images2/news/bigimage/2020/09/2020-09-01-image-8-j_1100.webp'
];

let currentIndex = 0;

function changeBackground() {
    const header = document.querySelector('header');
    header.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackground, 10000);
changeBackground();

// تحميل المنتجات
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="rating">
                <div class="stars">
                    <span data-rating="1">★</span>
                    <span data-rating="2">★</span>
                    <span data-rating="3">★</span>
                    <span data-rating="4">★</span>
                    <span data-rating="5">★</span>
                </div>
                <span>(${product.reviews} reviews)</span>
            </div>
            <a href="${product.link}" target="_blank">Shop Now</a>
            <div class="reviews">
                ${product.userReviews ? product.userReviews.map(review => `<p>${review.rating} ★ - ${review.comment}</p>`).join('') : ''}
            </div>
        `;
        productsContainer.appendChild(productElement);

        const stars = productElement.querySelectorAll('.stars span');
        stars.forEach((star) => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                addReview(product.id, rating);
            });
        });
    });
}

// إضافة تقييم
function addReview(productId, rating) {
    const comment = prompt("Please enter your review comment:");
    if (comment) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id === productId);
        if (product) {
            if (!product.userReviews) {
                product.userReviews = [];
            }
            product.userReviews.push({
                rating: rating,
                comment: comment,
            });
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            alert('Review added successfully!');
        }
    }
}

// تحميل المنتجات عند فتح الصفحة
window.onload = loadProducts;
<script src="scripts.js"></script>
<button id="loadMore" style="display: none;">Load More</button>
let visibleProducts = 4; // عدد المنتجات المعروضة في البداية
const loadMoreButton = document.getElementById('loadMore');

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    const visibleItems = products.slice(0, visibleProducts);
    visibleItems.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="rating">
                <div class="stars">
                    <span data-rating="1">★</span>
                    <span data-rating="2">★</span>
                    <span data-rating="3">★</span>
                    <span data-rating="4">★</span>
                    <span data-rating="5">★</span>
                </div>
                <span>(${product.reviews} reviews)</span>
            </div>
            <a href="${product.link}" target="_blank">Shop Now</a>
        `;
        productsContainer.appendChild(productElement);
    });

    if (visibleProducts < products.length) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }
}

loadMoreButton.addEventListener('click', () => {
    visibleProducts += 4; // زيادة عدد المنتجات المعروضة
    loadProducts();
});

window.onload = loadProducts;
function addReview(productId, rating) {
    const comment = prompt("Please enter your review comment:");
    if (comment) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id === productId);
        if (product) {
            if (!product.userReviews) {
                product.userReviews = [];
            }
            product.userReviews.push({
                rating: rating,
                comment: comment,
            });
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            alert('Review added successfully!');
        }
    }
}