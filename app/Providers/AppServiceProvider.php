<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Modules\CatalogPriceRules\Repositories\CatalogPriceRulesRepository;
use Modules\CatalogPriceRules\Repositories\CatalogPriceRulesRepositoryInterface;
use Modules\Customer\Repositories\CustomerRepository;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\Attributes\Repositories\AttributesRepository;
use Modules\Attributes\Repositories\AttributesRepositoryInterface;
use Modules\GroupCustomer\Repositories\GroupCustomerRepository;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;
use Modules\Sources\Repositories\SourceProductsRepository;
use Modules\Sources\Repositories\SourceProductsRepositoryInterface;
use Modules\Sources\Repositories\SourcesRepository;
use Modules\Sources\Repositories\SourcesRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->bindingsRepository();
    }

    protected function bindingsRepository()
    {
        //GroupCustomer
        $this->app->singleton(
            GroupCustomerRepositoryInterface::class,
            GroupCustomerRepository::class
        );

        //Customer
        $this->app->singleton(
            CustomerRepositoryInterface::class,
            CustomerRepository::class
        );

        //Attributes
        $this->app->singleton(
            AttributesRepositoryInterface::class,
            AttributesRepository::class
        );

         //Sources
         $this->app->singleton(
             SourcesRepositoryInterface::class,
             SourcesRepository::class
         );

         //SourceProducts
         $this->app->singleton(
             SourceProductsRepositoryInterface::class,
             SourceProductsRepository::class
         );

         //CatalogPriceRules
            $this->app->singleton(
                CatalogPriceRulesRepositoryInterface::class,
                CatalogPriceRulesRepository::class
            );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Schema::defaultStringLength(191);
    }
}
