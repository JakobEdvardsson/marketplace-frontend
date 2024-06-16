"use client";

import { ProductGetResponseDTO } from "@/types/endpoint-types-incoming";
import Image from "next/image";
import { mutateAllInboxMessages } from "@/utils/api-calls-swr";
import { getInboxMessageById } from "@/utils/api-calls";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductCardIsRead(props: {
  readonly product: ProductGetResponseDTO;
  readonly isRead: boolean;
}) {
  const { product } = props;
  const createdAt: Date = new Date(product.createdAt);
  const currencyFormat = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  const router = useRouter();

  const handleClickButton = () => {
    setTimeout(() => {
      getInboxMessageById(product.productId)
        .then((_) => {
          mutateAllInboxMessages();
        })
        .catch((e) => {
          console.log(e);
        });
    }, 0);
    router.push(`/product/${product.productId}`);
  };

  return (
    <div className="relative flex h-96 w-full flex-col sm:h-48 sm:flex-row">
      <Image
        src={product.imageUrls[0] || "/images/emptyImage.jpg"}
        className="h-2/3 rounded bg-gray-50 object-contain sm:h-full sm:w-2/5"
        alt="Product Image"
        width={1000}
        height={1000}
      />
      <div className="mt-2 flex h-auto w-full flex-col sm:mt-0 sm:w-3/5 sm:pl-3">
        <div className="flex justify-between">
          <Link
            href={`/?category=${product.productCategory.name}`}
            className="z-10 text-gray-600 hover:underline"
          >
            <div className="first-letter:uppercase">
              {product.productCategory.name}
            </div>
          </Link>
          <p className="text-gray-500">
            {createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              " " +
              createdAt.getHours() +
              ":" +
              createdAt.getMinutes()}
          </p>
        </div>

        <Link
          className="after:absolute after:inset-0 hover:underline"
          href={`/product/${product.productId}`}
          onMouseDown={() => handleClickButton()}
        >
          {product.name}
        </Link>

        {props.isRead ? null : (
          <div className="flex w-fit rounded bg-blue-200 p-1 text-blue-600">
            <Image
              src="/images/notif.svg"
              alt="Notification"
              width={20}
              height={20}
            />
            <p className="mx-1">New</p>
          </div>
        )}

        <div className="flex grow flex-row" />

        <div className="flex justify-between">
          <p className="text-lg font-bold">
            {currencyFormat.format(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
