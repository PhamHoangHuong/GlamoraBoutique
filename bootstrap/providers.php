<?php

return [
    App\Providers\AppServiceProvider::class,
    // Add GroupCustomer Provider
    Modules\GroupCustomer\Providers\GroupCustomerServiceProvider::class,
    Modules\GroupCustomer\Providers\RouteServiceProvider::class,
    Modules\Attributes\Providers\AttributesServiceProvider::class,
    Modules\Attributes\Providers\RouteServiceProvider::class,
    Modules\Customer\Providers\CustomerServiceProvider::class,
    Modules\Customer\Providers\RouteServiceProvider::class,
    Modules\Sources\Providers\SourcesServiceProvider::class,
    Modules\Sources\Providers\RouteServiceProvider::class,
];
