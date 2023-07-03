import { component$ } from "@builder.io/qwik";
import Card from "../card/card";

export default component$(({ posts }: { posts: any[] }) => {
  return (
    <div class="grid grid-cols-4 gap-4">
      {posts.map((item: any) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
});
