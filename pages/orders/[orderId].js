import {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import {useRequest} from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({order, currentUser}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const {doRequest, errors} = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(
    () => {
      const findTimeLeft = () => {
        const msLeft = new Date(order.expiresAt) - new Date();
        setTimeLeft(Math.round(msLeft / 1000));
      };

      findTimeLeft();
      const timerId = setInterval(findTimeLeft, 1000);

      return () => {
        clearInterval(timerId);
      };
    },
    []
  );

  if (timeLeft < 0) {
    return (
      <div>order has expired</div>
    );
  }

  return (
    <div>
      {timeLeft} seconds left until this order expires
      <StripeCheckout
        token={({id}) => doRequest({token: id})}
        stripeKey="pk_test_51K2S8iFHyKYcFEEPLS35Hj68aH2CGaZz63UbccFZM0Vp0kpKAsEgvM1yqu764fFrsRIWcWzqRsSiJEkY6pERU9LB000cyUnw07"
        amount={order.item.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  )
};

OrderShow.getInitialProps = async (context, client) => {
  const {orderId} = context.query;
  const {data} = await client.get(`/api/orders/${orderId}`);

  return {order: data};
};

export default OrderShow;