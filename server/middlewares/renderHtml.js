import fs from 'fs';
import cheerio from 'cheerio';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'app/router';
import { StaticRouter } from 'react-router';


const renderHtml = (path, req) => {
    const context = {};
    const componentHTML = (
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );

    const HTML_TEMPLATE = fs.readFileSync(path).toString();

    const $template = cheerio.load(HTML_TEMPLATE, { decodeEntities: false });
    $template('#app').html(`${renderToString(componentHTML)}`);

    console.log('-------------- logger --------------');
    console.log(req.url);
    // console.log($template('#app').html());
    return $template.html();
};

module.exports = renderHtml;