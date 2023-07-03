
import {
  Resource,
  component$,
  useStore,
} from "@builder.io/qwik";
import {
  DocumentHeadProps,
  useLocation,
} from "@builder.io/qwik-city";
import Section from "~/components/section/section";
import Button from "~/components/button/button";
import { useGet } from "~/hooks/use-get";
import { useUpdate } from "~/hooks/use-update";
import { PostInterface } from "~/contexts/global.ctx";
import { useDel } from "~/hooks/use-delete";

export default component$(() => {
  const id = useLocation().params.id;
  const formState = useStore<PostInterface>({
    id: "",
    title: "",
    body: "",
  });

  const getData$ = useGet(id, formState);
  const { updateData$, updateDataPayload$ } = useUpdate(id, formState);
  const { deleteData$, deleteDataPayload$ } = useDel(id);

  return (
    <>
      <Section>
        <Resource
          value={getData$}
          onResolved={() => (
            <>
              <div class="p-4">
                <h1 class="text-5xl">
                  #({formState.id}) {formState.title}
                </h1>
                <p class="font-secondary py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore asperiores unde earum blanditiis facere nesciunt
                  dignissimos! Dignissimos minus obcaecati tempora quasi est
                  perspiciatis, ipsam sunt harum! Totam soluta, id dignissimos,
                  doloremque quasi magnam odit accusantium, et natus
                  voluptatibus nihil fugiat.
                </p>
              </div>
              <form preventdefault:submit class="grid gap-3">
                <input
                  class="transition-all px-4 read-only:opacity-10 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
                  placeholder="Title..."
                  type="text"
                  name="name"
                  readOnly={updateDataPayload$.result?.loading}
                  value={formState.title}
                  onInput$={(_, ev) => (formState.title = ev.value)}
                />
                <input
                  class="transition-all px-4 read-only:opacity-10 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
                  placeholder="Body..."
                  type="text"
                  name="name"
                  readOnly={updateDataPayload$.result?.loading}
                  value={formState.body}
                  onInput$={(_, ev) => (formState.body = ev.value)}
                />

                <div class="flex gap-2">
                  <Button
                    onClick$={updateData$}
                    disable={updateDataPayload$.result?.loading}
                    label={updateDataPayload$.loading ? "Updating..." : "Update"}
                  />
                     <Button
                    onClick$={deleteData$}
                    disable={deleteDataPayload$.result?.loading}
                    label={deleteDataPayload$.loading ? "Deleting..." : "Delete"}
                  />
                 
                </div>
              </form>
            </>
          )}
          onPending={() => <>Pending!</>}
          onRejected={() => <>Reject</>}
        ></Resource>
      </Section>
      <Section>
        <div class="p-4"></div>
      </Section>
    </>
  );
});

export const head = ({ params }: DocumentHeadProps) => {
  const id = params.id;
  return {
    title: `[${id}] Qwik + Interview`,
    meta: [
      {
        name: "description",
        content: "Qwik site description",
      },
    ],
  };
};
