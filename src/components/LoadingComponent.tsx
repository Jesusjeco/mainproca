import { FaSpinner } from "react-icons/fa"

interface LoadingComponentProps {
  var1: boolean,
  var2?: boolean,
  var3?: boolean,
  var4?: boolean
}
export function LoadingComponent({ var1 = false, var2 = false, var3 = false, var4 = false }: LoadingComponentProps) {
  if (var1 || var2 || var3 || var4)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    )
}