"use client";
import React from 'react'
import { useParams } from 'next/navigation';

const StoreLocationDetailPage = () => {
    const params = useParams();
    const id = params.id as string;
    return (
        <div>{id}</div>
    )
}

export default StoreLocationDetailPage