<?php

namespace Modules\CartPriceRules\Database\Seeders;

use Illuminate\Database\Seeder;

class CartPriceRulesDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $this->call([
             CartPriceRulesSeeder::class,
         ]);
    }
}
