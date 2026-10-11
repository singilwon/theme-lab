import "styled-components";
import type { AppTheme } from "../themes/theme";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
