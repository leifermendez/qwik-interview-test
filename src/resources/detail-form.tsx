//@ts-ignore
import { useMutation } from "qwikql-ext";
import { $, component$, useSignal } from "@builder.io/qwik";
import Button from "~/components/button/button";
import { UPDATE_POST } from "~/queries/update-detail";
import { DELETE_POST } from "~/queries/delete-detail";
import { useNavigate } from "@builder.io/qwik-city";

export default component$((props: { id: string }) => {
  const bodySignal = useSignal("");
  const navigate = useNavigate();

  const mutateUpdate$ = useMutation(UPDATE_POST);
  const mutateDelete$ = useMutation(DELETE_POST);

  /**
   * Handlers
   */
  const handlerUpdate = $(() =>
    mutateUpdate$.mutate$({
      id: props.id,
      input: {
        body: bodySignal.value,
      },
    })
  );
  const handlerDelete = $(() => {
    mutateDelete$.mutate$({
      id: props.id,
    });
    if (!mutateDelete$.result.loading) navigate("/");
  });

  /**
   * Component
   */

  return (
    <>
      {mutateUpdate$.result.error && (
        <div>ERROR: {mutateUpdate$.result.error.message}</div>
      )}
      <form preventdefault:submit class="grid gap-3">
        <input
          class="px-4 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
          placeholder="Body..."
          type="text"
          name="name"
          bind:value={bodySignal}
        />

        <div class="flex gap-2">
          <Button
            onClick$={handlerUpdate}
            disable={mutateUpdate$.result.loading}
            label={mutateUpdate$.loading ? "Updating..." : "Update"}
          />
          <Button
            onClick$={handlerDelete}
            disable={mutateDelete$.result.loading}
            label={mutateDelete$.loading ? "Deleting..." : "Delete"}
          />
        </div>
      </form>
    </>
  );
});
