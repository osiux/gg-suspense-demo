import React from "react";

import Column from "gumdrops/Column";

const Image = ({ src }) => (
    <Column md={3}>
        <img className="gds-image" src={src} alt="Cat" />
    </Column>
);

export default Image;
