import React from "react";
import ReactDOM from "react-dom";
import App from "@/page/App";
import reportWebVitals from "./reportWebVitals";
import GlobalThemeProvider from "./provider/GlobalThemeProvider";
import welcome from "@/utils/welcome";
import { listenLocalStorage } from "@/utils/storageEmitter";

listenLocalStorage();
welcome();
ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <App />
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/**
 * web-vitals是Google发起的，其中有三个关键指标（CLS、FID、LCP）和两个辅助指标（FCP、TTFB）
 * 可以传参，观察数据，如下所示
 */
reportWebVitals(console.log);
