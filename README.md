# PARASAIL NETWORK AUTOMATION

This project provides automation tools for interacting with the Parasail Network platform. It includes functionality for account management, proxy handling, and automated check-ins.

## BOT FEATURES

- Account authentication with Parasail Network
- Proxy management with rotation support
- Automated check-ins and stats tracking
- Configurable intervals for operations
- Error handling with retry logic

## PREREQUISITES

- Parasail accounts [Register](https://www.parasail.network/season?refer=MHg1NjUzM0FmNkUyRTkwMWNDZkFDNUI1ODU5OEQ0QWNlRUJmNjk0QTkz)
- Node.js v18 or higher
- npm or yarn package manager
- Ethereum wallet private keys
- Proxy list (optional)

## INSTALLATION

1. Clone the repository:
   ```bash
   git clone https://github.com/Rambeboy/parasail-network-bot.git && cd parasail-network-bot
   ```

2. Install dependencies:
   ```bash
   npm install && npm run setup
   ```

3. Set up your accounts
   ```bash
   nano accounts/accounts.js
   ```

4. Configure your proxy
   ```bash
   nano config/proxy_list.js
   ```

## CONFIGURATION

The main configuration file (`config.js`) includes:
- API endpoints
- Request headers
- Interval timings
- Retry settings

## USAGE

Run the main script:
```bash
npm run start
```

## IMPORTANT NOTES

- Use this tool at your own risk
- The project is for educational purposes only
- Maintain proper security for your private keys
- Respect Parasail Network's terms of service

## LICENSE

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## DISCLAINER

The developer is not responsible for any account restrictions or consequences resulting from the use of this software. Users are solely responsible for their actions when using this tool.