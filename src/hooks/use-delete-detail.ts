//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext } from "@builder.io/qwik";
import { UIGlobalToastContext } from "~/contexts/global.ctx";
import { DELETE_POST } from "~/queries/delete-detail";
import { useNavigate } from "@builder.io/qwik-city";

export const useDeleteDetail = (
  id: string,
  formData: { title: string; body: string }
) => {
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateDelete$ = useMutation(DELETE_POST);

  const navigate = useNavigate();

  const deleteData$ = $(() => {
    uiGlobalToast.time = 3000
    uiGlobalToast.visible = true
    uiGlobalToast.message = 'Deleted!'

    navigate('/')

    return mutateDelete$.mutate$({
      id: id,
      input: {
        body: formData.body,
      },
    })
  }) as unknown as any;

  return { deleteData$, deleteDataPayload$: mutateDelete$ };
};
