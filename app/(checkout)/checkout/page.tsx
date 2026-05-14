import { Suspense } from "react";
import {CheckoutForm} from "./checkout-form";

export const dynamic = 'force-dynamic'; 

export default function CheckoutPage() {
  return (
   
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-xl font-medium text-gray-500">
        Загрузка формы заказа...
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  );
}
