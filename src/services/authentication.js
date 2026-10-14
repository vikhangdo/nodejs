import { where } from 'sequelize';
import { Op } from '@sequelize/core';
import db from '../models/index.cjs';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashPassword = async (user_password) => {
    return await bcrypt.hash(user_password, salt);
}
const checkPassword = async (user_password, hash) => bcrypt.compare(user_password, hash);

//Validate
const validate_email = (user_email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(user_email)) {
        return "Email không hợp lệ!";
    }
}

const isEmailexist = async (user_email) => {
    let check = await db.Users.findOne({
        where: { email: user_email }
    })
    if (check) {
        return "Email đã tồn tại!";
    }
}

const isUsernameExist = async (user_username) => {
    let check = await db.Users.findOne({
        where: { username: user_username }
    })
    if (check) {
        return "Username đã tồn tại!";
    }
}

//Register
const register = async ({ email, username, password }) => {
    try {
        validate_email(email);
        await isEmailexist(email);
        await isUsernameExist(username);
        let hash = await hashPassword(password);
        await db.Users.create({
            email: email,
            username: username,
            password: hash
        })
        return {
            EM: "Đăng kí thành công!",
            EC: 0,
            DT: ''
        }
    } catch (error) {
        console.log("Lỗi server: ", error)
        return {
            EM: "Đăng kí không thành công!",
            EC: 1,
            DT: ''
        }
    }
}

//Login
const login = async ({ valueLogin, password }) => {
    try {
        let user = await db.Users.findOne({
            where: { [Op.or]: [{ email: valueLogin }, { username: valueLogin }], }
        })
        if (user) {
            let checkPass = await checkPassword(password, user.password);
            if (checkPass) {
                return {
                    EM: "Đăng nhập thành công!",
                    EC: 0,
                    DT: ''
                }
            } else {
                return {
                    EM: "Tài khoản hoặc mật khẩu không đúng!",
                    EC: 1,
                    DT: ''
                }
            }
        } else {
            return {
                EM: "Tài khoản hoặc mật khẩu không đúng!",
                EC: 1,
                DT: ''
            }
        }
    } catch (error) {
        console.log("Lỗi server: ", error);
        return {
            EM: "Không thể đăng kí!",
            EC: 1,
            DT: ''
        }
    }
}
export {
    register,
    login
}