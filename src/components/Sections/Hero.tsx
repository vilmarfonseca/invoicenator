import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-14 lg:py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-indigo-600 font-medium">
            Manage your business like a pro
          </h1>
          <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
            Take Control of your finances{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef334c] to-[#E114E5]">
              and empower your business
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Our SAAS platform is designed to simplify, automate, and optimize
            every aspect of invoicing and payment management. Say goodbye to
            time-consuming paperwork and late payments.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link
              href="/auth/login"
              className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-200 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Start today
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <Image
            src="/images/showcase.png"
            className="w-full"
            alt=""
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
