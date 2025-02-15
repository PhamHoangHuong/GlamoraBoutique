<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Sources\Models\SourceProducts;

class SourceProductsRepository extends BaseRepository implements SourceProductsRepositoryInterface
{
    public function getModel(): string
    {
        return SourceProducts::class;
    }
}
