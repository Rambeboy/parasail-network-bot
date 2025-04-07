import chalk from "chalk";
import { privateKey } from "./accounts/accounts.js"; 
import { parasailNetwork } from "./main/parasailNetwork.js";
import { ProxyManager } from "./main/proxy.js";
import { logMessage } from "./utils/logger.js";

const proxyManager = new ProxyManager();

async function main() {
  console.log(
    chalk.cyan(`
░█▀█░█▀█░█▀▄░█▀█░█▀▀░█▀█░▀█▀░█░░
░█▀▀░█▀█░█▀▄░█▀█░▀▀█░█▀█░░█░░█░░
░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
AUTHOR : NOFAN RAMBE
WELCOME & ENJOY SIR!
USE IT AT YOUR OWN RISK
`)
  );

  try {
    const proxiesLoaded = proxyManager.loadProxies();
    if (!proxiesLoaded) {
      logMessage("No proxies loaded, using direct connection", "warning");
    }

    logMessage(`Processing ${accounts.length} accounts...`, "info");
    console.log(chalk.greenBright("-".repeat(50)));

    await Promise.all(accounts.map(async (privateKey, index) => {
      try {
        const proxy = await proxyManager.getRandomProxy();
        const worker = new parasailNetwork(privateKey, proxy);
        
        logMessage(`Starting account ${index + 1}/${accounts.length}`, "process");
        await worker.singleProses();
        
      } catch (error) {
        logMessage(`Error processing account: ${error.message}`, "error");
      }
    }));

  } catch (error) {
    logMessage(`Fatal error: ${error.message}`, "error");
  }
}

main().catch(err => {
  console.error(chalk.red("Critical error:"), err);
  process.exit(1);
});
