# GameZone Store — responsive WhatsApp order website

## Included pages
- `index.html` — home page, search and popular products
- `indoor.html` — indoor games catalogue
- `outdoor.html` — outdoor games catalogue
- `product.html` — individual product details
- `login.html` — demo customer details stored in this browser
- `cart.html` — cart and quantity controls
- `checkout.html` — delivery form and WhatsApp order draft
- `style.css` — responsive styling
- `script.js` — product catalogue, cart and WhatsApp checkout

## Your WhatsApp number
The checkout is already configured for **917804847284**.

The site uses WhatsApp Click to Chat. When a customer clicks **Send order to WhatsApp**, WhatsApp opens with the order message filled in. The customer must review the message and press **Send** themselves. A website cannot send WhatsApp messages silently just by using a `wa.me` link.

## Publish on GitHub Pages
1. Download and unzip `gamezone-store.zip`.
2. Open your GitHub repository.
3. Upload all files from this folder into the repository root (do not upload only the ZIP).
4. Commit the changes.
5. In **Settings → Pages**, select your publishing branch (usually `main`) and folder `/ (root)`.
6. Open the Pages URL shown by GitHub.

## Important limitations
This is a front-end website with a browser-based demo cart. GitHub Pages is static hosting:
- Cart and demo customer information are stored only in the visitor's browser.
- Orders are not saved to a seller dashboard or database.
- No online payment is collected.
- The WhatsApp message is a customer-sent order request, not proof that the seller has accepted the order.
- For automatic WhatsApp alerts, order storage, stock management, or online payments, connect a secure backend/database and an approved payment/WhatsApp Business API provider. Do not put secret API keys in `script.js`.

## Change products
Edit the `PRODUCTS` array near the top of `script.js`. Each product has an `id`, `name`, `category`, `price`, `oldPrice`, `emoji`, `tag`, `rating`, `description`, and `color`.
