// For more information, see https://crawlee.dev/
import { KeyValueStore, PlaywrightCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';

interface InputSchema {
    startUrls: string[];
    debug?: boolean;
}

const { startUrls = ['https://www.glencore.com/careers/career-opportunities/europe'], debug } = await KeyValueStore.getInput<InputSchema>() ?? {};

if (debug) {
    log.setLevel(log.LEVELS.DEBUG);
}

const crawler = new PlaywrightCrawler({
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    // Be nice to the websites. Remove to unleash full power.
    maxConcurrency: 50,
    requestHandler: router,
});

await crawler.run(startUrls);
