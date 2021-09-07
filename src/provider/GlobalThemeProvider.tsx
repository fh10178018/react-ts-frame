/**
 * 主题样式和变量修改处
 */

import React from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProps,
  ThemeProvider,
} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: ThemeProps<DefaultTheme>) =>
      props.theme.colors.bgColor};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

// 主题样式变量，类型扩展声明在style.d.ts中
const theme: DefaultTheme = {
  colors: {
    bgColor: "#282c34",
  },
};

const GlobalThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default GlobalThemeProvider;
