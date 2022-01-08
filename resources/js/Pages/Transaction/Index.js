import React, { useEffect, useState } from 'react';
import SidePanel from '@/Components/SidePanel';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import TransactionEdit from '@/Pages/Transaction/Edit';
import { PencilAltIcon } from '@heroicons/react/outline';

export default function Dashboard({auth}) {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [shouldShowTransactionEdit, setShouldShowTransactionEdit] = useState(false);

    useEffect(() => {
        axios.post('/graphql', {query: `query { 
            transactions {
                id
                amount
                category {
                    name
                    type
                }
                brand {
                    name
                }
            }
         }`})
            .then(({data}) => setTransactions(data.data.transactions))
            .catch(console.error);
    }, []);

    return (
        <Authenticated auth={auth}>
            <Head title="Transactions" />

            <SidePanel toggleOpen={shouldShowTransactionEdit} 
                    onClose={() => {
                        setEditTransaction(null)
                        setShouldShowTransactionEdit(false)
                    }} 
                    title={"Edit Transaction"}>
                {editTransaction && <TransactionEdit onClose={() => setShouldShowTransactionEdit(false)}  transaction={editTransaction} />}
            </SidePanel>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Amount
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Category
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Brand
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Type
                                                </th>
                                                <th scope="col" className="relative py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transactions.map((transaction) => (
                                                <tr key={transaction.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{transaction.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{transaction.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{transaction.category.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{transaction.brand.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{transaction.category.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button onClick={() => {
                                                            setShouldShowTransactionEdit(true)
                                                            setEditTransaction(transaction)
                                                        }} type="button">
                                                            <span className="sr-only">Edit</span>
                                                            <PencilAltIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}