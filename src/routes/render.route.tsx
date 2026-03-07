import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './route.routes';
import { ROUTES } from './route.constant';

export const RenderRoutes: React.FC = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            ))}
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.HOME} replace />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};
