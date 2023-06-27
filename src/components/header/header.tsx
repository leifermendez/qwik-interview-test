import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const menu = useSignal<{ label: string; href: string }[]>([
    {
      label: "Github",
      href: "https://github.com/leifermendez",
    },
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/leifermendez/",
    },
    {
      label: "Qwik PR",
      href: "https://github.com/BuilderIO/qwik/pulls?q=is%3Apr+author%3Aleifermendez+",
    },
  ]);

  return (
    <>
      <header
        class={
          "bg-transparent z-10  h-[65px]  items-center  w-full md:w-full md:flex lg:w-full"
        }
      >
        <ul class={"flex w-full h-full relative items-center justify-center"}>
          {menu.value.map((item) => (
            <li
              class={
                "px-3 first:border-l-0 hover:bg-gray-200/40 cursor-pointer h-full flex items-center border-l-0"
              }
            >
              <a target="_blank" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
});
