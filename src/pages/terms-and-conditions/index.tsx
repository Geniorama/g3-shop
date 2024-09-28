import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Typography,
  Box,
  Container,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchPolicies, fetchContactInfo, fetchSocialMedia, fetchGeneralSettings } from "@/lib/dataFetchers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { ContactInfo, SocialMediaItem } from "@/types";
import { useDispatch } from "react-redux";
import { setContactInfo, setSocialMedia } from "@/store/features/generalInfoSlice";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import LoaderPage from "@/components/Loader/LoaderPage";
import useCommingSoon from "@/hooks/useCommingSoon";
import type { Entry } from "contentful";

const metadata = {
  title: "Terms and conditions",
  description: "Lorem ipsum",
};

type TermsAndConditionsProps = {
  content: any;
  contactInfo?: ContactInfo,
  socialMedia?: SocialMediaItem[]
  commingSoonMode: Entry
};

export default function TermsAndConditions({
  content,
  contactInfo,
  socialMedia,
  commingSoonMode
}: TermsAndConditionsProps) {
  const [documentTyC, setDocumentTyC] = useState();
  const dispatch = useDispatch()

  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  useEffect(() => {
    if (content) {
      setDocumentTyC(content);
    }
  }, [content]);

  useEffect(() => {
    if(contactInfo){
      dispatch(setContactInfo(contactInfo))
    }
  }, [contactInfo, dispatch])

  useEffect(() => {
    if(socialMedia){
      dispatch(setSocialMedia(socialMedia))
    }
  }, [socialMedia, dispatch])

  if (isLoadingPage) {
    return <LoaderPage />;
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
      <PageHeading title={metadata.title} />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{"Terms and conditions"}</Typography>
        </Breadcrumbs>

        {documentTyC ? (
          <Box 
            my={5}
            sx={{
              'h2, h3, h4, h5, h6': {
                mb:{xs: 2}
              },
              'p':{
                color: "rgba(0, 0, 0, 0.87)",
                lineHeight: 1.5,
                fontSize: '14px'
              }
            }}
            >
            {documentToReactComponents(documentTyC)}
          </Box>
        ) : (
          <Box>
            <Typography>Not found</Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetchPolicies();
  const contactInfo = await fetchContactInfo()
  const socialMedia = await fetchSocialMedia()
  const commingSoonMode = await fetchGeneralSettings()

  const content = res.termsAndConditions;

  return {
    props: {
      content,
      contactInfo,
      socialMedia,
      commingSoonMode
    },
  };
}
