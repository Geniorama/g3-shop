import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TikTokIcon from "@/utils/icons/TikTok";

type socialMediaIconsProps = {
  name: string,
  icon: any
}

const socialMediaIcons:socialMediaIconsProps[] = [
  {
    name: 'facebook',
    icon: <FacebookOutlinedIcon />
  },

  {
    name: 'instagram',
    icon: <InstagramIcon />
  },

  {
    name: 'tiktok',
    icon: <TikTokIcon />
  }
]

export default socialMediaIcons