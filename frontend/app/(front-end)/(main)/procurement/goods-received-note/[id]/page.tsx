"use client";

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import GoodsReceiveNoteComponent from '../../components/GoodsReceiveNoteComponent';

const GoodsReceivedNoteByIDPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const mode = searchParams.get('mode');

    return (
        <GoodsReceiveNoteComponent id={id} mode={mode} />
    );
};

export default GoodsReceivedNoteByIDPage;
