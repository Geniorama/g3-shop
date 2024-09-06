import React from 'react';
import Header from '@/components/Header/Header'
import Head from 'next/head';
import { Box } from '@mui/material';
import Footer from '@/components/Footer/Footer';

type LayoutProps = {
  children: any
  metadata: {title?: string, description?: string}
}

export default function Layout({children, metadata}:LayoutProps) {
  return (
    <>
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
        </Head>

        <Header />
        <Box id="top">
          {/* Ancle top */}
        </Box>
        <Box component={'main'}>
            {children}
        </Box>
        <Footer />
    </>
  )
}
