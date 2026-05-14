interface Props {
  orderId: number;
  totalAmount: number;
}

export const OrderSuccessTemplate = ({ orderId, totalAmount }: Props) => {
  return (
    <div>
      <h1>Спасибо за ваш заказ! 🎉</h1>

      <p>
        Ваш заказ #{orderId} оплачен. На сумму {totalAmount} ₴ успешно оплачен.
      </p>
    </div>
  );
};
