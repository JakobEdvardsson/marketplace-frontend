"use client";

import { ProductCondition } from "@/utils/api-call-types";
import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mutateAllInboxMessages } from "@/utils/api-calls-swr";
import { getInboxMessageById } from "@/utils/api-calls";
import { useRouter } from "next/navigation";

export default function ProductCardIsRead(props: {
  readonly productInfo: ProductGetResponseDTO;
  readonly isRead: boolean;
}) {
  const router = useRouter();

  const createdAt: Date = new Date(props.productInfo.createdAt);

  const handleClickButton = () => {
    setTimeout(() => {
      getInboxMessageById(props.productInfo.productId)
        .then((_) => {
          mutateAllInboxMessages();
        })
        .catch((e) => {
          console.log(e);
        });
    }, 0);
    router.push(`/product/${props.productInfo.productId}`);
  };

  return (
    <div className="sm:h-48 sm:w-2/3 sm:flex-row m-2 flex h-96 w-9/12 flex-col items-center rounded-2xl bg-gray-100 p-2  shadow-md">
      {/*Image*/}
      <Image
        src={props.productInfo.imageUrls[0] || "/images/emptyImage.jpg"}
        className="sm:mr-2 sm:h-full sm:w-2/5 mr-0 h-2/3 w-full rounded-2xl object-contain"
        alt="Product Image"
        width={1000}
        height={1000}
      />

      {/*Description*/}

      <div className="sm:mt-0 sm:w-3/5 mt-2 flex h-auto w-full flex-col justify-around rounded-2xl bg-gray-50 p-3">
        <div>
          <p className="truncate">{props.productInfo.name}</p>
          <p>
            {ProductCondition[props.productInfo.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>
          {props.productInfo.productionYear && (
            <p>Year: {props.productInfo.productionYear}</p>
          )}
          <b>{props.productInfo.price} kr</b>
        </div>

        <div className="flex h-full flex-row  flex-wrap items-end justify-between align-top">
          <p>
            {createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>
          {props.isRead ? null : (
            <p className="animate-pulse bg-blue-500">New!</p>
          )}
          <Button
            className="bg-red-400 px-4 py-2 hover:bg-red-600"
            type="button"
            onClick={handleClickButton}
          >
            See more!
          </Button>
        </div>
      </div>
    </div>
  );
}
