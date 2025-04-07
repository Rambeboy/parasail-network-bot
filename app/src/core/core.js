import _0x34a8c8 from 'axios';
import { ethers } from 'ethers';
import _0x5a2e14 from 'user-agents';
import { logMessage } from '../utils/logger.js';
import { ProxyManager } from './api/api.js';
import { Config } from '../../config/config.js';
import { privateKey } from '../../accounts/accounts.js';
const userAgent = new _0x5a2e14();
export class parasailNetwork {
  constructor(_0x17d481, _0xc12769 = null) {
    this.privatekey = _0x17d481;
    this.proxy = _0xc12769;
    this.wallet = new ethers.Wallet(this.privatekey);
    this.proxyManager = new ProxyManager();
    this.axiosConfig = {
      ...(this.proxy && {
        'httpsAgent': this.proxyManager.getProxyAgent(this.proxy)
      }),
      'headers': {
        'User-Agent': userAgent.toString(),
        ...config.headers
      }
    };
  }
  async ['makeRequest'](_0x356883, _0x4fa6f3, _0x2f4b22 = {}, _0x40f5dd = _0x2f4b22.retries) {
    for (let _0x51362b = 0x0; _0x51362b < _0x40f5dd; _0x51362b++) {
      try {
        const _0x2b0182 = await _0x34a8c8({
          'method': _0x356883,
          'url': '' + _0x2f4b22.baseUrl + _0x4fa6f3,
          ...this.axiosConfig,
          ..._0x2f4b22
        });
        return _0x2b0182;
      } catch (_0x5f13f1) {
        if (_0x51362b === _0x40f5dd - 0x1) {
          logMessage("Request failed: " + _0x5f13f1.message, "error");
          return null;
        }
        logMessage("Retrying... (" + (_0x51362b + 0x1) + '/' + _0x40f5dd + ')', "error");
        await new Promise(_0x3e05e3 => setTimeout(_0x3e05e3, _0x2f4b22.retryDelay));
      }
    }
    return null;
  }
  async ["getSignature"]() {
    const _0x5bacc5 = await this.wallet.signMessage(config.message);
    return _0x5bacc5;
  }
  async ["loginAccount"](_0x2f4f28) {
    logMessage("Logging in account: " + this.wallet.address, "info");
    const _0x2095c8 = {
      'address': this.wallet.address,
      'msg': config.message,
      'signature': _0x2f4f28
    };
    try {
      const _0x1c990a = await this.makeRequest("POST", config.endpoints.verify, {
        'data': _0x2095c8
      });
      if (!_0x1c990a) {
        return null;
      }
      logMessage("Account logged in: " + this.wallet.address, 'success');
      return _0x1c990a.data.token;
    } catch (_0x2a5cf3) {
      logMessage("Failed to login account: " + this.wallet.address, "error");
      return null;
    }
  }
  async ["onBoard"](_0x8b0f18) {
    const _0x34efc3 = {
      'Authorization': "Bearer " + _0x8b0f18
    };
    const _0x24dec1 = {
      'address': this.wallet.address
    };
    try {
      const _0x3767f7 = await this.makeRequest("POST", config.endpoints.onboard, {
        'data': _0x24dec1,
        'headers': _0x34efc3
      });
      if (!_0x3767f7) {
        return null;
      }
      return _0x3767f7.data;
    } catch (_0x110e73) {
      logMessage("Failed to onboard account: " + this.wallet.address, "error");
      return null;
    }
  }
  async ["checkIn"](_0x3dfec7) {
    const _0x1c0b12 = {
      'Authorization': "Bearer " + _0x3dfec7
    };
    const _0xeff31d = {
      'address': this.wallet.address
    };
    try {
      const _0x3c7acf = await this.makeRequest('POST', config.endpoints.checkIn, {
        'data': _0xeff31d,
        'headers': _0x1c0b12
      });
      if (!_0x3c7acf) {
        return null;
      }
      logMessage("Account checked in: " + this.wallet.address, "success");
      return _0x3c7acf.data;
    } catch (_0xd5299) {
      logMessage("Failed to check in account: " + this.wallet.address, 'error');
      return null;
    }
  }
  async ['getStats'](_0x4f4fcf) {
    logMessage("Getting stats for account: " + this.wallet.address, "info");
    const _0x1fbf2b = {
      'Authorization': "Bearer " + _0x4f4fcf
    };
    try {
      const _0x1a1aa4 = await this.makeRequest("GET", config.endpoints.nodeStats + '?address=' + this.wallet.address, {
        'headers': _0x1fbf2b
      });
      if (!_0x1a1aa4) {
        return null;
      }
      logMessage("Stats received for account: " + this.wallet.address, 'success');
      return _0x1a1aa4.data;
    } catch (_0x3b2d47) {
      logMessage("Failed to get stats for account: " + this.wallet.address, "error");
      return;
    }
  }
  ["getCheckInDelay"](_0x37b008) {
    const _0x5c3e04 = Math.floor(Date.now() / 0x3e8);
    const _0x57a31f = _0x37b008 + 86400;
    const _0x51a72e = (_0x57a31f - _0x5c3e04) * 0x3e8;
    return Math.max(_0x51a72e, 0x0);
  }
  async ["singleProses"]() {
    try {
      const _0x4cbb2c = await this.getSignature();
      if (!_0x4cbb2c) {
        return;
      }
      this.currentToken = await this.loginAccount(_0x4cbb2c);
      if (!this.currentToken) {
        return;
      }
      await this.onBoard(this.currentToken);
      await this.setupIntervals();
    } catch (_0x6b040d) {
      logMessage("Failed to single proses: " + _0x6b040d.message, "error");
    }
  }
  async ["setupIntervals"]() {
    this.clearIntervals();
    const _0x28ff03 = await this.getStats(this.currentToken);
    if (!_0x28ff03?.["data"]) {
      return;
    }
    this.logStats(_0x28ff03.data.points, _0x28ff03.data.last_checkin_time);
    this.statsInterval = setInterval(async () => {
      const _0x48dadf = await this.getStats(this.currentToken);
      if (_0x48dadf?.['data']) {
        this.logStats(_0x48dadf.data.points, _0x48dadf.data.last_checkin_time);
      }
    }, config.intervals.statsCheck);
    if (_0x28ff03.data.last_checkin_time !== undefined) {
      const _0x236b93 = this.getCheckInDelay(_0x28ff03.data.last_checkin_time);
      this.checkInInterval = setTimeout(async () => {
        await this.checkIn(this.currentToken);
        this.logStats(_0x28ff03.data.points, Math.floor(Date.now() / 0x3e8));
        this.checkInInterval = setInterval(async () => {
          await this.checkIn(this.currentToken);
          this.logStats(_0x28ff03.data.points, Math.floor(Date.now() / 0x3e8));
        }, config.intervals.checkIn);
      }, _0x236b93);
    }
  }
  ['logStats'](_0x4af45f, _0x3c22fa) {
    let _0xae0e31 = '';
    if (_0x3c22fa !== undefined) {
      const _0xa5865a = Math.floor(Date.now() / 0x3e8);
      const _0x5a6910 = _0x3c22fa + 86400;
      const _0x1e04e5 = ((_0x5a6910 - _0xa5865a) / 0xe10).toFixed(0x2);
      _0xae0e31 = " | Next check-in: " + new Date(_0x5a6910 * 0x3e8).toLocaleString() + " (" + _0x1e04e5 + " hours left)";
    } else {
      _0xae0e31 = " | Check-in time: Not available";
    }
    logMessage("Current Points: " + _0x4af45f + _0xae0e31 + " | Address: " + this.wallet.address, "info");
  }
  ["clearIntervals"]() {
    if (this.checkInInterval) {
      clearInterval(this.checkInInterval);
    }
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
  }
}

export async function runAllAccounts() {
  try {
    const proxyManager = new ProxyManager();
    await proxyManager.loadProxies();
    
    await Promise.all(accounts.map(async (privateKey) => {
      const pr = new parasailNetwork(privateKey);
      await pr.singleProses();
    }));
    
  } catch (error) {
    logMessage(`Error processing accounts: ${error.message}`, "error");
  }
}
