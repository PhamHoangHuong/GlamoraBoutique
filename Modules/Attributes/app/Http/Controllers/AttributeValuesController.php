<?php

namespace Modules\Attributes\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Modules\Attributes\Repositories\AttributeValuesRepositoryInterface;
use Modules\Attributes\Transformers\AttributeValuesResource;
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
       return AttributeValuesResource::collection($this->attributeValuesRepository->getAll());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $attributeValue = $this->attributeValuesRepository->create($request->all());
            return response()->json([
                'message' => 'Giá trị thuộc tính đã được tạo thành công',
                'data' => new AttributeValuesResource($attributeValue)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Giá trị thuộc tính đã tồn tại'], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        try {
            $attributeValue = $this->attributeValuesRepository->find($id);
            return new AttributeValuesResource($attributeValue);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy giá trị thuộc tính'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $attributeValue = $this->attributeValuesRepository->update($id, $request->all());
            return response()->json([
                'message' => 'Giá trị thuộc tính đã được cập nhật thành công',
                'data' => new AttributeValuesResource($attributeValue)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Giá trị thuộc tính đã tồn tại'], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể cập nhật giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->attributeValuesRepository->delete($id);
            return response()->json(['message' => 'Giá trị thuộc tính đã được xóa thành công'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
