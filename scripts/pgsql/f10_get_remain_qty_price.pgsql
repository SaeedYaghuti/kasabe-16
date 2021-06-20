--## Function 10 ##########################
CREATE OR REPLACE FUNCTION f10_get_remain_qty_price(itemid numeric) RETURNS json AS $$


DECLARE 
    remaine numeric(10, 3);
    "finalResult" JSON;
    rows JSON;

BEGIN

SELECT INTO remaine SUM(CASE WHEN "tranCode" = 'OUT' THEN 0 - "quantity"
                         ELSE "quantity"
                        END)
                    FROM      v11_stock_view
                    WHERE     "itemId" = $1	
                    GROUP BY  "itemId"
;
-- only rows with tranCode IN and RET  for $1:= itemID and orderd date DESC and transactionItemId DESC,
WITH cteInRetRows  
AS ( SELECT  s."itemId" ,
	     s."transactionItemId" ,
         s."date" ,
	     s."tranCode" ,
		 s."price",
	     s."quantity"
       FROM   v11_stock_view AS s
       WHERE  s."itemId" = $1 AND s."tranCode" IN ( 'IN', 'RET' )
	   ORDER BY s."date" DESC , s."transactionItemId" DESC
)
select INTO rows array_to_json(array_agg(row_to_json(t))) as data
    from cteInRetRows as t;



select INTO "finalResult" f9_get_rows_exist_qty(rows, remaine) ;

RETURN "finalResult" ;


END;

$$ LANGUAGE PLPGSQL;
