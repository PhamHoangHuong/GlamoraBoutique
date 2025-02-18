<?php

namespace App\Observers;


use Illuminate\Support\Facades\Log;
use Modules\Customer\Models\Customer;

class CustomerObserver
{
    /**
     * Xử lý sự kiện khi một Customer được tạo
     */
    public function creating(Customer $customer)
    {
        $customer->status = 1 ;
        Log::info('Customer vừa được tạo:', ['id' => $customer->id, 'email' => $customer->email]);
    }

    /**
     * Xử lý sự kiện khi một Customer được cập nhật
     */
    public function updated(Customer $customer)
    {
        Log::info('Customer vừa được cập nhật:', ['id' => $customer->id]);
    }

    /**
     * Xử lý sự kiện khi một Customer bị xóa
     */
    public function deleted(Customer $customer)
    {
        Log::warning('Customer bị xóa:', ['id' => $customer->id]);
    }
}

