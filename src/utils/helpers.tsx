import { InvoiceItemType, InvoiceType } from '@/common/types'

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

export const calculateInvoicesTotalByStatus = (
  invoices: InvoiceType[],
  status: string,
) =>
  invoices
    .filter((invoice) => invoice.status.toLowerCase() === status.toLowerCase())
    .reduce((total, invoice) => total + parseFloat(invoice.total), 0)
    .toFixed(2)

export const calculateBalance = (invoices: InvoiceType[]) => {
  const balance =
    parseFloat(calculateInvoicesTotalByStatus(invoices, 'paid')) -
    parseFloat(calculateInvoicesTotalByStatus(invoices, 'unpaid'))

  return balance.toFixed(2)
}

export function parseDate(inputDate: string) {
  const dateObj = new Date(inputDate);
  const offset = dateObj.getTimezoneOffset();
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  return formattedDate;
}
