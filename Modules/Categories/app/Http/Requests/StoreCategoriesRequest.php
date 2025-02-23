<?php

namespace Modules\Categories\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoriesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        $categoryId = $this->route('categories');
        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('categories')->ignore($categoryId),
            ],
            'parent_id'=>[
                'nullable',
                'integer',
                Rule::exists('categories','id')->whereNull('parent_id')
            ],
            'description'=>'nullable|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'status'=>'nullable|integer|in:0,1',

            //Thêm products nếu có
            'products'=>'nullable|array',
            'products.*'=>'integer|exists:products,id'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Tên danh mục không được để trống',
            'name.string' => 'Tên danh mục phải là chuỗi',
            'name.max' => 'Tên danh mục không được vượt quá 255 ký tự',
            'slug.string' => 'Slug phải là chuỗi',
            'slug.max' => 'Slug không được vượt quá 255 ký tự',
            'slug.unique' => 'Slug đã tồn tại',
            'parent_id.integer' => 'Parent id phải là số nguyên',
            'parent_id.exists' => 'Parent id không tồn tại',
            'description.string' => 'Mô tả phải là chuỗi',
            'image.image' => 'Ảnh phải là ảnh',
            'image.mimes' => 'Ảnh phải có định dạng jpeg, png, jpg, gif, svg',
            'image.max' => 'Ảnh không được vượt quá 4096 ký tự',
            'status.integer' => 'Trạng thái phải là số nguyên',
            'status.in' => 'Trạng thái không hợp lệ',
            'products.array' => 'Products phải là mảng',
            'products.*.integer' => 'Products phải là số nguyên',
            'products.*.exists' => 'Products không tồn tại'
        ];
    }
}
