import pkg from 'react-router-sitemap';
const { sitemapBuilder } = pkg;

// import { routeDetails } from './index.js';
import path from 'path'; // add path which will be needed for file write
import fs from 'fs'; // import file system object

const paths = [
    "/setup-py-generator",
    "/"
];

// use your website root address here. Optimally you can
// include dev and production environments with variables
const hostname = 'https://pythoncreate.com';

const dest = path.resolve('./build', 'sitemap.xml');

const sitemap = sitemapBuilder(
    hostname,
    paths
);

// write sitemap.xml file in /public folder
// Access the sitemap content by converting it with .toString() method
fs.writeFileSync(dest, sitemap.toString())
