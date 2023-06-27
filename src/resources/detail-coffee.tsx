//@ts-ignore
import { useQuery } from "qwikql-ext";

import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { GET_POST } from "~/queries/get-detail";
import DetailForm from "./detail-form";



export default component$(
  (props: { id: string;}) => {
    const { executeQuery$ } = useQuery(GET_POST);

    const data$ = useResource$(async () => {
      const dataRaw = await executeQuery$({
        variables: {
          id: props.id,
        },
      });

      const list = dataRaw.post;
      return list;
    });

    return (
      <>
        <Resource
          value={data$}
          onResolved={(data) => (
            <>
              <div class="p-4">
                <h1 class="text-5xl">#({data.id}) {data.title}</h1>
                <p class="font-secondary py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore asperiores unde earum blanditiis facere nesciunt
                  dignissimos! Dignissimos minus obcaecati tempora quasi est
                  perspiciatis, ipsam sunt harum! Totam soluta, id dignissimos,
                  doloremque quasi magnam odit accusantium, et natus
                  voluptatibus nihil fugiat.
                </p>
              </div>
              <DetailForm {...data} />
            </>
          )}
          onPending={() => <>Pending!</>}
          onRejected={() => <>Reject</>}
        ></Resource>
      </>
    );
  }
);
