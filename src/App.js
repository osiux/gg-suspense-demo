import React, { Component, lazy, Suspense } from "react";

import LayoutContainer from "gumdrops/LayoutContainer";
import Row from "gumdrops/Row";
import Column from "gumdrops/Column";
import LoadingDots from "gumdrops/LoadingDots";

const CategoryForm = lazy(() => import("./components/CategoryForm"));
const ImageGrid = lazy(() => import("./components/ImageGrid"));

class App extends Component {
    state = {
        categoryId: null,
    };

    _searchImages = async e => {
        e.preventDefault();

        this.setState({
            categoryId: e.target.elements.category.value,
        });
    };

    render() {
        const { categoryId } = this.state;

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
                    <ImageGrid categoryId={categoryId} />
                </Suspense>
            </LayoutContainer>
        );
    }
}

export default App;
