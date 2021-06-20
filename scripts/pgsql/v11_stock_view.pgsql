

CREATE OR REPLACE VIEW v11_stock_view as ( 
 SELECT "transactionItemId", "itemId", date, "tranCode", quantity, price 

 FROM transaction_item  INNER JOIN transactions USING("transactionId")
                        INNER JOIN vouchers USING("voucherId")
 ORDER BY date
);

-- select * from v11_stock_view;