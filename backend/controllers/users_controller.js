import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUserId = async (req, res)=>{
    try {
        const response = await prisma.users.findUnique({
            where:{
                id_user: parseInt(req.params.id)
        }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const response = await prisma.users.findMany({ 
            select: {
                id_user: true,
                username: true,
                role: true,
                status: true
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(204).json({"message" : error.message})
    }
}

export const addUser = async (req, res)=>{
    const {username, password, role, status} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        const response = await prisma.users.create({
            data: {
                username: username,
                password: hashPassword,
                role: role,
                status : status
            }
        })
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const editUser = async (req, res) => {
    const { username, status, role, password } = req.body;
    try {
        // Cek apakah username sudah ada di database, kecuali untuk user yang sedang diupdate
        const existingUser = await prisma.users.findFirst({
            where: {
                username: username,
                NOT: {
                    id_user: parseInt(req.params.id)
                }
            }
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Username sudah digunakan" });
        }

        // Update data user
        let updateData = {
            username: username,
            status: status,
            role: role
        };

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }

        const response = await prisma.users.update({
            where: {
                id_user: parseInt(req.params.id)
            },
            data: updateData
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deleteUsers = async (req, res) => {
    try {
        const response = await prisma.users.delete({
            where: {
                id_user : Number(req.params.id)
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(204).json({msg : error.message})
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await prisma.users.findMany({
        where: {refresh_token: refreshToken}
    });

    const userId = user[0].id_user;
    await prisma.users.update({
        where: { id_user: userId },
        data: { refresh_token: null }
    });
    res.clearCookie('refresh_token');
    return res.sendStatus(200);
};



