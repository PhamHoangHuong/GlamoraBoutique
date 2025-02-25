<?php

namespace Modules\Sources\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Modules\Sources\Http\Requests\StoreSourcesRequest;
use Modules\Sources\Http\Requests\UpdateSourcesRequest;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;
use Modules\Sources\Repositories\SourcesRepositoryInterface;
use Modules\Sources\Transformers\SourcesResource;

class SourcesController extends Controller
{
    use ResponseTrait, ImageUploadTrait,PaginatedTrait;
    /**
     * @var SourcesRepositoryInterface
     */
    protected $sourceRepository;

    /**
     * @param SourcesRepositoryInterface $sourceRepository
     */
    public function __construct(SourcesRepositoryInterface $sourceRepository)
    {
        $this->sourceRepository = $sourceRepository;
    }


    public function index(Request $request)
    {
//        return SourcesResource::collection($this->sourceRepository->getAll());
        try{
            $sources = $this->sourceRepository->getPaginated($request);
            if($sources->isEmpty())  {
                return $this->toResponseBad('Không tìm thấy dữ liệu',Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($sources, SourcesResource::class),
                'Tìm thấy dữ liệu',
                Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param StoreSourcesRequest $request
     * @return JsonResponse
     */
    public function store(StoreSourcesRequest $request)
    {
        try {
            $source = $this->sourceRepository->create($request->validated());
            return response()->json([
                'message' => 'Source created successfully',
                'data' => new SourcesResource($source)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Source name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to create source: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create source: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse|SourcesResource
     */
    public function show($id)
    {
        try {
            $source = $this->sourceRepository->find($id);
            return new SourcesResource($source);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Source not found'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * @param UpdateSourcesRequest $request
     * @param $id
     * @return JsonResponse
     */
    public function update(UpdateSourcesRequest $request, $id)
    {
        try {
            $source = $this->sourceRepository->update($id, $request->validated());
            return response()->json([
                'message' => 'Source updated successfully',
                'data' => new SourcesResource($source)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Source name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to update source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $this->sourceRepository->delete($id);
            return response()->json(['message' => 'Source deleted successfully'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try{
            $data = $this->sourceRepository->find($id);
            if(!$data) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $active = $data->active == 1 ? 0 : 1;
            $this->sourceRepository->update($id, ['active' => $active]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
