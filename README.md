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

## 🏆 Self-evaluation

### Minimum scope

- [ ] A user can create, update, delete a car (CRUD operations in the garage).
- [ ] Pagination is implemented for the garage (7 cars per page).
- [ ] A user can start a race for all cars on the page.
- [ ] Animation works correctly and corresponds to the real car speed.
- [ ] The race result is recorded and displayed in the winners table.

### Extra scope

- [ ] Car engine start/stop is implemented.
- [ ] Reset race button stops all cars.
- [ ] Winner’s time is recorded and displayed.
- [ ] Winners page with pagination is implemented.
- [ ] Sorting of winners by wins and best time is implemented.

### Technical requirements

- [ ] Application is written in **React** + **TypeScript**.
- [ ] State management is handled by **Zustand**.
- [ ] Backend requests are made via **Axios**.
- [ ] Code follows project structure and is well-typed.
- [ ] Application is deployed and accessible online.
