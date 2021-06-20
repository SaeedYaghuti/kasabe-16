--## VIEW 12 Unique transaction items_id #################################################
CREATE OR REPLACE VIEW v12_distinct_transaction_item as ( 
    SELECT DISTINCT "itemId" 
    FROM transaction_item
);

--select * from v12_distinct_transaction_item;