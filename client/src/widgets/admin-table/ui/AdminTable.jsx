import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';

export const AdminTable = ({ gpus, onEdit, onDelete, onToggleStatus }) => {
  return (
    <>
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Chipset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {gpus.map((gpu) => (
                <tr key={gpu.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {gpu.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {gpu.chipset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {gpu.vendor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {gpu.memoryGB} GB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${gpu.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        gpu.status === 'AVAILABLE'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : gpu.status === 'DISCONTINUED'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {gpu.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" onClick={() => onEdit(gpu)} className="text-xs sm:text-sm">
                        Edit
                      </Button>
                      <Button
                        variant={gpu.status === 'AVAILABLE' ? 'danger' : 'success'}
                        onClick={() => onToggleStatus(gpu.id)}
                        className="text-xs sm:text-sm"
                      >
                        {gpu.status === 'AVAILABLE' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(gpu.id)} className="text-xs sm:text-sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {gpus.map((gpu) => (
          <Card key={gpu.id}>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{gpu.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Chipset</p>
                    <p className="font-medium text-gray-900 dark:text-white">{gpu.chipset.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Vendor</p>
                    <p className="font-medium text-gray-900 dark:text-white">{gpu.vendor.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Memory</p>
                    <p className="font-medium text-gray-900 dark:text-white">{gpu.memoryGB} GB</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Price</p>
                    <p className="font-medium text-gray-900 dark:text-white">${gpu.price}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Status</p>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    gpu.status === 'AVAILABLE'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : gpu.status === 'DISCONTINUED'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {gpu.status}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Button variant="secondary" onClick={() => onEdit(gpu)} className="w-full text-sm">
                  Edit
                </Button>
                <Button
                  variant={gpu.status === 'AVAILABLE' ? 'danger' : 'success'}
                  onClick={() => onToggleStatus(gpu.id)}
                  className="w-full text-sm"
                >
                  {gpu.status === 'AVAILABLE' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="danger" onClick={() => onDelete(gpu.id)} className="w-full text-sm">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
