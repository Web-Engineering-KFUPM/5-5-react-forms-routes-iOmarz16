// ================================================================
// PROJECT SETUP INSTRUCTIONS
// ================================================================
//
// Follow these steps to set up and run your React project:
//
// 1) Open your terminal and navigate into the project folder.
//    Example:
//      cd 5-5-react-route-form
//
// 2) Install all required dependencies.
//    Command:
//      npm i
//      (or)
//      npm install
//
// 3) Install React Router to handle routing between pages.
//    Command:
//      npm i react-router-dom
//
// 4) Start your local development server.
//    Command:
//      npm run dev
//
// 5) If your system blocks npm commands due to execution policy,
//    run the following command in PowerShell to allow temporary execution:
//
//      Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//
//    After running that, re-run the npm commands again.
//
// Note: To complete the TODO 2, first implement the TODO 1.
//
// ===========================
// TODO #1: Apply React Router
// ===========================
//
// Goal: Add routing for three pages: Home, About, Registration
//
// 1) Import router primitives from react-router-dom
//    HINT: import { Routes, Route, NavLink } from "react-router-dom";
//
// 2) Import your three page components
//    HINT: import Home from "./pages/Home";
//          import About from "./pages/About";
//          import Registration from "./pages/Registration";
//
// 3) Add a simple navbar with NavLink items for "/", "/about", "/registration" inside the <div className="links">.
//    HINT: <NavLink to="/" end className="navlink">PAGE_NAME/NavLink>
//    / is only used for the home page, for other pages write their name in the to="" attribute, like /about.
//
// 4) Define <Routes> with three <Route> entries inside the <main className="container">:
//      "/"            -> <Home />
//      "/about"       -> <About />
//      "/registration"-> <Registration />
//    HINT: <Routes><Route path="/" element={<Home />} /> ... </Routes>
//
// 5) Add a catch-all 404 route using path="*" and element={<h2>404 — Not Found</h2>} inside the <Routes>.
//
// NOTE:
// - Don’t change any CSS.
//
// ================================================================
// TODO #2: Add password & gender fields, make all fields required,
//          and validate the email (must contain "@" and end with ".com").
//          Finally, show the provided alert ONLY on successful submit.
// ================================================================
//
// Goal: Extend the registration form with more input fields and validations.
//
// 1) Add new state variables at the top of the component for password and gender.
//    Hint:
//      const [password, setPassword] = useState("");
//      const [gender, setGender] = useState("");
//
// 2) Below the email input, create a password field inside a <div className="form-row">.
//    Hint:
//      <label htmlFor="password">Password</label>
//      <input
//        id="password"
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//      />
//
// 3) Add gender selection below the password field inside the <fieldset className="form-row">.
//    Use two radio inputs with the same name="gender" so they act as one group.
//    Example (just structure):
//      <fieldset className="form-row">
//        <legend>Gender</legend>
//        <label className="radio">
//          <input
//            type="radio"
//            name="gender"
//            value="male"
//            checked={gender === "male"}
//            onChange={(e) => setGender(e.target.value)}
//          /> Male
//        </label>
//      </fieldset>
//
// 4) Inside handleSubmit(), make sure all fields are mandatory and validate the email.
//    You can do this by building an errors object and checking each field.
//
//    Hint:
//      const nextErrors = {};
//
//      // Email validation
//      if (!email.trim()) nextErrors.email = "Email is required";
//      else if (!(email.includes("@") && email.endsWith(".com")))
//        nextErrors.email = "Enter a valid email address";
//
//      // Password validation
//      if (!password.trim()) nextErrors.password = "Password is required";
//
//      // Gender validation
//      if (!gender) nextErrors.gender = "Please select your gender";
//
//      setErrors(nextErrors);
//      if (Object.keys(nextErrors).length > 0) return; // stop form submit if errors
//
// 5) Show small <p className="error"> under each invalid input
//    Hint:
//      {errors.password && <p className="error">{errors.password}</p>}
//
// 6) Disable the "Register" button until all fields are filled
//    Hint:
//      <button type="submit" disabled={!email || !password || !gender}>Register</button>
//
// 7) SUCCESS ALERT (important):
//    There is an alert message commented in handleSubmit. You should show this alert
//    ONLY when the form passes validation. Place it AFTER the error check so it runs
//    only on success.
//    Hint (where to place it):
//      setErrors(nextErrors);
//      if (Object.keys(nextErrors).length > 0) return;  // errors exist → do NOT alert
//      // Place (or uncomment) the alert HERE so it runs only when there are no errors.
//      // Example:
//      // alert(`User Registered: ${email})`);
//
// NOTE:
// - Don’t change any CSS — the form and error styles are already provided.
// - Use the hints above to guide your implementation, but write the actual JSX and logic yourself.
// ================================================================


export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">🧑‍💻 Student Portal</div>
        <div className="links">
          {/*Nav links*/}
        </div>
      </nav>

      <main className="container">
        {/*Routes*/}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} React Student Portal</span>
      </footer>
    </div>
  );
}
