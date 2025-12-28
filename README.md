# Vue 3 + TailwindCSS User List Application

A responsive web application that displays a list of users fetched from the Random User API, built with Vue 3 and TailwindCSS.

## Features

- ✅ **User List Page**: Displays a grid of users with their basic information
- ✅ **Refresh Function**: Reload and fetch the latest list of users
- ✅ **User Detail Modal**: Click on any user card to view detailed information in a modal popup
- ✅ **Search Functionality**: Filter users by name, email, or location
- ✅ **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
vue3-tailwind-userlist/
├── src/
│   ├── components/
│   │   ├── UserList.vue      # Main component with search and user grid
│   │   ├── UserCard.vue      # Individual user card component
│   │   └── UserModal.vue     # Modal for detailed user view
│   ├── services/
│   │   └── api.js            # API service for fetching users
│   ├── App.vue               # Root component
│   ├── main.js               # Application entry point
│   └── style.css             # Global styles with TailwindCSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Usage

- **Search**: Type in the search box to filter users by name, email, or location
- **Refresh**: Click the "Refresh" button to fetch a new set of users
- **View Details**: Click on any user card to open a modal with detailed information
- **Close Modal**: Click the X button or click outside the modal to close it

## API

The application uses the [Random User API](https://randomuser.me/api/) to fetch user data:
- Endpoint: `https://randomuser.me/api/?results=20`
- Returns 20 random users per request

## Browser Support

Modern browsers that support ES6+ features.

