import GalleryHero from "../components/Gallery/GalleryHero";
import GallerySection from "../components/Gallery/GallerySection";
import { images } from "../data/galleryData/ab25";

const Gallery = () => {
  return (
    <>
      <GalleryHero />
      <GallerySection title="abhivyakti 2025" items={images} />
    </>
  );
}

export default Gallery;
