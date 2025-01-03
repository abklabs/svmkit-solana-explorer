import React from 'react';
import { Address } from '@components/common/Address';

import { InstructionCard } from '../InstructionCard';

import { CancelOrder, SerumIxDetailsProps } from './types';

export function CancelOrderDetailsCard(props: SerumIxDetailsProps<CancelOrder>) {
    const { ix, index, result, programName, info, innerCards, childIndex } = props;

    return (
        <InstructionCard
            ix={ix}
            index={index}
            result={result}
            title={`${programName} Program: Cancel Order`}
            innerCards={innerCards}
            childIndex={childIndex}
        >
            <tr>
                <td>Program</td>
                <td className="text-lg-end">
                    <Address pubkey={info.programId} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Market</td>
                <td className="text-lg-end">
                    <Address pubkey={info.accounts.market} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Open Orders</td>
                <td className="text-lg-end">
                    <Address pubkey={info.accounts.openOrders} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Open Orders Owner</td>
                <td className="text-lg-end">
                    <Address pubkey={info.accounts.openOrdersOwner} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Request Queue</td>
                <td className="text-lg-end">
                    <Address pubkey={info.accounts.requestQueue} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Side</td>
                <td className="text-lg-end">{info.data.side}</td>
            </tr>

            <tr>
                <td>Open Orders Slot</td>
                <td className="text-lg-end">{info.data.openOrdersSlot}</td>
            </tr>

            <tr>
                <td>Order Id</td>
                <td className="text-lg-end">{info.data.orderId.toString(10)}</td>
            </tr>
        </InstructionCard>
    );
}
