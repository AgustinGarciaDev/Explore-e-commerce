import React, { useEffect, useRef } from "react"

const PaypalButton =({ total, sendAll })=>{

    const paypal = useRef()

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder:(data,actions,error)=>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[
                        { description:"Explore", amount:{ value: total || 1 , currency_code:"USD" } }
                    ]
                })
            },
            onApprove:(data,actions)=>{
                const order = actions.order.capture()
                sendAll( order.value )
            },
            onerror:(err)=>{
                console.log( err )
            }
        }).render( paypal.current )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


return <div ref={ paypal } ></div>

}

export default PaypalButton