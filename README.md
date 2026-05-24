# 🛍️ MyStore — Angular E-Commerce Application

MyStore is a high-performance, single-page e-commerce application built with **Angular 18+**. It delivers a seamless shopping experience, allowing users to browse products, manage a dynamic shopping cart, and complete a validated checkout flow. 

This project serves as a production-ready reference for Angular fundamentals, including component architecture, centralized state management, client-side routing, and robust form validation.

---

## Key Features

* Product catalog loaded from local JSON
* Product detail pages with quantity selection
* Shopping cart with live updates and totals
* Checkout form with validation (name, address, card)
* Order confirmation page
* Toast notifications for user actions
* Responsive UI (mobile + desktop)
---

## 🎬 Demo

![MyStore Demo](public/assets/shoppingflow.gif)

## Tech Stack

* Angular 18+ (NgModule-based architecture with feature modules)
* TypeScript
* Angular Signals (state management for cart and derived state)
* RxJS (used for HTTP requests and async data handling)
* Angular Forms (template-driven)
* Bootstrap 5
* ngx-toastr

---

## Project Structure

```text
src/
├── app/
│   ├── components/
│   ├── layout/               
│   ├── services/
│   ├── models/
│   └── app-routing.module.ts      
└── public/
    └── assets/
        └── data.json              
```

---

## Core Architecture Decisions
* Feature-based module structure (Shop module isolates e-commerce domain)
* Shared CartService acts as a single source of truth for cart state
* Angular Signals used for cart state management and derived values
* Computed signals used for reactive derivations (e.g., cart count)
* RxJS Observables used for HTTP data fetching
* Template-driven forms used for simplicity in checkout flow
* Local JSON used as a mock API to simulate backend integration

## Routes

| Route           | Component     | Description     |
| --------------- | ------------- | --------------- |
| `/`             | ProductList   | Product catalog |
| `/products/:id` | ProductDetail | Product details |
| `/cart`         | Cart          | Shopping cart   |
| `/success`      | Confirmation  | Order success   |


---

## 🛠️ Local Development

### Prerequisites
Ensure **Node.js** (v18+) and the **Angular CLI** are installed globally.

### Installation
Clone the repository and fetch dependencies:
```bash
npm install
```

### Run Server
Spin up the local Webpack dev server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser.

### Quality Control
Enforce code quality and formatting metrics:
```bash
# Run ESLint validation
npm run lint

# Execute Prettier code formatting
npm run format
```

---

## Architecture Overview

* State handled via shared CartService
* Component communication via @Input() / @Output()
* HTTP data loaded using HttpClient
* Reactive updates via RxJS streams

---

## Key Takeaway
This project demonstrates:

* Angular component architecture
* Reactive state patterns
* Client-side routing
* Form validation and UX flow
