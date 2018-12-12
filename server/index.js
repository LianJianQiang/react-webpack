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
                    "common": resolveUrl("../app/common/"),
                    "page/common": resolveUrl("../app/containers/page/common/"),
                    "config": resolveUrl("../app/_config/"),
                    "_config": resolveUrl("../app/_config/"),
                    "components": resolveUrl("../app/components/"),
                    "containers": resolveUrl("../app/containers/"),
                    "images": resolveUrl("../app/images/"),
                    "styles": resolveUrl("../app/styles/"),
                    "utils": resolveUrl("../app/utils/"),
                    "server": resolveUrl("../server/"),
                    "app": resolveUrl("../app/"),
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

