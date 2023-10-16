import {
  SanityReference,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "src/providers/sanity/schema";

export interface Image {
  _type: "image";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}
