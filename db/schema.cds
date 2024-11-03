using { SalesOrderA2X } from '../srv/external/SalesOrderA2X.cds'; 
namespace zcap.practice;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    managed,
    temporal
}
from '@sap/cds/common';

entity MappingCustomers : cuid
{
    S4CustomerID : String(100);
    NorthWindCustomerID : String(100);
    NorthWindCustomerName : String(100);
}
