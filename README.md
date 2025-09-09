# Async Race

-Repository: https://github.com/MoonAlya04/aysnc-race
-Deployment: https://aysnc-race.vercel.app/

Async Race is a web application for managing a virtual car race. It allows users to create, update, and remove cars, start races, and view winners.

## Features

- **Garage:** Manage your cars (create, update, delete)
- **Race:** Start single or multi-car races
- **Winners:** View race results and statistics
- **Pagination:** Navigate through cars and winners
- **Modal dialogs:** Smooth user experience for creating/updating cars
- **Responsive design:** Works on desktop and mobile devices

## Tech Stack

- React
- TypeScript
- Zustand (state management)
- Tailwind CSS (styling)
- Axios (HTTP client)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MoonAlya04/async-race.git
cd async-race
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm start
```

### 4. Clone and run the backend API

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The backend will run on [http://localhost:3000](http://localhost:3000).


## 🏆 Score

- Garage page (CRUD operations, pagination, responsive) – **110 / 120**
- Race animation (engine start/stop, race between cars) – **60 / 80**
- Winners page (results, basic stats, no advanced sorting yet) – **60 / 90**
- State management with Zustand + Axios integration – **35 / 40**
- UI/UX (Tailwind styling, modals, responsive design) – **40 / 50**
- Code quality (TypeScript, project structure, clean components) – **30 / 50**
- Extra features (future improvements, customization potential) – **0 / 30**

\*\*Total Score: 335 /
