"use client";
import { getAllMyBuyOrders } from "@/utils/api-calls";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";

export default function MyPurchases() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const response = await getAllMyBuyOrders();
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="mx-auto w-full">
      <h1 className="text-3xl font-bold">My Purchases</h1>
      <br />
      <div className="flex flex-wrap" style={{ minHeight: "10rem" }}>
        {orders.length > 0 ? (
          <div className="flex flex-wrap">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/profile/orders/${order.id}`}
                className="m-2"
              >
                <a>
                  <Card>
                    <CardHeader>
                      <CardTitle>{`Order ID: ${order.id}`}</CardTitle>
                      <CardDescription className="truncate">
                        {`Total items: ${order.orderItems.length}`}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <p>No purchases found.</p>
        )}
      </div>
    </div>
  );
}
