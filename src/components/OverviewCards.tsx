const OverviewCards = () => {
  const cards = [
    {
      eyebrow: 'Total Paid',
      displayValue: '100.00',
      textColor: "text-green-500",
      href: 'javascript:void(0)',
    },
    {
      eyebrow: 'Total Unpaid',
      displayValue: '100.00',
      textColor: "text-red-500",
      href: 'javascript:void(0)',
    },
  ]

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 pb-20">
      <div className="text-center">
        {/* <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1> */}
        {/* <p className="mt-3 text-gray-500">
          Blogs that are loved by the community. Updated every hour.
        </p> */}
      </div>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {cards.map((item, key) => (
          <div
            className="w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={key}
          >
            <a href={item.href}>
              {/* <img
                src={items.img}
                loading="lazy"
                alt={items.title}
                className="w-full h-48 rounded-t-md"
              /> */}
              {/* <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={items.authorLogo}
                    className="w-full h-full rounded-full"
                    alt={items.authorName}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900">
                    {items.authorName}
                  </span>
                  <span className="block text-gray-400 text-sm">
                    {items.date}
                  </span>
                </div>
              </div> */}
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-2">{item.eyebrow}</p>
                <h3 className={`text-4xl ${item.textColor}`}>$ {item.displayValue}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OverviewCards
