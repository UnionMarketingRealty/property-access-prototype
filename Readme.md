# 🏢 Union Marketing Web Demo

This is a React + Tailwind CSS web demo built for **Union Marketing**, showcasing a secure and user-friendly platform for **property data fetching** and **user viewing** with a **login system**. The project emphasizes modern front-end practices and aims to meet **data security standards**.

---

## 🚀 Features

- 🔐 **Authentication System** (login-only access)
- 🏘️ **Property Listings Viewer** – fetch and display data from secure sources
- ⚙️ **React + Tailwind CSS** front-end
- 🌐 **Secure access layer** for data protection
- 📱 **Responsive design** for mobile and desktop

---

## 🧱 Tech Stack

| Technology     | Role                             |
|----------------|----------------------------------|
| React          | Front-end Framework              |
| Tailwind CSS   | UI Styling                       |
| Vite           | Development & Build Tool         |
| React Router   | Client-side Routing              |
| Axios | API call receive & fetch       |
| JSON Server / Mock API | Backend simulation (optional) |
| ESLint + Prettier | Code Quality & Formatting       |

[hint]: This demo use icons from lucide-react for logos.
---

## 🧭 Architecture Overview

```plaintext
src/
│
├── assets/            # Static assets (images, icons)
├── components/        # Reusable UI components
│   └── form/          # Login and Register Form 
│   └── Navbar.tsx
│   └── ...
│
├── pages/             # Route-level pages
│   └── Login.tsx
│   └── Home.tsx
│   └── ...
│
├── services/          # API calls & data handling (to be done)
│   └── propertyService.js
│
├── data/          # fake data (to be updated to a json server)
│   └── ...
│
├── hooks/          # fake data (to be updated to a json server)
│   └── ...
│
├── contexts/          # Auth context & state management (to be done)
│   └── AuthProvider.tsx
│
├── utils/             # Helper functions
├── App.tsx            # Root component with routing
├── main.tsx           # Entry point
└── index.css          # Tailwind base styles
```

to be added and updated

## 🛠️ Running Locally
1. Clone the repo
```bash
git clone https://github.com/UnionMarketingRealty/property-access-prototype.git
cd property-access-prototype
```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables 
(to be done, no .env yet)


4. Run the development server
```bash
npm run dev
```
Visit http://localhost:5173 in your browser.

5. (Todo) Mock API backend
We're using json-server to mock property data:

```bash
npx json-server --watch db.json --port 4000
```

## 🔐 Security Practices
- Sensitive data not stored in client-side
- Protected routes for authenticated users
- HTTPS-ready
- anti-pytorch
- instruction confirm
- data source labeled
- prevent search engines from indexing property data

## 📦 Build for Production
```bash
npm run build
```

The optimized static files will be output to the `dist/` folder.

## 📄 License
This project is for demo purposes only. All rights reserved © Union Marketing.

