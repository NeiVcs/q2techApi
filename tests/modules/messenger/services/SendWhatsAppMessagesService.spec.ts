import {container} from "tsyringe";
import {SendWhatsAppMessagesService} from "../../../../src/modules/messenger/services/SendWhatsAppMessagesService";
        
describe('SendWhatsAppMessagesService', () => {
     let service: SendWhatsAppMessagesService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(SendWhatsAppMessagesService);
     });
     
     it('Deve testar cenario de SendWhatsAppMessages', async () => {
         //TODO: Implementar testes corretamente.
         expect('SendWhatsAppMessages').toEqual('SendWhatsAppMessages');
     });
 
});
