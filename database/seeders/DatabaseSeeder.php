<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\CartPriceRules\Database\Seeders\CartPriceRulesDatabaseSeeder;
use Modules\CatalogPriceRules\Database\Seeders\CatalogPriceRulesDatabaseSeeder;
use Modules\Categories\Database\Seeders\CategoriesDatabaseSeeder;
use Modules\Collections\database\seeders\CollectionsSeeder;
use Modules\GroupCustomer\Database\Seeders\GroupCustomerDatabaseSeeder;
use Modules\Location\Database\Seeders\LocationDatabaseSeeder;
use Modules\Auth\Database\Seeders\AuthDatabaseSeeder;
use Modules\Customer\Database\Seeders\CustomerDatabaseSeeder;
use Modules\Attributes\Database\Seeders\AttributesDatabaseSeeder;
use Modules\Sources\Database\Seeders\SourcesDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationDatabaseSeeder::class,
            SourcesDatabaseSeeder::class,
            AuthDatabaseSeeder::class,
            GroupCustomerDatabaseSeeder::class,
            CustomerDatabaseSeeder::class,
            CatalogPriceRulesDatabaseSeeder::class,
            CartPriceRulesDatabaseSeeder::class,
            AttributesDatabaseSeeder::class,
            CategoriesDatabaseSeeder::class,
            CollectionsSeeder::class,
        ]);
    }
}
