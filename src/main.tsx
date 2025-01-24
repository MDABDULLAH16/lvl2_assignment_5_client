import { createRoot } from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { ServiceProvider } from "./utils/serviceIdContext.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ServiceProvider>
        <RouterProvider router={router} />
      </ServiceProvider>
    </PersistGate>
  </Provider>
);
