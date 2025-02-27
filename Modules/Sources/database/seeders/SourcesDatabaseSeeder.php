<?php

namespace Modules\Sources\Database\Seeders;

use Illuminate\Database\Seeder;

class SourcesDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            SourcesSeeder::class,
        ]);
    }
}
