# React Todo App

A modern, authenticated Todo List web application built with React, Vite, Firebase Authentication, Material-UI, Mixpanel, and PostHog analytics.

---

## Features
- Google Sign-In authentication (Firebase)
- Add, complete, and delete todos
- Todos persist in local storage
- Analytics with Mixpanel and PostHog
- Responsive Material-UI design

---

## Getting Started

### 1. Clone the Repository
```bash
# (from your workspace root)
git clone <your-repo-url>
cd windsurf-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root (same folder as `package.json`) and add:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_MIXPANEL_TOKEN=your_mixpanel_token
VITE_POSTHOG_KEY=your_posthog_project_api_key
VITE_POSTHOG_HOST=https://us.i.posthog.com
```
Replace the values with your actual Firebase, Mixpanel, and PostHog credentials.

### 4. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## Project Structure
- `src/` — Main source code (components, config, hooks)
- `.env` — Environment variables (not committed to git)
- `public/` — Static assets

---

## Deployment
Build for production with:
```bash
npm run build
```
Preview the production build with:
```bash
npm run preview
```

---

## Security & Best Practices
- **Never commit your `.env` file or credentials to version control.**
- All sensitive keys are loaded via environment variables and not hardcoded.
