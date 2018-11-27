import React, { Component, Suspense } from "react";
import { Link } from "react-router-dom";
import { find, path, prop } from "ramda";

import Row from "gumdrops/Row";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

import { getTopArtists } from "../api/api";

import Img from "./Img";

class HomePage extends Component {
    render() {
        const fetchedArtists = getTopArtists();
        const artists = path(["artists", "artist"], fetchedArtists) || [];

        return (
            <Row>
                {artists.map((artist, index) => {
                    const image = find(
                        i => i.size === "extralarge",
                        artist.image,
                    );
                    const logo = prop("#text", image);
                    return (
                        <Column key={index} md={3} sm={6} className="-m-t-3">
                            <Link
                                to={`/artist/${artist.mbid}`}
                                title={artist.name}
                            >
                                <Suspense fallback={<LoadingDots size="lg" />}>
                                    <Img src={logo} alt={artist.name} />
                                </Suspense>
                            </Link>
                        </Column>
                    );
                })}
            </Row>
        );
    }
}

export default HomePage;
