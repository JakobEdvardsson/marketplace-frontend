"use client";

import { useEffect } from "react";
import { connectToSSE } from "@/utils/api-calls";
import { ProductDTO } from "@/types/endpoint-types-outgoing";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export function SSEListener() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    let newEventSource: EventSource | null = null;

    const handleIncomingMessage = (event: MessageEvent) => {
      const message: ProductDTO = JSON.parse(event.data);
      toast({
        title: `New product: ${message.name}`,
        action: (
          <ToastAction
            altText="Check out product"
            onClick={() => router.push(`/products/${message.productId}`)}
          >
            Check out product
          </ToastAction>
        ),
        duration: 60000,
      });
    };

    const handleError = (_: Event) => {
      if (newEventSource) {
        newEventSource.close();
      }

      if (auth.loggedIn) {
        setTimeout(() => {
          newEventSource = connectToSSE(handleIncomingMessage, handleError);
        }, 5000);
      }
    };

    if (auth.loggedIn) {
      newEventSource = connectToSSE(handleIncomingMessage, handleError);
    }

    return () => {
      if (newEventSource) {
        newEventSource.close();
      }
    };
    // eslint-disable-next-line
  }, [auth]);

  return null;
}
