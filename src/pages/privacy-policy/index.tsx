import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Typography,
  Box,
  Container,
  Button,
  Breadcrumbs,
  Link,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchPolicies, fetchContactInfo, fetchSocialMedia, fetchGeneralSettings } from "@/lib/dataFetchers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { ContactInfo, SocialMediaItem } from "@/types";
import { useDispatch } from "react-redux";
import { setContactInfo, setSocialMedia } from "@/store/features/generalInfoSlice";
import useCommingSoon from "@/hooks/useCommingSoon";
import type { Entry } from "contentful";
import LoaderPage from "@/components/Loader/LoaderPage";
import CommingSoon from "@/components/CommingSoon/CommingSoon";

const metadata = {
  title: "Privacy policy",
  description: "Lorem ipsum",
};

type PrivacyPolicyProps = {
  content: any;
  contactInfo?: ContactInfo,
  socialMedia?: SocialMediaItem[],
  commingSoonMode: Entry
};

export default function PrivacyPolicy({
  content,
  contactInfo,
  socialMedia,
  commingSoonMode
}:PrivacyPolicyProps) {
  const [documentPrivacy, setDocumentPrivacy] = useState();
  const dispatch = useDispatch()

  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  useEffect(() => {
    if (content) {
      setDocumentPrivacy(content);
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
          <Typography color="text.primary">{metadata.title}</Typography>
        </Breadcrumbs>

        {documentPrivacy ? (
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
            {documentToReactComponents(documentPrivacy)}
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
  const commingSoonMode = await fetchGeneralSettings();

  const content = res.privacyPolicy;

  return {
    props: {
      content,
      contactInfo,
      socialMedia,
      commingSoonMode
    },
  };
}