//@ts-ignore
import { useQuery } from "qwikql-ext";
import { useResource$ } from "@builder.io/qwik";
import { GET_POST } from "~/queries/get-detail";
import { FormStateType } from "~/types/form";

export const useGetDetail = (id: string, formData:FormStateType) => {
  const { executeQuery$ } = useQuery(GET_POST);

  const data$ = useResource$(async () => {
    const dataRaw = await executeQuery$({
      variables: {
        id: id,
      },
    });

    formData.id = dataRaw.post.id;
    formData.title = dataRaw.post.title;
    formData.body = dataRaw.post.body;
    return formData;
  });

  return data$;
};
