import React from 'react';
import { Address } from '@components/common/Address';
import { PublicKey, VersionedBlockResponse } from '@solana/web3.js';
import { useClusterPath } from '@utils/url';
import Link from 'next/link';

type AccountStats = {
    reads: number;
    writes: number;
};

const PAGE_SIZE = 25;

export function BlockAccountsCard({ block, blockSlot }: { block: VersionedBlockResponse; blockSlot: number }) {
    const [numDisplayed, setNumDisplayed] = React.useState(10);
    const totalTransactions = block.transactions.length;

    const accountStats = React.useMemo(() => {
        const statsMap = new Map<string, AccountStats>();
        block.transactions.forEach(tx => {
            const message = tx.transaction.message;
            const txSet = new Map<string, boolean>();
            const accountKeys = message.getAccountKeys({
                accountKeysFromLookups: tx.meta?.loadedAddresses,
            });
            message.compiledInstructions.forEach(ix => {
                ix.accountKeyIndexes.forEach(index => {
                    const address = accountKeys.get(index)!.toBase58();
                    txSet.set(address, message.isAccountWritable(index));
                });
            });

            txSet.forEach((isWritable, address) => {
                const stats = statsMap.get(address) || { reads: 0, writes: 0 };
                if (isWritable) {
                    stats.writes++;
                } else {
                    stats.reads++;
                }
                statsMap.set(address, stats);
            });
        });

        const accountEntries: [string, AccountStats][] = [];
        statsMap.forEach((value, key) => {
            accountEntries.push([key, value]);
        });

        accountEntries.sort((a, b) => {
            const aCount = a[1].reads + a[1].writes;
            const bCount = b[1].reads + b[1].writes;
            if (aCount < bCount) return 1;
            if (aCount > bCount) return -1;
            return 0;
        });

        return accountEntries;
    }, [block]);

    return (
        <div className="card">
            <div className="card-header align-items-center">
                <h3 className="card-header-title">Block Account Usage</h3>
            </div>

            <div className="table-responsive mb-0">
                <table className="table table-sm table-nowrap card-table">
                    <thead>
                        <tr>
                            <th className="text-muted">Account</th>
                            <th className="text-muted">Read-Write Count</th>
                            <th className="text-muted">Read-Only Count</th>
                            <th className="text-muted">Total Count</th>
                            <th className="text-muted">% of Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountStats.slice(0, numDisplayed).map(([address, { writes, reads }]) => (
                            <StatsRow
                                address={address}
                                blockSlot={blockSlot}
                                key={address}
                                reads={reads}
                                totalTransactions={totalTransactions}
                                writes={writes}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {accountStats.length > numDisplayed && (
                <div className="card-footer">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => setNumDisplayed(displayed => displayed + PAGE_SIZE)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

function StatsRow({
    address,
    blockSlot,
    writes,
    reads,
    totalTransactions,
}: {
    address: string;
    blockSlot: number;
    writes: number;
    reads: number;
    totalTransactions: number;
}) {
    const accountPath = useClusterPath({
        additionalParams: new URLSearchParams(`accountFilter=${address}&filter=all`),
        pathname: `/block/${blockSlot}`,
    });
    return (
        <tr>
            <td>
                <Link href={accountPath}>
                    <Address pubkey={new PublicKey(address)} />
                </Link>
            </td>
            <td>{writes}</td>
            <td>{reads}</td>
            <td>{writes + reads}</td>
            <td>{((100 * (writes + reads)) / totalTransactions).toFixed(2)}%</td>
        </tr>
    );
}
