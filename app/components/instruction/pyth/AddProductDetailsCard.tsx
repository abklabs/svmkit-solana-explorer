import React from 'react';
import { Address } from '@components/common/Address';
import { SignatureResult, TransactionInstruction } from '@solana/web3.js';

import { InstructionCard } from '../InstructionCard';

import { AddProductParams } from './program';

export default function AddProductDetailsCard({
    ix,
    index,
    result,
    info,
    innerCards,
    childIndex,
}: {
    ix: TransactionInstruction;
    index: number;
    result: SignatureResult;
    info: AddProductParams;
    innerCards?: JSX.Element[];
    childIndex?: number;
}) {
    return (
        <InstructionCard
            ix={ix}
            index={index}
            result={result}
            title="Pyth: Add Product"
            innerCards={innerCards}
            childIndex={childIndex}
        >
            <tr>
                <td>Program</td>
                <td className="text-lg-end">
                    <Address pubkey={ix.programId} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Funding Account</td>
                <td className="text-lg-end">
                    <Address pubkey={info.fundingPubkey} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Mapping Account</td>
                <td className="text-lg-end">
                    <Address pubkey={info.mappingPubkey} alignRight link />
                </td>
            </tr>

            <tr>
                <td>Product Account</td>
                <td className="text-lg-end">
                    <Address pubkey={info.productPubkey} alignRight link />
                </td>
            </tr>
        </InstructionCard>
    );
}
