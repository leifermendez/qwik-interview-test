import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "~/components/header/header";
import { GlobalCTX, GlobalQwikCityContext } from "~/contexts/global.ctx";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const globalStore = useStore<GlobalCTX>({
    src: "",
    items: [],
    filter: [],
    page: 1,
  });
  useContextProvider(GlobalQwikCityContext, globalStore);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});
