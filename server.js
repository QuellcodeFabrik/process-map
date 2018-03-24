'use strict';

process.env.DEBUG = 'api:*';
process.chdir(__dirname);

let server	= require('express')();

// initialize mock objects for all available routes
const processDefinitionList = {
    "d": {
        "results": [
            {
                "__metadata": {
                    "id": "56ee07bd-0bce-48e0-9d0d-caf0ac347fc5",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(1)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 1,
                "ProcessId": "0",
                "ProcessTitle": "Managementprozess",
                "ProcessType": "Management",
                "StepId": "01",
                "Title": "Finanzen",
                "StepLabel": null,
                "StepOrder": "1",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=37aea559-638a-4de2-956d-d4925140ce0f"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 1
            },
            {
                "__metadata": {
                    "id": "b5c3feed-520a-49b3-a2a4-71e712b89269",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(2)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 2,
                "ProcessId": "0",
                "ProcessTitle": "Managementprozess",
                "ProcessType": "Management",
                "StepId": "02",
                "Title": "Personal",
                "StepLabel": null,
                "StepOrder": "2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=e2d45fe0-a2a6-44f9-8505-81231d590da0"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 2
            },
            {
                "__metadata": {
                    "id": "9701f0d8-9633-4d16-a403-e6d3546bab3e",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(3)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 3,
                "ProcessId": "0",
                "ProcessTitle": "Managementprozess",
                "ProcessType": "Management",
                "StepId": "03",
                "Title": "Strategie",
                "StepLabel": null,
                "StepOrder": "3",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=bb7c42c0-69f9-4bb0-82e1-5a8fd660de65"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 3
            },
            {
                "__metadata": {
                    "id": "f229530b-fcbc-4a55-b918-8053a1cd1c18",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(4)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 4,
                "ProcessId": "0",
                "ProcessTitle": "Managementprozess",
                "ProcessType": "Management",
                "StepId": "04",
                "Title": "Wissen",
                "StepLabel": null,
                "StepOrder": "4",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=71e2c877-fa36-4570-92f9-18b1c4b33118"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 4
            },
            {
                "__metadata": {
                    "id": "1f54d800-4ecc-4420-a4f9-906ec8828c9d",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(5)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 5,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.1",
                "Title": "Marketing",
                "StepLabel": null,
                "StepOrder": "1",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=cfb8a301-a97d-4751-9c5c-a1997d78716c"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 5
            },
            {
                "__metadata": {
                    "id": "9e29254a-56c9-487b-b1cc-df7c50aae3e3",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(6)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 6,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.2",
                "Title": "R&D",
                "StepLabel": null,
                "StepOrder": "2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=f3131b0a-9d48-415d-923d-e80cef7e731d"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 6
            },
            {
                "__metadata": {
                    "id": "c8ebd1e8-af35-49e5-86b2-a98b030608d8",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(7)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 7,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.3",
                "Title": "Beschaffung",
                "StepLabel": null,
                "StepOrder": "3",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=8328d6d4-b2d5-4eab-a32c-ef6987f49da3"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 7
            },
            {
                "__metadata": {
                    "id": "9be3888b-d68b-4450-94e1-810f583e7ede",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(8)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 8,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.4",
                "Title": "Produktion",
                "StepLabel": null,
                "StepOrder": "4.1",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=158c79cc-47cb-4b90-933c-31f4e46bda0f"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 8
            },
            {
                "__metadata": {
                    "id": "9be3888b-d68b-4450-94e1-810f583e7edf",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(15)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 15,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.4.1",
                "Title": "Outsourcing",
                "StepLabel": null,
                "StepOrder": "4.2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=158c79cc-47cb-4b90-933c-31f4e46bda0f"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 15
            },
            {
                "__metadata": {
                    "id": "67420e03-8414-459e-b92e-c434865f0f7a",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(9)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 9,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.5",
                "Title": "Logistik",
                "StepLabel": null,
                "StepOrder": "5",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=3de53eb3-5e51-47ef-bc18-6975631c3d60"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 9
            },
            {
                "__metadata": {
                    "id": "cf0719d6-800c-43a6-bb18-0fcc38ecbad8",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(10)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 10,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.6",
                "Title": "Service",
                "StepLabel": null,
                "StepOrder": "6",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=c24e760c-a85e-42af-9d5c-a6295e1db1bf"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 10
            },
            {
                "__metadata": {
                    "id": "e8311a65-2c46-4c87-b020-9b2d39e2dba0",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(11)",
                    "etag": "\"2\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 11,
                "ProcessId": "2",
                "ProcessTitle": "Unterstützender Prozess",
                "ProcessType": "Support",
                "StepId": "21",
                "Title": "IT",
                "StepLabel": null,
                "StepOrder": "1",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=13a3c0a2-cbeb-47d1-acc9-a7e0325e9b91"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 11
            },
            {
                "__metadata": {
                    "id": "205e5bcb-56b5-4fa3-8a1e-2801901e9c51",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(12)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 12,
                "ProcessId": "2",
                "ProcessTitle": "Unterstützender Prozess",
                "ProcessType": "Support",
                "StepId": "22",
                "Title": "QM",
                "StepLabel": null,
                "StepOrder": "2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=c77233cb-342d-4677-84bb-712af0bccfeb"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 12
            },
            {
                "__metadata": {
                    "id": "2fb0ff99-f642-4b76-9989-01e57fa627fb",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(13)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 13,
                "ProcessId": "2",
                "ProcessTitle": "Unterstützender Prozess",
                "ProcessType": "Support",
                "StepId": "23",
                "Title": "Patente",
                "StepLabel": null,
                "StepOrder": "3",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=7777895f-52a3-44d2-8c46-bbf4081e7e32"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 13
            },
            {
                "__metadata": {
                    "id": "85d20641-571f-43e5-9587-4e39d233413f",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(14)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 14,
                "ProcessId": "2",
                "ProcessTitle": "Unterstützender Prozess",
                "ProcessType": "Support",
                "StepId": "24",
                "Title": "Recht",
                "StepLabel": null,
                "StepOrder": "4",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=bb938ed0-7110-4d20-a561-bdea6cea5e55"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "ID": 14
            }
        ]
    }
};

// enable Express' case-sensitive and strict options
server.enable('case sensitive routing');
server.enable('strict routing');

// enable CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// return SharePoint specific context information required for subsequent
// requests that modify content on the server
server.post('/_api/contextinfo', (req, res) => {
	res.json({
		d: {
			GetContextWebInformation: {
				FormDigestValue: 'MockDigestValue'
			}
		}
	});
});

// full entity name request
server.get('/_api/web/lists/:selection', (req, res, next) => {
	if (req.query['$select'] && req.query['$select'] === 'ListItemEntityTypeFullName') {
		return res.json({
			d: {
				ListItemEntityTypeFullName: 'MockListEntitityName'
			}
		});
	}
	next();
});

// list api requests
server.get('/_api/web/lists/:selection/items', (req, res, next) => {
	let selection = req.params.selection;
	if (selection.startsWith('GetByTitle')) {
		selection = selection.split('\'')[1];
		console.log('Request for ' + selection + ' received.');

		switch (selection) {
			case 'ProcessDefinition':
				res.json(processDefinitionList);
				break;
			default:
				res.status(404).send('List not found.');
				break;
		}
	}
	else {
		next();
	}
});

// add a custom error handler
server.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(err.status).json(err.message);
    } else {
    	next(err);
	}
});

// start listening on port 10010
console.log('Mock API Server listening on port 8000.');
server.listen(8000);