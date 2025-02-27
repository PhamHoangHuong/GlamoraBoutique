<?php

namespace Modules\CartPriceRules\database\seeders;

use Illuminate\Database\Seeder;
use Modules\CartPriceRules\Models\CartPriceRules;

class CartPriceRulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $rules = [
            [
                "name" => "Giảm 15% cho đơn hàng từ 500,000đ trở lên",
                "description" => "Giảm 15% cho đơn hàng có tổng giá trị từ 500,000đ trở lên",
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [2, 4],
                "condition_apply" => "subtotal",
                "condition_value" => 500000,
                "coupon" => "DISCOUNT15PERCENT",
                "discount_amount" => 0,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 100,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 5, //greater_than_or_equal
                "simple_action" => "by_percent",
                "priority" => 1,
                "sort_order" => 1
            ],
            [
                "name" => "Giảm 20,000đ cho mỗi sản phẩm khi mua từ 3 sản phẩm",
                "description" => "Giảm 20,000đ cho mỗi sản phẩm khi giỏ hàng có từ 3 sản phẩm trở lên",
                "start_time" => "2024-11-05 09:00:00",
                "end_time" => "2024-11-15 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [3, 4],
                "condition_apply" => "total_qty",
                "condition_value" => 3,
                "coupon" => "DISCOUNT20KPERPRODUCT",
                "discount_amount" => 20000,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 200,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 5, //greater_than_or_equal
                "simple_action" => "by_fixed",
                "priority" => 2,
                "sort_order" => 2
            ],
            [
                "name" => "Giảm 200,000đ cho toàn bộ giỏ hàng",
                "description" => "Giảm 200,000đ cho toàn bộ giỏ hàng khi tổng giá trị từ 1,000,000đ trở lên",
                "start_time" => "2024-11-10 00:00:00",
                "end_time" => "2024-11-20 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [2, 3, 4],
                "condition_apply" => "subtotal",
                "condition_value" => 1000000,
                "coupon" => "DISCOUNTCART200K",
                "discount_amount" => 200000,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 50,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 3, //"equal"
                "simple_action" => "by_fixed",
                "priority" => 3,
                "sort_order" => 3
            ],
            [
                "name" => "Giảm 20% cho đơn hàng từ 700,000đ trở lên",
                "description" => "Giảm 20% cho đơn hàng có tổng giá trị từ 700,000đ trở lên",
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [2, 3],
                "condition_apply" => "subtotal",
                "condition_value" => 700000,
                "coupon" => "DISCOUNT20PERCENT",
                "discount_amount" => 0,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 150,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 6, //"less_than_or_equal",
                "simple_action" => "by_percent",
                "priority" => 1,
                "sort_order" => 1
            ],
            [
                "name" => "Giảm 30,000đ cho mỗi sản phẩm khi mua từ 4 sản phẩm trở lên",
                "description" => "Giảm 30,000đ cho mỗi sản phẩm khi giỏ hàng có từ 4 sản phẩm trở lên",
                "start_time" => "2024-11-10 10:00:00",
                "end_time" => "2024-11-20 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [3, 4],
                "condition_apply" => "total_qty",
                "condition_value" => 4,
                "coupon" => "DISCOUNT30KPERPRODUCT",
                "discount_amount" => 30000,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 120,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 2, //"less_than",
                "simple_action" => "by_fixed",
                "priority" => 2,
                "sort_order" => 2
            ],
            [
                "name" => "Giảm 10% cho đơn hàng trên 15kg",
                "description" => "Giảm 10% cho đơn hàng có tổng trọng lượng trên 15kg",
                "start_time" => "2024-11-12 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "is_active" => 1,
                "group_customer_ids" => [1, 2],
                "condition_apply" => "total_weight",
                "condition_value" => 15,
                "coupon" => "DISCOUNT10PERCENTWEIGHT",
                "discount_amount" => 0,
                "discount_qty" => 0,
                "discount_step" => 0,
                "usage_limit" => 100,
                "used" => 0,
                "coupon_type" => 1,
                "operator" => 1, //"greater_than",
                "simple_action" => "by_percent",
                "priority" => 3,
                "sort_order" => 3
            ]
        ];

        foreach ($rules as $rule) {
            CartPriceRules::create($rule);
        }
    }
}
