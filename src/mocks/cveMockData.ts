export interface CVE {
    id: string;
    service: string[];
    package: string;
    version: string;
    remediation_version: string;
    severity: string;
    cvss: number;
    reachability: string;
    endpoints: string[];
    userJourneys: { user: string; journey: string; payload: string }[];
}

export const cveMockData: CVE[] = [
    {
        id: 'CVE-2021-44228',
        service: ['Log Management Service', 'Security Monitoring Service'],
        package: 'log4j',
        version: '2.14.0',
        remediation_version: '2.15.0',
        severity: 'Critical',
        cvss: 10.0,
        reachability: 'Yes',
        endpoints: [
            '/api/logs/ingest',
            '/api/logs/query',
            '/api/logs/alert'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/logs/ingest -> /api/logs/query', payload: "{'data': 'log_entry.json', 'operation': 'store'}" },
            { user: "User2", journey: '/api/logs/query -> /api/logs/alert', payload: "{'query': 'error_logs', 'alert_type': 'email'}" },
            { user: "User3", journey: '/api/logs/alert -> /api/logs/ingest', payload: "{'alert_id': '1234', 'status': 'resolved'}" },
            { user: "User4", journey: '/api/logs/query -> /api/logs/alert -> /api/logs/ingest', payload: "{'query': 'access_logs', 'alert_type': 'sms', 'data': 'log_entry.json'}" },
            { user: "User5", journey: '/api/logs/ingest -> /api/logs/query -> /api/logs/alert', payload: "{'data': 'log_entry.xml', 'operation': 'analyze', 'alert_type': 'push_notification'}" }
        ]
    },
    {
        id: 'CVE-2021-34527',
        service: ['Print Spooler Service', 'Document Management Service'],
        package: 'spoolsv',
        version: '10.0',
        remediation_version: '10.1',
        severity: 'High',
        cvss: 8.8,
        reachability: 'Yes',
        endpoints: [
            '/api/print/submit',
            '/api/print/status',
            '/api/print/cancel'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/print/submit -> /api/print/status', payload: "{'document': 'file.pdf', 'printer': 'printer1'}" },
            { user: "User2", journey: '/api/print/status -> /api/print/cancel', payload: "{'job_id': '5678', 'status': 'queued'}" },
            { user: "User3", journey: '/api/print/cancel -> /api/print/submit', payload: "{'job_id': '5678', 'action': 'cancel'}" },
            { user: "User4", journey: '/api/print/submit -> /api/print/status -> /api/print/cancel', payload: "{'document': 'report.docx', 'status': 'processing', 'action': 'retry'}" },
            { user: "User5", journey: '/api/print/status -> /api/print/cancel -> /api/print/submit', payload: "{'job_id': '1234', 'action': 'cancel', 'document': 'new_file.pdf'}" }
        ]
    },
    {
        id: 'CVE-2021-3156',
        service: ['Identity Management Service', 'Access Control Service'],
        package: 'sudo',
        version: '1.8.31',
        remediation_version: '1.9.5',
        severity: 'High',
        cvss: 7.5,
        reachability: 'Yes',
        endpoints: [
            '/api/auth/login',
            '/api/auth/logout',
            '/api/auth/token',
            '/api/auth/register',
            '/api/auth/reset'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/auth/login -> /api/auth/token', payload: "{'username': 'user1', 'password': 'pass123'}" },
            { user: "User2", journey: '/api/auth/logout -> /api/auth/login', payload: "{'token': 'abcd1234', 'username': 'user2', 'password': 'pass456'}" },
            { user: "User3", journey: '/api/auth/register -> /api/auth/login -> /api/auth/token', payload: "{'email': 'user3@example.com', 'username': 'user3', 'password': 'pass789'}" },
            { user: "User4", journey: '/api/auth/login -> /api/auth/reset -> /api/auth/login', payload: "{'username': 'user4', 'password': 'pass000', 'reset_code': 'reset123'}" },
            { user: "User5", journey: '/api/auth/logout -> /api/auth/login -> /api/auth/token -> /api/auth/logout', payload: "{'token': 'efgh5678', 'username': 'user5', 'password': 'pass987'}" }
        ]
    },
    {
        id: 'CVE-2021-21972',
        service: ['Virtual Machine Management', 'Cloud Infrastructure Service'],
        package: 'vsphere-client',
        version: '6.7',
        remediation_version: '7.0',
        severity: 'Critical',
        cvss: 9.8,
        reachability: 'Yes',
        endpoints: [
            '/api/vm/create',
            '/api/vm/delete',
            '/api/vm/snapshot',
            '/api/vm/restart',
            '/api/vm/stop'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/vm/create -> /api/vm/snapshot', payload: "{'vm_name': 'test_vm', 'snapshot_name': 'initial'}" },
            { user: "User2", journey: '/api/vm/restart -> /api/vm/snapshot', payload: "{'vm_id': 'vm123', 'snapshot_name': 'post_restart'}" },
            { user: "User3", journey: '/api/vm/create -> /api/vm/restart -> /api/vm/snapshot', payload: "{'vm_name': 'dev_vm', 'snapshot_name': 'ready', 'restart_mode': 'safe'}" },
            { user: "User4", journey: '/api/vm/delete -> /api/vm/create -> /api/vm/snapshot', payload: "{'vm_id': 'vm456', 'vm_name': 'new_vm', 'snapshot_name': 'after_create'}" },
            { user: "User5", journey: '/api/vm/stop -> /api/vm/restart -> /api/vm/snapshot -> /api/vm/delete', payload: "{'vm_id': 'vm789', 'snapshot_name': 'before_delete'}" }
        ]
    },        
    {
        id: 'CVE-2022-22965',
        service: ['Cloud Configuration Management', 'Application Management Service'],
        package: 'spring-core',
        version: '5.3.17',
        remediation_version: '5.3.18',
        severity: 'Critical',
        cvss: 9.8,
        reachability: 'Yes',
        endpoints: [
            '/api/cloud/config',
            '/api/cloud/refresh',
            '/api/cloud/actuator',
            '/api/cloud/metrics',
            '/api/cloud/health'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/cloud/config -> /api/cloud/refresh', payload: "{'config_name': 'app_config', 'refresh_type': 'full'}" },
            { user: "User2", journey: '/api/cloud/metrics -> /api/cloud/health', payload: "{'metric_type': 'cpu', 'threshold': '80%'}" },
            { user: "User3", journey: '/api/cloud/config -> /api/cloud/actuator -> /api/cloud/health', payload: "{'config_name': 'db_config', 'actuator_type': 'restart'}" },
            { user: "User4", journey: '/api/cloud/refresh -> /api/cloud/metrics -> /api/cloud/health', payload: "{'refresh_type': 'partial', 'metric_type': 'memory', 'status': 'ok'}" },
            { user: "User5", journey: '/api/cloud/actuator -> /api/cloud/metrics -> /api/cloud/health -> /api/cloud/config', payload: "{'actuator_type': 'shutdown', 'metric_type': 'disk', 'config_name': 'network_config'}" }
        ]
    },
    {
        id: 'CVE-2022-22963',
        service: ['Spring Cloud Gateway', 'API Gateway Service'],
        package: 'spring-cloud-gateway',
        version: '3.1.0',
        remediation_version: '3.1.1',
        severity: 'High',
        cvss: 8.8,
        reachability: 'Yes',
        endpoints: [
            '/api/gateway/routes',
            '/api/gateway/predicates',
            '/api/gateway/filters',
            '/api/gateway/reload',
            '/api/gateway/health'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/gateway/routes -> /api/gateway/predicates', payload: "{'route_id': 'route123', 'predicate': 'Path=/api/**'}" },
            { user: "User2", journey: '/api/gateway/filters -> /api/gateway/reload', payload: "{'filter_name': 'AddResponseHeader', 'reload': true}" },
            { user: "User3", journey: '/api/gateway/routes -> /api/gateway/filters -> /api/gateway/reload', payload: "{'route_id': 'route456', 'filter_name': 'RemoveRequestHeader', 'reload': true}" },
            { user: "User4", journey: '/api/gateway/reload -> /api/gateway/health -> /api/gateway/routes', payload: "{'status': 'success', 'route_id': 'route789'}" },
            { user: "User5", journey: '/api/gateway/routes -> /api/gateway/predicates -> /api/gateway/filters -> /api/gateway/reload', payload: "{'route_id': 'route321', 'predicate': 'Host=example.com', 'filter_name': 'RewritePath', 'reload': true}" }
        ]
    },
    {
        id: 'CVE-2022-22947',
        service: ['Function Orchestration Service', 'Cloud Configuration Management'],
        package: 'spring-cloud-function',
        version: '3.2.2',
        remediation_version: '3.2.3',
        severity: 'Critical',
        cvss: 9.8,
        reachability: 'Yes',
        endpoints: [
            '/api/function/invoke',
            '/api/function/list',
            '/api/function/delete',
            '/api/function/update',
            '/api/function/create'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/function/create -> /api/function/invoke', payload: "{'function_name': 'processData', 'payload': {'data': 'input'}}" },
            { user: "User2", journey: '/api/function/list -> /api/function/delete', payload: "{'function_name': 'cleanup'}" },
            { user: "User3", journey: '/api/function/invoke -> /api/function/update -> /api/function/invoke', payload: "{'function_name': 'transformData', 'update_payload': {'new_data': 'value'}}" },
            { user: "User4", journey: '/api/function/create -> /api/function/invoke -> /api/function/list', payload: "{'function_name': 'aggregateData', 'payload': {'data': 'source'}}" },
            { user: "User5", journey: '/api/function/delete -> /api/function/create -> /api/function/invoke -> /api/function/list', payload: "{'function_name': 'oldFunction', 'new_function_name': 'newFunction', 'payload': {'data': 'sample'}}" }
        ]
    },
    {
        id: 'CVE-2021-23368',
        service: ['Data Transformation Service', 'Data Processing Service'],
        package: 'lodash',
        version: '4.17.20',
        remediation_version: '4.17.21',
        severity: 'High',
        cvss: 7.5,
        reachability: 'Yes',
        endpoints: [
            '/api/data/filter',
            '/api/data/map',
            '/api/data/reduce',
            '/api/data/clone',
            '/api/data/find'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/data/filter -> /api/data/map', payload: "{'filter_criteria': 'active', 'map_function': 'transform'}" },
            { user: "User2", journey: '/api/data/find -> /api/data/clone', payload: "{'find_criteria': 'unique', 'clone_deep': true}" },
            { user: "User3", journey: '/api/data/map -> /api/data/reduce -> /api/data/filter', payload: "{'map_function': 'simplify', 'reduce_function': 'aggregate', 'filter_criteria': 'valid'}" },
            { user: "User4", journey: '/api/data/clone -> /api/data/map -> /api/data/find', payload: "{'clone_shallow': false, 'map_function': 'enhance', 'find_criteria': 'primary'}" },
            { user: "User5", journey: '/api/data/find -> /api/data/filter -> /api/data/map -> /api/data/reduce', payload: "{'find_criteria': 'secondary', 'filter_criteria': 'inactive', 'map_function': 'normalize', 'reduce_function': 'summarize'}" }
        ]
    },
    {
        id: 'CVE-2020-8203',
        service: ['Data Processing Service', 'Data Transformation Service'],
        package: 'lodash',
        version: '4.17.15',
        remediation_version: '4.17.16',
        severity: 'High',
        cvss: 7.4,
        reachability: 'Yes',
        endpoints: [
            '/api/data/clone',
            '/api/data/merge',
            '/api/data/find',
            '/api/data/pull',
            '/api/data/push'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/data/clone -> /api/data/merge', payload: "{'source': 'objectA', 'target': 'objectB'}" },
            { user: "User2", journey: '/api/data/find -> /api/data/pull', payload: "{'criteria': 'matched', 'pull_target': 'array'}" },
            { user: "User3", journey: '/api/data/clone -> /api/data/push -> /api/data/find', payload: "{'clone_deep': true, 'push_target': 'stack', 'find_criteria': 'first'}" },
            { user: "User4", journey: '/api/data/merge -> /api/data/find -> /api/data/pull', payload: "{'merge_target': 'list', 'find_criteria': 'last', 'pull_target': 'queue'}" },
            { user: "User5", journey: '/api/data/push -> /api/data/clone -> /api/data/merge -> /api/data/find', payload: "{'push_target': 'buffer', 'clone_shallow': false, 'merge_target': 'map', 'find_criteria': 'key'}" }
        ]
    },
    {
        id: 'CVE-2020-28493',
        service: ['Customer Management Service', 'Log Processing Service'],
        package: 'express',
        version: '4.17.1',
        remediation_version: '4.17.2',
        severity: 'High',
        cvss: 8.6,
        reachability: 'Yes',
        endpoints: [
            '/api/server/start',
            '/api/server/stop',
            '/api/server/status',
            '/api/server/reload',
            '/api/server/config'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/server/start -> /api/server/status', payload: "{'config': 'default'}" },
            { user: "User2", journey: '/api/server/stop -> /api/server/reload', payload: "{'reason': 'maintenance', 'reload_type': 'graceful'}" },
            { user: "User3", journey: '/api/server/config -> /api/server/start -> /api/server/status', payload: "{'config': 'optimized', 'status_check': 'initial'}" },
            { user: "User4", journey: '/api/server/reload -> /api/server/status -> /api/server/start', payload: "{'reload_type': 'full', 'status_check': 'final', 'config': 'new'}" },
            { user: "User5", journey: '/api/server/start -> /api/server/config -> /api/server/reload -> /api/server/status', payload: "{'config': 'performance', 'reload_type': 'incremental'}" }
        ]
    },
    {
        id: 'CVE-2021-29921',
        service: ['Application Management Service', 'Log Processing Service', 'Customer Management Service'],
        package: 'flask',
        version: '1.1.2',
        remediation_version: '1.1.4',
        severity: 'High',
        cvss: 7.5,
        reachability: 'Yes',
        endpoints: [
            '/api/web/start',
            '/api/web/stop',
            '/api/web/restart',
            '/api/web/deploy',
            '/api/web/config'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/web/start -> /api/web/stop', payload: "{'service_name': 'flask_app', 'action': 'initiate'}" },
            { user: "User2", journey: '/api/web/restart -> /api/web/config', payload: "{'config_name': 'default', 'action': 'update'}" },
            { user: "User3", journey: '/api/web/deploy -> /api/web/start -> /api/web/stop', payload: "{'deploy_version': 'v1.2', 'action': 'rollback'}" },
            { user: "User4", journey: '/api/web/config -> /api/web/start -> /api/web/restart', payload: "{'config_name': 'optimized', 'action': 'refresh'}" },
            { user: "User5", journey: '/api/web/stop -> /api/web/deploy -> /api/web/start -> /api/web/restart', payload: "{'service_name': 'flask_app', 'deploy_version': 'v1.3', 'action': 'redeploy'}" }
        ]
    },
    {
        id: 'CVE-2020-28484',
        service: ['Identity Management Web Service', 'API Gateway Service', 'Content Delivery Service'],
        package: 'django',
        version: '3.1.1',
        remediation_version: '3.1.2',
        severity: 'High',
        cvss: 7.5,
        reachability: 'Yes',
        endpoints: [
            '/api/django/create',
            '/api/django/delete',
            '/api/django/update',
            '/api/django/query',
            '/api/django/migrate'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/django/create -> /api/django/query', payload: "{'model': 'User', 'query': 'get_active'}" },
            { user: "User2", journey: '/api/django/delete -> /api/django/migrate', payload: "{'model': 'Order', 'migration_type': 'schema'}" },
            { user: "User3", journey: '/api/django/update -> /api/django/query -> /api/django/create', payload: "{'model': 'Product', 'update_fields': 'price, stock', 'query': 'get_all'}" },
            { user: "User4", journey: '/api/django/query -> /api/django/create -> /api/django/migrate', payload: "{'model': 'Inventory', 'query': 'get_low_stock', 'migration_type': 'data'}" },
            { user: "User5", journey: '/api/django/create -> /api/django/update -> /api/django/query -> /api/django/delete', payload: "{'model': 'Customer', 'update_fields': 'address, phone', 'query': 'get_recent', 'delete_criteria': 'inactive'}" }
        ]
    },
    {
        id: 'CVE-2020-5252',
        service: ['API Gateway Service', 'Function Orchestration Service'],
        package: 'fastapi',
        version: '0.54.0',
        remediation_version: '0.54.1',
        severity: 'High',
        cvss: 8.1,
        reachability: 'Yes',
        endpoints: [
            '/api/rest/create',
            '/api/rest/read',
            '/api/rest/update',
            '/api/rest/delete',
            '/api/rest/validate'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/rest/create -> /api/rest/read', payload: "{'entity': 'User', 'read_criteria': 'all'}" },
            { user: "User2", journey: '/api/rest/update -> /api/rest/validate', payload: "{'entity': 'Order', 'update_fields': 'status, payment'}" },
            { user: "User3", journey: '/api/rest/delete -> /api/rest/create -> /api/rest/read', payload: "{'entity': 'Product', 'delete_criteria': 'discontinued', 'read_criteria': 'latest'}" },
            { user: "User4", journey: '/api/rest/validate -> /api/rest/update -> /api/rest/read', payload: "{'entity': 'Inventory', 'validate_rules': 'stock, price', 'read_criteria': 'low_stock'}" },
            { user: "User5", journey: '/api/rest/read -> /api/rest/create -> /api/rest/update -> /api/rest/validate', payload: "{'entity': 'Customer', 'read_criteria': 'new', 'update_fields': 'email, phone', 'validate_rules': 'email_format'}" }
        ]
    },
    {
        id: 'CVE-2021-23358',
        service: ['Content Delivery Service', 'Data Transformation Service', 'Log Management Service'],
        package: 'react',
        version: '16.12.0',
        remediation_version: '16.13.1',
        severity: 'High',
        cvss: 7.4,
        reachability: 'Yes',
        endpoints: [
            '/api/react/render',
            '/api/react/update',
            '/api/react/unmount',
            '/api/react/hooks',
            '/api/react/context'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/react/render -> /api/react/update', payload: "{'component': 'Header', 'props': {'title': 'Home'}}" },
            { user: "User2", journey: '/api/react/unmount -> /api/react/render', payload: "{'component': 'Footer'}" },
            { user: "User3", journey: '/api/react/hooks -> /api/react/context -> /api/react/render', payload: "{'hook': 'useEffect', 'context': 'ThemeContext'}" },
            { user: "User4", journey: '/api/react/update -> /api/react/render -> /api/react/hooks', payload: "{'component': 'Main', 'props': {'data': 'user_data'}}" },
            { user: "User5", journey: '/api/react/context -> /api/react/render -> /api/react/hooks -> /api/react/update', payload: "{'context': 'AuthContext', 'component': 'Sidebar', 'props': {'status': 'active'}}" }
        ]
    },
    {
        id: 'CVE-2019-10744',
        service: ['Log Processing Service', 'Application Management Service', 'API Gateway Service', 'Data Processing Service'],
        package: 'morgan',
        version: '1.9.0',
        remediation_version: '1.9.1',
        severity: 'High',
        cvss: 8.2,
        reachability: 'Yes',
        endpoints: [
            '/api/logs/request',
            '/api/logs/response',
            '/api/logs/error',
            '/api/logs/archive',
            '/api/logs/retrieve'
        ],
        userJourneys: [
            { user: "User1", journey: '/api/logs/request -> /api/logs/response', payload: "{'method': 'GET', 'endpoint': '/status'}" },
            { user: "User2", journey: '/api/logs/error -> /api/logs/retrieve', payload: "{'error_code': '500', 'retrieve_type': 'last'}" },
            { user: "User3", journey: '/api/logs/archive -> /api/logs/retrieve -> /api/logs/request', payload: "{'archive_type': 'daily', 'retrieve_type': 'all', 'method': 'POST', 'endpoint': '/submit'}" },
            { user: "User4", journey: '/api/logs/request -> /api/logs/error -> /api/logs/archive', payload: "{'method': 'DELETE', 'endpoint': '/remove', 'error_code': '404', 'archive_type': 'weekly'}" },
            { user: "User5", journey: '/api/logs/response -> /api/logs/request -> /api/logs/error -> /api/logs/archive', payload: "{'method': 'PUT', 'endpoint': '/update', 'error_code': '403', 'archive_type': 'monthly'}" }
        ]
    },    
];
