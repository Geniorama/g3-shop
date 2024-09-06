import Layout from "@/components/Layout/Layout"
import PageHeading from "@/components/PageHeading/PageHeading"
import GridProducts from "@/components/GridProducts/GridProducts"
import { fetchAllProducts } from "@/lib/dataFetchers"
import type { Product } from "@/types"
import { use, useEffect, useState } from "react"
import { Typography, Grid, Container } from "@mui/material"
import { useRouter } from "next/router"

const metadata ={
    title: '',
    description: ''
}

type SearchResultsProps = {
    allProducts: Product[]
}

export default function SearchResults({allProducts}:SearchResultsProps) {
  const [resultProducts, setResultProducts] = useState<Product[]>()
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if(allProducts && query){
        setResultProducts(allProducts)
    }
  },[allProducts, query])

  return (
    <Layout
        metadata={metadata}
    >
        <PageHeading 
            title={`Results for: "${query}"`}
        />
        <Container>
        {resultProducts ? (
            <GridProducts 
            products={resultProducts}
            />

        ): (
            <Typography>
                Results not found for:
            </Typography>
        )}
        </Container>
        
    </Layout>
  )
}


export async function getServerSideProps() {
    const res = await fetchAllProducts(undefined, 12)
    const allProducts = res?.products.edges.map((product) => ({
        id: product.node.id,
        title: product.node.title,
        image: {
            url: product.node.images.edges[0].node.src,
            altText: product.node.images.edges[0].node.altText
        },
        slug: product.node.handle
    }))

    return {
        props: {
            allProducts
        }
    }
}
