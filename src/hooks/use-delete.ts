//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, useContext } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { UIGlobalToastContext } from "~/contexts/global.ctx";
import { DELETE_POST } from "~/queries/delete-detail";
import { useNavigate } from "@builder.io/qwik-city";
import { softDelete } from "~/idb-local";

export const useDel = (
  id: string,
) => {
  const uiGlobalToast = useContext(UIGlobalToastContext);
  const mutateDelete$ = useMutation(DELETE_POST);

  const navigate = useNavigate();

  const deleteData$ = $(async() => {
    uiGlobalToast.time = 3000
    uiGlobalToast.visible = true
    uiGlobalToast.message = 'Deleted!'

    navigate('/')

    if(isBrowser){
      await softDelete(id)
    }

    return mutateDelete$.mutate$({
      id: id
    })
  }) as unknown as any;

  return { deleteData$, deleteDataPayload$: mutateDelete$ };
};
