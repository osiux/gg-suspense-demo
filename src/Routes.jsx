import React, { lazy } from "react";

import { Route, Switch } from "react-router-dom";

const HomePage = lazy(() => import("./components/HomePage"));
const ArtistPage = lazy(() => import("./components/ArtistPage"));

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/artist/:id" component={ArtistPage} />
    </Switch>
);

export default Routes;
