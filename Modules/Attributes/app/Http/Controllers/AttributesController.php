<?php

namespace Modules\Attributes\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Modules\Attributes\Http\Requests\StoreAttributesRequest;
use Modules\Attributes\Http\Requests\UpdateAttributesRequest;
use Modules\Attributes\Repositories\AttributesRepositoryInterface;
use Modules\Attributes\Transformers\AttributesResource;
use Modules\Attributes\Models\Attributes;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class AttributesController extends Controller
{
    use ResponseTrait, PaginatedTrait;

    public function __construct(
        protected AttributesRepositoryInterface $attributesRepository
    )
    {
        $this->attributesRepository = $attributesRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $data = $this->attributesRepository->getPaginated($request);
            if ($data->isEmpty()) {
                return $this->toResponseBad('Không có thuộc tính nào được tìm thấy', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($data, AttributesResource::class),
                'Danh sách thuộc tính',
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return $this->toResponseBad($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttributesRequest $request)
    {
        try {
            $validated = $request->validated();
            $data = $this->attributesRepository->create($validated);

            return $this->toResponseSuccess([
                'message' => 'Thuộc tính đã được tạo thành công',
                'data' => new AttributesResource($data)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return $this->toResponseBad('Lỗi cơ sở dữ liệu: ' . $e->getMessage(), Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return $this->toResponseBad('Không thể tạo thuộc tính: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        try {
            $data = $this->attributesRepository->find($id);
            return new AttributesResource($data);
        } catch (\Exception $e) {
            return $this->toResponseBad('Không tìm thấy thuộc tính: ' . $e->getMessage(), Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttributesRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $data = $this->attributesRepository->update($id, $validated);
            return $this->toResponseSuccess(
                new AttributesResource($data),
                'Thuộc tính đã được cập nhật thành công',
                Response::HTTP_OK
            );
        } catch (QueryException $e) {
            return $this->toResponseBad('Lỗi cơ sở dữ liệu: ' . $e->getMessage(), Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return $this->toResponseBad('Không thể cập nhật thuộc tính: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->attributesRepository->delete($id);
            return $this->toResponseDeleteSuccess('Thuộc tính đã được xóa thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->toResponseBad('Không thể xóa thuộc tính: ' . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
