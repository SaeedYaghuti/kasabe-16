// output query 7
var outPut = [
    {
        "accountID": 5,
        "title": "Expenditure",
        "titleArb": "مصاریف",
        "parentId": null,
        "debit": null,
        "credit": null,
        "debit_remain": null,
        "credit_remain": null,
        "children": [
            {
                "accountID": 6,
                "title": "Purchase",
                "titleArb": "مشتریات",
                "titlePer": "خرید",
                "parentId": 5,
                "debit": 190,
                "credit": 0,
                "debit_remain": 190,
                "credit_remain": 0,
                "children": []
            }
        ]
    },
    {
        "accountID": 9,
        "title": "Assets",
        "titleArb": "اصول",
        "parentId": null,
        "debit": null,
        "credit": null,
        "debit_remain": null,
        "credit_remain": null,
        "children": [
            {
                "accountID": 10,
                "title": "Banks",
                "titleArb": "بنوک",
                "titlePer": "بانک ها",
                "parentId": 9,
                "debit": null,
                "credit": null,
                "debit_remain": null,
                "credit_remain": null,
                "children": [
                    {
                        "accountID": 11,
                        "title": "NBO CBD",
                        "titleArb": "بانک عمانی الوطنی",
                        "titlePer": "بانک ان بی ا",
                        "parentId": 10,
                        "debit": 0,
                        "credit": 10200,
                        "debit_remain": 0,
                        "credit_remain": 10200,
                        "children": []
                    }
                ]
            },
            {
                "accountID": 12,
                "title": "Petty Cash",
                "titleArb": "بتی کش",
                "titlePer": "تن خواه",
                "parentId": 9,
                "debit": 200,
                "credit": 0,
                "debit_remain": 200,
                "credit_remain": 0,
                "children": []
            }
        ]
    }
];
function f8_get_calculated_account_tree(data) {
    var report = { "accountID": -1, 'title': "Ledger Report", "titleArb": "لجر ريبورت", "titlePer": "گزارش گروههای حسابداری", 'parentId': null,
        'debit': 0, 'credit': 0, 'debit_remain': 0, 'credit_remain': 0, 'children': data };
	return collectObject(report);
	
    function collectObject(theObject) {
        if (theObject instanceof Array) {
            for (var i = 0; i < theObject.length; i++) {
                var result = collectObject(theObject[i]);
                theObject[i] = result;
            }
            return theObject;
        }
        else if (theObject instanceof Object) {
            if (theObject['children'] instanceof Array && theObject['children'].length > 0) {
                var result = collectObject(theObject['children']);
                if (result && result instanceof Array && result.length && result.length > 0) {
                    var resultLength = result.length;
                    for (var i = 0; i < resultLength; i++) {
                        if (!theObject['debit']) {
                            theObject['debit'] = 0;
                        }
						theObject['debit'] += result[i]['debit'];
						
                        if (!theObject['credit']) {
                            theObject['credit'] = 0;
                        }
						theObject['credit'] += result[i]['credit'];
						
                        if (!theObject['debit_remain']) {
                            theObject['debit_remain'] = 0;
                        }
						theObject['debit_remain'] += result[i]['debit_remain'];
						
                        if (!theObject['credit_remain']) {
                            theObject['credit_remain'] = 0;
                        }
                        theObject['credit_remain'] += result[i]['credit_remain'];
                    }
                }
                theObject['children'] = result;
                return theObject;
            }
        }
        return theObject;
    }
}
;
var result = f8_get_calculated_account_tree(outPut);
