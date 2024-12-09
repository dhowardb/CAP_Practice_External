import { ApplicationService, connect, Request } from "@sap/cds";
import { apiSalesOrderSrv } from '../src/generated/API_SALES_ORDER_SRV';

module.exports = class CAPFullStackService extends ApplicationService {
    init() {

        const { MappingCustomers, S4SalesOrder, NorthwindCustomers } = this.entities

        //connect to S/4HANA
        // const S4Service = await connect.to('SalesOrderA2X');
        // const NorthWindService = await connect.to('northwind');

        this.on('READ', S4SalesOrder, async (req: Request) => {
            const S4Service = await connect.to('SalesOrderA2X');

            const { salesOrderApi } = apiSalesOrderSrv();
            // const resultPromise = salesOrderApi.requestBuilder().getAll().top(5).addCustomHeaders({ APIKey: process.env.apikey as string }).execute({ destinationName: 'SalesOrderA2X' });
            // const resultPromise = salesOrderApi.requestBuilder()
            //     .getAll()
            //     .top(1)
            //     .addCustomHeaders({ APIKey: 'h4YJQFcxzD5XugtqBfn7zOqMvBqJ8ybg' })
            //     // .execute({ url: 'https://sandbox.api.sap.com/s4hanacloud' })
            //     .execute({ url: 'https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_SALES_ORDER_SRV' })
            //     .catch((err: { rootCause: { message: any; response: { data: any; }; }; }) => {
            //         console.log('Message:', err.rootCause?.message);
            //         console.log('Response body:', err.rootCause?.response?.data);
            //     });

            // req.reply(await S4Service.run(req.query));
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

        this.on('READ', NorthwindCustomers, async (req: Request) => {
            const NorthWindService = await connect.to('Northwind');
            req.reply(await NorthWindService.run(req.query));
        })
        return super.init();
    }
}