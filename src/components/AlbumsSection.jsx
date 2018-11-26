import React, { Suspense } from "react";
import { find, path, prop } from "ramda";

import Row from "gumdrops/Row";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

import { getArtistAlbums } from "../api/api";

import Img from "./Img";

const AlbumsSection = ({ artistId }) => {
    const fetchedAlbums = getArtistAlbums(artistId);
    const albums = path(["topalbums", "album"], fetchedAlbums);

    return (
        <Row className="-m-t-3">
            {albums.map((album, index) => {
                const image = find(i => i.size === "extralarge", album.image);
                const logo = prop("#text", image);

                return (
                    <Column key={index} md={3}>
                        <Suspense fallback={<LoadingDots />}>
                            <Img src={logo} alt={album.name} />
                            <label className="gds-image__label">
                                {album.name}
                            </label>
                        </Suspense>
                    </Column>
                );
            })}
        </Row>
    );
};

export default AlbumsSection;
