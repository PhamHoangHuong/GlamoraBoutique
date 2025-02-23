<?php

namespace Modules\Products\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Products\Http\Requests\StoreProductAttributesRequest;
use Modules\Products\Http\Requests\UpdateProductAttributesRequest;
use Modules\Products\Repositories\ProductAttributesRepositoryInterface;
use Modules\Products\Transformers\ProductAttributesResource;
use Symfony\Component\HttpFoundation\Response;

class ProductAttributesController extends Controller
{
    protected $productAttributeRepository;

    public function __construct(ProductAttributesRepositoryInterface $productAttributeRepository)
    {
        $this->productAttributeRepository = $productAttributeRepository;
    }

    public function index()
    {
        $attributes = $this->productAttributeRepository->getAll();
        return ProductAttributesResource::collection($attributes);
    }

    public function store(StoreProductAttributesRequest $request)
    {
        $attribute = $this->productAttributeRepository->create($request->validated());
        return new ProductAttributesResource($attribute);
    }

    public function show($id)
    {
        $attribute = $this->productAttributeRepository->find($id);
        return new ProductAttributesResource($attribute);
    }

    public function update(UpdateProductAttributesRequest $request, $id)
    {
        $attribute = $this->productAttributeRepository->update($id, $request->validated());
        return new ProductAttributesResource($attribute);
    }

    public function destroy($id)
    {
        $this->productAttributeRepository->delete($id);
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
