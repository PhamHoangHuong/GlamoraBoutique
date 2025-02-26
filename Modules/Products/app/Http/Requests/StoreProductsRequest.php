<?php

namespace Modules\Products\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $productId = $this->route('products');
        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('products')->ignore($productId),
            ],
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image',
            'status' => 'boolean',
            'weight' => 'nullable|numeric',
            'price' => 'sometimes|required|numeric|min:0',
            'start_new_time' => 'nullable|date',
            'end_new_time' => 'nullable|date|after:start_new_time',
            'parent_id' => [
                'nullable',
                'exists:products,id',
                Rule::notIn([$productId]),
            ],
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products')->ignore($productId),
            ],
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'video_link' => 'nullable|string|url',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'attributes' => 'nullable|array',
            'attributes.*.attribute_id' => 'required|exists:attributes,id',
            'attributes.*.attribute_value_id' => 'required|exists:attribute_values,id',
            'sources' => 'nullable|array',
            'sources.*.source_id' => 'required|exists:sources,id',
            'sources.*.quantity' => 'required|integer|min:0',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên sản phẩm là bắt buộc.',
            'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
            'slug.unique' => 'Slug đã tồn tại.',
            'price.required' => 'Giá sản phẩm là bắt buộc.',
            'price.numeric' => 'Giá sản phẩm phải là số.',
            'price.min' => 'Giá sản phẩm không được âm.',
            'end_new_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu.',
            'sku.unique' => 'SKU đã tồn tại.',
            'video_link.url' => 'Đường dẫn video không hợp lệ.',
            'category_ids.required' => 'Danh mục sản phẩm là bắt buộc.',
            'category_ids.*.exists' => 'Danh mục không tồn tại.',
            'attributes.*.attribute_id.exists' => 'Thuộc tính không tồn tại.',
            'attributes.*.attribute_value_id.exists' => 'Giá trị thuộc tính không tồn tại.',
            'sources.*.source_id.exists' => 'Nguồn hàng không tồn tại.',
            'sources.*.quantity.min' => 'Số lượng không được âm.',
        ];
    }
}
