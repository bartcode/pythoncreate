import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithScene = props => {
    const { scene: Scene, component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={matchProps => (
                <Scene>
                    <Component {...matchProps} />
                </Scene>
            )}
        />
    );
};

RouteWithScene.propTypes = {
    component: PropTypes.any.isRequired,
    scene: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default RouteWithScene;
