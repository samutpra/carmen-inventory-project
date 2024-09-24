'use client'
import React from 'react';
import ProductList from '../components/product-list';
import Link from 'next/link';

export default function ProductsPage() {
  return (
      <ProductList onBack={() => {}} />
  );
}