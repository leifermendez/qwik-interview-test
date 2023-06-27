import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section
      class={
        "flex container mx-auto max-w-4xl relative flex-col py-2   justify-center  px-4 lg:px-0 "
      }
    >
      <div class="h-full">
        <Slot />
      </div>
    </section>
  );
});
