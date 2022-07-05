//convert from
// {JSON.stringify({id: id, attributes: attributes}): quantity}
//to
//[{product: res.product, attributes: attributes, quantity: quantity}]

import {getProduct} from "../BackendCalls/getProduct";

export async function cartItemsToProducts(cart) {
  let items = []

  const keys = Object.keys(cart);
  for (const cartElement of keys) {
    const item = JSON.parse(cartElement)
    const id = item.id;
    const attributes = item.attributes
    const quantity = cart[cartElement]
    await getProduct(id).then((res) => {
      item.push({product: res.product, attributes: attributes, quantity: quantity})
    })
    return items;
  }
}