<?php

namespace Modules\CatalogPriceRules\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\CatalogPriceRules\Http\Requests\StoreCatalogPriceRulesRequest;
use Modules\CatalogPriceRules\Http\Requests\UpdateCatalogPriceRulesRequest;
use Modules\CatalogPriceRules\Repositories\CatalogPriceRulesRepositoryInterface;
use Modules\CatalogPriceRules\Transformers\CatalogPriceRulesResource;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CatalogPriceRulesController extends Controller
{
    use ResponseTrait;

    /**
     * @var CatalogPriceRulesRepositoryInterface
     */
    protected $catalogPriceRulesRepository;

    /**
     * @param CatalogPriceRulesRepositoryInterface $catalogPriceRulesRepository
     */
    public function __construct(CatalogPriceRulesRepositoryInterface $catalogPriceRulesRepository)
    {
        $this->catalogPriceRulesRepository = $catalogPriceRulesRepository;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $catalogPriceRules = $this->catalogPriceRulesRepository->getAll();
        if ($catalogPriceRules->isEmpty()) {
            return $this->toResponseBad('Không có dữ liệu', Response::HTTP_NO_CONTENT);
        }
        return $this->toResponseSuccess($catalogPriceRules, 'Danh sách chương trình khuyến mãi', Response::HTTP_OK);
    }

    /**
     * @param StoreCatalogPriceRulesRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCatalogPriceRulesRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->catalogPriceRulesRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được tạo thành công',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $catalogPriceRule = $this->catalogPriceRulesRepository->find($id);
        if (!$catalogPriceRule) {
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess($catalogPriceRule, 'Chi tiết chương trình khuyến mãi', Response::HTTP_OK);
    }

    /**
     * @param UpdateCatalogPriceRulesRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateCatalogPriceRulesRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $catalogPriceRule = $this->catalogPriceRulesRepository->find($id);
            if (!$catalogPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->catalogPriceRulesRepository->update($id, $request->validated());

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được cập nhật thành công',
                Response::HTTP_OK
            );
        } catch (\Throwable $e) {
            DB::rollBack();
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
            $catalogPriceRule = $this->catalogPriceRulesRepository->find($id);
            if (!$catalogPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            // Xóa chương trình khuyến mãi
            $this->catalogPriceRulesRepository->delete($id);

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được xóa thành công',
                Response::HTTP_OK
            );
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback the transaction on error
            return $this->handleException($e);
        }
    }
}
