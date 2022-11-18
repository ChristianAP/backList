var updateApprovalBeforeUpdateVoucherTrigger =
{
    query: 'CREATE DEFINER=`development`@`%` TRIGGER `gallinita_new`.`sv_orders_BEFORE_UPDATE` BEFORE UPDATE ON `sv_orders` FOR EACH ROW \
            BEGIN \
                IF OLD.ORD_VOUCHER != NEW.ORD_VOUCHER THEN \
                    SET NEW.ORD_APPROVAL  = 0; \
                END IF;\
            END'
};