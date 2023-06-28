//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext } from "@builder.io/qwik";
import { UPDATE_POST } from "~/queries/update-detail";
import { UIGlobalToastContext } from "~/contexts/global.ctx";

export const useUpdateDetail = (
  id: string,
  formData: { title: string; body: string }
) => {
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateUpdate$ = useMutation(UPDATE_POST);
  
  const updateData$ = $(() => {
    uiGlobalToast.time = 3000
    uiGlobalToast.visible = true
    uiGlobalToast.message = 'Updated!'

    return mutateUpdate$.mutate$({
      id: id,
      input: {
        body: formData.body,
      },
    })
  }) as unknown as any;

  return { updateData$, updateDataPayload$: mutateUpdate$ };
};
