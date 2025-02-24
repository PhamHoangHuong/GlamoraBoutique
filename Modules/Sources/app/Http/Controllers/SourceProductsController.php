<?php

namespace Modules\Sources\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Modules\Sources\Repositories\SourceProductsRepositoryInterface;
use Modules\Sources\Http\Requests\StoreSourceProductsRequest;
use Modules\Sources\Http\Requests\UpdateSourceProductsRequest;
use Modules\Sources\Transformers\SourceProductsResource;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class SourceProductsController extends Controller
{
    use ResponseTrait, ImageUploadTrait, PaginatedTrait;

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


    public function index()
    {
        try {
            $sourceProducts = $this->sourceProductRepository->getPaginated(request());
            if ($sourceProducts->isEmpty()) {
                return $this->toResponseBad('No data found', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($sourceProducts, SourceProductsResource::class),
                'Data found',
                Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try {
            $data = $this->sourceProductRepository->find($id);
            if (!$data) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $status = $data->status == 1 ? 0 : 1;
            $this->sourceProductRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái dữ liệu thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
