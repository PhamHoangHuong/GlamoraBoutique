<?php

namespace Modules\CatalogPriceRules\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCatalogPriceRulesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|integer|in:0,1',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'group_customer_ids' => 'nullable|array',
            'condition_apply' => 'nullable|string|in:all_products,specific_products,categories,attribute_groups',
            'condition_value' => 'nullable|array',
            'discount_amount' => 'nullable|numeric',
            'operator' => 'nullable|integer|in:1,2,3,4,5,6',
            'simple_action' => 'nullable|string|in:by_percent,by_fixed,percent,fixed',
            'priority' => 'nullable|integer',
            'sort_order' => 'nullable|integer',
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'Tên phải là một chuỗi.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'description.string' => 'Mô tả phải là một chuỗi.',
            'is_active.integer' => 'Trạng thái kích hoạt phải là một số nguyên.',
            'is_active.in' => 'Trạng thái kích hoạt phải là 0 hoặc 1.',
            'start_time.date' => 'Thời gian bắt đầu phải là một ngày hợp lệ.',
            'end_time.date' => 'Thời gian kết thúc phải là một ngày hợp lệ.',
            'end_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu.',
            'group_customer_ids.array' => 'ID nhóm khách hàng phải là một mảng.',
            'condition_apply.string' => 'Điều kiện áp dụng phải là một chuỗi.',
            'condition_apply.in' => 'Điều kiện áp dụng không hợp lệ.',
            'condition_value.array' => 'Giá trị điều kiện phải là một mảng.',
            'discount_amount.numeric' => 'Số tiền giảm giá phải là một số.',
            'operator.integer' => 'Toán tử phải là một số nguyên.',
            'operator.in' => 'Toán tử không hợp lệ.',
            'simple_action.string' => 'Hành động đơn giản phải là một chuỗi.',
            'simple_action.in' => 'Hành động đơn giản không hợp lệ.',
            'priority.integer' => 'Ưu tiên phải là một số nguyên.',
            'sort_order.integer' => 'Thứ tự sắp xếp phải là một số nguyên.',
        ];
    }
}
