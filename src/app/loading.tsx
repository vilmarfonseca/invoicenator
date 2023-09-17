import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="text-black flex w-full justify-center items-center h-[100vh]">
      <LoadingSpinner />
    </div>
  )
}
