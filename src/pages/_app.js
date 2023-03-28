import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "component/common/DashboardLayout";
import "styles/globals.css";
import "styles/DashboardLayout.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const {
    auth: { isUser },
  } = store.getState();

  useEffect(() => {
    setTimeout(() => {
      checkIsUserExist();
    }, 200);
  }, []);

  const checkIsUserExist = () => {
    if (isUser && router?.pathname === "/login") {
      router.replace("/home");
    }
  };

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
        </PersistGate>
      </Provider>
    </>
  );
}
