import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";
import { useRouter } from "next/router";
import DashboardLayout from "component/common/DashboardLayout";
import { ToastContainer } from "react-toastify";
import "styles/globals.css";
import "styles/DashboardLayout.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const {
    auth: { isUser },
  } = store.getState();

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {isUser ? (
            router?.route == "/messages" ? null : (
              <DashboardLayout />
            )
          ) : null}
          <Component {...pageProps} />;
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
}
