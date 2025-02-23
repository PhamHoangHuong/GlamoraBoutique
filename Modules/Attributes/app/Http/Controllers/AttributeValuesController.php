<?php

namespace Modules\Attributes\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Modules\Attributes\Http\Requests\StoreAttributeValuesRequest;
use Modules\Attributes\Http\Requests\UpdateAttributeValuesRequest;
use Modules\Attributes\Repositories\AttributeValuesRepositoryInterface;
use Modules\Attributes\Transformers\AttributeValuesResource;
use Modules\Attributes\Models\AttributeValues;
use Symfony\Component\HttpFoundation\Response;

class AttributeValuesController extends Controller
{
    public function __construct(
        protected AttributeValuesRepositoryInterface $attributeValuesRepository
    )
    {
        $this->attributeValuesRepository = $attributeValuesRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $values = $this->attributeValuesRepository->getAll();
            return response()->json([
                'data' => AttributeValuesResource::collection($values)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể lấy danh sách giá trị thuộc tính'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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

            return response()->json([
                'message' => 'Giá trị thuộc tính đã được tạo thành công',
                'data' => new AttributeValuesResource($value)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể tạo giá trị thuộc tính'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        try {
            $value = $this->attributeValuesRepository->find($id);
            return response()->json([
                'data' => new AttributeValuesResource($value)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không tìm thấy giá trị thuộc tính'
            ], Response::HTTP_NOT_FOUND);
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

            return response()->json([
                'message' => 'Giá trị thuộc tính đã được cập nhật thành công',
                'data' => new AttributeValuesResource($value)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể cập nhật giá trị thuộc tính'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->attributeValuesRepository->delete($id);
            return response()->json([
                'message' => 'Giá trị thuộc tính đã được xóa thành công'
            ], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể xóa giá trị thuộc tính'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
