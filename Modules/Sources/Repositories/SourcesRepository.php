<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Sources\Models\Sources;

class SourcesRepository extends BaseRepository implements SourcesRepositoryInterface
{
    public function getModel(): string
    {
        return Sources::class;
    }
}
