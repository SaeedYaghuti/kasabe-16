// output query 7
let outPut = 
[
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

interface ObjectIF {
	accountID: number;
	title: string;
	titleArb: string;
	parentId: number;
	debit: number;
	credit: number;
	debit_remain: number;
	credit_remain: number;
	children: ObjectIF[]
}

function f8_get_calculated_account_tree(data) {

	let report = {"accountID": -1, 'title': "Ledger Report", "titleArb": "لجر ريبورت", "titlePer": "گزارش گروههای حسابداری", 'parentId': null , 
		'debit': 0, 'credit': 0, 'debit_remain': 0, 'credit_remain': 0, 'children': data};

	return collectObject(report);

	// function collectObject(theObject: ObjectIF) {
	function collectObject(theObject) {
		console.log('====================================');
		console.log('1 => theObject: ####');
		console.log(JSON.stringify(theObject));

		if(theObject instanceof Array) {
			for(var i = 0; i < theObject.length; i++) {

				console.log('2 => result = collectObject(theObject[i]): ####');
				console.log(JSON.stringify(theObject[i]));

                var result = collectObject(theObject[i]);

                console.log('2 => var result = collectObject(theObject[i]) => result: ####');
                console.log(JSON.stringify(result));
                
				theObject[i] = result;   
			}
			return theObject;
		}
		else if(theObject instanceof Object) {
		
			if(theObject['children'] instanceof Array && theObject['children'].length > 0) {
                
                console.log('3 => result = collectObject(theObject[children]): ####');
                console.log(JSON.stringify(theObject['children']));
                
                var result = collectObject(theObject['children']);
                
                console.log('3 => result = collectObject(theObject[children]) => result ####');
                console.log(JSON.stringify(result));

				if (result && result instanceof Array && result.length && result.length > 0) {
					var resultLength = result.length;
					for(var i = 0; i < resultLength; i++) {
						// var result = collectObject(theObject[i]);
						
						if(!theObject['debit']) {
							theObject['debit'] = 0;
						}
                        theObject['debit'] += result[i]['debit'];
                        
						if(!theObject['credit']) {
							theObject['credit'] = 0;
                        }
                        theObject['credit'] += result[i]['credit'];
						
						if(!theObject['debit_remain']) {
							theObject['debit_remain'] = 0;
                        }
                        theObject['debit_remain'] += result[i]['debit_remain'];
						
						if(!theObject['credit_remain']) {
							theObject['credit_remain'] = 0;
                        }
                        theObject['credit_remain'] += result[i]['credit_remain'];
					}
				}
                theObject['children'] = result;
                
                console.log('3.1 => theObject[children] = result; ####');
                console.log('*3.1 => theObject[children] = result;=> RESULT>> ####');
                console.log(JSON.stringify(result));
                console.log('*3.1 => theObject[children] = result;=> THEOBJECT[children]>> ####');
                console.log(JSON.stringify(theObject['children']));
                console.log('*3.1 => theObject[children] = result;=> THEOBJECT>> ####');
                console.log(JSON.stringify(theObject));

				return theObject;
			} 
        }
        console.log('4 => return theObject: ####');
		console.log(JSON.stringify(theObject));
		return theObject;
	}

};

const result = f8_get_calculated_account_tree(outPut);
console.log('--## FINAL RESULT ###############');
console.log(JSON.stringify(result));