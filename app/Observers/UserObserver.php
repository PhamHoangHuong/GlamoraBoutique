<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserObserver
{
    /**
     * Xử lý sự kiện khi một User được tạo
     */
    public function created(User $user)
    {
        $user->status = 1 ;
        Log::info('User vừa được tạo:', ['id' => $user->id, 'email' => $user->email]);
    }

    /**
     * Xử lý sự kiện khi một User được cập nhật
     */
    public function updated(User $user)
    {
        Log::info('User vừa được cập nhật:', ['id' => $user->id]);
    }

    /**
     * Xử lý sự kiện khi một User bị xóa
     */
    public function deleted(User $user)
    {
        Log::warning('User bị xóa:', ['id' => $user->id]);
    }
}

