type InvoiceItemType = {
    name: string
    description: string
    quantity: string
    price: string
}

type InvoiceType = {
    client: string
    status: string
    dueDate: string
    items: InvoiceItemType[]
}