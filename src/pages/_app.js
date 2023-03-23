import "styles/globals.css";
import "styles/DashboardLayout.css";
import DashboardLayout from "component/common/DashboardLayout";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <DashboardLayout /> */}
      <Component {...pageProps} />;
    </>
  );
}
