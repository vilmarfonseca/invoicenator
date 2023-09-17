export function getTotalPrice(items: InvoiceItemType[]) {
  let total = 0

  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const price = parseFloat(item.price)
      const quantity = parseInt(item.quantity)

      if (!isNaN(price) && !isNaN(quantity)) {
        total += price * quantity
      }
    }
  }

  return total.toFixed(2)
}
