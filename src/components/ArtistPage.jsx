import React, { Component, Fragment, Suspense, lazy } from "react";
import { find, path, prop } from "ramda";

import Row from "gumdrops/Row";
import Tag from "gumdrops/Tag";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

import { getArtistInfo } from "../api/api";

import Img from "./Img";
const AlbumsSection = lazy(() => import("./AlbumsSection"));

const formatNumber = value => parseInt(value).toLocaleString("en-US");

class ArtistPage extends Component {
    render() {
        const artistId = this.props.match.params.id;

        const fetchedInfo = getArtistInfo(artistId);
        const info = path(["artist"], fetchedInfo);

        const image = find(i => i.size === "extralarge", info.image);
        const logo = prop("#text", image);

        return (
            <Fragment>
                <Row>
                    <Column md={3}>
                        <Suspense fallback={<LoadingDots />}>
                            <Img src={logo} alt={info.name} />
                        </Suspense>
                    </Column>
                    <Column md={9}>
                        <ul>
                            <li>
                                <strong>Name:</strong> {info.name}
                            </li>
                            <li>
                                <strong>Bio:</strong> {info.bio.summary}
                            </li>
                            <li>
                                <strong>Listeners:</strong>{" "}
                                {formatNumber(info.stats.listeners)}
                            </li>
                            <li>
                                <strong>Play Count:</strong>{" "}
                                {formatNumber(info.stats.playcount)}
                            </li>
                            <li>
                                <strong>Tags: </strong>
                                {info.tags.tag.map((item, index) => {
                                    return (
                                        <Tag
                                            key={index}
                                            context="primary"
                                            text={item.name}
                                        />
                                    );
                                })}
                            </li>
                        </ul>
                    </Column>
                </Row>
                <Suspense fallback={<LoadingDots />}>
                    <AlbumsSection artistId={artistId} />
                </Suspense>
            </Fragment>
        );
    }
}

export default ArtistPage;
