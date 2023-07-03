//@ts-ignore
import { useQuery } from "qwikql-ext";
import { useContext, useResource$, useVisibleTask$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { ALL_POST } from "~/queries/get-coffees";
import { GlobalQwikCityContext, PostInterface } from "~/contexts/global.ctx";
import { add, getAll } from "~/idb-local";

/**
 *  Retrive all post from idb or resource
 * @returns 
 */
export const useGetAll = () => {
  const globalCtx = useContext(GlobalQwikCityContext)
  const { executeQuery$ } = useQuery(ALL_POST);

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
    if(isBrowser){
      for (const datum of list){
        console.log(datum)
        await add<PostInterface>(datum)
      }
      const getLocal = await getAll<PostInterface[]>(globalCtx.page ?? 1, 8)
      globalCtx.items = getLocal
      globalCtx.filter = getLocal
    }

    return list
  });

  useVisibleTask$(async() => {
    for (const datum of await data$.value){
      console.log(datum)
      await add<PostInterface>(datum)
    }
    const getLocal = await getAll<PostInterface[]>(globalCtx.page ?? 1, 8)
    globalCtx.items = getLocal
    globalCtx.filter = getLocal
  })

  return data$;
};
