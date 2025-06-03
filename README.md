# 📱 SmartShop Mobile – Graduation Project

This repository contains the **mobile application** for the SmartShop e-commerce platform, developed as part of a graduation project.

---

## 🚀 Technologies Used

- **React Native** – Cross-platform mobile development framework
- **Expo** – Managed workflow for React Native apps, simplifying development and testing
- **TypeScript (TSX)** – Strongly typed and maintainable mobile app code
- **React Navigation** – Routing and navigation between screens
- **Zustand** – Lightweight global state management (used for cart and authentication)
- **TailwindCSS (via Tailwind React Native)** – Utility-first styling for consistent UI
- **AsyncStorage** – Persistent local storage for caching user sessions, cart data, etc.

---

## 📁 Project Structure

```
smartshop-mobile/
├── assets/            # Images, icons, fonts
├── src/
│   ├── components/    # Reusable UI components
│   ├── navigation/    # React Navigation setup and routes
│   ├── screens/       # App screens (Home, Product, Cart, Profile, etc.)
│   ├── store/         # Zustand global state management
│   └── utils/         # Utility functions and helpers
├── App.tsx            # Entry point of the app
```

---

## ⚙️ Getting Started

### 1. Install Dependencies

Make sure you have **Node.js** and **Expo CLI** installed:

```bash
npm install -g expo-cli
```

Then install the project dependencies:

```bash
npm install
```

### 2. Run the App

To start the development server and run the app on a simulator or physical device:

```bash
expo start
```

---

## 🔗 Related Repositories

- Backend and Web Frontend are hosted together in the [smartshop-fullstack repository](https://github.com/Socrat47/smartshop-fullstack.git).

---

## 🔐 Features

- 🔐 Secure authentication and user session management
- 🛒 Shopping cart management using Zustand
- 🛍️ Browse products, view details, and add to cart
- 🔄 Smooth navigation between screens with React Navigation
- 💾 Persistent local storage with AsyncStorage
- 🎨 Consistent UI design with TailwindCSS for React Native

---

## 👨‍💻 Author

- **GitHub:** [@Socrat47](https://github.com/Socrat47)

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
