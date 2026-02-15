import GalleryHero from "../components/Gallery/GalleryHero";
import GallerySection from "../components/Gallery/GallerySection";
import { items } from "../components/Gallery/galleryData";

const Gallery = () => {
  return (
    <>
      <GalleryHero />
      <GallerySection title="launch event" items={items} />
      <GallerySection title="abhivyakti 2025" items={items} />
    </>
  );
}

export default Gallery;
