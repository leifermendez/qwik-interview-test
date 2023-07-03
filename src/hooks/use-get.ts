//@ts-ignore
import { useQuery } from "qwikql-ext";
import { useResource$, useVisibleTask$ } from "@builder.io/qwik";
import { GET_POST } from "~/queries/get-detail";
import { FormStateType } from "~/types/form";
import { get } from "~/idb-local";
import { PostInterface } from "~/contexts/global.ctx";

export const useGet = (id: string, formData:FormStateType) => {
  const { executeQuery$ } = useQuery(GET_POST);

  const data$ = useResource$(async () => {
    const dataRaw = await executeQuery$({
      variables: {
        id: id,
      },
    });

    return dataRaw.post;
  });

  useVisibleTask$(async({track}) => {
    track(() => formData.id);
    const data = await get<PostInterface>(id)
    formData.id = data.id;
    formData.title =  data.title
    formData.body = data.body
  })

  return data$;
};
