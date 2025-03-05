const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, HOST } = process.env

exports.createOrder = async (req,res)=>{
    try {
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'MXN',
                        value: '1.00'
                    },
                    description: 'Buy online'
                }
            ],
            application_context: {
                brand_name: 'InsideWeb',
                landing_page:'LOGIN',
                user_action: 'PAY_NOW',
                return_url: `${HOST}/create-order`,
                cancel_url: `${HOST}/cancel-order`
            }
        }

        const params = new URLSearchParams()
        params.append('grant_type','client_credentials')

        const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`,params,{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
            Authorization: `Bearer ${access_token}`
        })

        console.log(response.data)
        res.json(response.data)
    } catch (error) {
        console.error('Error creating order:',error.response?.data || error.message)
        res.status(500).json({success: false, messge: 'Error creating Paypal order', error: error.response?.data || error.message})
    }
}

exports.captureOrder = async (req,res)=>{
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    console.log(response.data)
    return res.redirect('/payed')
}

exports.cancelOrder = (req,res)=>{
    res.redirect('/')
}