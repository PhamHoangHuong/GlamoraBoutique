<?php

namespace Modules\Categories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Categories\Http\Requests\StoreCategoriesRequest;
use Modules\Categories\Http\Requests\UpdateCategoriesRequest;
use Modules\Categories\Repositories\CategoriesRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CategoriesController extends Controller
{
    use ResponseTrait, ImageUploadTrait,PaginatedTrait;

    protected $categoriesRepository;

    public function __construct(CategoriesRepositoryInterface $categoriesRepository)
    {
        $this->categoriesRepository = $categoriesRepository;
    }

    public function index(Request $request)
    {
        try {
            $categories = $this->categoriesRepository->getPaginated($request);
            if (empty($categories['data'])) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function show($id)
    {
        try{
            $categories = $this->categoriesRepository->find($id);
            if(!$categories) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories->load('products'), 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(StoreCategoriesRequest $request)
    {
        DB::BeginTransaction();
        try{
            $existSlug = $this->categoriesRepository->checkExistSlug($request->slug);
            if($existSlug) {
                return $this->toResponseBad('Danh mục đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            //Chuẩn bị dữ liệu để tạo danh mục
            $category=$this->prepareCategoryData($request, null, true);
            //Tạo danh mục mới
            $this->categoriesRepository->create($category);

            //Kiểm tra xem có thêm sản phẩm khi tạo danh mục không
            if($request->has('products') && count($request->products) > 0) {
                $this->categoriesRepository->updateCategoryProducts($category, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo danh mục mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function update(UpdateCategoriesRequest $request, $id)
    {
        DB::BeginTransaction();
        try{
            $categories = $this->categoriesRepository->find($id);
            if(!$categories) {
                return $this->toResponseBad('Không tìm thấy dữ liệu ', Response::HTTP_NOT_FOUND);
            }
            $existSlug = $this->categoriesRepository->checkExistSlug($request->slug);
            if($existSlug && $categories->slug != $request->slug) {
                return $this->toResponseBad('Dữ liệu đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $data = $this->prepareCategoryData($request, $categories->image, false);
            $this->categoriesRepository->update($id, $data);

            //Kiểm tra xem có thay thế sản phẩm khi cập nhật danh mục không
            if($request->has('products') && count($request->products) > 0) {
                $this->categoriesRepository->updateCategoryProducts($categories, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật dữ liệu thành công', Response::HTTP_OK);
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
            $Category = $this->categoriesRepository->find($id);
            if(!$Category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->categoriesRepository->update($id, ['status' => 0]);
            $this->categoriesRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    protected function prepareCategoryData($request, $oldImage = null, $isInsert = false)
    {
        $data = $request->validated();
        if($isInsert !== false) {
            if($request->hasFile('image')) {
                $data['image'] = $this->uploadImage($request, 'image', 'categories', 'category');
            }
        }else {
            if($request->hasFile('image')) {
                $data['image'] = $this->updateImage($request, 'image', 'categories', $oldImage);
            }else {
                $data['image'] = $oldImage;
            }
        }

        // Add additional fields
        $data['name'] = $request->input('name', $data['name'] ?? null);
        $data['slug'] = $request->input('slug', $data['slug'] ?? null);
        $data['parent_id'] = $request->input('parent_id', $data['parent_id'] ?? null);
        $data['description'] = $request->input('description', $data['description'] ?? null);
        $data['status'] = $request->input('status', $data['status'] ?? 1);

        return $data;
    }

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try{
            $data = $this->categoriesRepository->find($id);
            if(!$data) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $status = $data->status == 1 ? 0 : 1;
            $this->categoriesRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
