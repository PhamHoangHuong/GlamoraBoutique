<?php

namespace Modules\Sources\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSourceProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product_id' => 'required|exists:products,id',
            'source_id' => 'required|exists:sources,id',
            'quantity' => 'required|integer|min:0',
            'status' => 'required|string|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'The product ID field is required.',
            'product_id.exists' => 'The selected product ID is invalid.',
            'source_id.required' => 'The source ID field is required.',
            'source_id.exists' => 'The selected source ID is invalid.',
            'quantity.required' => 'The quantity field is required.',
            'quantity.integer' => 'The quantity must be an integer.',
            'quantity.min' => 'The quantity must be at least 0.',
            'status.required' => 'The status field is required.',
            'status.string' => 'The status must be a string.',
            'status.in' => 'The selected status is invalid.',
        ];
    }
}
