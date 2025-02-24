<?php

namespace Modules\Attributes\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Modules\Attributes\Http\Requests\StoreAttributeValuesRequest;
use Modules\Attributes\Http\Requests\UpdateAttributeValuesRequest;
use Modules\Attributes\Repositories\AttributeValuesRepositoryInterface;
use Modules\Attributes\Transformers\AttributeValuesResource;
use Modules\Attributes\Models\AttributeValues;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class AttributeValuesController extends Controller
{
    use PaginatedTrait, ResponseTrait;

    public function __construct(
        protected AttributeValuesRepositoryInterface $attributeValuesRepository
    )
    {
        $this->attributeValuesRepository = $attributeValuesRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $values = $this->attributeValuesRepository->getPaginated($request);
            if ($values->isEmpty()) {
                return $this->toResponseBad('Không có giá trị thuộc tính nào được tìm thấy', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($values, AttributeValuesResource::class),
                'Danh sách giá trị thuộc tính',
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttributeValuesRequest $request)
    {
        try {
            $validated = $request->validated();
            $value = $this->attributeValuesRepository->create($validated);
            return $this->toResponseSuccess(
                new AttributeValuesResource($value),
                'Giá trị thuộc tính đã được tạo thành công',
                Response::HTTP_CREATED
            );
        } catch (QueryException $e) {
            return $this->toResponseBad('Giá trị thuộc tính đã tồn tại', Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        try {
            $value = $this->attributeValuesRepository->find($id);
            if (!$value) {
                return $this->toResponseBad('Không tìm thấy giá trị thuộc tính', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                new AttributeValuesResource($value),
                'Tìm thấy dữ liệu',
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttributeValuesRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $value = $this->attributeValuesRepository->update($id, $validated);

            return $this->toResponseSuccess(
                new AttributeValuesResource($value),
                'Giá trị thuộc tính đã được cập nhật thành công',
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->attributeValuesRepository->delete($id);
            return $this->toResponseDeleteSuccess('Xóa giá trị thuộc tính thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
