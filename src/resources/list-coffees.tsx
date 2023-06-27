//@ts-ignore
import { useQuery } from "qwikql-ext";
import {
  Resource,
  component$,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import Gallery from "~/components/gallery/gallery";
import { GlobalQwikCityContext } from "~/contexts/global.ctx";
import { LIST_POSTS } from "~/queries/get-coffees";

export default component$(() => {
  const globalCtx = useContext(GlobalQwikCityContext);
  const { executeQuery$ } = useQuery(LIST_POSTS);

  const data$ = useResource$(async ({ track }) => {
    track(() => globalCtx.page);

    const dataRaw = await executeQuery$({
      variables: {
        options: {
          paginate: {
            page: globalCtx.page ?? 1,
            limit: 8,
          },
        },
      },
    });
    const list = dataRaw.posts.data;
    globalCtx.items = list;
    globalCtx.filter = list;
    return list;
  });

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
