import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">LoyalBot Pro Dashboard</h1>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Store Status Card */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Store Status</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Store: <span className="font-medium text-gray-900">Your Store Name</span></p>
              <p className="text-sm text-gray-600">Status: <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span></p>
            </div>
          </div>

          {/* Service Toggle Card */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Chatbot Service</h2>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Toggle Service
              </button>
              <span className="text-sm text-gray-600">Currently: <span className="font-medium text-gray-900">Enabled</span></span>
            </div>
          </div>

          {/* Error Logs Card */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Error Logs</h2>
              <div className="max-h-64 overflow-auto rounded border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">2024-01-01 12:00:00</td>
                      <td className="px-6 py-4 text-sm text-gray-500">No errors logged yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
} 