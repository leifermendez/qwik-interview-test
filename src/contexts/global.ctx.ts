import { createContextId } from "@builder.io/qwik";

export interface CoffeesInterface {
  url: string;
  title: string;
  category: string;
}

export interface GlobalCTX {
  src: string;
  filter: CoffeesInterface[];
  items: CoffeesInterface[];
  page: number;
}
export interface UIGlobalToastCTX {
  message: string;
  visible: boolean;
  time: number;
}

export const GlobalQwikCityContext = createContextId<GlobalCTX>("__global__");
export const UIGlobalToastContext =
  createContextId<UIGlobalToastCTX>("__uiglobal__");
