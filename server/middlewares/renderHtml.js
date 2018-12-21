import fs from 'fs';
import cheerio from 'cheerio';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from 'router';

const renderHtml = (path, req) => {
    const context = {};
    const componentHTML = (
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );

    const HTML_TEMPLATE = fs.readFileSync(path).toString();

    const $template = cheerio.load(HTML_TEMPLATE, { decodeEntities: false });
    $template('#app').html(`<div>${renderToString(componentHTML)}</div>`);      // TODO renderToString外面必须用标签包裹，要不会造成class丢失，什么bug

    return $template.html();
};

module.exports = renderHtml;
