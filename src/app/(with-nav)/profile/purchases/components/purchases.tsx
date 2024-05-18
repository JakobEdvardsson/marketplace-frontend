"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMyBuyOrders } from "@/utils/api-calls";
import {
  OrderGetAllResponseDTO,
  OrderRegisteredResponseDTO,
} from "@/types/endpoint-types-incoming";
import * as Dialog from "@radix-ui/react-dialog";
export default function MyPurchases() {
  const [orders, setOrders] = useState<OrderRegisteredResponseDTO[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orderResponse = await getAllMyBuyOrders();
        const text = await orderResponse.text();

        if (!orderResponse.ok) {
          console.log("Failed to fetch orders");
        }

        if (text.trim() === "") {
          setOrders([]);
          console.warn("Received an empty response");
        } else {
          const ordersData: OrderGetAllResponseDTO = JSON.parse(text);
          setOrders(ordersData.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setTimeout(() => setLoading(false), 1200);
      }
    }

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = (open) => {
    if (!open) {
      setSelectedOrder(null);
    }
  };

  if (loading) {
    return <p>Loading purchases...</p>;
  }

  if (orders.length === 0) {
    return <p>No purchases found.</p>;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-3xl font-bold">My Purchases</h1>
      <br />
      <div className="-mx-2 flex flex-wrap">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="m-2 cursor-pointer"
            onClick={() => handleOrderClick(order)}
          >
            <Card className="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-lg transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="block text-xs font-bold text-black">
                  Order ID:
                  <span className="block text-black">{order.orderId}</span>
                </CardTitle>
              </CardHeader>
              <div className="p-5 text-xs">
                {order.orderItems.map((item) => (
                  <p
                    key={item.productId}
                  >{`${item.productName} - $${item.price}`}</p>
                ))}
                <CardDescription className="truncate text-xs">
                  {`Purchased on: ${new Date(order.timeOfPurchase).toLocaleDateString()}`}
                </CardDescription>
              </div>
            </Card>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <Dialog.Root
          open={Boolean(selectedOrder)}
          onOpenChange={handleCloseDialog}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-auto min-w-[300px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              Order Details
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-sm font-bold">
                Order ID: {selectedOrder.orderId}
              </p>
              {selectedOrder.orderItems.map((item) => (
                <div key={item.productId} className="mt-2">
                  <p className="text-xs">{`${item.productName} - $${item.price}`}</p>
                </div>
              ))}
              <p className="mt-4 text-xs">
                Purchased on:{" "}
                {new Date(selectedOrder.timeOfPurchase).toLocaleDateString()}
              </p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
}
