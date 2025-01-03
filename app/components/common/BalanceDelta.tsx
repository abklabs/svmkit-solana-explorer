import React from 'react';
import { SolBalance } from '@components/common/SolBalance';
import { BigNumber } from 'bignumber.js';

export function BalanceDelta({ delta, isSol = false }: { delta: BigNumber; isSol?: boolean }) {
    let sols;

    if (isSol) {
        sols = <SolBalance lamports={Math.abs(delta.toNumber())} />;
    }

    if (delta.gt(0)) {
        return <span className="badge bg-success-soft">+{isSol ? sols : delta.toString()}</span>;
    } else if (delta.lt(0)) {
        return <span className="badge bg-warning-soft">{isSol ? <>-{sols}</> : delta.toString()}</span>;
    }

    return <span className="badge bg-secondary-soft">0</span>;
}
