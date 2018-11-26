import React, { Suspense, lazy } from "react";

import { Route, Switch } from "react-router-dom";

import LoadingDots from "gumdrops/LoadingDots";

const HomePage = lazy(() => import("./components/HomePage"));
const ArtistPage = lazy(() => import("./components/ArtistPage"));

const Routes = () => (
    <Switch>
        <Suspense fallback={<LoadingDots size="lg" />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/artist/:id" component={ArtistPage} />
        </Suspense>
    </Switch>
);

export default Routes;
