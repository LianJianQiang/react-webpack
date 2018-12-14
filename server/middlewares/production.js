import { resolve } from 'path';
import express from 'express';
import renderHtml from './renderHtml';

const clientBuildPath = resolve(__dirname, '..', '..', 'dist');

export default function (app) {
    app.use('/', express.static(clientBuildPath));

    app.get('*', (req, res) => {
        res.status('200');
        res.send(renderHtml(resolve(clientBuildPath, 'index.html'), req));
    });
}
