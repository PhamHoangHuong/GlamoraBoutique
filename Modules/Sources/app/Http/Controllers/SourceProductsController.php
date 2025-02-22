<?php

namespace Modules\Sources\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Modules\Sources\Repositories\SourceProductsRepositoryInterface;
use Modules\Sources\Http\Requests\StoreSourceProductsRequest;
use Modules\Sources\Http\Requests\UpdateSourceProductsRequest;
use Modules\Sources\Transformers\SourceProductsResource;
use Symfony\Component\HttpFoundation\Response;

class SourceProductsController extends Controller
{
    /**
     * @var SourceProductsRepositoryInterface $sourceProductRepository
     */
    protected $sourceProductRepository;

    /**
     * @param SourceProductsRepositoryInterface $sourceProductRepository
     */
    public function __construct(SourceProductsRepositoryInterface $sourceProductRepository)
    {
        $this->sourceProductRepository = $sourceProductRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return SourceProductsResource::collection($this->sourceProductRepository->getAll());
    }

    /**
     * @param StoreSourceProductsRequest $request
     * @return JsonResponse
     */
    public function store(StoreSourceProductsRequest $request)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->create($request->validated());
            return response()->json([
                'message' => 'SourceProduct created successfully',
                'data' => new SourceProductsResource($sourceProduct)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to create SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse|SourceProductsResource
     */
    public function show($id)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->find($id);
            return new SourceProductsResource($sourceProduct);
        } catch (\Exception $e) {
            return response()->json(['error' => 'SourceProduct not found'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * @param UpdateSourceProductsRequest $request
     * @param $id
     * @return JsonResponse
     */
    public function update(UpdateSourceProductsRequest $request, $id)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->update($id, $request->validated());
            return response()->json([
                'message' => 'SourceProduct updated successfully',
                'data' => new SourceProductsResource($sourceProduct)
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $this->sourceProductRepository->delete($id);
            return response()->json(['message' => 'SourceProduct deleted successfully'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
