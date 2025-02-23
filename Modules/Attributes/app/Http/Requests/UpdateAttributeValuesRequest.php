<?php

namespace Modules\Attributes\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttributeValuesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'value' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'value.required' => 'Giá trị thuộc tính là bắt buộc.',
            'value.string' => 'Giá trị thuộc tính phải là một chuỗi.',
            'value.max' => 'Giá trị thuộc tính không được vượt quá 255 ký tự.',
        ];
    }
} 