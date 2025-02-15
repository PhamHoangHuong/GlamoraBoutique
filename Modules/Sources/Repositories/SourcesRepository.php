<?php

namespace Modules\Sources\Repositories;

use App\Repositories\BaseRepository;
use Modules\Sources\Models\Sources;
use Modules\Sources\Repositories\SourcesRepositoryInterface;

class SourcesRepository extends BaseRepository implements SourcesRepositoryInterface
{
    public function getModel(): string
    {
        return Sources::class;
    }
}
