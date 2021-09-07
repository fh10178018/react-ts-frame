/**
 * 主题变量类型修改处，添加变量之后，一定要在此扩展对应类型
 */

import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
    };
  }
}