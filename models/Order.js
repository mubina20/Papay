const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");
const Definer = require("../lib/mistake");
const assert = require("assert");

const { shapeIntoMongooseObjectId } = require("../lib/config");

class Order {
    constructor() {
        this.OrderModel = OrderModel;
        this.OrderItemModel = OrderItemModel;
    }

    // ORDER qilish
    async createOrderData(member, data) {
        try{
            let order_total_amount = 0, delivery_cost = 0;
            const mb_id = shapeIntoMongooseObjectId(member._id);

            data.map(item => {
                order_total_amount += item['quantity'] * item['price'];
            });

            if(order_total_amount < 100) {
                delivery_cost = 2;
                order_total_amount += delivery_cost;
            }

            const order_id = await this.saveOrderData(
                order_total_amount,
                delivery_cost,
                mb_id
            );
            console.log("ORDER_ID:::", order_id);

            // TODO: order items creation

            return order_id;
        } catch(err) {
            throw err;
        }
    }

    // ORDERni DataBasega save qilish
    async saveOrderData(order_total_amount, delivery_cost, mb_id){
        try{
            const new_order = new this.OrderModel({
                order_total_amount: order_total_amount,
                order_delivery_cost: delivery_cost,
                mb_id: mb_id
            });

            const result = await new_order.save();
            assert.ok(result, Definer.order_err1);
            console.log('RESULT:::', result);

            return result._id;
        } catch(err) {
            console.log(err);
            throw new Error(Definer.order_err1);
        }
    }
}

module.exports = Order;