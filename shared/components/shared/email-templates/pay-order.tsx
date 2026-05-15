interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export function PayOrderTemplate({ orderId, totalAmount, paymentUrl }: Props) {
  return (
    <div>
      <h1>Order #{orderId}</h1>

      <p>
        Pay for the order in the amount of <b>{totalAmount}</b> ₴. Go to{" "}
        <a href={paymentUrl}>this link</a> to pay for the order.
      </p>
    </div>
  );
}
