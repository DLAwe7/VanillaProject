
*------------------------------          Front-End Banking App Dashboard          ------------------------------*

A responsive, modular front-end banking interface built with HTML, CSS, and JavaScript. This project simulates core features you would expect in a digital banking experience. From checking balances and viewing transactions, to language switching and investment tracking entirely in the browser with no backend.



*----------          Overview          ----------*



This project is structured as a multi-page application and includes:

- A main Dashboard view
- Wallet, Transaction History, and Crypto pages
- Account settings with persistent data (via localStorage)
- A Homepage introducing the brand, company news, and user reviews
- A forum and contact section to simulate business or customer support

All pages are linked and operate together to mimic a cohesive digital banking environment.



*----------          Features          ----------*



- Local Storage Simulation:

  Mimics login/logout behavior and session management using `localStorage`.


- Account Settings Page:

  Provides real-time editing and saving of user preferences like username and email using browser storage.


- Homepage Branding & Feed:

  Introductory landing page with company branding, banners, user testimonials, and dynamic content.


- Live Data Rendering:

  Loads and displays user data from JSON files, including balance info, transaction history, and account lists.


- External API Integration:

  Fetches real-time financial or crypto-related data and renders it in the UI and charts.


- Chart Integration:

  Visualizes key data using Chart.js components on pages like the Dashboard and Wallet.


- Multi-language Support:

  Language switching logic is included.


- Theme Switching:

  Supports light and dark mode toggles.


- Responsive Design:

  Mobile friendly layouts with media queries.


- Modular Codebase:

  1. HTML split into reusable parts: `header.html`, `footer.html`, `aside.html`.

  2. JS logic separated into functional modules inside `JS/Components/`

  3. Central `load-components.js` handles dynamic HTML loading for a smoother UX


- Forum + Contact Pages:

  Simulates user interaction and business support flows.



*----------          Running the project          ----------*



No dependencies. No build tools. Just open `index.html` in a browser.



*----------          Github page          ----------*



This project is also live via GitHub Pages:  

  https://dlawe7.github.io/VanillaProject/
