export interface KpiData {
  cve: string;
  cvss: number;
  epss: number;
  reachabilityScore: boolean;
  riskScore: string;
  remediation: string;
  confidenceScore?: number; // Confidence Score is optional
  cveSummary: string;
  details?: CveDetails; // New optional property for detailed sections
}

interface CveDetails {
  branch: string;
  repo: string;
  reachability: string;
  packageName: string;
  remediationVersion: string;
  confidenceScore: {
    functional: string; // Functional is now directly under confidenceScore
    negativeEffect: {
      failedTests: { testName: string }[];
      performance: {
        cpu: string; // Negative CPU performance impact
        memory: string;
      };
    };
    positiveEffect: {
      passedTests: { testName: string }[];
      performance: {
        cpu: string; // Positive CPU performance impact
        memory: string;
      };
    };
    totalScore: number;
  };
}

const mockKpiData: KpiData[] = [];

// Ensure at least 6 CVEs meet the specified criteria
const criticalCves = [
  {
    cve: 'CVE-2023-0001',
    cvss: 9.5,
    epss: 0.95, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 70, // נמוכה בגלל כשלונות רבים והשפעות שליליות חזקות
    cveSummary: 'Vulnerability in lodash allowing prototype pollution',
    details: {
      branch: 'main',
      repo: 'github.com/org/repo1',
      reachability: 'Function "mergeObjects" is invoked during runtime',
      remediationVersion: '4.17.21',
      packageName: 'lodash',
      confidenceScore: {
        functional: '90% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testObjectMergeWithPrototype' },
            { testName: 'testPrototypePollutionPrevention' },
            { testName: 'testDeepMergeFailure' },
          ],
          performance: {
            cpu: 'up 10%',
            memory: 'up 15%',
          },
        },
        positiveEffect: {
          passedTests: [{ testName: 'testArrayMergePerformance' }],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 70,
      },
    },
  },
  {
    cve: 'CVE-2023-0003',
    cvss: 9.8,
    epss: 0.92, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 85, // בינונית בגלל כשלון יחיד וביצועים חיוביים חלשים
    cveSummary: 'Severe vulnerability in axios related to request forgery',
    details: {
      branch: 'release',
      repo: 'github.com/org/repo2',
      reachability: 'Function "sendHttpRequest" is loaded into memory during request handling',
      remediationVersion: '0.27.2',
      packageName: 'axios',
      confidenceScore: {
        functional: '97% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [{ testName: 'testHttpRequestForgeryProtection' }],
          performance: {
            cpu: 'up 3%',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [{ testName: 'testApiResponseValidation' }],
          performance: {
            cpu: '',
            memory: 'down 5%',
          },
        },
        totalScore: 85,
      },
    },
  },
  {
    cve: 'CVE-2023-0005',
    cvss: 9.2,
    epss: 0.82, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 105, // גבוהה בגלל חוסר כשלונות והשפעות חיוביות חזקות
    cveSummary: 'Potential Denial of Service (DoS) attack in express.js',
    details: {
      branch: 'develop',
      repo: 'github.com/org/repo3',
      reachability: 'Middleware function "validateUserInput" is exposed to unvalidated input',
      remediationVersion: '4.18.1',
      packageName: 'express',
      confidenceScore: {
        functional: '103% of your tests pass compared to your baseline', // הדגשה של טסטים חדשים שעברו
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testRoutePerformanceMetrics' },
            { testName: 'testMiddlewarePerformanceImprovement' },
          ],
          performance: {
            cpu: 'down 8%',
            memory: 'down 10%',
          },
        },
        totalScore: 105,
      },
    },
  },
  {
    cve: 'CVE-2023-0011',
    cvss: 9.4,
    epss: 0.98, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 110, // גבוהה מאוד בזכות השפעות חיוביות בלבד וללא כשלונות
    cveSummary: 'Improper input sanitization vulnerability in "express-validator"',
    details: {
      branch: 'hotfix/sanitization',
      repo: 'github.com/org/security-utils',
      reachability: 'Middleware "validateInput" is directly invoked in all request validations',
      remediationVersion: '7.5.0',
      packageName: 'express-validator',
      confidenceScore: {
        functional: '105% of your tests pass compared to your baseline', // שיפור נוסף בזכות טסטים שעברו
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testSanitizationPerformance' },
            { testName: 'testSpecialCharacterValidation' },
          ],
          performance: {
            cpu: 'down 5%',
            memory: 'down 7%',
          },
        },
        totalScore: 110,
      },
    },
  },
  {
    cve: 'CVE-2023-0020',
    cvss: 9.7,
    epss: 0.68, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 72, // תוצאה בינונית עקב כשלונות והשפעות שליליות חזקות
    cveSummary: 'Improper access control vulnerability in "jsonwebtoken"',
    details: {
      branch: 'fix/access-control',
      repo: 'github.com/org/auth-utils',
      reachability: 'Function "verifyToken" is executed with unvalidated inputs',
      remediationVersion: '8.5.1',
      packageName: 'jsonwebtoken',
      confidenceScore: {
        functional: '92% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testInvalidTokenRejection' },
            { testName: 'testMalformedTokenHandling' },
          ],
          performance: {
            cpu: 'up 12%',
            memory: 'up 8%',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testTokenExpiryValidation' },
          ],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 72,
      },
    },
  },
  {
    cve: 'CVE-2023-0023',
    cvss: 9.6,
    epss: 0.78, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 92, // תוצאה גבוהה עקב שיפור משמעותי בביצועים עם מעט כשלונות
    cveSummary: 'Cross-site scripting vulnerability in "react-dom"',
    details: {
      branch: 'release/secure-render',
      repo: 'github.com/org/ui-frameworks',
      reachability: 'Render method "dangerouslySetInnerHTML" is used without sanitization',
      remediationVersion: '17.0.2',
      packageName: 'react-dom',
      confidenceScore: {
        functional: '97% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [{ testName: 'testUnsafeHTMLInjection' }],
          performance: {
            cpu: 'up 3%',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testSafeHTMLRendering' },
            { testName: 'testPerformanceMetrics' },
          ],
          performance: {
            cpu: 'down 7%',
            memory: 'down 5%',
          },
        },
        totalScore: 92,
      },
    },
  },
  {
    cve: 'CVE-2023-0025',
    cvss: 9.9,
    epss: 0.34, 
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 115, // תוצאה גבוהה מאוד עקב השפעות חיוביות בלבד וללא כשלונות
    cveSummary: 'Remote code execution vulnerability in "express-session"',
    details: {
      branch: 'hotfix/session-security',
      repo: 'github.com/org/server-utils',
      reachability: 'Session middleware "sessionHandler" is exposed to unauthenticated access',
      remediationVersion: '1.17.3',
      packageName: 'express-session',
      confidenceScore: {
        functional: '108% of your tests pass compared to your baseline', // שיפור משמעותי בטסטים שעברו
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testSessionValidation' },
            { testName: 'testSessionDataEncryption' },
          ],
          performance: {
            cpu: 'down 6%',
            memory: 'down 8%',
          },
        },
        totalScore: 115,
      },
    },
  },
  {
    cve: 'CVE-2023-0031',
    cvss: 8.5,
    epss: 0.90, 
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Patch available',
    confidenceScore: 88, // תוצאה בינונית-גבוהה בזכות שיפורים בביצועים עם מעט כשלונות
    cveSummary: 'Memory leak vulnerability in "pg" PostgreSQL driver',
    details: {
      branch: 'feature/fix-memory-leak',
      repo: 'github.com/org/db-drivers',
      reachability: 'Function "queryExecution" leaks memory during runtime',
      remediationVersion: '8.9.1',
      packageName: 'pg',
      confidenceScore: {
        functional: '96% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [{ testName: 'testMemoryUsageUnderLoad' }],
          performance: {
            cpu: 'up 5%',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testEfficientQueryExecution' },
          ],
          performance: {
            cpu: '',
            memory: 'down 10%',
          },
        },
        totalScore: 88,
      },
    },
  },
  {
    cve: 'CVE-2023-0034',
    cvss: 8.2,
    epss: 0.50, 
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Workaround available',
    confidenceScore: 75, // נמוכה יחסית בגלל כשלונות רבים והשפעות שליליות משמעותיות
    cveSummary: 'Improper authentication handling in "passport"',
    details: {
      branch: 'fix/auth-handling',
      repo: 'github.com/org/auth-libs',
      reachability: 'Authentication middleware "authenticate" fails to validate inputs properly',
      remediationVersion: '0.5.1',
      packageName: 'passport',
      confidenceScore: {
        functional: '90% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testFailedLoginHandling' },
            { testName: 'testInvalidTokenRejection' },
          ],
          performance: {
            cpu: 'up 10%',
            memory: 'up 8%',
          },
        },
        positiveEffect: {
          passedTests: [{ testName: 'testSecureLoginHandling' }],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 75,
      },
    },
  },
  {
    cve: 'CVE-2023-0036',
    cvss: 8.0,
    epss: 0.61, 
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Patch available',
    confidenceScore: 102, // גבוהה בזכות חוסר כשלונות ושיפורים בביצועים
    cveSummary: 'Improper handling of API keys in "jsonwebtoken"',
    details: {
      branch: 'hotfix/api-key-security',
      repo: 'github.com/org/auth-utils',
      reachability: 'Function "verifyApiKey" is invoked without sanitizing inputs',
      remediationVersion: '9.1.3',
      packageName: 'jsonwebtoken',
      confidenceScore: {
        functional: '105% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testApiKeyValidation' },
            { testName: 'testTokenExpirationHandling' },
          ],
          performance: {
            cpu: 'down 3%',
            memory: 'down 7%',
          },
        },
        totalScore: 102,
      },
    },
  },
  {
    cve: 'CVE-2023-0041',
    cvss: 6.5,
    epss: 0.81, 
    reachabilityScore: false,
    riskScore: 'Medium',
    remediation: 'Under investigation',
    confidenceScore: 80, // בינונית בזכות מעט שיפורים אך ללא השפעות שליליות
    cveSummary: 'Minor security flaw in "lodash.merge"',
    details: {
      branch: 'feature/fix-minor-security',
      repo: 'github.com/org/security-libs',
      reachability: 'Function "deepMerge" is rarely invoked',
      remediationVersion: '4.6.1',
      packageName: 'lodash.merge',
      confidenceScore: {
        functional: '97% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [{ testName: 'testDeepMergeHandling' }],
          performance: {
            cpu: '',
            memory: 'down 3%',
          },
        },
        totalScore: 80,
      },
    },
  },
  {
    cve: 'CVE-2023-0042',
    cvss: 6.8,
    epss: 0.91, 
    reachabilityScore: true,
    riskScore: 'Medium',
    remediation: 'Workaround available',
    confidenceScore: 68, // נמוכה עקב כשלונות והשפעות שליליות חזקות
    cveSummary: 'Improper escaping of special characters in "marked"',
    details: {
      branch: 'fix/special-characters',
      repo: 'github.com/org/markdown-utils',
      reachability: 'Function "renderMarkdown" does not escape inputs correctly',
      remediationVersion: '2.2.0',
      packageName: 'marked',
      confidenceScore: {
        functional: '89% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testMarkdownSpecialCharacters' },
          ],
          performance: {
            cpu: 'up 7%',
            memory: 'up 5%',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testSecureMarkdownRendering' },
          ],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 68,
      },
    },
  },
  {
    cve: 'CVE-2023-0045',
    cvss: 6.9,
    epss: 0.21, 
    reachabilityScore: false,
    riskScore: 'Medium',
    remediation: 'Patch available',
    confidenceScore: 98, // גבוהה בזכות שיפורים בביצועים וללא כשלונות
    cveSummary: 'Slow response time in "express-cache-handler"',
    details: {
      branch: 'hotfix/cache-optimization',
      repo: 'github.com/org/caching-utils',
      reachability: 'Function "cacheMiddleware" is used in all requests',
      remediationVersion: '3.4.2',
      packageName: 'express-cache-handler',
      confidenceScore: {
        functional: '100% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        positiveEffect: {
          passedTests: [
            { testName: 'testCachePerformance' },
            { testName: 'testCacheHitRate' },
          ],
          performance: {
            cpu: 'down 5%',
            memory: 'down 8%',
          },
        },
        totalScore: 98,
      },
    },
  },
  {
    cve: 'CVE-2023-0050',
    cvss: 9.7,
    epss: 0.11,
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 45, // נמוכה מאוד עקב כמות גבוהה של כשלונות ומדדים שליליים משמעותיים
    cveSummary: 'Privilege escalation vulnerability in "mongoose"',
    details: {
      branch: 'hotfix/privilege-escalation',
      repo: 'github.com/org/database-utils',
      reachability: 'Function "updateUserPermissions" allows privilege escalation',
      remediationVersion: '6.3.8',
      packageName: 'mongoose',
      confidenceScore: {
        functional: '85% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testPrivilegeEscalation' },
            { testName: 'testRoleValidation' },
            { testName: 'testPermissionOverride' },
          ],
          performance: {
            cpu: 'up 15%',
            memory: 'up 20%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 45,
      },
    },
  },
  {
    cve: 'CVE-2023-0051',
    cvss: 9.8,
    epss: 0.81,
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Workaround available',
    confidenceScore: 40, // תוצאה נמוכה מאוד עקב כמות גדולה של כשלונות וביצועים שליליים
    cveSummary: 'SQL injection vulnerability in "sequelize"',
    details: {
      branch: 'fix/sql-injection',
      repo: 'github.com/org/orm-tools',
      reachability: 'Query builder "buildSelectQuery" fails to sanitize inputs',
      remediationVersion: '7.1.2',
      packageName: 'sequelize',
      confidenceScore: {
        functional: '80% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testSqlInjectionPrevention' },
            { testName: 'testQuerySanitization' },
            { testName: 'testMalformedQueries' },
            { testName: 'testUnescapedInputs' },
          ],
          performance: {
            cpu: 'up 18%',
            memory: 'up 25%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 40,
      },
    },
  },
  {
    cve: 'CVE-2023-0052',
    cvss: 9.6,
    epss: 0.87,
    reachabilityScore: true,
    riskScore: 'Critical',
    remediation: 'Patch available',
    confidenceScore: 35, // נמוכה במיוחד עקב כשלונות משמעותיים והשפעות שליליות על ביצועים
    cveSummary: 'Remote code execution vulnerability in "socket.io"',
    details: {
      branch: 'hotfix/remote-execution',
      repo: 'github.com/org/realtime-frameworks',
      reachability: 'Socket handler "onConnection" allows arbitrary code execution',
      remediationVersion: '4.6.1',
      packageName: 'socket.io',
      confidenceScore: {
        functional: '75% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testUnauthorizedAccess' },
            { testName: 'testCodeInjection' },
            { testName: 'testMalformedPackets' },
            { testName: 'testPayloadValidation' },
          ],
          performance: {
            cpu: 'up 20%',
            memory: 'up 30%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 35,
      },
    },
  },
  {
    cve: 'CVE-2023-0100',
    cvss: 8.5,
    epss: 0.87,
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Patch available',
    confidenceScore: 48, // נמוכה עקב כשלונות ומדדים שליליים
    cveSummary: 'Improper sanitization in "express-rate-limit"',
    details: {
      branch: 'fix/rate-limit-issue',
      repo: 'github.com/org/middleware-tools',
      reachability: 'Rate limiter "limitRequests" fails to handle edge cases',
      remediationVersion: '7.3.1',
      packageName: 'express-rate-limit',
      confidenceScore: {
        functional: '85% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testExceedRateLimit' },
            { testName: 'testRateLimitResetFailure' },
          ],
          performance: {
            cpu: 'up 12%',
            memory: 'up 15%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 48,
      },
    },
  },
  {
    cve: 'CVE-2023-0101',
    cvss: 8.2,
    epss: 0.85,
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Workaround available',
    confidenceScore: 42, // נמוכה עקב כשלונות משמעותיים
    cveSummary: 'Vulnerability in "nodemailer" enabling email spoofing',
    details: {
      branch: 'fix/email-spoof',
      repo: 'github.com/org/mail-utils',
      reachability: 'SMTP handler fails to validate sender address',
      remediationVersion: '6.9.1',
      packageName: 'nodemailer',
      confidenceScore: {
        functional: '82% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testInvalidSenderRejection' },
            { testName: 'testSpoofedEmailHandling' },
            { testName: 'testMissingHeaders' },
          ],
          performance: {
            cpu: 'up 10%',
            memory: 'up 20%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 42,
      },
    },
  },
  {
    cve: 'CVE-2023-0102',
    cvss: 8.7,
    epss: 0.55,
    reachabilityScore: true,
    riskScore: 'High',
    remediation: 'Under investigation',
    confidenceScore: 38, // נמוכה במיוחד עקב כשלונות רבים והשפעות שליליות
    cveSummary: 'Vulnerability in "jsonwebtoken" leading to token tampering',
    details: {
      branch: 'hotfix/token-integrity',
      repo: 'github.com/org/auth-utils',
      reachability: 'Function "verify" does not validate token signature correctly',
      remediationVersion: '',
      packageName: 'jsonwebtoken',
      confidenceScore: {
        functional: '78% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testTokenSignatureValidation' },
            { testName: 'testExpiredTokenHandling' },
            { testName: 'testInvalidTokenRejection' },
          ],
          performance: {
            cpu: 'up 15%',
            memory: 'up 25%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 38,
      },
    },
  },
  {
    cve: 'CVE-2023-0200',
    cvss: 6.5,
    epss: 0.45,
    reachabilityScore: true,
    riskScore: 'Medium',
    remediation: 'Patch available',
    confidenceScore: 45, // נמוכה עקב כשלונות רבים והשפעות שליליות קלות
    cveSummary: 'Improper error handling in "express-handlebars"',
    details: {
      branch: 'hotfix/error-handling',
      repo: 'github.com/org/template-engines',
      reachability: 'Function "renderTemplate" fails to handle invalid inputs',
      remediationVersion: '5.2.0',
      packageName: 'express-handlebars',
      confidenceScore: {
        functional: '83% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testInvalidTemplateHandling' },
            { testName: 'testMalformedTemplatePrevention' },
          ],
          performance: {
            cpu: 'up 8%',
            memory: 'up 10%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 45,
      },
    },
  },
  {
    cve: 'CVE-2023-0201',
    cvss: 6.2,
    epss: 0.42,
    reachabilityScore: true,
    riskScore: 'Medium',
    remediation: 'Under investigation',
    confidenceScore: 40, // נמוכה מאוד עקב כשלונות משמעותיים והשפעות שליליות
    cveSummary: 'Improper logging in "winston" exposing sensitive data',
    details: {
      branch: 'fix/logging-security',
      repo: 'github.com/org/logging-utils',
      reachability: 'Function "log" logs sensitive data without encryption',
      remediationVersion: '',
      packageName: 'winston',
      confidenceScore: {
        functional: '79% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testSensitiveDataLogging' },
            { testName: 'testEncryptionForLogs' },
          ],
          performance: {
            cpu: 'up 12%',
            memory: 'up 5%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 40,
      },
    },
  },
  {
    cve: 'CVE-2023-0202',
    cvss: 6.8,
    epss: 0.92,
    reachabilityScore: true,
    riskScore: 'Medium',
    remediation: 'Patch available',
    confidenceScore: 48, // נמוכה יחסית בגלל מעט כשלונות והשפעות שליליות
    cveSummary: 'Improper resource cleanup in "multer" causing memory leaks',
    details: {
      branch: 'fix/resource-cleanup',
      repo: 'github.com/org/file-upload-utils',
      reachability: 'Middleware "uploadHandler" does not free unused resources',
      remediationVersion: '1.5.0',
      packageName: 'multer',
      confidenceScore: {
        functional: '85% of your tests pass compared to your baseline',
        negativeEffect: {
          failedTests: [
            { testName: 'testMemoryLeakPrevention' },
          ],
          performance: {
            cpu: 'up 5%',
            memory: 'up 15%',
          },
        },
        positiveEffect: {
          passedTests: [],
          performance: {
            cpu: '',
            memory: '',
          },
        },
        totalScore: 48,
      },
    },
  },
  
  
];


// Add critical CVEs to the mock data
mockKpiData.push(...criticalCves);

const remainingCves = 30 - criticalCves.length;

mockKpiData.push(
  ...Array.from({ length: remainingCves }, (_, i) => {
    // Randomize negative and positive impacts
    const hasNegativeImpact = Math.random() > 0.5;
    const hasPositiveImpact = Math.random() > 0.5;

    // Generate CPU and memory impacts
    const negativeCpuImpact = hasNegativeImpact ? `up ${Math.floor(Math.random() * 10 + 1)}%` : '';
    const positiveCpuImpact = hasPositiveImpact ? `down ${Math.floor(Math.random() * 10 + 1)}%` : '';

    const negativeMemoryImpact = hasNegativeImpact ? `up ${Math.floor(Math.random() * 15 + 1)}%` : '';
    const positiveMemoryImpact = hasPositiveImpact ? `down ${Math.floor(Math.random() * 15 + 1)}%` : '';

    // Generate failed and passed tests
    const failedTests = hasNegativeImpact
      ? Array.from({ length: Math.floor(Math.random() * 3 + 1) }, (_, index) => ({
        testName: `failedTest${index + 1}`,
      }))
      : [];

    const passedTests = hasPositiveImpact
      ? Array.from({ length: Math.floor(Math.random() * 3 + 1) }, (_, index) => ({
        testName: `passedTest${index + 1}`,
      }))
      : [];

    // Calculate confidence score
    const totalScore =
      failedTests.length > 0 && hasNegativeImpact
        ? Math.floor(Math.random() * 30 + 50) // Low score (50-80)
        : passedTests.length > 0 && hasPositiveImpact
          ? Math.floor(Math.random() * 20 + 80) // Medium score (80-100)
          : Math.floor(Math.random() * 10 + 100); // High score (100-110)

    return {
      cve: `CVE-2023-${(i + 7).toString().padStart(4, '0')}`,
      cvss: parseFloat((Math.random() * 10).toFixed(1)),
      epss: 0.88,
      reachabilityScore: Math.random() > 0.5,
      riskScore: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
      remediation: ['Patch available', 'Workaround available', 'Under investigation'][Math.floor(Math.random() * 3)],
      confidenceScore: totalScore,
      cveSummary: `Summary of CVE-2023-${(i + 7).toString().padStart(4, '0')}`,
      details: {
        branch: '',
        repo: '',
        reachability: '',
        packageName: '',
        remediationVersion: '',
        confidenceScore: {
          functional: passedTests.length > 0
            ? `${100 + Math.floor(Math.random() * 5)}% of your test pass compare to your baseline`
            : '',
          negativeEffect: {
            failedTests,
            performance: {
              cpu: negativeCpuImpact,
              memory: negativeMemoryImpact,
            },
          },
          positiveEffect: {
            passedTests,
            performance: {
              cpu: positiveCpuImpact,
              memory: positiveMemoryImpact,
            },
          },
          totalScore,
        },
      },
    };
  })
);

export default mockKpiData;
