import { $, component$, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Section from "~/components/section/section";
import Button from "~/components/button/button";
import { FormStateType } from "~/types/form";
import { useCreateDetail } from "~/hooks/use-create-detail";

export default component$(() => {
  const navigation = useNavigate()
  const formState = useStore<FormStateType>({
    id: "",
    title: "",
    body: "",
  });

  const { createData$, createDataPayload$ } = useCreateDetail(formState);
  
  const returnBack = $(() => navigation('/'))

  return (
    <>
      <Section>
        <div class="p-4">
          <h1 class="text-5xl">
            Create new
          </h1>
          <p class="font-secondary py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            asperiores unde earum blanditiis facere nesciunt dignissimos!
            Dignissimos minus obcaecati tempora quasi est perspiciatis, ipsam
            sunt harum! Totam soluta, id dignissimos, doloremque quasi magnam
            odit accusantium, et natus voluptatibus nihil fugiat.
          </p>
        </div>
        <form preventdefault:submit class="grid gap-3">
          <input
            class="transition-all px-4 read-only:opacity-10 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
            placeholder="Title..."
            type="text"
            name="name"
            readOnly={createDataPayload$.result?.loading}
            value={formState.title}
            onInput$={(_, ev) => (formState.title = ev.value)}
          />
          <input
            class="transition-all px-4 read-only:opacity-10 py-3 rounded-3xl w-full grid place-content-center outline-none font-secondary text-sm"
            placeholder="Body..."
            type="text"
            name="name"
            readOnly={createDataPayload$.result?.loading}
            value={formState.body}
            onInput$={(_, ev) => (formState.body = ev.value)}
          />

          <div class="flex gap-2">
            <Button
              onClick$={createData$}
              disable={createDataPayload$.result.loading}
              label={createDataPayload$.loading ? "Creating..." : "Create"}
            />
            <Button
              onClick$={returnBack}
              label={"Go back"}
            />
          </div>
        </form>
      </Section>
      <Section>
        <div class="p-4"></div>
      </Section>
    </>
  );
});

export const head = () => {
  return {
    title: `Qwik + Interview`,
    meta: [
      {
        name: "description",
        content: "Qwik site description",
      },
    ],
  };
};
