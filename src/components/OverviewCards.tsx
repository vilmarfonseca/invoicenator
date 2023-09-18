import BalanceIcon from "@/components/Icons/BalanceIcon";
import TotalPaidIcon from "@/components/Icons/TotalPaidIcon";
import TotalUnpaidIcon from "@/components/Icons/TotalUnpaidIcon";

const OverviewCards = () => {
  const cards = [
    {
      eyebrow: "Balance",
      displayValue: "100.00",
      textColor: "text-gray-600",
      icon: <BalanceIcon />,
    },
    {
      eyebrow: "Total Paid",
      displayValue: "100.00",
      textColor: "text-green-500",
      icon: <TotalPaidIcon />,
    },
    {
      eyebrow: "Total Unpaid",
      displayValue: "100.00",
      textColor: "text-red-500",
      icon: <TotalUnpaidIcon />,
    },
  ];

  return (
    <section className="mt-12 mx-auto max-w-screen-xl pb-20">
      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        {cards.map((item, key) => (
          <div
            className="w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={key}
          >
            <div>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewCards;
