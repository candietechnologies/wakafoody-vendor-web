import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ImageComponent({
  src,
  alt,
  fit,
  height,
  borderRadius,
}) {
  const obj = {
    height: height,
    objectFit: fit ? fit : "cover",
    borderRadius: borderRadius,
  };
  return (
    <>
      <LazyLoadImage
        alt={alt}
        className="gallery-img"
        effect="blur"
        placeholderSrc="/logo-single.png"
        src={src}
        width="100%"
        style={obj}
      />
    </>
  );
}
