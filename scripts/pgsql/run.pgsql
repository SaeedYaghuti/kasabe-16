-- select * from v12_distinct_transaction_item;

-- select * from f10_get_remain_qty_price(7);


-- select * from f11_item_amount_stock(f10_get_remain_qty_price(7));


-- select sum(f11_item_amount_stock(f10_get_remain_qty_price("itemId"))) from v12_distinct_transaction_item;

-- select * from f12_total_stock();


-- select * from f11_item_stock_amount(7);



-- select * from f11_item_amount_stock(7);

-- WITH data AS(
-- select array_to_json(array_agg(row_to_json(t))) as data
--    from (
--     SELECT * FROM v12_distinct_transaction_item
--    ) t
-- ) SELECT * from data;





-- select * from f10_get_remain_qty_price(7);


--WITH data AS(
--select array_to_json(array_agg(row_to_json(t))) as data
--    from (
--     SELECT *, COALESCE(f5_get_direct_children_account("accountID"), '[]') AS children FROM v10_view_final_trial_balance_join_account ;
--    ) t
--) SELECT f6_get_tree(data) from data;