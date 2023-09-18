import BalanceIcon from '@/components/Icons/BalanceIcon'
import TotalPaidIcon from '@/components/Icons/TotalPaidIcon'
import TotalUnpaidIcon from '@/components/Icons/TotalUnpaidIcon'
import { useGlobalState } from '@/context/globalStateContext'
import {
  calculateBalance,
  calculateInvoicesTotalByStatus,
} from '@/utils/helpers'
import clsx from 'clsx'

interface OverviewCardsProps {
  setFilter: Function
}

const OverviewCards = ({ setFilter }: OverviewCardsProps) => {
  const { invoices } = useGlobalState()

  const cards = [
    {
      eyebrow: 'Balance',
      displayValue: calculateBalance(invoices),
      textColor:
        parseInt(calculateBalance(invoices)) > 0
          ? 'text-green-500'
          : 'text-red-500',
      icon: <BalanceIcon />,
    },
    {
      eyebrow: 'Total Paid',
      displayValue: calculateInvoicesTotalByStatus(invoices, 'paid'),
      textColor: 'text-green-500',
      icon: <TotalPaidIcon />,
      filter: 'paid',
    },
    {
      eyebrow: 'Total Unpaid',
      displayValue: calculateInvoicesTotalByStatus(invoices, 'unpaid'),
      textColor: 'text-red-500',
      icon: <TotalUnpaidIcon />,
      filter: 'unpaid',
    },
  ]

  return (
    <section className="mt-12 mx-auto max-w-screen-xl pb-20">
      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {cards.map((item, key) => (
          <div
            key={key}
            onClick={() =>
              item.filter && setFilter({ key: 'status', value: item.filter })
            }
            className={clsx(
              'w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm',
              item.filter && 'cursor-pointer',
            )}
          >
            <div className="p-5">
              <p className="text-gray-400 text-sm mb-2">{item.eyebrow}</p>
              <div className="flex items-center gap-4">
                <div className={`${item.textColor}`}>{item.icon}</div>
                <h3 className={`text-4xl ${item.textColor}`}>
                  {item.displayValue}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OverviewCards
