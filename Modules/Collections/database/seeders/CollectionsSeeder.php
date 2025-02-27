<?php

namespace Modules\Collections\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Collections\Models\Collections;

class CollectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collections = [
            ['name' => 'Bộ sưu tập mùa xuân', 'slug' => 'bo-suu-tap-mua-xuan', 'description' => 'Bộ sưu tập thời trang mùa xuân', 'status' => 1],
            ['name' => 'Bộ sưu tập mùa hè', 'slug' => 'bo-suu-tap-mua-he', 'description' => 'Bộ sưu tập thời trang mùa hè', 'status' => 1],
            ['name' => 'Bộ sưu tập mùa thu', 'slug' => 'bo-suu-tap-mua-thu', 'description' => 'Bộ sưu tập thời trang mùa thu', 'status' => 1],
            ['name' => 'Bộ sưu tập mùa đông', 'slug' => 'bo-suu-tap-mua-dong', 'description' => 'Bộ sưu tập thời trang mùa đông', 'status' => 1],
        ];

        foreach ($collections as $collection) {
            Collections::create($collection);
        }
    }
}
