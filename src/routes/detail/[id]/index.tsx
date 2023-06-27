import { component$ } from "@builder.io/qwik";
import {
  DocumentHeadProps,
  useLocation,
} from "@builder.io/qwik-city";
import Section from "~/components/section/section";
import DetailCoffee from "~/resources/detail-coffee";


export default component$(() => {
  const location = useLocation();
  const id = location.params.id;


  return (
    <>
      <Section>
        <DetailCoffee id={id} />
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
