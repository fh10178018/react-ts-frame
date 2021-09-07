/**
 * 打印欢迎
 */


export default function welcome() {
  const str = `Welcome to React H5 version    【${process.env.REACT_APP_VERSION}】`;
  const welcome = str.padEnd(58)
  const welcomeMessage = `
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃${welcome}┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `;
  const color = 'green';
  console.log(`%c${welcomeMessage}`, `color: ${color}`);
}
