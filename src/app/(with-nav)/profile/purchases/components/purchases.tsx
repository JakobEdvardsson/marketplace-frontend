"use client";

import { Card, CardDescription } from "@/components/ui/card";
import { BACKEND_URL } from "@/utils/api-calls-swr";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import useSWR from "swr";
import { OrderGetAllResponseDTO } from "@/types/endpoint-types-incoming";
import { authedFetcher } from "@/lib/fetcher-authed";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function MyPurchases() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { data, isLoading } = useSWR<OrderGetAllResponseDTO>(
    date && date.from && date.to
      ? `${BACKEND_URL}/orders?start=${date.from.toISOString()}&end=${date.to.toISOString()}`
      : `${BACKEND_URL}/orders`,
    authedFetcher,
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-bold">My Purchases</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-center font-normal 2md:w-[300px]",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={2}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>

      <div className="mt-5 flex flex-wrap">
        {data ? (
          data.orders.map((order) =>
            order.orderItems.length ? (
              <div key={order.orderId} className="w-full 2md:mr-1 2md:w-72">
                <Card className="w-full rounded-lg border border-gray-300 bg-gray-50 p-5 shadow-sm transition duration-300 ease-in-out hover:shadow-md">
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
          <p className="">No purchases found.</p>
        )}
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-bold">My Purchases</h1>
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
