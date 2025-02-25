<?php

namespace Modules\CartPriceRules\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\CartPriceRules\Http\Requests\StoreCartPriceRulesRequest;
use Modules\CartPriceRules\Http\Requests\UpdateCartPriceRulesRequest;
use Modules\CartPriceRules\Repositories\CartPriceRulesRepositoryInterface;
use Modules\CartPriceRules\Transformers\CartPriceRulesResource;
use Modules\Traits\PaginatedTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CartPriceRulesController extends Controller
{
    use ResponseTrait, PaginatedTrait;

    protected $cartPriceRulesRepository;

    public function __construct(CartPriceRulesRepositoryInterface $cartPriceRulesRepository)
    {
        $this->cartPriceRulesRepository = $cartPriceRulesRepository;
    }


    public function index(Request $request)
    {
        try {
            $cartPriceRule = $this->cartPriceRulesRepository->getPaginated($request);
            if ($cartPriceRule->isEmpty()) {
                return $this->toResponseBad('Không có dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(
                $this->formatPaginatedResponse($cartPriceRule, CartPriceRulesResource::class),
                'Danh sách chương trình khuyến mãi',
                Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $salesRules = $this->cartPriceRulesRepository->find($id);

            if (!$salesRules) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }

            return $this->toResponseSuccess(new CartPriceRulesResource($salesRules), 'Chi tiết chương trình khuyến mãi', Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }


    public function store(StoreCartPriceRulesRequest $request)
    {
        DB::beginTransaction();
        try {
            // Kiểm tra xem coupon đã tồn tại chưa
            if ($this->cartPriceRulesRepository->existsByCoupon($request->coupon)) {
                return $this->toResponseBad('Mã giảm giá đã tồn tại!', Response::HTTP_BAD_REQUEST);
            }
            // Lưu thông tin chương trình khuyến mãi
            $salesRules = $this->cartPriceRulesRepository->create($request->validated());

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được tạo thành công',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback the transaction on error
            return $this->handleException($e);
        }
    }


    public function update(UpdateCartPriceRulesRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            // Tìm quy tắc giá giỏ hàng cần cập nhật
            $cartPriceRule = $this->cartPriceRulesRepository->find($id);

            //Kiểm tra xem quy tắc giá giỏ hàng có tồn tại không
            if (!$cartPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }

            // Kiểm tra xem mã giảm giá đã tồn tại chưa
            if ($this->cartPriceRulesRepository->existsByCoupon($request->coupon, $id)) {
                return $this->toResponseBad('Mã giảm giá đã tồn tại!', Response::HTTP_BAD_REQUEST);
            }

            // Cập nhật thông tin của quy tắc
            $cartPriceRule->update($request->validated());

            DB::commit();
            return $this->toResponseSuccess(null, 'Cart Price Rule updated successfully', Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            // Tìm chương trình khuyến mãi theo ID
            $cartPriceRule = $this->cartPriceRulesRepository->find($id);

            if (!$cartPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }
            $this->cartPriceRulesRepository->update($id, ['is_active' => 0]);
            $cartPriceRule->delete();

            DB::commit();
            return $this->toResponseSuccess(null, 'Chương trình khuyến mãi đã được xóa thành công', Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback giao dịch khi có lỗi
            return $this->handleException($e);
        }
    }
}
