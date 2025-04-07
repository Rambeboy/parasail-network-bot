export const Config = {
  baseUrl: "https://www.parasail.network",
  endpoints: {
    verify: "/api/user/verify",
    onboard: "/api/v1/node/onboard",
    checkIn: "/api/v1/node/check_in",
    nodeStats: "/api/v1/node/node_stats"
  },
  message: `By signing this message, you confirm that you agree to the Parasail Terms of Service.\n\nParasail (including the Website and Parasail Smart Contracts) is not intended for:\n(a) access and/or use by Excluded Persons;\n(b) access and/or use by any person or entity in, or accessing or using the Website from, an Excluded Jurisdiction.\n\nExcluded Persons are prohibited from accessing and/or using Parasail (including the Website and Parasail Smart Contracts).\n\nFor full terms, refer to: https://parasail.network/Parasail_User_Terms.pdf\n`,
  headers: {
    origin: "https://www.parasail.network",
    referer: "https://www.parasail.network/season"
  },
  intervals: {
    statsCheck: 60 * 60 * 1000, // 1 hour
    checkIn: 24 * 60 * 60 * 1000 // 24 hours
  },
  retries: 3,
  retryDelay: 2000
};