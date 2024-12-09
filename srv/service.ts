import {ApplicationService, connect, Request} from '@sap/cds'
module.exports = class CAPFullStackService extends ApplicationService {
    init() {
        const { MappingCustomers, S4SalesOrder, NorthwindCustomers } = this.entities

        this.on('READ', S4SalesOrder, async (req : Request) => {
            const S4Service = await connect.to('SalesOrderA2X');
            let orders = await S4Service.send({
                query: SELECT.from(S4SalesOrder)
                    .columns(
                        "SalesOrder",
                        "SoldToParty",
                        "SalesOrderDate",
                        "TotalNetAmount",
                        "OverallDeliveryStatus"
                    )
                    .limit(10),
                headers: {
                    apikey: process.env.apikey,
                    Accept: "application/json",
                },
            });

            orders.$count = orders.length;
            return orders;
        })

        this.on('READ', NorthwindCustomers, async (req : Request) => {
            const NorthWindService = await connect.to('Northwind');
            req.reply(await NorthWindService.run(req.query));
        })
        return super.init();
    }
}