<?php

namespace Modules\Products\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Modules\Products\Http\Requests\StoreProductsRequest;
use Modules\Products\Http\Requests\UpdateProductsRequest;
use Modules\Products\Repositories\ProductsRepositoryInterface;
use Modules\Products\Transformers\ProductsResource;
use Modules\Sources\Repositories\SourceProductsRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ProductsController extends Controller
{
    use ImageUploadTrait, ResponseTrait;

    protected $productRepository, $sourceProductRepository;

    // Khởi tạo controller với các repository cần thiết
    public function __construct(
        ProductsRepositoryInterface       $productRepository,
        SourceProductsRepositoryInterface $sourceProductRepository
    )
    {
        $this->productRepository = $productRepository;
        $this->sourceProductRepository = $sourceProductRepository;
    }

    // Lấy danh sách tất cả sản phẩm
    public function index()
    {
        try{
            $products = $this->productRepository->getAll();
            if($products->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy sản phẩm', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Tạo mới một sản phẩm
    public function store(StoreProductsRequest $request)
    {
        Log::info('Store method called');
        DB::beginTransaction();
        try {
            // Chuẩn bị dữ liệu sản phẩm từ request
            $productData = $this->productRepository->prepareProductData($request);
            // Tạo sản phẩm mới
            $product = $this->productRepository->createProduct($productData);
            Log::info('Product created: ' . json_encode($product));

            // Tạo sản phẩm biến thể
            foreach ($request->input('variants', []) as $variant) {
                $variantData = $productData;
                $variantData['parent_id'] = $product->id;
                $variantData['name'] = $variant['name'] ?? $product->name . ' ' . $variant['attribute_value_id'];
                $variantData['slug'] = $variant['slug'] ?? Str::slug($variantData['name']);
                $variantData['price'] = $variant['price'] ?? $product->price;
                $variantData['weight'] = $variant['weight'] ?? $product->weight;
                $variantData['sku'] = $variant['sku'] ?? $product->sku;
                $variantData['attribute_id'] = $variant['attributes'][0]['attribute_id'] ?? null;
                $variantData['attribute_value_id'] = $variant['attributes'][0]['attribute_value_id'] ?? null;
                $variantData['start_new_time'] = $variant['start_new_time'] ?? $product->start_new_time;
                $variantData['end_new_time'] = $variant['end_new_time'] ?? $product->end_new_time;
                $variantData['seo_title'] = $variant['seo_title'] ?? $product->seo_title;
                $variantData['seo_description'] = $variant['seo_description'] ?? $product->seo_description;
                $variantData['video_link'] = $variant['video_link'] ?? $product->video_link;
                $variantData['categories'] = $product->categories->pluck('id');

                if (isset($variant['image']) && $variant['image'] instanceof UploadedFile) {
                    $variantData['image'] = $this->uploadImage($request, 'image', 'products');
                } else {
                    $variantData['image'] = null;
                }

                if (!empty($variantData['attribute_id']) && !empty($variantData['attribute_value_id'])) {
                    $variantProduct = $this->productRepository->createProduct($variantData);
                    $this->productRepository->updateProductAttributes($variantProduct, $variant['attributes']);
                } else {
                    Log::warning('Variant creation skipped due to missing attribute data', $variantData);
                }
            }

            // Cập nhật thuộc tính cho sản phẩm
            $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
            // Cập nhật danh mục cho sản phẩm
            $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));
            // Cập nhật nguồn cung cấp cho sản phẩm
            $this->productRepository->updateProductSources($product, $request->input('sources', []));
            // Cập nhật bộ sưu tập cho sản phẩm
            $this->productRepository->updateProductCollections($product, $request->input('collection_ids', []));

            DB::commit();
            Log::info('Transaction committed');

            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', new ProductsResource($product), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            return $this->handleException($e);
        }
    }

    // Hiển thị thông tin chi tiết của một sản phẩm
    public function show($id)
    {
        try {
            $data = $this->productRepository->findProduct($id, ['parent', 'variants', 'productAttributes', 'sourceProducts']);
            if (!$data) {
                return $this->toResponseBad('Không tìm thấy sản phẩm', Response::HTTP_NOT_FOUND);
            }
            return new ProductsResource($data);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Cập nhật thông tin sản phẩm
    public function update(UpdateProductsRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $productData = $request->validated();

            if ($request->hasFile('image')) {
                $productData['image'] = $this->updateImage($request, 'image', 'products', $productData['image'] ?? null);
            }

            $product = $this->productRepository->updateProduct($id, $productData);

            $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
            //Cập nhật danh mục cho sản phẩm
            $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));
            //Cập nhật bộ sưu tập cho sản phẩm
            $this->productRepository->updateProductCollections($product, $request->input('collection_ids', []));

            DB::commit();
            return $this->toResponseSuccess('Sản phẩm đã được cập nhật thành công', new ProductsResource($product));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    // Xóa một sản phẩm
    public function destroy($id)
    {
        try {
            $this->productRepository->deleteProduct($id);
            return $this->toResponseSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Lưu thông tin cơ bản của sản phẩm
    public function storeBasicInfo(StoreProductsRequest $request)
    {
        $product = $this->productRepository->create($request->validated());
        return response()->json(['product_id' => $product->id]);
    }

    // Lưu thuộc tính cho sản phẩm
    public function storeAttributes(Request $request, $productId)
    {
        $product = $this->productRepository->find($productId);
        $attributes = $request->input('attributes', []);

        $product->productAttributes()->delete();
        foreach ($attributes as $attribute) {
            $product->productAttributes()->create([
                'attribute_id' => $attribute['attribute_id'],
                'attribute_value_id' => $attribute['attribute_value_id'],
            ]);
        }

        return $this->toResponseSuccess('Thuộc tính sản phẩm đã được cập nhật thành công');
    }


    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try{
            $data = $this->productRepository->find($id);
            if(!$data) {
                return $this->toResponseBad('Không tìm thấy sản phẩm', Response::HTTP_NOT_FOUND);
            }
            $status = $data->status == 1 ? 0 : 1;
            $this->productRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
