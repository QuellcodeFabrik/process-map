'use strict';

process.env.DEBUG = 'api:*';
process.chdir(__dirname);

let server	= require('express')();

// initialize mock objects for all available routes
const processDefinitionList = {
    d: {
        results: [
            {
                "__metadata": {
                    "id": "Web/Lists(guid'50883b04-48ed-40c0-acec-d2cb0cdd04a0')/Items(1)",
                    "uri": "http://sps2013dev.evocom.de/sites/amgcollab/collab/_api/Web/Lists(guid'50883b04-48ed-40c0-acec-d2cb0cdd04a0')/Items(1)",
                    "etag": "\"1\"",
                    "type": "SP.Data.T3ListItem"
                },
                "AssignedTo": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "b636c9d5-2c36-471f-baa1-679be944b30d",
                                "type": "SP.Data.UserInfoItem"
                            },
                            "Id": 2,
                            "Title": "Jochen Baur",
                            "Name": "i:0#.w|edd\\jb"
                        }
                    ]
                },
                "Author": {
                    "__metadata": {
                        "id": "fa2b5929-8565-4add-97a8-d803551742c4",
                        "type": "SP.Data.UserInfoItem"
                    },
                    "Id": 2,
                    "Name": "i:0#.w|edd\\jb",
                    "Title": "Jochen Baur"
                },
                "Id": 1,
                "Title": "Testtask für T3",
                "Priority": "(2) Normal",
                "Status": "Not Started",
                "DueDate": "2016-11-01T00:00:00Z",
                "ProjectName": "3D-CFD-THERMO Planung von nicht angelegten Projekten",
                "SeriesName": "C117",
                "SeriesShortName": "C117",
                "SeriesNameTerm": null,
                "TeamTerm": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "KT4711",
                            "TermGuid": "d7a65bb2-4f23-4149-b45e-14014a0d18cf",
                            "WssId": 1
                        },
                        {
                            "Label": "KT-F01 - KÜHLUNG, KRAFTSTOFF, KLIMA, THERMISCHE ABSICHERUNG",
                            "TermGuid": "401e2033-da9a-45a8-872e-a5638ea2cecc",
                            "WssId": 3
                        }
                    ]
                },
                "ID": 1
            },
            {
                "__metadata": {
                    "id": "Web/Lists(guid'50883b04-48ed-40c0-acec-d2cb0cdd04a0')/Items(2)",
                    "uri": "http://sps2013dev.evocom.de/sites/amgcollab/collab/_api/Web/Lists(guid'50883b04-48ed-40c0-acec-d2cb0cdd04a0')/Items(2)",
                    "etag": "\"1\"",
                    "type": "SP.Data.T3ListItem"
                },
                "AssignedTo": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "d07e73c5-ef64-41a4-b0f5-8dbc7485b3ca",
                                "type": "SP.Data.UserInfoItem"
                            },
                            "Id": 11,
                            "Title": "Sascha Gros.",
                            "Name": "i:0#.w|edd\\sg"
                        }
                    ]
                },
                "Author": {
                    "__metadata": {
                        "id": "2f5a8e61-c049-4a9e-ae03-bd459d4a0796",
                        "type": "SP.Data.UserInfoItem"
                    },
                    "Id": 2,
                    "Name": "i:0#.w|edd\\jb",
                    "Title": "Jochen Baur"
                },
                "Id": 2,
                "Title": "Test Task 2 für T3",
                "Priority": "(2) Normal",
                "Status": "Not Started",
                "DueDate": "2016-11-30T00:00:00Z",
                "ProjectName": "3D-CFD-THERMO Planung von nicht angelegten Projekten",
                "SeriesName": "C117",
                "SeriesShortName": "C117",
                "SeriesNameTerm": null,
                "TeamTerm": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "KT4712",
                            "TermGuid": "689d6efa-1848-4663-9c1b-bb61f7fc43aa",
                            "WssId": 2
                        },
                        {
                            "Label": "KT-F01 - KÜHLUNG, KRAFTSTOFF, KLIMA, THERMISCHE ABSICHERUNG",
                            "TermGuid": "401e2033-da9a-45a8-872e-a5638ea2cecc",
                            "WssId": 3
                        }
                    ]
                },
                "ID": 2
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