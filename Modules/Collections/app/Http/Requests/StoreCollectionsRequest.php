<?php

namespace Modules\Collections\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCollectionsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string',
            'slug' => 'nullable|string|unique:collections,slug,' . $this->route('collections'),
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status' => 'nullable|integer|in:0,1',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Tên danh mục phải là chuỗi',
            'slug.string' => 'Slug phải là chuỗi',
            'slug.unique' => 'Slug đã tồn tại',
            'description.string' => 'Mô tả phải là chuỗi',
            'image.image' => 'Ảnh phải là ảnh',
            'image.mimes' => 'Ảnh phải có định dạng jpeg, png, jpg, gif, svg',
            'image.max' => 'Ảnh không được vượt quá 4096 ký tự',
            'status.integer' => 'Trạng thái phải là số nguyên',
            'status.in' => 'Trạng thái không hợp lệ',
        ];
    }
}
