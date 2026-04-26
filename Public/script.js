// ========== LANGUAGE TRANSLATIONS ==========
const translations = {
  en: {
    logoText: "MarketPlace",
    searchPlaceholder: "Search for cars, phones, furniture...",
    loginBtn: "Login",
    registerBtn: "Register",
    postAdBtn: "Post Ad",
    myAdsBtn: "My Ads",
    favoritesBtn: "Favorites",
    messagesBtn: "Messages",
    logoutBtn: "Logout",
    adminBtn: "Admin",
    catAll: "All",
    catElectronics: "Electronics",
    catFurniture: "Furniture",
    catCars: "Cars",
    catFashion: "Fashion",
    catOther: "Other",
    pageTitle: "Latest ads",
    myAdsTitle: "My Ads",
    favoritesTitle: "My Favorites",
    messagesTitle: "Messages",
    filterToggleText: "Advanced Filters",
    minPriceLabel: "Min Price",
    maxPriceLabel: "Max Price",
    conditionLabel: "Condition",
    sortLabel: "Sort By",
    applyFiltersText: "Apply Filters",
    clearFiltersText: "Clear",
    sortNewest: "Newest",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortPopular: "Most Popular",
    conditionAll: "All",
    conditionNew: "New",
    conditionLikeNew: "Like New",
    conditionUsed: "Used",
    conditionOld: "Old",
    loginModalTitle: "Login",
    loginEmailPlaceholder: "Email",
    loginPasswordPlaceholder: "Password",
    loginBtnModal: "Login",
    registerModalTitle: "Create Account",
    regUsernamePlaceholder: "Username *",
    regEmailPlaceholder: "Email *",
    regPasswordPlaceholder: "Password *",
    regWhatsappPlaceholder: "WhatsApp Number (Optional)",
    whatsappHelpText: "This will be used as default for your ads",
    regShopNamePlaceholder: "Shop Name (Optional)",
    registerBtnModal: "Register",
    postAdModalTitle: "Post a free ad",
    adTitlePlaceholder: "Title *",
    adPricePlaceholder: "Price (USD) *",
    adLocationPlaceholder: "Location *",
    adWhatsappPlaceholder: "WhatsApp Number (with country code) *",
    whatsappRequiredText: "Buyers will contact you via WhatsApp",
    adShopNamePlaceholder: "Shop Name (Optional)",
    shopOptionalText: "Leave empty if you're an individual seller",
    locationBtnText: "Use My Current Location",
    adDescPlaceholder: "Description",
    conditionNewOption: "New",
    conditionLikeNewOption: "Like New",
    conditionUsedOption: "Used",
    conditionOldOption: "Old",
    imageHelpText: "📸 Up to 5 images - Hold Ctrl to select multiple",
    postBtnText: "Post Ad",
    cancelBtnText: "Cancel",
    cancelBtnText2: "Cancel",
    cancelBtnText3: "Cancel",
    closeBtnText: "Close",
    closeChatText: "Close",
    closeFavoritesText: "Close",
    chatBtnText: "Chat on WhatsApp",
    footerText: "© 2025 MarketPlace — Buy & Sell safely",
    installTitle: "Install MarketPlace",
    installSubtitle: "Add to home screen for easy access",
    installBtnText: "Install",
    noResults: "No ads found. Post your first ad!",
    noFavorites: "No favorites yet. Save ads you like!",
    noConversations: "No conversations yet. Start chatting with sellers!",
    registrationSuccess: "Registration successful!",
    loginSuccess: "Login successful!",
    logoutSuccess: "Logged out successfully",
    postSuccess: "Ad posted successfully! Waiting for admin approval.",
    addedToFavorites: "Added to favorites!",
    removedFromFavorites: "Removed from favorites",
    messageSent: "Message sent!",
    whatsappRequired: "Please provide a WhatsApp number",
    imageRequired: "Please select at least one image",
    maxImages: "Maximum 5 images allowed",
    fillRequired: "Please fill title, price, and location",
    deleteConfirm: "Delete this ad?",
    locationDetected: "📍 Location detected!",
    locationError: "Unable to get location",
    noWhatsapp: "No WhatsApp number provided",
    typeMessage: "Type your message...",
    send: "Send",
    minPricePlaceholder: "Min",
    maxPricePlaceholder: "Max",
    loadingText: "Loading..."
  },
  fa: {
    logoText: "بازارچه",
    searchPlaceholder: "جستجوی موتر، موبایل، مبلمان...",
    loginBtn: "ورود",
    registerBtn: "ثبت نام",
    postAdBtn: "ثبت آگهی",
    myAdsBtn: "آگهی‌های من",
    favoritesBtn: "علاقه‌مندی‌ها",
    messagesBtn: "پیام‌ها",
    logoutBtn: "خروج",
    adminBtn: "مدیریت",
    catAll: "همه",
    catElectronics: "الکترونیک",
    catFurniture: "مبلمان",
    catCars: "موتر",
    catFashion: "مد و لباس",
    catOther: "سایر",
    pageTitle: "آخرین آگهی‌ها",
    myAdsTitle: "آگهی‌های من",
    favoritesTitle: "علاقه‌مندی‌های من",
    messagesTitle: "پیام‌ها",
    filterToggleText: "فیلترهای پیشرفته",
    minPriceLabel: "حداقل قیمت",
    maxPriceLabel: "حداکثر قیمت",
    conditionLabel: "وضعیت",
    sortLabel: "مرتب سازی",
    applyFiltersText: "اعمال فیلترها",
    clearFiltersText: "پاک کردن",
    sortNewest: "جدیدترین",
    sortPriceLow: "ارزانترین",
    sortPriceHigh: "گرانترین",
    sortPopular: "محبوبترین",
    conditionAll: "همه",
    conditionNew: "نو",
    conditionLikeNew: "مثل نو",
    conditionUsed: "استفاده شده",
    conditionOld: "قدیمی",
    loginModalTitle: "ورود",
    loginEmailPlaceholder: "ایمیل",
    loginPasswordPlaceholder: "رمز عبور",
    loginBtnModal: "ورود",
    registerModalTitle: "ایجاد حساب",
    regUsernamePlaceholder: "نام کاربری *",
    regEmailPlaceholder: "ایمیل *",
    regPasswordPlaceholder: "رمز عبور *",
    regWhatsappPlaceholder: "شماره واتساپ (اختیاری)",
    whatsappHelpText: "این شماره برای آگهی‌های شما استفاده خواهد شد",
    regShopNamePlaceholder: "نام فروشگاه (اختیاری)",
    registerBtnModal: "ثبت نام",
    postAdModalTitle: "ثبت آگهی جدید",
    adTitlePlaceholder: "عنوان *",
    adPricePlaceholder: "قیمت (دالر) *",
    adLocationPlaceholder: "موقعیت *",
    adWhatsappPlaceholder: "شماره واتساپ (با کد کشور) *",
    whatsappRequiredText: "مشتریان از طریق واتساپ با شما تماس می‌گیرند",
    adShopNamePlaceholder: "نام فروشگاه (اختیاری)",
    shopOptionalText: "در صورت فروشنده خصوصی بودن خالی بگذارید",
    locationBtnText: "استفاده از موقعیت فعلی من",
    adDescPlaceholder: "توضیحات",
    conditionNewOption: "نو",
    conditionLikeNewOption: "مثل نو",
    conditionUsedOption: "استفاده شده",
    conditionOldOption: "قدیمی",
    imageHelpText: "📸 حداکثر 5 تصویر - برای انتخاب چندین تصویر کلید Ctrl را نگه دارید",
    postBtnText: "ثبت آگهی",
    cancelBtnText: "انصراف",
    cancelBtnText2: "انصراف",
    cancelBtnText3: "انصراف",
    closeBtnText: "بستن",
    closeChatText: "بستن",
    closeFavoritesText: "بستن",
    chatBtnText: "چت در واتساپ",
    footerText: "© 2025 بازارچه — خرید و فروش امن",
    installTitle: "نصب بازارچه",
    installSubtitle: "به صفحه اصلی اضافه کنید برای دسترسی آسان",
    installBtnText: "نصب",
    noResults: "آگهی یافت نشد. اولین آگهی خود را ثبت کنید!",
    noFavorites: "هنوز علاقه‌مندی ندارید!",
    noConversations: "هنوز گفتگویی ندارید!",
    registrationSuccess: "ثبت نام موفق!",
    loginSuccess: "ورود موفق!",
    logoutSuccess: "خروج موفق",
    postSuccess: "آگهی با موفقیت ثبت شد! در انتظار تایید مدیر.",
    addedToFavorites: "به علاقه‌مندی‌ها اضافه شد!",
    removedFromFavorites: "از علاقه‌مندی‌ها حذف شد",
    messageSent: "پیام ارسال شد!",
    whatsappRequired: "لطفاً شماره واتساپ خود را وارد کنید",
    imageRequired: "لطفاً حداقل یک تصویر انتخاب کنید",
    maxImages: "حداکثر 5 تصویر مجاز است",
    fillRequired: "لطفاً عنوان، قیمت و موقعیت را پر کنید",
    deleteConfirm: "حذف این آگهی؟",
    locationDetected: "📍 موقعیت شما پیدا شد!",
    locationError: "عدم دسترسی به موقعیت",
    noWhatsapp: "شماره واتساپ ارائه نشده است",
    typeMessage: "پیام خود را بنویسید...",
    send: "ارسال",
    minPricePlaceholder: "حداقل",
    maxPricePlaceholder: "حداکثر",
    loadingText: "در حال بارگذاری..."
  }
};

let currentLanguage = localStorage.getItem('language') || 'fa';
let token = localStorage.getItem('token');
let currentUser = null;
let currentCategory = 'all';
let currentSearch = '';
let showingMyAds = false;
let showingFavorites = false;
let currentFilters = { minPrice: '', maxPrice: '', condition: 'all', sort: 'newest' };

// ========== LANGUAGE FUNCTION ==========
function applyLanguage() {
  const t = translations[currentLanguage];
  if (!t) return;
  
  // Set HTML direction and language
  const htmlTag = document.getElementById('htmlTag');
  if (htmlTag) {
    htmlTag.setAttribute('dir', currentLanguage === 'fa' ? 'rtl' : 'ltr');
    htmlTag.setAttribute('lang', currentLanguage === 'fa' ? 'fa' : 'en');
  }
  
  // Update ALL text elements
  const textElements = {
    'logoText': t.logoText,
    'loginBtnText': t.loginBtn,
    'registerBtnText': t.registerBtn,
    'postAdBtnText': t.postAdBtn,
    'myAdsBtnText': t.myAdsBtn,
    'favoritesBtnText': t.favoritesBtn,
    'messagesBtnText': t.messagesBtn,
    'logoutBtnText': t.logoutBtn,
    'adminBtnText': t.adminBtn,
    'catAll': t.catAll,
    'catElectronics': t.catElectronics,
    'catFurniture': t.catFurniture,
    'catCars': t.catCars,
    'catFashion': t.catFashion,
    'catOther': t.catOther,
    'pageTitle': t.pageTitle,
    'loginModalTitle': t.loginModalTitle,
    'loginBtnModal': t.loginBtnModal,
    'registerModalTitle': t.registerModalTitle,
    'registerBtnModal': t.registerBtnModal,
    'postAdModalTitle': t.postAdModalTitle,
    'postBtnText': t.postBtnText,
    'cancelBtnText': t.cancelBtnText,
    'cancelBtnText2': t.cancelBtnText2,
    'cancelBtnText3': t.cancelBtnText3,
    'closeBtnText': t.closeBtnText,
    'closeChatText': t.closeChatText,
    'closeFavoritesText': t.closeFavoritesText,
    'footerText': t.footerText,
    'installTitle': t.installTitle,
    'installSubtitle': t.installSubtitle,
    'installBtnText': t.installBtnText,
    'locationBtnText': t.locationBtnText,
    'chatBtnText': t.chatBtnText,
    'whatsappHelpText': t.whatsappHelpText,
    'whatsappRequiredText': t.whatsappRequiredText,
    'shopOptionalText': t.shopOptionalText,
    'imageHelpText': t.imageHelpText,
    'filterToggleText': t.filterToggleText,
    'minPriceLabel': t.minPriceLabel,
    'maxPriceLabel': t.maxPriceLabel,
    'conditionLabel': t.conditionLabel,
    'sortLabel': t.sortLabel,
    'applyFiltersText': t.applyFiltersText,
    'clearFiltersText': t.clearFiltersText,
    'favoritesModalTitle': t.favoritesTitle,
    'chatModalTitle': t.messagesTitle,
    'conditionNewOption': t.conditionNew,
    'conditionLikeNewOption': t.conditionLikeNew,
    'conditionUsedOption': t.conditionUsed,
    'conditionOldOption': t.conditionOld,
    'loadingText': t.loadingText
  };
  
  for (const [id, text] of Object.entries(textElements)) {
    const element = document.getElementById(id);
    if (element) element.innerText = text;
  }
  
  // Update placeholders
  const placeholders = {
    'searchInput': t.searchPlaceholder,
    'loginEmail': t.loginEmailPlaceholder,
    'loginPassword': t.loginPasswordPlaceholder,
    'regUsername': t.regUsernamePlaceholder,
    'regEmail': t.regEmailPlaceholder,
    'regPassword': t.regPasswordPlaceholder,
    'regWhatsapp': t.regWhatsappPlaceholder,
    'regShopName': t.regShopNamePlaceholder,
    'adTitle': t.adTitlePlaceholder,
    'adPrice': t.adPricePlaceholder,
    'adLocation': t.adLocationPlaceholder,
    'adWhatsapp': t.adWhatsappPlaceholder,
    'adShopName': t.adShopNamePlaceholder,
    'adDesc': t.adDescPlaceholder,
    'messageInput': t.typeMessage,
    'minPrice': t.minPricePlaceholder,
    'maxPrice': t.maxPricePlaceholder
  };
  
  for (const [id, placeholder] of Object.entries(placeholders)) {
    const element = document.getElementById(id);
    if (element) element.placeholder = placeholder;
  }
  
  // Update category buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (cat === 'all') btn.innerText = t.catAll;
    else if (cat === 'Electronics') btn.innerText = t.catElectronics;
    else if (cat === 'Furniture') btn.innerText = t.catFurniture;
    else if (cat === 'Cars') btn.innerText = t.catCars;
    else if (cat === 'Fashion') btn.innerText = t.catFashion;
    else if (cat === 'Other') btn.innerText = t.catOther;
  });
  
  // Update filter selects
  const conditionSelect = document.getElementById('conditionFilter');
  if (conditionSelect) {
    for (let i = 0; i < conditionSelect.options.length; i++) {
      const opt = conditionSelect.options[i];
      if (opt.value === 'all') opt.text = t.conditionAll;
      else if (opt.value === 'new') opt.text = t.conditionNew;
      else if (opt.value === 'like-new') opt.text = t.conditionLikeNew;
      else if (opt.value === 'used') opt.text = t.conditionUsed;
      else if (opt.value === 'old') opt.text = t.conditionOld;
    }
  }
  
  const sortSelect = document.getElementById('sortFilter');
  if (sortSelect) {
    for (let i = 0; i < sortSelect.options.length; i++) {
      const opt = sortSelect.options[i];
      if (opt.value === 'newest') opt.text = t.sortNewest;
      else if (opt.value === 'price_low') opt.text = t.sortPriceLow;
      else if (opt.value === 'price_high') opt.text = t.sortPriceHigh;
      else if (opt.value === 'popular') opt.text = t.sortPopular;
    }
  }
  
  // Update category options in post ad modal
  const catOptions = ['catElectronicsOption', 'catFurnitureOption', 'catCarsOption', 'catFashionOption', 'catOtherOption'];
  catOptions.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'catElectronicsOption') el.innerText = t.catElectronics;
      else if (id === 'catFurnitureOption') el.innerText = t.catFurniture;
      else if (id === 'catCarsOption') el.innerText = t.catCars;
      else if (id === 'catFashionOption') el.innerText = t.catFashion;
      else if (id === 'catOtherOption') el.innerText = t.catOther;
    }
  });
  
  // Update username display
  if (currentUser && currentUser.username) {
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) usernameDisplay.innerText = currentUser.username;
  }
  
  // Update page title based on view
  updatePageTitle();
}

function updatePageTitle() {
  const t = translations[currentLanguage];
  if (showingMyAds) {
    document.getElementById('pageTitle').innerText = t.myAdsTitle;
  } else if (showingFavorites) {
    document.getElementById('pageTitle').innerText = t.favoritesTitle;
  } else {
    document.getElementById('pageTitle').innerText = t.pageTitle;
  }
}

// Language switcher
const languageSwitcher = document.getElementById('languageSwitcher');
if (languageSwitcher) {
  languageSwitcher.value = currentLanguage;
  languageSwitcher.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('language', currentLanguage);
    applyLanguage();
    loadProducts();
  });
}

// ========== API FUNCTIONS ==========
const API_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token && !options.public) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toastNotification');
  if (toast) {
    toast.innerText = message;
    toast.style.backgroundColor = isError ? '#dc2626' : '#10b981';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }
}

// ========== PRODUCT FUNCTIONS ==========
async function loadProducts() {
  const loading = document.getElementById('loadingIndicator');
  if (loading) loading.style.display = 'flex';
  
  try {
    let url = `/products?category=${currentCategory}&limit=50`;
    if (currentSearch) url += `&search=${encodeURIComponent(currentSearch)}`;
    if (currentFilters.minPrice) url += `&minPrice=${currentFilters.minPrice}`;
    if (currentFilters.maxPrice) url += `&maxPrice=${currentFilters.maxPrice}`;
    if (currentFilters.condition && currentFilters.condition !== 'all') url += `&condition=${currentFilters.condition}`;
    
    const products = await fetchAPI(url, { public: true });
    let sorted = [...products];
    if (currentFilters.sort === 'price_low') sorted.sort((a, b) => a.price - b.price);
    else if (currentFilters.sort === 'price_high') sorted.sort((a, b) => b.price - a.price);
    else if (currentFilters.sort === 'popular') sorted.sort((a, b) => (b.favorite_count || 0) - (a.favorite_count || 0));
    
    renderProducts(sorted);
  } catch (error) {
    console.error(error);
    showToast('Error loading products', true);
  } finally {
    if (loading) loading.style.display = 'none';
  }
}

async function loadMyProducts() {
  try {
    const products = await fetchAPI('/my-products');
    renderProducts(products, true);
  } catch (error) {
    showToast('Please login first', true);
  }
}

async function loadFavorites() {
  try {
    const products = await fetchAPI('/favorites');
    renderProducts(products, true);
    document.getElementById('favoritesModal').style.display = 'flex';
  } catch (error) {
    showToast('Please login first', true);
  }
}

async function toggleFavorite(productId, buttonElement) {
  if (!token) {
    showToast('Please login first', true);
    return;
  }
  
  const isFavorited = buttonElement.classList.contains('favorited');
  const t = translations[currentLanguage];
  
  try {
    if (isFavorited) {
      await fetchAPI(`/favorites/${productId}`, { method: 'DELETE' });
      buttonElement.classList.remove('favorited');
      buttonElement.innerHTML = '<i class="far fa-heart"></i>';
      showToast(t.removedFromFavorites);
    } else {
      await fetchAPI(`/favorites/${productId}`, { method: 'POST' });
      buttonElement.classList.add('favorited');
      buttonElement.innerHTML = '<i class="fas fa-heart"></i>';
      showToast(t.addedToFavorites);
    }
  } catch (error) {
    showToast('Error', true);
  }
}

function renderProducts(products, showDelete = false) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  const t = translations[currentLanguage];
  document.getElementById('resultCount').innerText = `${products.length} ${t.catAll} found`;
  
  if (products.length === 0) {
    grid.innerHTML = `<div class="no-results">${t.noResults}</div>`;
    return;
  }
  
  grid.innerHTML = products.map(product => `
    <div class="card" data-id="${product.id}">
      <div class="card-img">
        ${product.images && product.images.length > 0 ? 
          `<img src="${API_URL.replace('/api', '')}${product.images[0]}" alt="${product.title}">` : 
          '<i class="fas fa-box fa-3x"></i>'
        }
        ${product.images && product.images.length > 1 ? 
          `<span class="image-count-badge">+${product.images.length-1}</span>` : ''
        }
        ${product.is_featured ? `<span class="featured-badge"><i class="fas fa-star"></i> ${t.featuredText || 'ویژه'}</span>` : ''}
        <button class="favorite-btn ${product.isFavorited ? 'favorited' : ''}" data-id="${product.id}">
          <i class="${product.isFavorited ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="card-content">
        <div class="price">$${product.price.toLocaleString()}</div>
        <div class="title">${escapeHtml(product.title)}</div>
        ${product.shop_name ? `<div class="shop-name"><i class="fas fa-store"></i> ${escapeHtml(product.shop_name)}</div>` : ''}
        <div class="location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(product.location)}</div>
        ${showDelete ? `<button class="delete-btn" data-id="${product.id}">${t.deleteConfirm}</button>` : ''}
        <button class="chat-seller-btn" data-seller-id="${product.user_id}" data-product-id="${product.id}" data-product-title="${escapeHtml(product.title)}">
          <i class="fab fa-whatsapp"></i> ${t.chatBtnText}
        </button>
      </div>
    </div>
  `).join('');
  
  // Card click handler
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-btn') || e.target.closest('.delete-btn') || e.target.closest('.chat-seller-btn')) return;
      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) showDetailModal(product);
    });
  });
  
  // Favorite button handler
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      toggleFavorite(id, btn);
    });
  });
  
  // Delete button handler
  if (showDelete) {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm(translations[currentLanguage].deleteConfirm)) {
          await fetchAPI(`/products/${btn.dataset.id}`, { method: 'DELETE' });
          if (showingMyAds) loadMyProducts();
          else if (showingFavorites) loadFavorites();
          else loadProducts();
        }
      });
    });
  }
  
  // Chat button handler
  document.querySelectorAll('.chat-seller-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sellerId = btn.dataset.sellerId;
      const productId = btn.dataset.productId;
      const productTitle = btn.dataset.productTitle;
      startChat(sellerId, productId, productTitle);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ========== DETAIL MODAL ==========
function showDetailModal(product) {
  const t = translations[currentLanguage];
  let galleryHtml = '';
  
  if (product.images && product.images.length > 0) {
    galleryHtml = `
     <div>
  <img id="mainImage" src="${window.location.origin}${product.images[0]}" style="width:100%; height:300px; object-fit:cover; border-radius:1rem;">
  <div style="display:flex; gap:0.5rem; margin-top:0.5rem; overflow-x:auto;">
    ${product.images.map(img => `
      <img src="${window.location.origin}${img}" onclick="document.getElementById('mainImage').src=this.src" style="width:70px; height:70px; object-fit:cover; border-radius:0.5rem; cursor:pointer;">
    `).join('')}
  </div>
</div>
    `;
  } else {
    galleryHtml = `<div style="text-align:center; padding:2rem; background:#f1f5f9; border-radius:1rem;"><i class="fas fa-box fa-4x"></i></div>`;
  }
  
  const whatsappNumber = product.whatsapp || product.seller_whatsapp;
  const shopName = product.shop_name || product.seller_shop;
  
  const detailDiv = document.getElementById('detailContent');
  if (!detailDiv) return;
  
  detailDiv.innerHTML = `
    ${galleryHtml}
    <h2 style="margin-top:1rem;">${escapeHtml(product.title)}</h2>
    <div class="price" style="font-size:2rem;">$${product.price.toLocaleString()}</div>
    ${shopName ? `<p><i class="fas fa-store"></i> <strong>${t.shopText || 'فروشگاه'}:</strong> ${escapeHtml(shopName)}</p>` : ''}
    <p><i class="fas fa-map-marker-alt"></i> <strong>${t.locationText || 'موقعیت'}:</strong> ${escapeHtml(product.location)}</p>
    <p><i class="fas fa-tag"></i> <strong>${t.categoryText || 'دسته'}:</strong> ${product.category}</p>
    <p><strong>${t.sellerText || 'فروشنده'}:</strong> ${escapeHtml(product.username)}</p>
    <p><strong>${t.descriptionText || 'توضیحات'}:</strong><br> ${escapeHtml(product.description || 'بدون توضیحات')}</p>
    <hr style="margin:1rem 0">
    ${whatsappNumber ? `
      <a href="https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent('سلام! من به آگهی شما علاقه دارم: ' + product.title)}" target="_blank" class="whatsapp-btn" style="background:#25D366; color:white; border:none; padding:0.7rem; border-radius:0.8rem; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; text-decoration:none; margin:0.5rem 0;">
        <i class="fab fa-whatsapp"></i> ${t.chatBtnText}: ${escapeHtml(whatsappNumber)}
      </a>
    ` : `<p style="color:#dc2626;"><i class="fas fa-exclamation-triangle"></i> ${t.noWhatsapp}</p>`}
  `;
  document.getElementById('detailModal').style.display = 'flex';
}

// ========== CHAT FUNCTIONS ==========
async function startChat(sellerId, productId, productTitle) {
  if (!token) {
    showToast('Please login first', true);
    return;
  }
  try {
    const result = await fetchAPI('/conversations', { 
      method: 'POST', 
      body: JSON.stringify({ product_id: productId, seller_id: sellerId }) 
    });
    openChatModal(result.conversation_id, productTitle);
  } catch (error) {
    showToast('Error starting chat', true);
  }
}

async function openChatModal(conversationId, productTitle) {
  document.getElementById('chatModal').style.display = 'flex';
  document.getElementById('chatView').style.display = 'flex';
  document.getElementById('conversationsList').style.display = 'none';
  document.getElementById('chatHeader').innerHTML = `<h3>${escapeHtml(productTitle)}</h3>`;
  await loadMessages(conversationId);
  
  const sendBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');
  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
  newSendBtn.addEventListener('click', () => sendMessage(conversationId));
  messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(conversationId); });
}

async function loadMessages(conversationId) {
  try {
    const messages = await fetchAPI(`/messages/${conversationId}`);
    const container = document.getElementById('messagesContainer');
    container.innerHTML = messages.map(msg => `
      <div class="message ${msg.sender_id === currentUser?.id ? 'sent' : 'received'}">
        <div class="message-text">${escapeHtml(msg.message)}</div>
        <div class="message-time">${new Date(msg.created_at).toLocaleTimeString()}</div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
    await fetchAPI(`/messages/read/${conversationId}`, { method: 'PUT' });
  } catch (error) {
    console.error(error);
  }
}

async function sendMessage(conversationId) {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (!message) return;
  try {
    await fetchAPI('/messages', { 
      method: 'POST', 
      body: JSON.stringify({ conversation_id: conversationId, message }) 
    });
    messageInput.value = '';
    await loadMessages(conversationId);
    showToast(translations[currentLanguage].messageSent);
  } catch (error) {
    showToast('Error sending message', true);
  }
}

// ========== AUTH FUNCTIONS ==========
async function register() {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const whatsapp = document.getElementById('regWhatsapp').value;
  const shop_name = document.getElementById('regShopName').value;
  const t = translations[currentLanguage];
  
  if (!username || !email || !password) {
    alert(t.fillRequired);
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, whatsapp, shop_name })
    });
    const data = await response.json();
    if (response.ok) {
      token = data.token;
      currentUser = data.user;
      localStorage.setItem('token', token);
      updateUI();
      closeAllModals();
      loadProducts();
      showToast(t.registrationSuccess);
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Registration failed');
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const t = translations[currentLanguage];
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      token = data.token;
      currentUser = data.user;
      localStorage.setItem('token', token);
      updateUI();
      closeAllModals();
      loadProducts();
      showToast(t.loginSuccess);
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Login failed');
  }
}

function logout() {
  const t = translations[currentLanguage];
  token = null;
  currentUser = null;
  localStorage.removeItem('token');
  showingMyAds = false;
  showingFavorites = false;
  updateUI();
  loadProducts();
  showToast(t.logoutSuccess);
}

function updateUI() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const adminLink = document.getElementById('adminLink');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const t = translations[currentLanguage];
  
  if (token && currentUser) {
    // User is logged in
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (usernameDisplay) usernameDisplay.innerText = currentUser.username || 'User';
    
    // Show admin link if user is admin
    if (adminLink && currentUser.isAdmin) {
      adminLink.style.display = 'flex';
    } else if (adminLink) {
      adminLink.style.display = 'none';
    }
    
    // Update logged-in button texts
    const postAdSpan = document.getElementById('postAdBtnText');
    const myAdsSpan = document.getElementById('myAdsBtnText');
    const favSpan = document.getElementById('favoritesBtnText');
    const msgSpan = document.getElementById('messagesBtnText');
    const logoutSpan = document.getElementById('logoutBtnText');
    
    if (postAdSpan && t.postAdBtn) postAdSpan.innerText = t.postAdBtn;
    if (myAdsSpan && t.myAdsBtn) myAdsSpan.innerText = t.myAdsBtn;
    if (favSpan && t.favoritesBtn) favSpan.innerText = t.favoritesBtn;
    if (msgSpan && t.messagesBtn) msgSpan.innerText = t.messagesBtn;
    if (logoutSpan && t.logoutBtn) logoutSpan.innerText = t.logoutBtn;
  } else {
    // User is logged out
    if (authButtons) authButtons.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
    
    // Update logged-out button texts
    const loginSpan = document.getElementById('loginBtnText');
    const registerSpan = document.getElementById('registerBtnText');
    
    if (loginSpan && t.loginBtn) loginSpan.innerText = t.loginBtn;
    if (registerSpan && t.registerBtn) registerSpan.innerText = t.registerBtn;
  }
}

async function postAd() {
  const formData = new FormData();
  formData.append('title', document.getElementById('adTitle').value);
  formData.append('price', document.getElementById('adPrice').value);
  formData.append('category', document.getElementById('adCategory').value);
  formData.append('location', document.getElementById('adLocation').value);
  formData.append('description', document.getElementById('adDesc').value);
  formData.append('whatsapp', document.getElementById('adWhatsapp').value);
  formData.append('shop_name', document.getElementById('adShopName').value);
  formData.append('condition', document.getElementById('adCondition').value);
  
  const imageFiles = document.getElementById('adImages').files;
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('images', imageFiles[i]);
  }
  
  const t = translations[currentLanguage];
  
  const title = document.getElementById('adTitle').value;
  const price = document.getElementById('adPrice').value;
  const location = document.getElementById('adLocation').value;
  const whatsapp = document.getElementById('adWhatsapp').value;
  
  if (!title || !price || !location) {
    alert(t.fillRequired);
    return;
  }
  
  if (!whatsapp) {
    alert(t.whatsappRequired);
    return;
  }
  
  if (imageFiles.length === 0) {
    alert(t.imageRequired);
    return;
  }
  
  if (imageFiles.length > 5) {
    alert(t.maxImages);
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (response.ok) {
      showToast(t.postSuccess);
      closeAllModals();
      if (showingMyAds) loadMyProducts();
      else loadProducts();
      
      // Clear form
      document.getElementById('adTitle').value = '';
      document.getElementById('adPrice').value = '';
      document.getElementById('adLocation').value = '';
      document.getElementById('adDesc').value = '';
      document.getElementById('adWhatsapp').value = '';
      document.getElementById('adShopName').value = '';
      document.getElementById('adImages').value = '';
      document.getElementById('imagePreview').innerHTML = '';
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    alert('Failed to post ad');
  }
}

// Image preview
const adImagesInput = document.getElementById('adImages');
if (adImagesInput) {
  adImagesInput.addEventListener('change', function(e) {
    const preview = document.getElementById('imagePreview');
    if (!preview) return;
    preview.innerHTML = '';
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.cssText = 'width:80px; height:80px; object-fit:cover; border-radius:8px; border:1px solid #cbd5e1;';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
}

// Location picker
function getCurrentLocation() {
  const t = translations[currentLanguage];
  if (!navigator.geolocation) {
    alert(t.locationError);
    return;
  }
  
  const locationBtn = document.getElementById('getLocationBtn');
  const originalText = locationBtn.innerHTML;
  locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t.locationBtnText;
  locationBtn.disabled = true;
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        const data = await response.json();
        
        let locationName = '';
        if (data.address) {
          const parts = [];
          if (data.address.city) parts.push(data.address.city);
          else if (data.address.town) parts.push(data.address.town);
          else if (data.address.village) parts.push(data.address.village);
          if (data.address.state) parts.push(data.address.state);
          locationName = parts.join(', ');
        }
        
        const adLocation = document.getElementById('adLocation');
        if (adLocation) {
          if (locationName) {
            adLocation.value = locationName;
          } else {
            adLocation.value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          }
        }
        showToast(t.locationDetected);
      } catch (error) {
        const adLocation = document.getElementById('adLocation');
        if (adLocation) {
          adLocation.value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        }
      }
      locationBtn.innerHTML = originalText;
      locationBtn.disabled = false;
    },
    (error) => {
      alert(t.locationError);
      locationBtn.innerHTML = originalText;
      locationBtn.disabled = false;
    }
  );
}

// Filters
const filterToggle = document.getElementById('filterToggleBtn');
if (filterToggle) {
  filterToggle.addEventListener('click', () => {
    const filters = document.getElementById('advancedFilters');
    filters.style.display = filters.style.display === 'none' ? 'flex' : 'none';
  });
}

const applyFilters = document.getElementById('applyFiltersBtn');
if (applyFilters) {
  applyFilters.addEventListener('click', () => {
    currentFilters = {
      minPrice: document.getElementById('minPrice').value,
      maxPrice: document.getElementById('maxPrice').value,
      condition: document.getElementById('conditionFilter').value,
      sort: document.getElementById('sortFilter').value
    };
    loadProducts();
  });
}

const clearFilters = document.getElementById('clearFiltersBtn');
if (clearFilters) {
  clearFilters.addEventListener('click', () => {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('conditionFilter').value = 'all';
    document.getElementById('sortFilter').value = 'newest';
    currentFilters = { minPrice: '', maxPrice: '', condition: 'all', sort: 'newest' };
    loadProducts();
  });
}

// ========== EVENT LISTENERS ==========
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const postAdBtn = document.getElementById('postAdBtn');
const myAdsBtn = document.getElementById('myAdsBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const messagesBtn = document.getElementById('messagesBtn');
const logoutBtn = document.getElementById('logoutBtn');
const confirmLogin = document.getElementById('confirmLoginBtn');
const confirmRegister = document.getElementById('confirmRegisterBtn');
const confirmPost = document.getElementById('confirmPostBtn');
const getLocation = document.getElementById('getLocationBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (loginBtn) loginBtn.addEventListener('click', () => document.getElementById('loginModal').style.display = 'flex');
if (registerBtn) registerBtn.addEventListener('click', () => document.getElementById('registerModal').style.display = 'flex');
if (postAdBtn) postAdBtn.addEventListener('click', () => document.getElementById('postModal').style.display = 'flex');
if (myAdsBtn) {
  myAdsBtn.addEventListener('click', () => {
    showingMyAds = true;
    showingFavorites = false;
    updatePageTitle();
    loadMyProducts();
  });
}
if (favoritesBtn) {
  favoritesBtn.addEventListener('click', () => {
    showingFavorites = true;
    loadFavorites();
  });
}
if (messagesBtn) messagesBtn.addEventListener('click', () => document.getElementById('chatModal').style.display = 'flex');
if (logoutBtn) logoutBtn.addEventListener('click', logout);
if (confirmLogin) confirmLogin.addEventListener('click', login);
if (confirmRegister) confirmRegister.addEventListener('click', register);
if (confirmPost) confirmPost.addEventListener('click', postAd);
if (getLocation) getLocation.addEventListener('click', getCurrentLocation);
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    if (searchInput) {
      currentSearch = searchInput.value;
      loadProducts();
    }
  });
}
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchBtn) {
      searchBtn.click();
    }
  });
}

// Category buttons
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    showingMyAds = false;
    showingFavorites = false;
    updatePageTitle();
    loadProducts();
  });
});

// Close modals
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
  const chatView = document.getElementById('chatView');
  const conversationsList = document.getElementById('conversationsList');
  if (chatView) chatView.style.display = 'none';
  if (conversationsList) conversationsList.style.display = 'block';
}

document.querySelectorAll('.close-modal, .closeLoginModal, .closeRegisterModal, .closePostModal, .closeDetailModal, .closeChatModal, .closeFavoritesModal').forEach(btn => {
  if (btn) btn.addEventListener('click', closeAllModals);
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) closeAllModals();
});

// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installPrompt = document.getElementById('installPrompt');
  if (installPrompt) installPrompt.style.display = 'block';
});

const installBtnPWA = document.getElementById('installBtn');
if (installBtnPWA) {
  installBtnPWA.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('pwaInstalled', 'true');
      }
      deferredPrompt = null;
      const installPrompt = document.getElementById('installPrompt');
      if (installPrompt) installPrompt.style.display = 'none';
    }
  });
}

const closeInstall = document.getElementById('closeInstallBtn');
if (closeInstall) {
  closeInstall.addEventListener('click', () => {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) installPrompt.style.display = 'none';
  });
}

// Initialize
function init() {
  if (token) {
    // Try to get user info from token
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      currentUser = { id: decoded.id, username: decoded.username, isAdmin: decoded.isAdmin };
    } catch(e) {
      currentUser = { username: 'User', isAdmin: false };
    }
    updateUI();
  }
  applyLanguage();
  loadProducts();
}

init();

console.log('Script loaded successfully!');