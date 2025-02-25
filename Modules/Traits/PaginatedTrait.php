<?php

namespace Modules\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

trait PaginatedTrait
{
    /**
     * Paginate the given query.
     *
     * @param Builder $query
     * @param Request $request
     * @param int $defaultPerPage
     * @return LengthAwarePaginator
     */
    public function customPaginate(Builder $query, Request $request, $defaultPerPage = 20)
    {
        $page = max(1, (int) $request->input('page', 1));
        $filters = $request->input('filters', []);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        foreach ($filters as $column => $value) {
            $query->where($column, 'LIKE', "%$value%");
        }
        $query->orderBy($sortBy, $sortDirection);

        return $query->paginate($defaultPerPage, ['*'], 'page', $page);
    }

    /**
     * Format paginated response.
     *
     * @param LengthAwarePaginator $paginator
     * @param $resourceClass
     * @return array
     */
    public function formatPaginatedResponse(LengthAwarePaginator $paginator, $resourceClass)
    {
        return [
            'data' => $resourceClass::collection($paginator->items()),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
                'prev_page' => $paginator->previousPageUrl(),
                'next_page' => $paginator->nextPageUrl(),
            ]
        ];
    }
}
