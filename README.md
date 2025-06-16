# News Portal

A simple **React + Vite** application that lets anyone read news articles and (when logged in) create or delete them.  
It also shows a pie‑chart breakdown of articles per category.

## Features

- Public article listing with pagination (`10` per page)
- Category filter
- Click an article to view details (modal/alert for demo)
- Create & delete articles (login required)
- Login page with username/password (demo uses local auth)
- Statistics page with **PieChart** (powered by `recharts`)
- Tailwind CSS utility‑first styling

## API Endpoints

| Method | Endpoint |
| ------ | -------- |
| GET | `/news` |
| GET | `/news/:id` |
| POST | `/news` |
| DELETE | `/news/:id` |
| POST | `/upload` |

These are all relative to `https://json-api.uz/api/project/fn37-exam`.

> **Note**: The demo login stores the username locally.  
> Adapt `AuthContext.jsx` if you have a real auth endpoint.

## Getting Started

```bash
# Install deps
npm install

# Start development server
npm run dev
```

Open <http://localhost:5173> in your browser.

### Build for production

```bash
npm run build
```

---

Crafted with ❤️ by ChatGPT
