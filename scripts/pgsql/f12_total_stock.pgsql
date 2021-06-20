--## Function total stock ##########################
CREATE OR REPLACE FUNCTION f12_total_stock() RETURNS numeric AS $$
DECLARE
	total numeric;
BEGIN
   SELECT sum(f11_item_amount_stock(f10_get_remain_qty_price("itemId"))) INTO total from v12_distinct_transaction_item;
   RETURN total;
END;

$$ LANGUAGE PLPGSQL;