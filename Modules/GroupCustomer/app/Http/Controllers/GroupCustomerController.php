<?php

namespace Modules\GroupCustomer\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\GroupCustomer\app\Http\Requests\StoreGroupCustomerRequest;
use Modules\GroupCustomer\app\Http\Requests\UpdateGroupCustomerRequest;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;
use Modules\GroupCustomer\Transformers\GroupCustomerResource;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class GroupCustomerController extends Controller
{
    use ResponseTrait, PaginatedTrait;

    protected $groupCustomerRepository;

    /**
     * @param GroupCustomerRepositoryInterface $groupCustomerRepository
     */
    public function __construct(GroupCustomerRepositoryInterface $groupCustomerRepository)
    {
        $this->groupCustomerRepository = $groupCustomerRepository;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $listGroup = $this->groupCustomerRepository->getPaginated($request);
            if (!$listGroup) {
                return $this->toResponseBad('No Data found', Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($listGroup, GroupCustomerResource::class),
                'List Group Customer',
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param StoreGroupCustomerRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public
    function store(StoreGroupCustomerRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $this->groupCustomerRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess($data, 'New Group created successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public
    function show($id)
    {
        try {
            $group = $this->groupCustomerRepository->find($id);
            if (!$group) {
                return $this->toResponseBad('Group not found', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new GroupCustomerResource($group));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * @param UpdateGroupCustomerRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateGroupCustomerRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $group = $this->groupCustomerRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(new GroupCustomerResource($group), 'Group data updated successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->groupCustomerRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Group Customer deleted successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function switchStatus($id)
    {
        DB::beginTransaction();
        try {
            $customer = $this->groupCustomerRepository->find($id);
            if (!$customer) {
                return $this->toResponseBad('Dữ liệu không tồn tại.', Response::HTTP_NOT_FOUND);
            }

            $status = $customer->status == 1 ? 0 : 1;
            $this->groupCustomerRepository->update($id, ['status' => $status]);

            DB::commit();
            return $this->toResponseSuccess('Cập nhật trạng thái thành công.', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad('Cập nhật trạng thái thất bại.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
