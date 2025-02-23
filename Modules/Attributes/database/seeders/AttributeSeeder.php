<?php

namespace Modules\Attributes\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Attributes\Models\Attributes;
use Modules\Attributes\Models\AttributeValues;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = [
            [
                'name' => 'Màu sắc',
                'description' => 'Màu sắc của sản phẩm',
                'values' => [
                    'Đen',
                    'Trắng',
                    'Đỏ',
                    'Xanh dương',
                    'Xanh lá',
                    'Vàng',
                    'Hồng',
                    'Tím',
                    'Xám',
                    'Nâu'
                ]
            ],
            [
                'name' => 'Kích thước',
                'description' => 'Kích thước sản phẩm',
                'values' => [
                    'XS',
                    'S',
                    'M',
                    'L',
                    'XL',
                    'XXL',
                    '2XL',
                    '3XL'
                ]
            ],
            [
                'name' => 'Chất liệu',
                'description' => 'Chất liệu sản phẩm',
                'values' => [
                    'Cotton',
                    'Polyester',
                    'Nylon',
                    'Len',
                    'Da',
                    'Lụa',
                    'Vải thun',
                    'Vải jean',
                    'Vải kaki',
                    'Vải nhung'
                ]
            ],
            [
                'name' => 'Kiểu dáng',
                'description' => 'Kiểu dáng sản phẩm',
                'values' => [
                    'Ôm body',
                    'Suông',
                    'Rộng',
                    'Cổ tròn',
                    'Cổ V',
                    'Cổ tim',
                    'Tay ngắn',
                    'Tay dài',
                    'Không tay'
                ]
            ]
        ];

        foreach ($attributes as $attributeData) {
            $values = $attributeData['values'];
            unset($attributeData['values']);
            
            $attribute = Attributes::create($attributeData);

            foreach ($values as $value) {
                AttributeValues::create([
                    'attribute_id' => $attribute->id,
                    'value' => $value
                ]);
            }
        }
    }
} 