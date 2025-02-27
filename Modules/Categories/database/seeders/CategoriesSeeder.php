<?php

namespace Modules\Categories\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Categories\Models\Categories;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            //Cấp đầu tiên, không xuất hiện trên menu
            [
                'name' => 'Thời trang cao cấp',
                'slug' => 'thoi-trang-cao-cap',
                'parent_id' => null,
                'image' => null,
                'description' => 'Thời trang cao cấp',
                'status' => 1,
            ],

            //Cấp thứ hai, hiện trên menu
            [
                'name' => 'Nữ',
                'slug' => 'nu',
                'parent_id' => 1,
                'image' => null,
                'description' => 'Thời trang nữ',
                'status' => 1,
            ],
            [
                'name' => 'Nam',
                'slug' => 'nam',
                'parent_id' => 1,
                'image' => null,
                'description' => 'Thời trang nam',
                'status' => 1,
            ],

            //Danh mục con của danh mục nữ
            ['name' => 'Đầm & váy', 'slug' => 'dam-vay', 'parent_id' => 2, 'description' => 'Thời trang cao cấp nữ - Đầm & váy', 'status' => 1],
            ['name' => 'Áo', 'slug' => 'ao-nu', 'parent_id' => 2, 'description' => 'Thời trang cao cấp nữ - Áo nữ', 'status' => 1],
            ['name' => 'Áo khoác', 'slug' => 'ao-khoac-nu', 'parent_id' => 2, 'description' => 'Thời trang cao cấp nữ - Áo khoác nữ', 'status' => 1],
            ['name' => 'Quần nữ', 'slug' => 'quan-nu', 'parent_id' => 2, 'description' => 'Thời trang cao cấp nữ - Quần nữ', 'status' => 1],
            ['name' => 'Phụ kiện', 'slug' => 'phu-kien-nu', 'parent_id' => 2, 'description' => 'Thời trang cao cấp nữ - Phụ kiện nữ', 'status' => 1],

            //Danh mục con của danh mục nam
            ['name' => 'Áo', 'slug' => 'ao-nam', 'parent_id' => 3, 'description' => 'Thời trang cao cấp nam - Áo nam', 'status' => 1],
            ['name' => 'Áo khoác', 'slug' => 'ao-khoac-nam', 'parent_id' => 3, 'description' => 'Thời trang cao cấp nam - Áo khoác nam', 'status' => 1],
            ['name' => 'Quần', 'slug' => 'quan-nam', 'parent_id' => 3, 'description' => 'Thời trang cao cấp nam - Quần nam', 'status' => 1],
            ['name' => 'Phụ kiện', 'slug' => 'phu-kien-nam', 'parent_id' => 3, 'description' => 'Thời trang cao cấp nam - Phụ kiện nam', 'status' => 1],

            //Danh mục con của Đầm & váy nữ
            ['name' => 'Đầm dạ hội', 'slug' => 'dam-da-hoi', 'parent_id' => 4, 'description' => 'Thời trang cao cấp nữ - Đầm dạ hội', 'status' => 1],
            ['name' => 'Đầm công sở', 'slug' => 'dam-cong-so', 'parent_id' => 4, 'description' => 'Thời trang cao cấp nữ - Đầm công sở', 'status' => 1],
            ['name' => 'Đầm maxi', 'slug' => 'dam-maxi', 'parent_id' => 4, 'description' => 'Thời trang cao cấp nữ - Đầm maxi', 'status' => 1],
            ['name' => 'Đầm tiệc', 'slug' => 'dam-tiec', 'parent_id' => 4, 'description' => 'Thời trang cao cấp nữ - Đầm tiệc', 'status' => 1],
            ['name' => 'Váy & Chân váy', 'slug' => 'vay-chan-vay', 'parent_id' => 4, 'description' => 'Thời trang cao cấp nữ - Váy & Chân váy', 'status' => 1],

            //Danh mục con của áo nữ
            ['name' => 'Áo kiểu', 'slug' => 'ao-kieu', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo kiểu', 'status' => 1],
            ['name' => 'Áo ký giả', 'slug' => 'ao-ky-gia', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo ký giả', 'status' => 1],
            ['name' => 'Áo sơ mi', 'slug' => 'ao-so-mi', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo sơ mi', 'status' => 1],
            ['name' => 'Áo thun & polo', 'slug' => 'ao-thun-polo', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo thun & polo', 'status' => 1],
            ['name' => 'Áo len & chui đầu', 'slug' => 'ao-len-chui-dau', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo len & chui đầu', 'status' => 1],
            ['name' => 'Áo Ghi Lê', 'slug' => 'ao-ghi-le', 'parent_id' => 5, 'description' => 'Thời trang cao cấp nữ - Áo Ghi Lê', 'status' => 1],

            //Danh mục con của áo khoác nữ
            ['name' => 'Áo Lông Vũ', 'slug' => 'ao-long-vu', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Áo Lông Vũ', 'status' => 1],
            ['name' => 'Áo Măng tô', 'slug' => 'ao-mang-to', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Áo Măng tô', 'status' => 1],
            ['name' => 'Áo Chống Nắng', 'slug' => 'ao-chong-nang', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Áo Chống Nắng', 'status' => 1],
            ['name' => 'Áo Vest', 'slug' => 'ao-vest', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Áo Vest', 'status' => 1],
            ['name' => 'Blazer', 'slug' => 'blazer', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Blazer', 'status' => 1],
            ['name' => 'Áo Khoác Khác', 'slug' => 'ao-khoac-khac', 'parent_id' => 6, 'description' => 'Thời trang cao cấp nữ - Áo Khoác Khác', 'status' => 1],

            //Danh mục con của quần & set đồ nữ
            ['name' => 'Quần kiểu', 'slug' => 'quan-kieu', 'parent_id' => 7, 'description' => 'Thời trang cao cấp nữ - Quần kiểu', 'status' => 1],
            ['name' => 'Quần Âu', 'slug' => 'quan-au', 'parent_id' => 7, 'description' => 'Thời trang cao cấp nữ - Quần Âu', 'status' => 1],
            ['name' => 'Quần Jeans', 'slug' => 'quan-jeans', 'parent_id' => 7, 'description' => 'Thời trang cao cấp nữ - Quần Jeans', 'status' => 1],
            ['name' => 'Quần Short', 'slug' => 'quan-short', 'parent_id' => 7, 'description' => 'Thời trang cao cấp nữ - Quần Short', 'status' => 1],

            //Danh mục con của phụ kiện nữ
            ['name' => 'Giày dép', 'slug' => 'giay-dep', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Giày dép', 'status' => 1],
            ['name' => 'Túi, Ví, Thắt Lưng', 'slug' => 'tui-vi-that-lung', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Túi, Ví, Thắt Lưng', 'status' => 1],
            ['name' => 'Tất, Găng Tay, Khẩu Trang', 'slug' => 'tat-gang-tay-khau-trang', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Tất, Găng Tay, Khẩu Trang', 'status' => 1],
            ['name' => 'Khăn', 'slug' => 'khan', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Khăn', 'status' => 1],
            ['name' => 'Quần tất', 'slug' => 'quan-tat', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Quần tất', 'status' => 1],
            ['name' => 'Nước hoa', 'slug' => 'nuoc-hoa', 'parent_id' => 8, 'description' => 'Thời trang cao cấp nữ - Nước hoa', 'status' => 1],


            //Danh mục con của áo nam
            ['name' => 'Áo Giữ Nhiệt', 'slug' => 'ao-giu-nhiet', 'parent_id' => 9, 'description' => 'Thời trang cao cấp nam - Áo Giữ Nhiệt', 'status' => 1],
            ['name' => 'Áo Vest', 'slug' => 'ao-vest-nam', 'parent_id' => 9, 'description' => 'Thời trang cao cấp nam - Áo Vest', 'status' => 1],
            ['name' => 'Áo Sơ mi', 'slug' => 'ao-so-mi-nam', 'parent_id' => 9, 'description' => 'Thời trang cao cấp nam - Áo Sơ mi', 'status' => 1],
            ['name' => 'Áo Polo', 'slug' => 'ao-polo-nam', 'parent_id' => 9, 'description' => 'Thời trang cao cấp nam - Áo Polo', 'status' => 1],
            ['name' => 'Áo Thun', 'slug' => 'ao-thun-nam', 'parent_id' => 9, 'description' => 'Thời trang cao cấp nam - Áo Thun', 'status' => 1],

            //Danh mục con của áo khoác nam
            ['name' => 'Áo Khoác da', 'slug' => 'ao-khoac-da', 'parent_id' => 10, 'description' => 'Thời trang cao cấp nam - Áo Khoác da', 'status' => 1],
            ['name' => 'Áo lông vũ', 'slug' => 'ao-long-vu-nam', 'parent_id' => 10, 'description' => 'Thời trang cao cấp nam - Áo lông vũ', 'status' => 1],
            ['name' => 'Áo Măng tô', 'slug' => 'ao-mang-to-nam', 'parent_id' => 10, 'description' => 'Thời trang cao cấp nam - Áo Măng tô', 'status' => 1],
            ['name' => 'Áo Chống Nắng', 'slug' => 'ao-chong-nang-nam', 'parent_id' => 10, 'description' => 'Thời trang cao cấp nam - Áo Chống Nắng', 'status' => 1],
            ['name' => 'Áo Khoác Khác', 'slug' => 'ao-khoac-khac-nam', 'parent_id' => 10, 'description' => 'Thời trang cao cấp nam - Áo Khoác Khác', 'status' => 1],

            //Danh mục con quần nam
            ['name' => 'Quần Âu', 'slug' => 'quan-au-nam', 'parent_id' => 11, 'description' => 'Thời trang cao cấp nam - Quần Âu', 'status' => 1],
            ['name' => 'Quần Khaki', 'slug' => 'quan-khaki-nam', 'parent_id' => 11, 'description' => 'Thời trang cao cấp nam - Quần Khaki', 'status' => 1],
            ['name' => 'Quần Short', 'slug' => 'quan-short-nam', 'parent_id' => 11, 'description' => 'Thời trang cao cấp nam - Quần Short', 'status' => 1],

            //Danh mục con của phụ kiện nam
            ['name' => 'Giày dép', 'slug' => 'giay-dep-nam', 'parent_id' => 12, 'description' => 'Thời trang cao cấp nam - Giày dép', 'status' => 1],
            ['name' => 'Cặp, Túi, Ví, Thắt Lưng', 'slug' => 'cap-tui-vi-that-lung-nam', 'parent_id' => 12, 'description' => 'Thời trang cao cấp nam - Cặp, Túi, Ví, Thắt Lưng', 'status' => 1],
            ['name' => 'Nước hoa', 'slug' => 'nuoc-hoa-nam', 'parent_id' => 12, 'description' => 'Thời trang cao cấp nam - Nước hoa', 'status' => 1],
        ];

        foreach ($categories as $category) {
            Categories::create($category);
        }
    }
}
