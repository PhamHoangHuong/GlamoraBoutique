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
     * @return array
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
        $total = $query->count();
        $lastPage = ceil($total / $defaultPerPage);
        $page = min($page, $lastPage);
        $results = $query->skip(($page - 1) * $defaultPerPage)
            ->take($defaultPerPage)
            ->get();

        return [
            'data' => $results,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $defaultPerPage,
                'total' => $total,
                'last_page' => $lastPage,
                'prev_page' => $page > 1 ? $page - 1 : null,
                'next_page' => $page < $lastPage ? $page + 1 : null,
                'links' => [
                    'first' => 1,
                    'prev' => $page > 1 ? $page - 1 : null,
                    'next' => $page < $lastPage ? $page + 1 : null,
                    'last' => $lastPage,
                ]
            ]
        ];
    }
}
