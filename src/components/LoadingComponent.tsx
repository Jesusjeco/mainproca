import { FaSpinner } from "react-icons/fa"

interface LoadingComponentProps {
  var1: boolean,
  var2: boolean
}
export function LoadingComponent({ var1, var2 }: LoadingComponentProps) {
  if (var1 || var2)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    )
}