//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext } from "@builder.io/qwik";
import { UIGlobalToastContext } from "~/contexts/global.ctx";
import { CREATE_POST } from "~/queries/create-detail";

export const useCreateDetail = (formData: { title: string; body: string }) => {
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateCreate$ = useMutation(CREATE_POST);

  const createData$ = $(() => {
    uiGlobalToast.time = 3000;
    uiGlobalToast.visible = true;
    uiGlobalToast.message = "Created!";

    return mutateCreate$.mutate$({
      input: {
        title: formData.title,
        body: formData.body,
      },
    });
  }) as unknown as any;

  return { createData$, createDataPayload$: mutateCreate$ };
};
