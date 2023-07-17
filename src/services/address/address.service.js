import GenericService, {http} from "../generic.service";

const endpoint = 'address';

const actions = GenericService(endpoint);

export const addressService = {
    ...actions,

    getAllByClient: async (clientId) => {
        const res = await http.get(`/${endpoint}/client/${clientId}`);
        return res.data;
    }
}