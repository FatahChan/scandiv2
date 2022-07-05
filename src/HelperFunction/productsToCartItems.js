//[{product: res.product, attributes: attributes, quantity: quantity}]
// {JSON.stringify({id: id, attributes: attributes}): quantity}


export function productsToCartItems(products){
  let cartItems = {}
  for (const product of products) {
    const key = JSON.stringify({id: product.id, attributes: product.attributes})
    cartItems[key] = product.quantity
  }
  return cartItems
}
