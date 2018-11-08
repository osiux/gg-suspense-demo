import React, { Suspense } from "react";
import { unstable_createResource } from "react-cache";

import Row from "gumdrops/Row";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

import { getImagesByCategory } from "../api/api";

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

const ImageGrid = ({ categoryId }) => {
    const images = getImagesByCategory(categoryId);

    return (
        <Row className="-m-t-3">
            {images.map((image, index) => (
                <Column key={index} md={3}>
                    <Suspense fallback={<LoadingDots />}>
                        <Img src={image.url} alt="Cat" />
                    </Suspense>
                </Column>
            ))}
        </Row>
    );
};

export default ImageGrid;
