interface Props {
  orderId: number;
  totalAmount: number;
}

export const OrderSuccessTemplate = ({ orderId, totalAmount }: Props) => {
  return (
    <div>
      <h1>Thank you for your order! 🎉</h1>

      <p>
        Your order #{orderId} has been paid. The amount of {totalAmount} ₴ has
        been successfully paid.
      </p>
    </div>
  );
};
