import React, { Component, Suspense } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import Row from "gumdrops/Row";
import Column from "gumdrops/Column";

import LayoutContainer from "gumdrops/LayoutContainer";
import LoadingDots from "gumdrops/LoadingDots";

import Routes from "./Routes";

class App extends Component {
    render() {
        return (
            <Router>
                <LayoutContainer>
                    <Row>
                        <Column md={12}>
                            <h1 className="gds-text--header-lg">
                                <Link to="/">Home</Link>
                            </h1>
                        </Column>
                    </Row>
                    <Suspense
                        fallback={<LoadingDots className="-m-t-4" size="lg" />}
                    >
                        <Routes />
                    </Suspense>
                </LayoutContainer>
            </Router>
        );
    }
}

export default App;
