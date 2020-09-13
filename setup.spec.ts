// first test that runs
// setup the environment for further testing
import { logger } from "./src/util/logger";
logger.transports[0].silent = true; // silence console transport