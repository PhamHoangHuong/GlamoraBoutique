<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $customerId = $this->route('id');
        
        return [
            'group_id' => 'sometimes|exists:group_customer,id',
            'fullname' => 'nullable|string|max:255',
            'email' => 'sometimes|required|email|unique:customer,email,' . $customerId,
            'phone' => 'sometimes|required|string|regex:/^[0-9]{10,15}$/|unique:customer,phone,' . $customerId,
            'address' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'status' => 'sometimes|in:0,1'
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'Email đã được sử dụng',
            'phone.unique' => 'Số điện thoại đã được sử dụng',
            'phone.regex' => 'Số điện thoại không hợp lệ',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp'
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
}
