"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";
import { useCart } from "@/components/CartContext";
import { useProductById, useProfile } from "@/utils/api-calls-swr";
import { useToast } from "@/components/ui/use-toast";
import { getMyProfile } from "@/utils/api-calls";
import { MyProfileResponseDTO } from "@/types/endpoint-types-incoming";
import Link from "next/link";

export default function Product({ id }: { readonly id: string }) {
  const { addToCart } = useCart();

  const { toast } = useToast();

  const { data: product } = useProductById(id);

  const { data: seller } = useProfile(product ? product.seller : null);

  const [whoAmI, setWhoAmI] = useState<MyProfileResponseDTO | undefined>();

  useEffect(() => {
    getMyProfile()
      .then((response) => {
        if (response.status === 401) {
          setWhoAmI(undefined);
          return;
        }

        response.json().then((res) => {
          setWhoAmI(res);
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: `Added ${product.name} to cart!`,
      });
    }
  };

  const renderFiles = () => {
    if (!product || !product.imageUrls || product.imageUrls.length === 0) {
      return null;
    }

    return product.imageUrls.map((url) => (
      <div key={product.name} className="mx-auto h-[60vh] w-full shrink-0 pr-2">
        <Image
          src={url}
          alt={product.name}
          className="size-full rounded object-contain"
          width={1000}
          height={1000}
        />
      </div>
    ));
  };

  return product ? (
    <div className="w-full">
      <div className="mb-2 flex space-x-2">
        <Link className="text-sm hover:underline" href="/">
          All categories
        </Link>
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <p className="text-sm text-gray-500">{product.productCategory.name}</p>
      </div>

      <div className="flex w-full overflow-x-auto bg-gray-200">
        {renderFiles()}
      </div>

      <h1 className="mt-3 text-3xl">{product.name}</h1>

      <div className="w-full">
        <p className="mt-3 text-3xl font-bold">{product.price + " kr"}</p>
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="w-fit">
          <h1 className="mr-2 mt-3 rounded border border-gray-300 p-1">
            Condition:{" "}
            {ProductCondition[product.condition]
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
        </div>
        {product.productionYear && product.productionYear !== 0 ? (
          <h1 className="mr-2 mt-3 rounded border border-gray-300 p-1">
            {"Production year: " + product.productionYear}
          </h1>
        ) : null}
        {product.color !== undefined &&
        product.color !== null &&
        product.color !== 0 ? (
          <div className="w-fit">
            <h1 className="mt-3 rounded border border-gray-300 p-1">
              {"Color: " +
                ProductColor[product.color]
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h1>
          </div>
        ) : null}
      </div>

      {product &&
      product.status === 0 &&
      whoAmI &&
      seller &&
      whoAmI.username !== seller.username ? (
        <div className="mt-4">
          <button
            type="button"
            className="rounded bg-blue-600 px-10 py-2 font-semibold text-white duration-200 hover:bg-blue-500 hover:drop-shadow-xl hover:ease-in-out"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      ) : null}

      <div className="mt-5">
        <h1 className="text-xl font-semibold">Description</h1>
        <div className="mt-2 w-full whitespace-pre-wrap font-light">
          {product.description}
        </div>
      </div>

      <div className="my-5 h-0.5 w-full shrink-0 bg-gray-300 dark:bg-slate-800" />

      <div className="w-full">
        <h1 className="text-lg font-semibold">Sold by:</h1>
        <div className="mt-2 flex items-center">
          <Image
            src="/images/default-profile-picture.svg"
            alt="Default Profile"
            width={50}
            height={50}
          />
          <p className="ml-2">
            {seller &&
              `${seller.firstName} ${seller.lastName} (${seller.username})`}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full">
      <div className="mb-2 flex space-x-2">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
        <Image src="/images/arrow.svg" alt="arrow" width="8" height="8" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="flex w-full bg-gray-200">
        <div className="h-64 w-full animate-pulse rounded bg-gray-300" />
      </div>

      <div className="mt-3 h-8 w-3/4 animate-pulse rounded bg-gray-300" />

      <div className="w-full">
        <div className="mt-3 h-8 w-1/4 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="w-fit">
          <div className="mt-3 h-6 w-32 animate-pulse rounded bg-gray-300" />
        </div>
        <div className="w-fit">
          <div className="mt-3 h-6 w-40 animate-pulse rounded bg-gray-300" />
        </div>
        <div className="w-fit">
          <div className="mt-3 h-6 w-24 animate-pulse rounded bg-gray-300" />
        </div>
      </div>

      <div className="mt-5">
        <div className="h-6 w-1/4 animate-pulse rounded bg-gray-300" />
        <div className="mt-2 h-20 w-full animate-pulse rounded bg-gray-300" />
      </div>

      <div className="my-5 h-0.5 w-full bg-gray-300 dark:bg-slate-800" />

      <div className="w-full">
        <div className="mt-2 flex items-center">
          <div className="size-12 animate-pulse rounded-full bg-gray-300" />
          <div className="ml-2 h-6 w-1/2 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
