import { singleton } from 'tsyringe';
import { DeleteCompanyInputDTO } from "@modules/company/dto/DeleteCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";
import { DeleteProductService } from '@modules/product/services/DeleteProductService';
import { DeleteAdditionalService } from '@modules/additional/services/DeleteAdditionalService';
import { DeleteOrderService } from '@modules/order/services/DeleteOrderService';
import { ProductRepository } from '@modules/product/data/ProductRepository';
import { AdditionalRepository } from '@modules/additional/data/AdditionalRepository';
import { OrderRepository } from '@modules/order/data/OrderRepository';


@singleton()
export class DeleteCompanyService {
  constructor(
    private companyStorage: CompanyRepository,
    private productStorage: ProductRepository,
    private additionalStorage: AdditionalRepository,
    private orderStorage: OrderRepository,
    private deleteProduct: DeleteProductService,
    private deleteAdditional: DeleteAdditionalService,
    private deleteOrder: DeleteOrderService
  ) { }

  public async execute(inputDTO: DeleteCompanyInputDTO): Promise<void> {
    const company = await this.companyStorage.findById(inputDTO.id)
    // retornar erro se nao existir company

    // validar senha

    // deletar cada produto

    this.deleteProducts(inputDTO)

    this.deleteAdditionals(inputDTO)

    this.deleteOrders(inputDTO)

    //await this.companyStorage.delete(inputDTO.id);
    return;
  }

  public async deleteProducts(inputDTO: DeleteCompanyInputDTO): Promise<void> {
    // const productsList = await this.productStorage.findByCompanyId({ companyId: inputDTO.id })
    // await this.deleteProduct.execute({ id: productsList.items[0].id })
  }

  public async deleteAdditionals(inputDTO: DeleteCompanyInputDTO): Promise<void> {
  }

  public async deleteOrders(inputDTO: DeleteCompanyInputDTO): Promise<void> {
  }
}
