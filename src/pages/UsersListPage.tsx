import { useMemo } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { CellContext } from '@tanstack/react-table';

const UsersListPage = () => {
  const data = useMemo(() => [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Actif' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'Utilisateur', status: 'Actif' },
    { firstName: 'Sam', lastName: 'Wilson', email: 'sam.wilson@example.com', role: 'Utilisateur', status: 'Inactif' },
    // ... more users
  ], []);

  const columns = useMemo(() => [
    { header: 'Nom', accessorKey: 'lastName' },
    { header: 'Prénom', accessorKey: 'firstName' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Rôle', accessorKey: 'role' },
    { 
      header: 'Statut',
      accessorKey: 'status',
      cell: (info: CellContext<any, any>) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${info.getValue() === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {info.getValue() as string}
        </span>
      )
    },
  ], []);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <DashboardLayout>
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">Utilisateurs Actifs</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-4 text-sm font-semibold text-gray-500">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-4 text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UsersListPage;
