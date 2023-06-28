import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { UIGlobalToastContext } from "~/contexts/global.ctx";

export default component$(() => {
  const globalUICtx = useContext(UIGlobalToastContext);

  useVisibleTask$(({ track }) => {
    track(() => globalUICtx.time);
    if (isBrowser) {
      setTimeout(() => {
        globalUICtx.visible = false;
        globalUICtx.time = 0;
      }, globalUICtx.time);
    }
  });

  return (
    <>
      {globalUICtx.visible && (
        <div class="bg-emerald-300 fixed bottom-5 left-5 p-4 rounded-md">
          {globalUICtx.message}
        </div>
      )}
    </>
  );
});
