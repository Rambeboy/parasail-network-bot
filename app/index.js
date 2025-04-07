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
    const count = accounts.length;
    const proxiesLoaded = proxyManager.loadProxies();
    
    if (!proxiesLoaded) {
      logMessage("Failed to load proxies, using default IP", "warning");
    }
    
    logMessage(`Loaded ${count} accounts`, "info");
    console.log(chalk.greenBright("-".repeat(85)));

    await Promise.all(accounts.map(async (account, i) => {
      const currentProxy = await proxyManager.getRandomProxy();
      const pr = new parasailNetwork(account, currentProxy);
      await pr.singleProses();
    }));
    
  } catch (error) {
    logMessage(`Error: ${error.message}`, "error");
  }
}

main().catch((err) => {
  console.error(chalk.red("Error occurred:"), err);
  process.exit(1);
});
