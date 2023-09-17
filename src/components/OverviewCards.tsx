const OverviewCards = () => {
  const cards = [
    {
      eyebrow: 'Balance',
      displayValue: '100.00',
      textColor: 'text-gray-600',
      href: 'javascript:void(0)',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      eyebrow: 'Total Paid',
      displayValue: '100.00',
      textColor: 'text-green-500',
      href: 'javascript:void(0)',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      eyebrow: 'Total Unpaid',
      displayValue: '100.00',
      textColor: 'text-red-500',
      href: 'javascript:void(0)',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="mt-12 mx-auto max-w-screen-xl pb-20">
      <div className="text-center">
        {/* <h1 className="text-3xl text-gray-800 font-semibold">Blog</h1> */}
        {/* <p className="mt-3 text-gray-500">
          Blogs that are loved by the community. Updated every hour.
        </p> */}
      </div>
      <div className="mt-12 grid gap-10 sm:grid-cols-3">
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
                <div className="flex items-center gap-4">
                  <div className={`${item.textColor}`}>{item.icon}</div>
                  <h3 className={`text-4xl ${item.textColor}`}>
                    {item.displayValue}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OverviewCards
