<?php
namespace Modules\Product\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Modules\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use Modules\Product\Transformers\ProductResource;
use Modules\Product\Http\Requests\StoreProductRequest;
use Modules\Product\Http\Requests\UpdateProductRequest;
use Modules\Product\Repositories\ProductRepositoryInterface;


class ProductController extends Controller
{
    use ResponseTrait;
    public function __construct(
        public ProductRepositoryInterface $productRepository
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productRepository->getTreeProduct();
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
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
                $variantData['sku'] = $variant['sku'] ?? $product->sku;
                $variantData['attribute_id'] = $variant['attributes'][0]['attribute_id'] ?? null;
                $variantData['attribute_value_id'] = $variant['attributes'][0]['attribute_value_id'] ?? null;
                $variantData['start_new_time'] = $variant['start_new_time'] ?? $product->start_new_time;
                $variantData['end_new_time'] = $variant['end_new_time'] ?? $product->end_new_time;
                $variantData['seo_title'] = $variant['seo_title'] ?? $product->seo_title;
                $variantData['seo_description'] = $variant['seo_description'] ?? $product->seo_description;
                $variantData['video_link'] = $variant['video_link'] ?? $product->video_link;
                // $variantData['categories'] = $product->categories->pluck('id');

                if (isset($variant['image']) && $variant['image'] instanceof UploadedFile) {
                    // $variantData['image'] = $this->uploadImage($request, 'image', 'products');
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


            // // Cập nhật danh mục cho sản phẩm
            // $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));
            // // Cập nhật nguồn cung cấp cho sản phẩm
            // $this->productRepository->updateProductSources($product, $request->input('sources', []));
            // // Cập nhật bộ sưu tập cho sản phẩm
            // $this->productRepository->updateProductCollections($product, $request->input('collection_ids', []));

            DB::commit();
            Log::info('Transaction committed');

            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', new ProductResource($product), Response::HTTP_CREATED);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            return $this->handleException($e);
        }
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        try {
            // $product = $this->productRepository->findProduct($id, ['parent', 'variants', 'productAttributes', 'sourceProducts']);

            $product = $this->productRepository->findProduct($id, [ 'variants', 'productAttributes']);

            return new ProductResource($product);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('product::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $productData = $request->validated();

            if ($request->hasFile('image')) {
                // $productData['image'] = $this->updateImage($request, 'image', 'products', $productData['image'] ?? null);
            }

            $product = $this->productRepository->updateProduct($id, $productData);

            $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
            //Cập nhật danh mục cho sản phẩm
            // $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));
            // //Cập nhật bộ sưu tập cho sản phẩm
            // $this->productRepository->updateProductCollections($product, $request->input('collection_ids', []));

            DB::commit();
            return $this->toResponseSuccess('Sản phẩm đã được cập nhật thành công', new ProductResource($product));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->productRepository->deleteProduct($id);
            return $this->toResponseSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
