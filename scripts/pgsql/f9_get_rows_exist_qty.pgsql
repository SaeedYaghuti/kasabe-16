--## Function 9 ###############################
CREATE OR REPLACE FUNCTION f9_get_rows_exist_qty(rows json, existqty numeric) RETURNS json AS $$

plv8.elog(NOTICE, rows);
plv8.elog(NOTICE,  existqty);

var exist = [];
var remainQty = existqty;
var lastTranCode = "IN";

for(var i = 0; i < rows.length; i++) {
  
  if(remainQty >= 0) {

    if ( remainQty < rows[i]['quantity'] ) {
      rows[i]['quantity'] = remainQty;
    }

    exist.push(rows[i]);
    remainQty -= rows[i]['quantity'];
    lastTranCode = rows[i]['tranCode'];
  } else { 

    if ( lastTrancode === "RET") {
      if ( rows[i]['tranCode'] === "IN" ) {
        exist[exist.length -1]['price'] = rows[i]['price'];
        lastTrancode = null;
      }
    } else {
      break;
    }
  }
}

var reverseExist = exist.reverse();
var lastINprice = reverseExist[0];

for (var i = 0; i < reverseExist.length; i++ ) {
  if( reverseExist[i]["tranCode"] === "IN" ) {
    lastINprice = reverseExist[i]["price"]
  } else {
    reverseExist[i]["price"] = lastINprice;
  }
}

return JSON.stringify(reverseExist);

$$ LANGUAGE plv8 IMMUTABLE STRICT;