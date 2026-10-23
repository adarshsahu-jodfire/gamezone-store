// GameZone Store: front-end demo cart + WhatsApp click-to-chat ordering.
// Important: this static site does not save orders to a server or process payments.
const WHATSAPP_NUMBER = "917804847284"; // Your WhatsApp number with country code, digits only.
const PRODUCTS = [
  {id:"chess",name:"Classic Chess Set",category:"indoor",price:499,oldPrice:699,emoji:"♟️",tag:"BEST SELLER",rating:"4.8",description:"A timeless strategy game for friends and family. A great pick for beginners and experienced players.",color:"#e5eaff"},
  {id:"ludo",name:"Family Ludo Board",category:"indoor",price:249,oldPrice:349,emoji:"🎲",tag:"FAMILY FAVOURITE",rating:"4.7",description:"Bring everyone together for a colourful, easy-to-learn board game night.",color:"#ffe9d9"},
  {id:"carrom",name:"Carrom Board Game",category:"indoor",price:1299,oldPrice:1599,emoji:"🟤",tag:"POPULAR",rating:"4.6",description:"A classic indoor game for family get-togethers and friendly competitions.",color:"#e3f3e8"},
  {id:"puzzle",name:"Brain Teaser Puzzle",category:"indoor",price:199,oldPrice:299,emoji:"🧩",tag:"BRAIN BOOST",rating:"4.5",description:"A fun challenge for curious minds. Great for quiet time and gifting.",color:"#f3e5ff"},
  {id:"football",name:"Training Football",category:"outdoor",price:599,oldPrice:799,emoji:"⚽",tag:"BEST SELLER",rating:"4.8",description:"A versatile football for casual kickabouts and practice with friends.",color:"#e1f5e8"},
  {id:"badminton",name:"Badminton Racket Set",category:"outdoor",price:899,oldPrice:1199,emoji:"🏸",tag:"VALUE SET",rating:"4.7",description:"A handy starter set for backyard and park badminton sessions.",color:"#e3f0ff"},
  {id:"cricket",name:"Cricket Starter Kit",category:"outdoor",price:749,oldPrice:999,emoji:"🏏",tag:"POPULAR",rating:"4.6",description:"A starter kit for casual cricket games in the park or open ground.",color:"#fff0d8"},
  {id:"basketball",name:"Street Basketball",category:"outdoor",price:699,oldPrice:899,emoji:"🏀",tag:"GAME ON",rating:"4.5",description:"A basketball for practice, friendly matches and outdoor fun.",color:"#ffe6dc"}
];
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const getCart = () => { try { return JSON.parse(localStorage.getItem("gz_cart") || "[]"); } catch(e) { return []; } };
const saveCart = cart => { localStorage.setItem("gz_cart", JSON.stringify(cart)); updateCartCount(); };
const getCustomer = () => { try { return JSON.parse(localStorage.getItem("gz_customer") || "null"); } catch(e) { return null; } };
const productById = id => PRODUCTS.find(p => p.id === id);
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}
function addToCart(id, qty=1) {
  const product = productById(id); if (!product) return;
  const cart = getCart(); const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += Math.max(1, Number(qty) || 1);
  else cart.push({id, qty:Math.max(1, Number(qty) || 1)});
  saveCart(cart);
  showToast(product.name + " added to cart");
}
function showToast(message) {
  let toast = document.getElementById("gzToast");
  if (!toast) { toast = document.createElement("div"); toast.id="gzToast"; toast.style.cssText="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;background:#15263a;color:white;padding:12px 18px;border-radius:10px;box-shadow:0 10px 30px #0002;font-size:13px;max-width:90%;text-align:center"; document.body.appendChild(toast); }
  toast.textContent=message; toast.style.display="block"; clearTimeout(window.gzToastTimer); window.gzToastTimer=setTimeout(()=>toast.style.display="none",2200);
}
function productCard(p) {
  return `<article class="product-card"><a href="product.html?id=${p.id}" class="product-visual" style="background:linear-gradient(145deg,${p.color},#fff)"><span class="product-tag">${p.tag}</span><span class="product-emoji">${p.emoji}</span></a><div class="product-info"><div class="product-category">${p.category} game</div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="rating">★ ${p.rating} <span style="color:#929aa5">· Popular choice</span></div><div class="price-row"><span class="price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><div class="product-actions"><button class="btn btn-dark" onclick="location.href='product.html?id=${p.id}'">Details</button><button class="btn btn-primary" onclick="addToCart('${p.id}')">Add to cart</button></div></div></article>`;
}
function renderProducts(category="all", search="") {
  const grid=document.getElementById("productGrid"); if(!grid) return;
  const q=search.trim().toLowerCase();
  const filtered=PRODUCTS.filter(p=>(category==="all"||p.category===category)&&(!q||p.name.toLowerCase().includes(q)||p.category.includes(q)));
  grid.innerHTML=filtered.length?filtered.map(productCard).join(""):`<div class="empty-state" style="grid-column:1/-1"><span>🔎</span><h2>No games found</h2><p>Try a different search term.</p><a class="btn btn-primary" href="index.html">Browse all games</a></div>`;
}
function searchProducts(event) {
  event.preventDefault();
  const q=document.getElementById("searchInput")?.value||"";
  const category=document.getElementById("searchCategory")?.value||"all";
  if(location.pathname.endsWith("index.html")||location.pathname==="/" ) {
    renderProducts(category,q); document.getElementById("popular")?.scrollIntoView({behavior:"smooth"});
  } else location.href="index.html?category="+encodeURIComponent(category)+"&q="+encodeURIComponent(q)+"#popular";
}
function renderProductDetails() {
  const el=document.getElementById("productDetails"); if(!el)return;
  const id=new URLSearchParams(location.search).get("id")||"chess"; const p=productById(id);
  if(!p){el.innerHTML='<div class="empty-state"><h2>Product not found</h2><a class="btn btn-primary" href="index.html">Back to store</a></div>';return;}
  el.innerHTML=`<div class="detail-visual" style="background:linear-gradient(145deg,${p.color},#fff)">${p.emoji}</div><div class="detail-copy"><div class="product-category">${p.category} game · ${p.tag}</div><h1>${p.name}</h1><div class="rating">★ ${p.rating} · Popular choice</div><p>${p.description}</p><div class="detail-price">${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></div><ul><li>Confirm stock and delivery charges on WhatsApp</li><li>Order summary prepared automatically</li><li>Payment details confirmed with seller</li></ul><label for="detailQty" class="product-category">Quantity</label><div class="detail-actions"><input class="qty-input" type="number" id="detailQty" min="1" max="99" value="1"><button class="btn btn-primary" onclick="addToCart('${p.id}',document.getElementById('detailQty').value)">Add to cart 🛒</button><a class="btn btn-dark" href="cart.html">View cart</a></div></div>`;
}
function cartTotal(cart=getCart()){return cart.reduce((sum,item)=>{const p=productById(item.id);return sum+(p?p.price*item.qty:0)},0);}
function renderCartPage() {
  const el=document.getElementById("cartPageContent");if(!el)return;
  const cart=getCart().filter(i=>productById(i.id));
  if(!cart.length){el.innerHTML='<div class="empty-state"><span>🛒</span><h2>Your cart is empty</h2><p>Looks like you have not added any games yet.</p><a class="btn btn-primary" href="index.html">Start shopping →</a></div>';return;}
  const rows=cart.map(item=>{const p=productById(item.id);return `<div class="cart-row"><a href="product.html?id=${p.id}" class="mini-visual" style="background:${p.color}">${p.emoji}</a><div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><small>${money(p.price)} each</small><div class="qty-controls"><button aria-label="Decrease quantity" onclick="changeQty('${p.id}',-1)">−</button><span>${item.qty}</span><button aria-label="Increase quantity" onclick="changeQty('${p.id}',1)">+</button><button class="remove-btn" onclick="removeFromCart('${p.id}')">Remove</button></div></div><div class="cart-row-price">${money(p.price*item.qty)}</div></div>`}).join("");
  el.innerHTML=`<div class="cart-layout"><section class="cart-list">${rows}</section><aside class="summary-card"><h2>Order summary</h2><div class="summary-line"><span>Items (${cart.reduce((s,i)=>s+i.qty,0)})</span><strong>${money(cartTotal(cart))}</strong></div><div class="summary-line"><span>Delivery charges</span><strong>To be confirmed</strong></div><div class="summary-line summary-total"><span>Subtotal</span><strong>${money(cartTotal(cart))}</strong></div><a class="btn btn-primary" href="checkout.html">Proceed to checkout →</a><p class="summary-note">Final delivery charge and availability will be confirmed with you on WhatsApp. No online payment is collected on this demo site.</p></aside></div>`;
}
function changeQty(id,delta){const cart=getCart();const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;saveCart(cart.filter(i=>i.qty>0));renderCartPage();}
function removeFromCart(id){saveCart(getCart().filter(i=>i.id!==id));renderCartPage();}
function setupLoginPage(){
  const form=document.getElementById("loginForm"),name=document.getElementById("customerName"),phone=document.getElementById("customerPhone"),message=document.getElementById("loginMessage");
  const existing=getCustomer();if(existing){name.value=existing.name||"";phone.value=existing.phone||"";}
  form?.addEventListener("submit",e=>{e.preventDefault();const customer={name:name.value.trim(),phone:phone.value.trim()};if(!customer.name||!customer.phone)return;localStorage.setItem("gz_customer",JSON.stringify(customer));message.hidden=false;message.textContent="Details saved in this browser. You can continue shopping or checkout.";});
}
function renderCheckoutPage(){
  const el=document.getElementById("checkoutContent");if(!el)return;
  const cart=getCart().filter(i=>productById(i.id));
  if(!cart.length){el.innerHTML='<div class="empty-state"><span>🛒</span><h2>Your cart is empty</h2><p>Add products before checkout.</p><a class="btn btn-primary" href="index.html">Browse games</a></div>';return;}
  const customer=getCustomer()||{};
  const items=cart.map(i=>{const p=productById(i.id);return `<div class="order-item"><span>${p.emoji} ${p.name} × ${i.qty}</span><strong>${money(p.price*i.qty)}</strong></div>`}).join("");
  el.innerHTML=`<div class="checkout-layout"><section class="checkout-form-card"><h2>Delivery information</h2><div class="whatsapp-note">💬 When you click “Send order to WhatsApp”, WhatsApp will open with your order details filled in. Please review and press <strong>Send</strong> to send the order to GameZone.</div><form id="checkoutForm" class="checkout-form"><div class="form-grid"><label>Full name *<input id="orderName" required autocomplete="name" value="${escapeAttr(customer.name||"")}" placeholder="Name for delivery"></label><label>Mobile number *<input id="orderPhone" required inputmode="tel" pattern="[0-9 +()-]{10,18}" autocomplete="tel" value="${escapeAttr(customer.phone||"")}" placeholder="Your phone number"></label></div><label>Full delivery address *<textarea id="orderAddress" required autocomplete="street-address" placeholder="House/flat, street, area, landmark">${escapeHtml(customer.address||"")}</textarea></label><div class="form-grid"><label>City *<input id="orderCity" required autocomplete="address-level2" placeholder="City"></label><label>PIN code *<input id="orderPin" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="postal-code" placeholder="6-digit PIN code"></label></div><label>Notes (optional)<textarea id="orderNotes" placeholder="Preferred delivery time or other notes" rows="2"></textarea></label><button class="btn whatsapp-btn" type="submit">💬 Send order to WhatsApp</button><p class="form-help">No payment is taken on this website. Confirm stock, delivery charges and payment with the seller in WhatsApp.</p><div id="checkoutError" class="error-note" hidden></div></form></section><aside class="summary-card"><h2>Items in your order</h2><div class="order-items">${items}</div><div class="summary-line"><span>Subtotal</span><strong>${money(cartTotal(cart))}</strong></div><div class="summary-line"><span>Delivery</span><strong>Confirm on WhatsApp</strong></div><div class="summary-line summary-total"><span>Estimated subtotal</span><strong>${money(cartTotal(cart))}</strong></div><p class="summary-note">This amount excludes delivery charges, if any. The seller must confirm the final total.</p></aside></div>`;
  document.getElementById("checkoutForm").addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("orderName").value.trim(),phone=document.getElementById("orderPhone").value.trim(),address=document.getElementById("orderAddress").value.trim(),city=document.getElementById("orderCity").value.trim(),pin=document.getElementById("orderPin").value.trim(),notes=document.getElementById("orderNotes").value.trim();
    const error=document.getElementById("checkoutError");
    if(!name||!phone||!address||!city||!/^\d{6}$/.test(pin)){error.hidden=false;error.textContent="Please fill all required fields and enter a valid 6-digit PIN code.";return;}
    if(!/^\d[\d +()-]{8,17}$/.test(phone)){error.hidden=false;error.textContent="Please enter a valid contact phone number.";return;}
    const orderId="GZ"+Date.now().toString().slice(-8);
    const customerData={name,phone,address,city,pin};localStorage.setItem("gz_customer",JSON.stringify(customerData));
    const messageText=[
      "🎮 *NEW ORDER REQUEST — GAMEZONE STORE*",
      "*Order reference:* "+orderId,"",
      "*Customer:* "+name,"*Contact:* "+phone,
      "*Delivery address:* "+address+", "+city+" - "+pin,
      "", "*ORDER ITEMS*",...cart.map(i=>{const p=productById(i.id);return "• "+p.name+" × "+i.qty+" = "+money(p.price*i.qty)}),
      "", "*Subtotal:* "+money(cartTotal(cart)),"*Delivery charge:* To be confirmed","*Final total:* To be confirmed",
      notes?"":"",notes?"*Customer notes:* "+notes:"",
      "", "Please confirm availability, delivery charge, final amount and payment method."
    ].filter(Boolean).join("\n");
    // The browser opens WhatsApp with a pre-filled draft. The customer must press Send.
    const waUrl="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(messageText);
    const win=window.open(waUrl,"_blank","noopener,noreferrer");
    if(!win){location.href=waUrl;}
  });
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(s){return escapeHtml(s);}
document.addEventListener("DOMContentLoaded",()=>{
  updateCartCount();
  const params=new URLSearchParams(location.search);
  const category=params.get("category")||"all",q=params.get("q")||"";
  if(document.getElementById("productGrid"))renderProducts(category,q);
  if(document.getElementById("searchInput"))document.getElementById("searchInput").value=q;
  if(document.getElementById("searchCategory"))document.getElementById("searchCategory").value=category;
});
