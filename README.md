[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gd4XBP3Q)
### React Lab: Student Registration Portal

> **Note:** Follow the `App.jsx` file to implement the lab.

---

## Overview of the Lab

In this lab, you will build a small **Student Registration Portal** using **React Router** and **React Forms**.  
The goal is to help you understand how to:
- Create multiple pages and navigate between them using `react-router-dom`.
- Build controlled form components in React.
- Apply validation rules to form fields.
- Manage application state and handle form submission gracefully.

The app will have **three pages**:
1. **Home Page** – General overview of the portal.  
2. **About Page** – Brief description of what the app does and what you’re learning.  
3. **Registration Page** – A form where the user enters email, password, and gender, with basic validation.

---

## Reading Assignment

Before starting, read these Zybook sections carefully:

- [**5.12 Forms (React)**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/12)  
  Learn about controlled components and handling input changes in React.

- [**5.13 Example: Todo List (Optional)**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/13)  
  Understand how to use state (`useState`) to manage form data dynamically.

- [**5.14 Router**](https://learn.zybooks.com/zybook/SWE363Fall2025/chapter/5/section/14)  
  Explore React Router, navigation links, and how routes are rendered in a single-page application.

---

## Concepts

### React Router: Client‑Side Routing
**What it is**: A library that lets a React app change what is displayed based on the URL **without** reloading the page. It maps **paths** to **components** so the UI updates instantly as the user navigates.

**Key ideas**
- A **router** keeps the UI in sync with the current URL.
- A **route** declares which component should render for a given path.
- The **route tree** describes your app’s pages.

**Minimal syntax**
```jsx
// install once: npm i react-router-dom

import { BrowserRouter } from "react-router-dom";

// Wrap your app once at the top level
<BrowserRouter>
  { /* your app content and <Routes> go here */ }
</BrowserRouter>
```

---

### Navigation Links
**What it is**: UI elements that **change the URL** (and therefore the rendered component) **without a full page reload**.

**Minimal syntax**
```jsx
import { NavLink, Link } from "react-router-dom";

// Link: basic navigation
<Link to="/about">About</Link>

// NavLink: like Link, plus an "active" state when the URL matches
<NavLink to="/registration">Registration</NavLink>
```

**Behavior**
- Clicking a link updates the URL and rerenders the matching route component.
- `NavLink` can style the active link state automatically.

---

### Why Routes Are Used
- **Single‑Page App (SPA) UX**: Faster transitions, no full reload.
- **URL as State**: URLs represent the user’s location in the app (e.g., `/`, `/about`, `/registration`).
- **Separation of Concerns**: Each route renders a focused component (page).

---

### Route Declaration Syntax
**Purpose**: Map paths to the components that should render.

**Minimal syntax**
```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Registration />} />
</Routes>
```

---

### Forms in React
**What it is**: A structured way to collect user input. In React, form elements are typically **controlled**, meaning React manages their values via state.

**Typical pieces**
- Input elements (text, email, password, radio).
- A submit trigger (`<button type="submit">`).
- A submit handler that validates, prevents default, and proceeds on success.

---

### Form Submission Flow
**Purpose**: Validate data and perform an action (e.g., show success, navigate, call an API).

**Minimal syntax**
```jsx
const handleSubmit = (e) => {
  e.preventDefault();           // stop the default page reload
  // 1) Build a validation error map
  // 2) If any errors exist, show messages and return early
  // 3) If valid, perform success behavior (e.g., alert, navigate)
};
```

**Validation suggestions**
- **Required fields**: check for empty strings.
- **Email rule (lab-specific)**: contains `"@"` and ends with `".com"`.
- **Radio groups**: check that a choice is selected.

---

### Controlled Inputs
**What it is**: Inputs whose current value is derived from React state. This keeps the UI and data synchronized and makes validation straightforward.

**Minimal syntax**
```jsx
import { useState } from "react";

const [email, setEmail] = useState("");

<input
  type="email"
  value={email}                    // value comes from state
  onChange={(e) => setEmail(e.target.value)}  // state updates on typing
/>
```

**Why use them**
- Single source of truth for form data.
- Easy to validate and conditionally render error messages.
- Predictable behavior across browsers.

---

### Error Rendering (Syntax Pattern)
**Purpose**: Display feedback next to the fields that failed validation.

**Minimal syntax**
```jsx
// errors: an object like { email: "message", password: "message" }
{errors.email && <p className="error">{errors.email}</p>}
```

---

## ✅ Checklist Before Submitting the Lab

Before submitting, make sure you have completed the following:

- [ ] Installed all dependencies (`npm install` and `npm i react-router-dom`)
- [ ] The app runs successfully using `npm run dev`
- [ ] Routing works for **Home**, **About**, and **Registration** pages
- [ ] Registration form contains:
  - [ ] Email field  
  - [ ] Password field  
  - [ ] Gender selection (radio buttons)
- [ ] All fields are **required**
- [ ] Email validation checks for **“@”** and **“.com”**
- [ ] Inline error messages display under invalid fields
- [ ] Alert message shows only when the form is successfully submitted
- [ ] Code is clean, indented properly, and runs without console errors
- [ ] Do **not** modify any CSS files (styling is already provided)

---
