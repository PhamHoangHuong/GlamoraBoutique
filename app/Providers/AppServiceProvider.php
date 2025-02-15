<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Modules\Attributes\Repositories\AttributesRepository;
use Modules\Attributes\Repositories\AttributesRepositoryInterface;
use Modules\Attributes\Repositories\SourceProductsRepository;
use Modules\Attributes\Repositories\SourceProductsRepositoryInterface;
use Modules\Attributes\Repositories\SourcesRepository;
use Modules\Attributes\Repositories\SourcesRepositoryInterface;
use Modules\GroupCustomer\Repositories\GroupCustomerRepository;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;

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
