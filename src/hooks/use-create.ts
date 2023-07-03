//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { PostInterface, UIGlobalToastContext } from "~/contexts/global.ctx";
import { CREATE_POST } from "~/queries/create-detail";
import { add } from "~/idb-local";

export const useCreate = (formData: { title: string; body: string }) => {
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateCreate$ = useMutation(CREATE_POST);

  const createData$ = $(async () => {
    uiGlobalToast.time = 3000;
    uiGlobalToast.visible = true;
    uiGlobalToast.message = "Created!";

    if (isBrowser) {
      const newValue = {id:'',...formData}
      await add<PostInterface>(newValue, true)
    }

    return mutateCreate$.mutate$({
      input: {
        title: formData.title,
        body: formData.body,
      },
    });
  }) as unknown as any;

  return { createData$, createDataPayload$: mutateCreate$ };
};
