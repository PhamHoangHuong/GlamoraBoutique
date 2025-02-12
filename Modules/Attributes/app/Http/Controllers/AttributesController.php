<?php

namespace Modules\Attributes\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Modules\Attributes\Http\Requests\StoreAttributesRequest;
use Modules\Attributes\Http\Requests\UpdateAttributesRequest;
use Modules\Attributes\Repositories\AttributesRepositoryInterface;
use Modules\Attributes\Transformers\AttributesResource;
use Symfony\Component\HttpFoundation\Response;

class AttributesController extends Controller
{
    public function __construct(
        protected AttributesRepositoryInterface $attributesRepository
    )
    {
        $this->attributesRepository = $attributesRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AttributesResource::collection($this->attributesRepository->getAll());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttributesRequest $request)
    {
        try {
            $validated = $request->validated();
            $data = $this->attributesRepository->create($validated);

            return response()->json([
                'message' => 'Thuộc tính đã được tạo thành công',
                'data' => new AttributesResource($data)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
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
            return response()->json(['error' => 'Không tìm thấy thuộc tính: ' . $e->getMessage()], Response::HTTP_NOT_FOUND);
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

            return response()->json([
                'message' => 'Thuộc tính đã được cập nhật thành công',
                'data' => new AttributesResource($data)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể cập nhật thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->attributesRepository->delete($id);
            return response()->json(['message' => 'Thuộc tính đã được xóa thành công'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
