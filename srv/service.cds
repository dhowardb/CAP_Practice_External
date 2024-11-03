using { SalesOrderA2X } from './external/SalesOrderA2X.cds';

using { Northwind } from './external/Northwind';

using { zcap.practice as my } from '../db/schema';

@path : '/service/capfullstackSvcs'
service SalesService
{
    @readonly
    entity MappingCustomers as
        projection on my.MappingCustomers;

    entity S4SalesOrder as
        projection on SalesOrderA2X.A_SalesOrder
        {
            SalesOrder,
            SoldToParty,
            SalesOrderDate,
            TotalNetAmount,
            OverallDeliveryStatus
        };

    entity NorthwindCustomers as
        projection on Northwind.Customers
        {
            CustomerID,
            CompanyName,
            ContactName,
            City,
            Country,
            Phone
        };
}

annotate SalesService with @requires :
[
    'authenticated-user'
];
