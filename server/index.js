const path = require('path');

const resolveUrl = dir => {
    return path.join(__dirname, dir);
};

require('@babel/register')({
    "presets": [
        "@babel/preset-env",
    ],
    "plugins": [
        [
            "module-resolver",
            {
                "alias": {
                    "common": resolveUrl("../src/common/"),
                    "page/common": resolveUrl("../src/containers/page/common/"),
                    "config": resolveUrl("../src/_config/"),
                    "_config": resolveUrl("../src/_config/"),
                    "components": resolveUrl("../src/components/"),
                    "containers": resolveUrl("../src/containers/"),
                    "images": resolveUrl("../src/images/"),
                    "styles": resolveUrl("../src/styles/"),
                    "utils": resolveUrl("../src/utils/"),
                    "router": resolveUrl("../src/router/"),
                    "server": resolveUrl("../server/"),
                    "react/lib/ReactMount": "react-dom/lib/ReactMount"
                }
            }
        ]
    ]
});

// 无法引入静态资源
require.extensions['.scss'] = () => {
    return null;
};
require.extensions['.css'] = () => {
    return null;
};
require.extensions['.less'] = () => {
    return null;
};
require.extensions['.png'] = (module, file) => {
    return module._compile('module.exports = ""', file);
};
require.extensions['.svg'] = () => {
    return null;
};

module.exports = require('./app.js');

