import { useState } from "react";
import { Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ZoomImage from "@/components/ZoomImage/ZoomImage";
import type { Product } from "@/types";

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

type ProductGalleryProps = {
  images: Product['gallery']
}

export default function ProductGallery({images}:ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if(!images){
    return null;
  }

  return (
    <>
      <Swiper
        style={{
          width: "100%",
          height: "80%",
          maxHeight: "500px"
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <ZoomImage src={image.url} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        style={{ width: "100%", height: "20%", marginTop: "10px" }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                height: "100%",
                // width: "100%",
                aspectRatio: "1",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  opacity: ".7",
                },
              }}
            >
              <img
                style={{ height: "100%", objectFit: "cover", width: "100%"}}
                src={image.url}
                alt=""
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
