"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAllMyBuyOrders } from "@/utils/api-calls-swr";
import Link from "next/link";

export default function MyPurchases() {
  const { data, isLoading } = useAllMyBuyOrders();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (data && data.orders.length === 0) {
    return <p className="-mx-2">No purchases found.</p>;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-3xl font-bold">My Purchases</h1>
      <br />
      <div className="-mx-2 flex flex-wrap">
        {data ? (
          data.orders.map((order) =>
            order.orderItems.length ? (
              <div key={order.orderId} className="m-2">
                <Card className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-5 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
                  <Link href={`/order/${order.orderId}`}>
                    <h1 className="mb-5 font-bold">Order items</h1>
                    <div className="text-xs">
                      {order.orderItems.map((item) => (
                        <p
                          key={item.productId}
                        >{`${item.purchaseStatus === 1 ? "Pending:" : ""} ${item.purchaseStatus === 2 ? "Purchased:" : ""} ${item.productName} - ${item.price} kr`}</p>
                      ))}
                      <CardDescription className="mt-5 text-xs">
                        {`Order date: ${new Date(order.timeOfPurchase).toLocaleDateString()}`}
                      </CardDescription>
                    </div>
                  </Link>
                </Card>
              </div>
            ) : null,
          )
        ) : (
          <p className="-mx-2">No purchases found</p>
        )}
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-3xl font-bold">My Purchases</h1>
      <br />
      <div className="-mx-2 flex flex-wrap">
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="m-2 w-full sm:w-1/2 lg:w-1/4">
          <div className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
            <div className="p-5">
              <div className="mb-2 h-4 w-3/4 animate-pulse bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 animate-pulse bg-gray-200" />
              <div className="mt-5 h-4 w-1/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
