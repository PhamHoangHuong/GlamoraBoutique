<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_id' => 'required|exists:group_customers,id',
            'fullname' => 'nullable|string|max:255',
            'phone' => 'required|string|regex:/^[0-9]{10,15}$/|unique:customer,phone',
            'email' => 'required|email|unique:customer,email',
            'address' => 'nullable|string|max:255',
            'point' => 'nullable|integer|min:0',
            'password' => 'required|string|min:8|confirmed',
            'status' => 'nullable|integer',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function messages()
    {
        return [
            'phone.regex' => 'Số điện thoại không hợp lệ',
        ];
    }
}
