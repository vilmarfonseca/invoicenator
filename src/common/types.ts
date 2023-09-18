// Client
type ClientType = {
  name: string
  id: number
}

// Invoice
type InvoiceItemType = {
  name: string
  description: string
  quantity: string
  price: string
}

type InvoiceType = {
  client: ClientType
  dueDate: string
  id: number
  items: InvoiceItemType[]
  status: string
  total: string
}
