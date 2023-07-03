//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext, useSignal } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { UPDATE_POST } from "~/queries/update-detail";
import { PostInterface, UIGlobalToastContext } from "~/contexts/global.ctx";
import { update } from "~/idb-local";

export const useUpdate = (
  id: string,
  formData: { title: string; body: string }
) => {

  const inState = useSignal<PostInterface>({id, body:'',title:''})
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateUpdate$ = useMutation(UPDATE_POST);
  
  const updateData$ = $(async() => {
    uiGlobalToast.time = 3000
    uiGlobalToast.visible = true
    uiGlobalToast.message = 'Updated!'

    if(isBrowser){
      inState.value.title = formData.title
      inState.value.body = formData.body
      await update(inState.value)
    }

    return mutateUpdate$.mutate$({
      id: id,
      input: {
        body: formData.body,
      },
    })
  }) as unknown as any;

  return { updateData$, updateDataPayload$: mutateUpdate$ };
};
