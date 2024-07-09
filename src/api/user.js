import API from "../services/axios"
import userRoutes from "../services/endpoints/userEndpoints"

const userRegister = async (fullName, email, password) => {
    try {
        const response = await API.post(userRoutes.register, {
            fullName,
            email,
            password
        })
        return response
    } catch (err) {
        console.log("Error occured during register", err);
        throw err
    }
}

export default userRegister