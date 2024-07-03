import React from 'react'
import { Grid, Box, Pagination, Stack } from '@mui/material';
import CardProduct from '@/components/Shop/CardProduct/CardProduct';

export default function GridProducts({products}) {
  const { edges } = products

  return (
    <>
    <Box display={'grid'} gridTemplateColumns={"repeat(auto-fill, minmax(min(250px, 100%), 1fr))"} gap={3}>
        {edges.map((product, i) => (
          <Box key={i}>
            <CardProduct 
              title={product.node.title}
              slug={product.node.handle}
              normalPrice={product.node.priceRange.minVariantPrice.amount}
              image={product.node.images.edges[0].node.url}
              type={product.node.priceRange.minVariantPrice.amount === product.node.priceRange.maxVariantPrice.amount ? 'simple' : 'variable'}
            />
          </Box>
        ))}
    </Box>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={5}>
      <Pagination count={10} />
    </Box>
    </>
  )
}
