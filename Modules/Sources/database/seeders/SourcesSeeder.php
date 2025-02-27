<?php

namespace Modules\Sources\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Sources\Models\Sources;

class SourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy danh sách đầy đủ các tỉnh thành
        $provinces = DB::table('provinces')->get();

        $sources = [];

        foreach ($provinces as $province) {
            // Lấy ngẫu nhiên một quận/huyện từ tỉnh thành hiện tại
            $district = DB::table('districts')
                ->where('province_code', $province->code)
                ->inRandomOrder()
                ->first();

            $sources[] = [
                'name' => 'Kho hàng ' . $province->name,
                'address' => 'Địa chỉ ' . $province->name,
                'province_id' => $province->code,
                'district_id' => $district->code,
                'active' => true,
            ];
        }
        foreach ($sources as $source) {
            Sources::create($source);
        }
    }
}
