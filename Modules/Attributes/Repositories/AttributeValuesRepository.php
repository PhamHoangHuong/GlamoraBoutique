<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Models\AttributeValues;

class AttributeValuesRepository extends BaseRepository implements AttributeValuesRepositoryInterface
{
    public function getModel(): string
    {
        return AttributeValues::class;
    }
}
