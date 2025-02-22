<?php

namespace Modules\GroupCustomer\app\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 *
 */
class UpdateGroupCustomerRequest extends FormRequest
{
    /**
     * @return true
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return string[]
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'status' => 'required|in:0,1,2',
            'description' => 'nullable|string'
        ];
    }

    /**
     * @return string[]
     */
    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'code.required' => 'The code field is required.',
            'status.required' => 'The status field is required.',
        ];
    }
}
