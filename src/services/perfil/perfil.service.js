import GenericService, {http} from "../generic.service";

const endpoint = 'perfil';

const actions = GenericService(endpoint);

export const perfilService = {
    ...actions,

    getAllByClient: async (clientId) => {
        const res = await http.get(`/${endpoint}/client/${clientId}`);
        return res.data;
    }
}