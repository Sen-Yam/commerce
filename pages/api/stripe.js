// the backedn of stripe where we fetch the req and get the response (from stripe docs)
// we just modify the price title which mus contains the product attribute (not the price)
/* To use strpe : send the req.body(products to sell) with POST method + create an object for each item
using the title price which is analyzed in the POST method (line 9 here)+ send it to the stripe
server (the stripe.com) (line 49 here)  */

const stripe = require('stripe')(process.env.NEXT_SECRET_STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
  
    try {
        const params= {
            submit_type :'pay',
            mode: 'payment',
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {shipping_rate : 'shr_1O7OzPDcPUlWZMRbaJ3q9VUK'},
                {shipping_rate : 'shr_1O7P0oDcPUlWZMRbKqIdWPcz'}
            ],
        line_items: req.body.map((item)=>{
          const img= item.image[0].asset._ref;
          const newImg = img.replace('image-','https://cdn.sanity.io/images/7nt2sv1u/production/')
          .replace('-webp','.webp')// id of the sanity project from the page sanity.io/manage
          console.log(newImg)// newImg is the real img of the product that we can see in the browser witht he link https://....etc
       return {
        price_data : {
          currency: 'usd',
          product_data : {
            name : item.name,
            images:[newImg]
          },
          unit_amount : Math.round(item.price * 100),// must do it to avoid the error of invalid integer price
        },
        adjustable_quantity : {
          enabled : true, minimum: 1
        },
        quantity : item.quantity
       }
       
        })
        ,
       
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params).catch((err)=>console.log(err))
     
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}




