import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import Section from "~/components/section/section";

import Button from "~/components/button/button";
import ListCoffees from "~/resources/list-coffees";
import SectionTitle from "~/components/section-title/section-title";
import { GlobalQwikCityContext } from "~/contexts/global.ctx";

export default component$(() => {
  const globalCtx = useContext(GlobalQwikCityContext);
  const navigation = useNavigate();
  const handlerNextPage = $(() => (globalCtx.page += 1));
  const handlerPrevPage = $(() => (globalCtx.page -= 1));
  const handlerNew = $(() => navigation("/detail"));

  return (
    <>
      <Section>
        <div class="p-4">
          <h1 class="text-5xl">Do you like the coffee?</h1>
          <p class="font-secondary py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            asperiores unde earum blanditiis facere nesciunt dignissimos!
            Dignissimos minus obcaecati tempora quasi est perspiciatis, ipsam
            sunt harum! Totam soluta, id dignissimos, doloremque quasi magnam
            odit accusantium, et natus voluptatibus nihil fugiat.
          </p>
          <div>
            <Button highlight onClick$={handlerNew} label="Create new" />
          </div>
        </div>
      </Section>
      <Section>
        <div class="p-4">
          <SectionTitle title="Where is the best coffee?" />
          <p class="font-secondary py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div>
          <ListCoffees />
        </div>
      </Section>
      <Section>
        <div class="flex py-5 pb-20 justify-between">
          <Button
            disable={globalCtx.page <= 1}
            type="button"
            label="prev"
            onClick$={handlerPrevPage}
          />
          <Button
            type="button"
            highlight
            label="next"
            onClick$={handlerNextPage}
          />
        </div>
      </Section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik + Interview",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
