import { createContextId } from "@builder.io/qwik";

export interface PostInterface {
  id:string
  title:string
  body:string
}

export interface GlobalCTX {
  src: string;
  filter: PostInterface[];
  items: PostInterface[];
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
