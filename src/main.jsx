import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { ToastProvider } from "./context/toastContext";
import { ClerkProvider } from '@clerk/clerk-react'
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

ReactDOM.createRoot(document.getElementById("root")).render(
<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider> 
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>
</ClerkProvider>  
);
