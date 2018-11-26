import React from "react";
import { unstable_createResource } from "react-cache";

export const ImageResource = unstable_createResource(
    source =>
        new Promise(resolve => {
            const img = new Image();
            img.src = source;
            img.onload = resolve;
        }),
);

const Img = ({ src, alt, ...props }) => {
    ImageResource.read(src);
    return <img className="gds-image" src={src} alt={alt} {...props} />;
};

export default Img;
