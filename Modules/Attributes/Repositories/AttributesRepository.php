<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Models\Attributes;

class AttributesRepository extends BaseRepository implements AttributesRepositoryInterface
{
    public function getModel(): string
    {
        return Attributes::class;
    }
}
