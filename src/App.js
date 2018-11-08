import React, { Component, lazy, Suspense } from "react";

import LayoutContainer from "gumdrops/LayoutContainer";
import Row from "gumdrops/Row";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

import { getImagesByCategory } from "./api/api";

const CategoryForm = lazy(() => import("./components/CategoryForm"));
const Image = lazy(() => import("./components/Image"));

class App extends Component {
    state = {
        images: [],
    };

    _searchImages = async e => {
        e.preventDefault();

        this.setState({
            images: [],
        });

        const images = await getImagesByCategory(
            e.target.elements.category.value,
        );

        const newImages = images.reduce((acc, item) => {
            return [...acc, item.url];
        }, []);

        this.setState({
            images: newImages,
        });
    };

    render() {
        const { images } = this.state;

        return (
            <LayoutContainer>
                <Suspense
                    fallback={<LoadingDots className="-m-t-4" size="lg" />}
                >
                    <Row>
                        <Column md={12} className="-text-center">
                            <h1 className="gds-text--header-xl">Cat Images</h1>
                        </Column>
                    </Row>
                    <Row>
                        <Column md={12}>
                            <CategoryForm onSubmit={this._searchImages} />
                        </Column>
                    </Row>
                    <Row className="-m-t-3">
                        {images.map((image, index) => (
                            <Suspense key={index} fallback={<LoadingDots />}>
                                <Image src={image} />
                            </Suspense>
                        ))}
                    </Row>
                </Suspense>
            </LayoutContainer>
        );
    }
}

export default App;
