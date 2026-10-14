import * as authenService from '../services/authentication.js'
const register = async (req, res) => {
    let data = await authenService.register(req.body);
    return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
    });
}

const login = async (req, res) => {
    let data = await authenService.login(req.body);
    if (data) {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
}
export {
    register,
    login
}