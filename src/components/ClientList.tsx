import { ClientType } from '@/common/types'
import { useGlobalState } from '@/context/globalStateContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ClientListProps {
  heading?: boolean
  filter?: {
    key: string
    value: string
  }
  setFilter?: Function
}

const ClientList: React.FC<ClientListProps> = ({
  heading = true,
  filter,
  setFilter = () => {},
}) => {
  const router = useRouter()
  const { clients, setCurrentClient } = useGlobalState()

  const displayClients =
    filter?.key && filter?.value
      ? clients.filter(
          (client: ClientType) =>
            client[filter.key].toLowerCase() === filter.value.toLowerCase(),
        )
      : [...clients]

  async function handleclientClick(client: ClientType) {
    setCurrentClient(client)
    router.push('/dashboard/clients/edit')
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {heading && (
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Clients
            </h3>
          </div>
          <div className="mt-3 md:mt-0 gap-2 flex">
            {filter?.value && (
              <button
                onClick={() => setFilter(null)}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-200 active:bg-gray-100 border rounded-lg md:text-sm"
              >
                Reset Filters
              </button>
            )}
            <Link
              href="/dashboard/clients/create"
              className="flex items-center px-4 py-2 text-white duration-200 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Create Client
            </Link>
          </div>
        </div>
      )}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Client #</th>
              <th className="py-3 px-6">Client Name</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {displayClients.map((client: ClientType, idx: number) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">#{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleclientClick(client)}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-200 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientList
