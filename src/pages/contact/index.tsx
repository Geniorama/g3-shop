import PageHeading from "@/components/PageHeading/PageHeading";
import Layout from "@/components/Layout/Layout";
import { Container, Box, Typography, Grid, Stack, Link, IconButton } from "@mui/material";
import FormContact from "@/components/Contact/FormContact/FormContact";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { setContactInfo, setSocialMedia } from "@/store/features/generalInfoSlice";
import type { ContactInfo, SocialMediaItem } from "@/types";
import socialMediaIcons from "@/utils/socialMediaIcons";
import { fetchContactInfo, fetchSocialMedia, fetchGeneralSettings } from "@/lib/dataFetchers";
import type { Entry } from "contentful";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import LoaderPage from "@/components/Loader/LoaderPage";
import useCommingSoon from "@/hooks/useCommingSoon";

const metadata = {
  title: "Contact Us | G3 Print",
};

type ContactProps = {
  infoContact: ContactInfo,
  socialMediaItems: SocialMediaItem[],
  commingSoonMode: Entry 
}

export default function Contact({infoContact, socialMediaItems, commingSoonMode}: ContactProps) {
  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  const dispatch = useDispatch()

  const { contactInfo, socialMedia } = useSelector((state: RootState) => state.general);

  useEffect(() => {
    if(infoContact){
      dispatch(setContactInfo(infoContact))
    }
  },[dispatch, infoContact])

  useEffect(() => {
    if(socialMediaItems){
      dispatch(setSocialMedia(socialMediaItems))
    }
  },[dispatch, socialMediaItems])

  if(isLoadingPage){
    return <LoaderPage />
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
      <PageHeading title={'Contact Us'} />

      <Container>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.6164088781857!2d-76.93986092326558!3d41.25191287131741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89cf9bfb307f59b3%3A0x166e5897246f5b5a!2sG3%20Graphics%20%26%20Printing!5e0!3m2!1ses!2sco!4v1713533101784!5m2!1ses!2sco"
            style={{ border: "0", width: "100%", aspectRatio: "16 / 6" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

        <Grid py={6} container spacing={4}>
          <Grid item md={6}>
            <Typography
              component={"h5"}
              variant="h3"
              sx={{ fontWeight: "bold" }}
            >
              Do you have some questions?
            </Typography>
            <Typography py={2}>
              We are at your disposal 7 days a week!
            </Typography>

            <Typography>
              {contactInfo?.address}
            </Typography>

            <Link href={`mailto:${contactInfo?.email}`} target="_blank" display={'block'} py={2}>
              {contactInfo?.email}
            </Link>

            <Link href={contactInfo?.whatsAppLink} target="_blank" fontWeight={'bold'}>
              {contactInfo?.whatsAppNumber}
            </Link>

            {socialMedia && (
              <Stack direction={'row'} mt={2} spacing={1}>
                {socialMedia.map((item) => (
                  <IconButton key={item.name} href={item.url} target="_blank">
                    {socialMediaIcons.find(subItem => subItem.name === item.name)?.icon}
                  </IconButton>
                ))}
            </Stack>
            )}

            
          </Grid>

          <Grid item md={6}>
            <FormContact />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}


export async function getServerSideProps() {
  const infoContact = await fetchContactInfo()
  const socialMediaItems = await fetchSocialMedia()
  const commingSoonMode = await fetchGeneralSettings()

  return {
    props: {
      infoContact,
      socialMediaItems,
      commingSoonMode
    }
  }
}