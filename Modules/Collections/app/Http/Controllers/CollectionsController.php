<?php

namespace Modules\Collections\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Collections\Http\Requests\StoreCollectionsRequest;
use Modules\Collections\Http\Requests\UpdateCollectionsRequest;
use Modules\Collections\Repositories\CollectionsRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CollectionsController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $collectionsRepository;
    public function __construct(CollectionsRepositoryInterface $collectionsRepository)
    {
        $this->collectionsRepository = $collectionsRepository;
    }

    public function index()
    {
        try{
            $collections = $this->collectionsRepository->getAll();
            if($collections->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu',Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($collections, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try{
            $collection = $this->collectionsRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($collection->load('products'), 'Tìm thấy bộ sưu tập', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(StoreCollectionsRequest $request)
    {
        DB::BeginTransaction();
        try{
            $existSlug = $this->collectionsRepository->checkExistSlug($request->slug);
            if($existSlug) {
                return $this->toResponseBad('Bộ sưu tập đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $collection=$this->prepareCollectionData($request, null, true);
            $this->collectionsRepository->create($collection);

            if($request->has('products') && count($request->products) > 0) {
                $this->collectionsRepository->updateCollectionProducts($collection, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo bộ sưu tập mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(UpdateCollectionsRequest $request, $id)
    {
        DB::BeginTransaction();
        try{
            $collection = $this->collectionsRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }

            $existSlug = $this->collectionsRepository->checkExistSlug($request->slug);
            if($existSlug && $collection->slug != $request->slug) {
                return $this->toResponseBad('Bộ sưu tập đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $data = $this->prepareCollectionData($request, $collection->image, false);
            $this->collectionsRepository->update($data, $id);

            if($request->has('products') && count($request->products) > 0) {
                $this->collectionsRepository->updateCollectionProducts($data, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật bộ sưu tập thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::BeginTransaction();
        try{
            $collection = $this->collectionsRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            $this->collectionsRepository->update($id, ['status' => 0]);
            $this->collectionsRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa bộ sưu tập thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    protected function prepareCollectionData($request, $oldImage = null, $isInsert = false)
    {
        $data = $request->validated();
        if($isInsert !== false) {
            if($request->hasFile('image')) {
                $data['image'] = $this->uploadImage($request, 'image', 'collections', 'collection');
            }
        }else {
            if($request->hasFile('image')) {
                $data['image'] = $this->updateImage($request, 'image', 'collections', $oldImage);
            }else {
                $data['image'] = $oldImage;
            }
        }

        // Add additional fields
        $data['name'] = $request->input('name', $data['name'] ?? null);
        $data['slug'] = $request->input('slug', $data['slug'] ?? null);
        $data['description'] = $request->input('description', $data['description'] ?? null);
        $data['status'] = $request->input('status', $data['status'] ?? 1);

        return $data;
    }

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try{
            $collection = $this->collectionsRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            $status = $collection->status == 1 ? 0 : 1;
            $this->collectionsRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái bộ sưu tập thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
