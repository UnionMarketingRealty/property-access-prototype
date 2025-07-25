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
| JSON Server / Mock API | Backend simulation |
| ESLint + Prettier | Code Quality & Formatting       |

>[hint]: This demo use icons from lucide-react for logos.
---

## 🧭 Architecture Overview

```plaintext
data/
├── db.json            # backend data stored  
│
src/
│
├── api/               # axios api stored
├── components/        # Reusable UI components
│   └── form/          # Login and Register Form 
│   └── Navbar.tsx
│   └── ...
│
├── contexts/          # Auth context & state management
│   └── AuthContext.tsx
│
├── pages/             # Route-level pages
│   └── Login.tsx
│   └── Home.tsx
│   └── ...
│
├── data/          # fake data (to be updated to a json server)
│   └── ...
│
├── hooks/             # custome react hooks
│   └── ...
├── types/             # object type stored
│   └── ...
│
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


4. Run the front end
```bash
npm run dev
```
Visit http://localhost:5173 in your browser.

5. run the json-server Mock backend
We're using json-server to mock property data:

```bash
npx json-server --watch data/db.json --port 8000
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

