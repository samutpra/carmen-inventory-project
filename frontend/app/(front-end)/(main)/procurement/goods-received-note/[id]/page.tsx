"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { GoodsReceiveNoteType } from '../../type/procurementType';

const GoodsReceivedNoteByIDPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const mode = searchParams.get('mode');

    return (
        <div>
            <h1>Goods Received Note</h1>
            {id ? (
                <p>Displaying details for ID: {id} in {mode} mode.</p>
            ) : (
                <p>Loading...</p>
            )}
            {mode === GoodsReceiveNoteType.CREATE && <p>Creating a new goods received note...</p>}
            {mode === GoodsReceiveNoteType.VIEW && <p>Viewing goods received note details...</p>}
            {mode === GoodsReceiveNoteType.EDIT && <p>Editing goods received note...</p>}
        </div>
    );
};

export default GoodsReceivedNoteByIDPage;
