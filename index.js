const data = [
    {
        "product": "1",
        "retail-price": "58.00",
        "price": "39.95",
        "subscribe-price": "35.95",
        "link": "www.tracker.com/link-1",
        "subscribe-link": "www.tracker.com/subscribe-link-1"
    },
    {
        "product": "3",
        "retail-price": "174.00",
        "price": "102.00",
        "subscribe-price": "91.80",
        "link": "www.tracker.com/link-3",
        "subscribe-link": "www.tracker.com/subscribe-link-3"
    },
    {
        "product": "6",
        "retail-price": "348.00",
        "price": "186.00",
        "subscribe-price": "167.40",
        "link": "www.tracker.com/link-6",
        "subscribe-link": "www.tracker.com/subscribe-link-6"
    }
];


let productsButtons = document.querySelectorAll('.button-group-quantity input');
let subscribeBtn = document.querySelector('.button-group-agreement-subscribe');
let acceptTerms = document.querySelector('.accept-terms');
let acceptTermsCheckbox = document.querySelector('.accept-terms-checkbox')
let oneTimePurchase = document.querySelector('.button-group-agreement-purchase');
let submitBtn = document.querySelector('.form-submit-button');
let form = document.querySelector('.form')
let selectedProduct;

window.addEventListener('load', function() {
    handleImagesDisplay(1);
    handleProductInfo(data[0]);
    productsButtons[0].classList.add('active');
    oneTimePurchase.classList.add('active');
    selectedProduct = data[0];
});

/**
 * handle products button group 1,3,6 + inserting right data
 */
for(let i = 0; i < productsButtons.length; i++) {
    productsButtons[i].addEventListener('click', () => {
        let currentProductInfo = data[i];
        handleProductInfo(currentProductInfo, subscribeBtn.classList.contains('active') ? true : false)
        handleImagesDisplay(Number(currentProductInfo.product));
        selectedProduct = data[i];
        productsButtons.forEach(elem => {elem.classList.remove("active")})  
        productsButtons[i].classList.add('active');
        acceptTermsCheckbox.checked = false;
        toggleSubmitBtnDisable(subscribeBtn.classList.contains('active') ? true : false)
    })
}

subscribeBtn.addEventListener('click', (event) => {
    acceptTerms.style.display = 'block';
    submitBtn.disabled = true;
    handleProductInfo(selectedProduct, true)
    event.target.classList.add('active')
    oneTimePurchase.classList.remove('active');
});

oneTimePurchase.addEventListener('click', (event) => {
    acceptTerms.style.display = 'none';
    acceptTermsCheckbox.checked = false;
    submitBtn.disabled = false;
    handleProductInfo(selectedProduct, false)
    event.target.classList.add('active');
    subscribeBtn.classList.remove('active');
});

acceptTermsCheckbox.addEventListener('click', () => {
    toggleSubmitBtnDisable(!acceptTermsCheckbox.checked)
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let url = selectedProduct["link"];
    if(subscribeBtn.classList.contains('active')) {
        url = selectedProduct["subscribe-link"];
    }
    window.open("//" + url, "_blank");
    return false;
})

/**
 * display image quantity by value
 * @param {*} value 
 */
function handleImagesDisplay(value) {
    let imageContainer = document.querySelector('.images-container');
    imageContainer.innerHTML = '';
    for(let i = 0; i < value; i++) {
        let oImg = document.createElement("img");
        oImg.setAttribute('src', 'assets/dermal-repair-2.png');
        oImg.setAttribute('alt', 'Dermal Repair ' + i);
        imageContainer.appendChild(oImg);
    }
    if(value !== 1) {
        let svg = document.createElement("object");
        svg.setAttribute('data', 'assets/stamp-1.svg');
        svg.setAttribute('type', 'image/svg+xml');
        svg.setAttribute('class', 'images-container-stamp ' + 'stamp-' + value.toString());
        let svgText = document.createElement("span");
        svgText.setAttribute('class', 'images-container-stamp-text ' + 'text-' + value.toString());
        if(value === 3) {
            svgText.innerHTML = "Best Seller";
        }else if(value === 6) {
            svgText.innerHTML = "Best Value";
        }
        
        imageContainer.appendChild(svg);
        imageContainer.appendChild(svgText);
    }
}

/**
 * calculate prices + info to display
 * @param {*} product 
 * @param {*} subscribe 
 */
function handleProductInfo(product, subscribe) {
    let productPrice = document.querySelector('.product-info-price');
    let productRetailPrice = document.querySelector('.product-info-retail-price');
    let productInstantSaving = document.querySelector('.product-info-instant-saving');

    if(subscribe) {
        productPrice.innerHTML = `<span>${formatter().format(Number(product['subscribe-price']))}</span>`;
        productInstantSaving.innerHTML = 'Instant Savings ' + `<span>${formatter().format(Number(product["retail-price"]) - Number(product['subscribe-price']))}</span>`;
    }else {
        productPrice.innerHTML = `<span>${formatter().format(Number(product.price))}</span>`;
        productInstantSaving.innerHTML = 'Instant Savings ' + `<span>${formatter().format(Number(product["retail-price"]) - Number(product.price))}</span>`;
    }
    productRetailPrice.innerHTML = 'Retail Price ' + `<span>${formatter().format(Number(product["retail-price"]))}</span>`;
}

function toggleSubmitBtnDisable(bool) {
    submitBtn.disabled = bool;
}

/**
 * format for prices + currency
 * @returns format
 */
function formatter() {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}