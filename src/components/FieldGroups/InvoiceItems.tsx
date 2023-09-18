import React, { useEffect, useState } from 'react'
import { useGlobalState } from '@/context/globalStateContext'

const InvoiceItemsFieldGroup = () => {
  const { currentInvoice, setCurrentInvoice } = useGlobalState()
  const [items, setItems] = useState<{ [key: string]: string }[]>(currentInvoice?.items ?? [
    { name: '', description: '', quantity: '', price: '' },
  ])

  const handleAddItem = () => {
    setItems([...items, { name: '', description: '', quantity: '', price: '' }])
  }

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    setItems(updatedItems)
  }

  useEffect(() => {
    const newItems = items.filter(
      (item) => item.price && item.quantity && item.name,
    )

    if (newItems.length > 0) {
      setCurrentInvoice({
        ...currentInvoice,
        ...{
          items: newItems,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <div className="flex flex-col ga-6 justify-between items-baseline w-full">
      {items.map((item, index) => (
        <div key={index} className="mb-4 flex gap-8 w-full items-end">
          <div className="w-full">
            <label className="text-gray-600">Name</label>
            <input
              type="text"
              className="w-full px-3 max-w-xs mt-2 py-2 text-gray-500 bg-white border rounded-md shadow-sm focus:border-indigo-600"
              placeholder="Name"
              value={item.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Description</label>
            <input
              type="text"
              className="w-full px-3 max-w-xs mt-2 py-2 text-gray-500 bg-white border rounded-md shadow-sm focus:border-indigo-600"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleInputChange(index, 'description', e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Quantity</label>
            <input
              type="number"
              className="w-full max-w-xs mt-2 px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm focus:border-indigo-600"
              placeholder="0"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange(index, 'quantity', e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Price</label>
            <div className="relative max-w-xs mt-2 text-gray-500">
              <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                &#x24;
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={item.price}
                onChange={(e) =>
                  handleInputChange(index, 'price', e.target.value)
                }
                className="w-full pl-8 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2 items-baseline">
            <button
              disabled={items.length === 1}
              className="block disabled:bg-gray-500 disabled:hover:bg-gray-500 px-4 py-3 h-full max-w-fit text-center text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 md:text-sm whitespace-nowrap"
              onClick={() => handleRemoveItem(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <button
        className="block px-4 py-3 h-full max-w-fit text-center text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700 md:text-sm whitespace-nowrap"
        onClick={handleAddItem}
      >
        Add Item
      </button>
    </div>
  )
}

export default InvoiceItemsFieldGroup
