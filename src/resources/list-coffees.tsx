import {
  Resource,
  component$,
  useContext,
} from "@builder.io/qwik";
import Gallery from "~/components/gallery/gallery";
import { GlobalQwikCityContext } from "~/contexts/global.ctx";
import { useGetAll } from "~/hooks/use-get-all";

export default component$(() => {
  const globalCtx = useContext(GlobalQwikCityContext);
  const data$ = useGetAll()

  return (
    <>
      <Resource
        value={data$}
        onResolved={() => <Gallery posts={globalCtx.filter} />}
        onPending={() => (
          <div class=" min-h-[200px] grid place-content-center">Loading... page: {globalCtx.page}</div>
        )}
        onRejected={() => <>Reject</>}
      ></Resource>
    </>
  );
});
