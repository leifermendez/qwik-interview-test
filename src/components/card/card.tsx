import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface CardProps {
  title: string;
  url: string;
  id: string;
}

export default component$(({ title, id }: CardProps) => {
  return (
    <>
      <Link href={`/detail/${id}`} class="relative" title={title}>
        <div
          class={
            " flex h-[200px] w-[250px] cursor-pointer gap-2 text-2xl p-1 relative rounded-3xl bg-white/50  shadow-2xl   hover:bg-white/50 hover:-translate-y-1 transform-gpu transition-all shadow-gray-300  hover:shadow-gray-500"
          }
        >
          <div class="p-2 text-4xl">{id}</div>
          <div class="text-xs left-0 bg-white/90 rounded-3xl m-2 absolute bottom-0 p-2 font-secondary">
            {title}
          </div>
        </div>
      </Link>
    </>
  );
});
