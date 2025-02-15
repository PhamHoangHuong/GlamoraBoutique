<?php

namespace Modules\Customer\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Customer\Http\Requests\StoreCustomerRequest;
use Modules\Customer\Http\Requests\UpdateCustomerRequest;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\GroupCustomer\app\Http\Requests\UpdateGroupCustomerRequest;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{
    use ResponseTrait;
    protected $customerRepository;

    public function __construct(CustomerRepositoryInterface $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index()
    {
        $customers = $this->customerRepository->getAll(['id', 'fullname', 'email', 'phone', 'address', 'status']);

        if ($customers->isEmpty()) {
            return $this->toResponseBad('Không tìm thấy dữ liệu.', Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess($customers, Response::HTTP_OK);
    }


    public function store(StoreCustomerRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            if ($request->password !== $request->password_confirmation) {
                return $this->toResponseBad('Mật khẩu và mật khẩu xác nhận không khớp.', Response::HTTP_BAD_REQUEST);
            }

            $data['password'] = bcrypt($request->password);
            $customer = $this->customerRepository->create($data);
            DB::commit();
            return $this->toResponseSuccess('Thêm mới khách hàng thành công.', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad('Thêm mới khách hàng thất bại.', $exception->getMessage());
        }
    }




    public function update(UpdateCustomerRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $customer = $this->customerRepository->find($id);

            if (!$customer) {
                return $this->toResponseBad('Khách hàng không tồn tại.', Response::HTTP_NOT_FOUND);
            }

            if (isset($data['email']) && $data['email'] !== $customer->email) {
                $existingCustomer = $this->customerRepository->findByEmail($data['email']);
                if ($existingCustomer && $existingCustomer->id !== $customer->id) {
                    return $this->toResponseBad('Email đã được sử dụng.', Response::HTTP_BAD_REQUEST);
                }
            }

            if (isset($data['phone']) && $data['phone'] !== $customer->phone) {
                $existingCustomer = $this->customerRepository->findByPhone($data['phone']);
                if ($existingCustomer && $existingCustomer->id !== $customer->id) {
                    return $this->toResponseBad('Số điện thoại đã được sử dụng.', Response::HTTP_BAD_REQUEST);
                }
            }

            if ($request->password) {
                if ($request->password !== $request->password_confirmation) {
                    return $this->toResponseBad('Mật khẩu và mật khẩu xác nhận không khớp.', Response::HTTP_BAD_REQUEST);
                }
                $data['password'] = bcrypt($request->password);
            }

            $customer->update($data);

            DB::commit();
            return $this->toResponseSuccess('Cập nhật khách hàng thành công.', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad('Cập nhật khách hàng thất bại.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $customer = $this->customerRepository->find($id);
            if (!$customer) {
                return $this->toResponseBad('Khách hàng không tồn tại.', Response::HTTP_NOT_FOUND);
            }
            $this->customerRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess('Xóa khách hàng thành công.', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad('Xóa khách hàng thất bại.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function switchStatus($id)
    {
        DB::beginTransaction();
        try {
            $customer = $this->customerRepository->find($id);
            if (!$customer) {
                return $this->toResponseBad('Khách hàng không tồn tại.', Response::HTTP_NOT_FOUND);
            }

            $status = $customer->status == 1 ? 0 : 1;
            $this->customerRepository->update($id, ['status' => $status]);

            DB::commit();
            return $this->toResponseSuccess('Cập nhật trạng thái khách hàng thành công.', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad('Cập nhật trạng thái khách hàng thất bại.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
