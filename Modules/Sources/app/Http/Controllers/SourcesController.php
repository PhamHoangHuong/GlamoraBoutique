<?php

namespace Modules\Sources\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Modules\Sources\Http\Requests\StoreSourcesRequest;
use Modules\Sources\Http\Requests\UpdateSourcesRequest;
use Symfony\Component\HttpFoundation\Response;
use Modules\Sources\Repositories\SourcesRepositoryInterface;
use Modules\Sources\Transformers\SourcesResource;

class SourcesController extends Controller
{
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

    /**
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return SourcesResource::collection($this->sourceRepository->getAll());
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
}
