# GameZone Store (Demo)

A responsive multi-page shopping website made with HTML, CSS and vanilla JavaScript. Designed for GitHub Pages and beginner learning.

## Files
- `index.html` — homepage and featured games
- `indoor.html` — indoor games collection
- `outdoor.html` — outdoor games collection
- `product.html` — product detail page, selected by `?id=...`
- `login.html` — demo sign-in / registration
- `cart.html` — cart, quantity and remove controls
- `checkout.html` — demo checkout and order confirmation
- `style.css` — shared responsive dark theme
- `script.js` — sample products and shopping interactions

## Run locally
Open `index.html` in a browser. For a smoother local test, use VS Code's Live Server extension.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `gamezone-store`.
2. Upload all 9 files to the repository root (not inside a nested folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish the site. The URL normally looks like `https://YOUR-USERNAME.github.io/gamezone-store/`.

## Important demo limitations
- Product names, prices, ratings and stock text are sample data.
- Login is not secure authentication. It stores a demo name/email in this browser's local storage. Do not enter a real password.
- Cart and demo orders are saved only in this browser. They are not sent to the shop owner.
- Checkout does not collect money or create a real shipment.
- For a real store, use a backend/database, secure authentication, server-side order handling, and a trusted payment provider. Never store real passwords or payment details in browser local storage.
