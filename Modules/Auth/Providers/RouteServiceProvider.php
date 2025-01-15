<?php

namespace Modules\Auth\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Modules\Auth\Http\Middleware\CheckTokenExpiration;
use Modules\Auth\Http\Middleware\ValidateRefreshToken;

class RouteServiceProvider extends ServiceProvider
{
    protected string $moduleNamespace = 'Modules\Auth\Http\Controllers';

    public function boot(): void
    {
        parent::boot();

        // Register middlewares
        $router = $this->app['router'];
        $router->aliasMiddleware('check.token.expiration', CheckTokenExpiration::class);
        $router->aliasMiddleware('validate.refresh.token', ValidateRefreshToken::class);
    }

    public function map(): void
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    protected function mapWebRoutes(): void
    {
        Route::middleware('web')
            ->namespace($this->moduleNamespace)
            ->group(module_path('Auth', '/Routes/web.php'));
    }

    protected function mapApiRoutes(): void
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->moduleNamespace)
            ->group(module_path('Auth', '/Routes/api.php'));
    }
}
