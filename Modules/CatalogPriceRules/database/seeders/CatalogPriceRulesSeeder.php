<?php

namespace Modules\CatalogPriceRules\database\seeders;

use Illuminate\Database\Seeder;
use Modules\CatalogPriceRules\Models\CatalogPriceRules;

class CatalogPriceRulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [

            [
                "name" => "Giảm 10% cho sản phẩm",
                "description" => "Chương trình khuyến mãi giảm giá 10% cho tất cả sản phẩm.",
                "is_active" => 1,
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "group_customer_ids" => [1, 2],
                "condition_apply" => "all_products",
                "condition_value" => null,
                "discount_amount" => 10.00,
                "operator" => 3,
                "simple_action" => "by_percent",
                "priority" => 1,
                "sort_order" => 1
            ],
            [
                "name" => "Giảm 50.000 VNĐ cho sản phẩm",
                "description" => "Giảm giá cố định 50.000 VNĐ cho sản phẩm chọn lọc.",
                "is_active" => 1,
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "group_customer_ids" => [3],
                "condition_apply" => "specific_products",
                "condition_value" => [1, 2, 3],
                "discount_amount" => 50000.00,
                "operator" => 3,
                "simple_action" => "by_fixed",
                "priority" => 2,
                "sort_order" => 2
            ],
            [
                "name" => "Giảm giá theo phần trăm cho danh mục",
                "description" => "Điều chỉnh giá cuối cho sản phẩm trong danh mục.",
                "is_active" => 1,
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "group_customer_ids" => null,
                "condition_apply" => "categories",
                "condition_value" => [4, 5, 6],
                "discount_amount" => 20.00,
                "operator" => 3,
                "simple_action" => "percent",
                "priority" => 3,
                "sort_order" => 3
            ],
            [
                "name" => "Giảm giá cố định cho nhóm sản phẩm",
                "description" => "Điều chỉnh giá cuối theo giá giảm cố định.",
                "is_active" => 1,
                "start_time" => "2024-11-01 00:00:00",
                "end_time" => "2024-11-30 23:59:59",
                "group_customer_ids" => [4],
                "condition_apply" => "attribute_groups",
                "condition_value" => [1],
                "discount_amount" => 30.00,
                "operator" => 3,
                "simple_action" => "fixed",
                "priority" => 4,
                "sort_order" => 4
            ],
            [
                "name" => "Khuyến mãi mùa đông",
                "description" => "Giảm giá cho các sản phẩm mùa đông, nhưng chưa kích hoạt.",
                "is_active" => 0,
                "start_time" => "2024-11-15 00:00:00",
                "end_time" => "2024-12-15 23:59:59",
                "group_customer_ids" => null,
                "condition_apply" => "all_products",
                "condition_value" => null,
                "discount_amount" => 15.00,
                "operator" => 3,
                "simple_action" => "by_percent",
                "priority" => 5,
                "sort_order" => 5
            ]
        ];

        foreach ($rules as $rule) {
            CatalogPriceRules::create($rule);
        }
    }
}
