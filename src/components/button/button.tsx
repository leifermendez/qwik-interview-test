import type { JSXNode, QRL } from "@builder.io/qwik";

export default (props: {
  class?: string;
  label?: string;
  icon?: JSXNode;
  highlight?: boolean;
  onClick$?: QRL<any>;
  disable?:boolean
  type?: "submit" | "button";
}) => {
  return (
    <button
      onClick$={props.onClick$}
      type={props.type ?? 'button'}
      disabled={props.disable}
      class={[
        "transition-all disabled:opacity-10 min-w-[200px] items-center bg-white/30 px-4 py-2 font-primary text-2xl flex cursor-pointer gap-2  relative rounded-3xl w-fit shadow-2xl  hover:bg-white/50 hover:-translate-y-1 transform-gpu",
        props.highlight
          ? " shadow-emerald-500"
          : "  shadow-gray-300  hover:shadow-gray-500",
      ]}
    >
      <span>{props.icon}</span>
      <span>{props.label}</span>
    </button>
  );
};