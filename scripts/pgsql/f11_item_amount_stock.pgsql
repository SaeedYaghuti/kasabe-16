--## Function 11  total stock for Item ##########################
CREATE OR REPLACE FUNCTION f11_item_stock_amount(itemid INTEGER) RETURNS numeric AS $$
DECLARE
	total numeric;
BEGIN
   SELECT f11_item_amount_stock(f10_get_remain_qty_price(itemid)) INTO total;
   RETURN total;
END;

$$ LANGUAGE PLPGSQL;



