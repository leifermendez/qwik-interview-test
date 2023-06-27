import {
  component$,
  useSignal,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { GlobalQwikCityContext } from "~/contexts/global.ctx";
import { IMagnify } from "~/icons/imagnify";

export default component$(({ title }: { title: string }) => {
  const toggle = useSignal(false);
  const src = useSignal("");
  const globalCtx = useContext(GlobalQwikCityContext);

  /**
   * Filter only browser with ctx
   */
  useTask$(({ track }) => {
    track(() => src.value);
    const updateCtx = () => {
      const currentList = globalCtx.items;
      globalCtx.filter = currentList.filter((item) => item.title.toLowerCase().includes(src.value.toLowerCase()))

    };
    globalCtx.src = src.value
    if (isBrowser) updateCtx();
  });

  return (
    <div class="relative ">
      {toggle.value ? (
        <input
          bind:value={src}
          class="px-4 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
          placeholder="Find the best coffe..."
          type="text"
        />
      ) : (
        <>
          <div class="flex-wrap flex justify-between items-center con">
            <h1 class="text-5xl">{title}</h1>
            <button
              onClick$={() => (toggle.value = !toggle.value)}
              class="transition-all px-4 py-2 font-primary text-2xl flex cursor-pointer gap-2  relative rounded-3xl w-fit shadow-2xl hover:shadow-emerald-500 hover:bg-white/50 hover:-translate-y-1 transform-gpu"
            >
              <IMagnify />
            </button>
          </div>
        </>
      )}
    </div>
  );
});
