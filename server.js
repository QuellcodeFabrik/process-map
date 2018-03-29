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
                    "id": "0ac46506-7e9b-4fde-8cc2-46e37e0ad722",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(1)",
                    "etag": "\"3\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "01 Finance",
                            "TermGuid": "37aea559-638a-4de2-956d-d4925140ce0f",
                            "WssId": 91
                        }
                    ]
                },
                "ID": 1
            },
            {
                "__metadata": {
                    "id": "bb37552b-486e-4a3e-ab0c-e8364d36524f",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(2)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "02 HR",
                            "TermGuid": "e2d45fe0-a2a6-44f9-8505-81231d590da0",
                            "WssId": 92
                        }
                    ]
                },
                "ID": 2
            },
            {
                "__metadata": {
                    "id": "b9a7b2a6-3c82-4265-a448-4e8790863372",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(3)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "03 Strategy",
                            "TermGuid": "bb7c42c0-69f9-4bb0-82e1-5a8fd660de65",
                            "WssId": 71
                        }
                    ]
                },
                "ID": 3
            },
            {
                "__metadata": {
                    "id": "0c2f9cfa-9106-442e-b32d-3d1b380c9a1e",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(4)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "04 Knowlegde",
                            "TermGuid": "71e2c877-fa36-4570-92f9-18b1c4b33118",
                            "WssId": 70
                        }
                    ]
                },
                "ID": 4
            },
            {
                "__metadata": {
                    "id": "fdea8592-712a-4c3c-b634-9f7165c0cc9c",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(5)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.1 Marketing/Sales",
                            "TermGuid": "cfb8a301-a97d-4751-9c5c-a1997d78716c",
                            "WssId": 68
                        }
                    ]
                },
                "ID": 5
            },
            {
                "__metadata": {
                    "id": "eddc2686-e2dc-41dd-be97-b1e21d35542a",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(6)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.2 R＆D",
                            "TermGuid": "f3131b0a-9d48-415d-923d-e80cef7e731d",
                            "WssId": 58
                        }
                    ]
                },
                "ID": 6
            },
            {
                "__metadata": {
                    "id": "87f7d3d6-9409-4106-97e7-eacf4bad4e2d",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(7)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.3 Procurement",
                            "TermGuid": "8328d6d4-b2d5-4eab-a32c-ef6987f49da3",
                            "WssId": 93
                        }
                    ]
                },
                "ID": 7
            },
            {
                "__metadata": {
                    "id": "128e4641-afa7-49f3-9d59-d651852225de",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(8)",
                    "etag": "\"3\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.4 Production",
                            "TermGuid": "158c79cc-47cb-4b90-933c-31f4e46bda0f",
                            "WssId": 59
                        }
                    ]
                },
                "ID": 8
            },
            {
                "__metadata": {
                    "id": "e47fbea0-441d-4737-872d-e1e5ac89528b",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(9)",
                    "etag": "\"3\"",
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
                "SubProcessId": "30",
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.5 Logistics",
                            "TermGuid": "3de53eb3-5e51-47ef-bc18-6975631c3d60",
                            "WssId": 75
                        }
                    ]
                },
                "ID": 9
            },
            {
                "__metadata": {
                    "id": "967832eb-67a5-45cf-920f-be18b3e9c15c",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(10)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.6 Customerservice",
                            "TermGuid": "c24e760c-a85e-42af-9d5c-a6295e1db1bf",
                            "WssId": 60
                        }
                    ]
                },
                "ID": 10
            },
            {
                "__metadata": {
                    "id": "05c59e54-3de1-4234-b2d3-264669f495af",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(11)",
                    "etag": "\"3\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "21 IT",
                            "TermGuid": "13a3c0a2-cbeb-47d1-acc9-a7e0325e9b91",
                            "WssId": 94
                        }
                    ]
                },
                "ID": 11
            },
            {
                "__metadata": {
                    "id": "bee371f3-c282-42f3-9bec-580195f539c8",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(12)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "22 QM",
                            "TermGuid": "c77233cb-342d-4677-84bb-712af0bccfeb",
                            "WssId": 95
                        }
                    ]
                },
                "ID": 12
            },
            {
                "__metadata": {
                    "id": "1b7c4ff5-6461-487d-bcf8-8cfc9752a9bd",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(13)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "23 Patents",
                            "TermGuid": "7777895f-52a3-44d2-8c46-bbf4081e7e32",
                            "WssId": 74
                        }
                    ]
                },
                "ID": 13
            },
            {
                "__metadata": {
                    "id": "1097cf31-f9be-4dd9-9571-70292bf92f67",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(14)",
                    "etag": "\"2\"",
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
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "24 Law",
                            "TermGuid": "bb938ed0-7110-4d20-a561-bdea6cea5e55",
                            "WssId": 96
                        }
                    ]
                },
                "ID": 14
            },
            {
                "__metadata": {
                    "id": "1acfdbdb-4e8d-42a9-aee7-938a0cdb6cbd",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(15)",
                    "etag": "\"6\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 15,
                "ProcessId": "10",
                "ProcessTitle": "Kernprozess",
                "ProcessType": "Core",
                "StepId": "10.4.1",
                "Title": "Outsourcing",
                "StepLabel": "Beispiel Label",
                "StepOrder": "4.2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=bb938ed0-7110-4d20-a561-bdea6cea5e55"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.3.2 Strategic Procurement",
                            "TermGuid": "eeed6cf5-e650-434e-bed1-692110206e75",
                            "WssId": 72
                        }
                    ]
                },
                "ID": 15
            },
            {
                "__metadata": {
                    "id": "98df2d8c-761b-436d-b936-a8f3997f4c73",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(16)",
                    "etag": "\"5\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 16,
                "ProcessId": "0",
                "ProcessTitle": "Managementprozess",
                "ProcessType": "Management",
                "StepId": "05",
                "Title": "Noch mehr Management",
                "StepLabel": null,
                "StepOrder": "5",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Ergebnisseite",
                    "Url": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/SitePages/Prozessansicht.aspx?ProcGUID=bb938ed0-7110-4d20-a561-bdea6cea5e55"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "03 Strategy",
                            "TermGuid": "bb7c42c0-69f9-4bb0-82e1-5a8fd660de65",
                            "WssId": 71
                        }
                    ]
                },
                "ID": 16
            },
            {
                "__metadata": {
                    "id": "e92541fa-182b-4405-96d9-d1bfc4c12ae9",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(17)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 17,
                "ProcessId": "30",
                "ProcessTitle": "Beispiel Unterprozess",
                "ProcessType": "Core",
                "StepId": "01",
                "Title": "Beispiel 1",
                "StepLabel": "Einer mit Label",
                "StepOrder": "1",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Externer Link",
                    "Url": "http://www.google.com"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "03 Strategy",
                            "TermGuid": "bb7c42c0-69f9-4bb0-82e1-5a8fd660de65",
                            "WssId": 71
                        }
                    ]
                },
                "ID": 17
            },
            {
                "__metadata": {
                    "id": "5d6bd362-98ec-44ad-8027-5c2126c119df",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(18)",
                    "etag": "\"1\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 18,
                "ProcessId": "30",
                "ProcessTitle": "Beispiel Unterprozess",
                "ProcessType": "Core",
                "StepId": "02",
                "Title": "Beispiel 2",
                "StepLabel": null,
                "StepOrder": "2",
                "ReferenceUrl": {
                    "__metadata": {
                        "type": "SP.FieldUrlValue"
                    },
                    "Description": "Externer Link",
                    "Url": "http://www.google.com"
                },
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "10.3.2 Strategic Procurement",
                            "TermGuid": "eeed6cf5-e650-434e-bed1-692110206e75",
                            "WssId": 72
                        }
                    ]
                },
                "ID": 18
            },
            {
                "__metadata": {
                    "id": "d9f13248-0644-4eef-bb90-adfe790bdee3",
                    "uri": "https://evocomcloud.sharepoint.com/sites/DemoApps/qm/_api/Web/Lists(guid'5b44e241-a144-4d36-a127-9f34df7e400a')/Items(19)",
                    "etag": "\"2\"",
                    "type": "SP.Data.ProcessDefinitionListItem"
                },
                "Id": 19,
                "ProcessId": "30",
                "ProcessTitle": "Beispiel Unterprozess",
                "ProcessType": "Core",
                "StepId": "03",
                "Title": "Beispiel 3",
                "StepLabel": null,
                "StepOrder": "3",
                "ReferenceUrl": null,
                "ShowOnProcessMap": true,
                "SubProcessId": null,
                "Process": {
                    "__metadata": {
                        "type": "Collection(SP.Taxonomy.TaxonomyFieldValue)"
                    },
                    "results": [
                        {
                            "Label": "23 Patents",
                            "TermGuid": "7777895f-52a3-44d2-8c46-bbf4081e7e32",
                            "WssId": 74
                        }
                    ]
                },
                "ID": 19
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