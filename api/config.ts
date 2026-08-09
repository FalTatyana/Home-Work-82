import path from 'path';

const rootPath = import.meta.dirname;

const config = {
 rootPath,
 publicPath: path.join(rootPath, 'public'),
 mongoDbUrl: "mongodb://localhost/hw82-music"
}

export default config;