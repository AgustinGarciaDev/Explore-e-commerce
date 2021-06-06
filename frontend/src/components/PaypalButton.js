import React, { useEffect, useRef } from "react"
import { toast } from 'react-toastify';

const PaypalButton = ({ total, sendAll }) => {
    const paypal = useRef()


    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, error) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        { description: "Explore", amount: { value: total || 1, currency_code: "USD" } }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order.value)
                order.value
                    ? sendAll(order.value)
                    : toast.error("Sorry we can't process your payment")

            },
            onerror: (err) => {
                toast.error("Something went wrong")
            }
        }).render(paypal.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <div ref={paypal} ></div>

}

export default PaypalButton