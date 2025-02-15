<?php

return [
    App\Providers\AppServiceProvider::class,
    // Add GroupCustomer Provider
    Modules\GroupCustomer\Providers\GroupCustomerServiceProvider::class,
    Modules\GroupCustomer\Providers\RouteServiceProvider::class,
    Modules\Attributes\Providers\AttributesServiceProvider::class,
    Modules\Attributes\Providers\RouteServiceProvider::class,
    
];
