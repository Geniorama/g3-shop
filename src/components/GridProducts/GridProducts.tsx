import React from 'react'
import { Grid, Box, Pagination, Stack } from '@mui/material';
import CardProduct from '../Shop/CardProduct/CardProduct';
import type { Product } from '@/types';

type GridProductsProps = {
  products: Product[],
  pagination?: boolean
}

export default function GridProducts({products, pagination}:GridProductsProps) {

  return (
    <>
    <Box display={'grid'} gridTemplateColumns={{xs: "repeat(auto-fill, minmax(min(150px, 100%), 1fr))", lg: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))"}} gap={3}>
        {products.map((product, i:number) => (
          <Box key={i}>
            <CardProduct
              id={product.id}
              title={product.title}
              slug={product.slug}
              normalPrice={product.normalPrice}
              image={product.image}
              type={product.isVariable ? 'variable': 'simple'}
              isVariable={product.isVariable}
            />
          </Box>
        ))}
    </Box>
    {pagination && (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={5}>
        <Pagination count={10} />
      </Box>
    )}
    </>
  )
}
