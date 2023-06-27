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

export const GlobalQwikCityContext = createContextId<GlobalCTX>("__global__");
