// AuthUSer
export type AuthUserType = {
  uid: string
  email: string
}

// Client
export type ClientType = {
  name: string
  id: number
  [key: string]: any;
}

// Invoice
export type InvoiceItemType = {
  name: string
  description: string
  quantity: string
  price: string
}

export type InvoiceType = {
  client: ClientType
  dueDate: string
  id: number
  items: InvoiceItemType[]
  status: string
  total: string
  [key: string]: any;
}
