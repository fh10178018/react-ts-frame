import React, { useCallback, useRef } from "react";
import logo from "@/image/logo.svg";
import styled, { keyframes } from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;
const Header = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${Rotate} infinite 20s linear;
  }
`;

const AppLink = styled.a`
  color: #61dafb;
  font-size: 20px;
`;

function App() {
  const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

  const handleClick = useCallback(() => {
    const curInputRef = inputRef.current;
    if (curInputRef) {
      if (curInputRef.value) {
        const timestamp = new Date().getTime();
        localStorage.setItem(timestamp + "", curInputRef.value);
      }
    }
  }, [inputRef]);

  window.addEventListener("setItemEvent", function (value: any) {
    console.log(value);
  });

  return (
    <AppWrapper>
      <Header>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input ref={inputRef} />
        <button onClick={handleClick}>发送弹幕</button>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </Header>
    </AppWrapper>
  );
}

export default App;
