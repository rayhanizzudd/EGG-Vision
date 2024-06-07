import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

export const Login = async (req, res) => {
    try {
        const response = await prisma.users.findMany({
            where: {
                username: req.body.username
            }
        });

        if (response.length === 0) {
            return res.status(404).json({ msg: "Username Salah" });
        }

        const user = response[0];
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(404).json({ msg: "Password Salah" });
        }

        const userId = user.id_user;
        const username = user.username;
        const role = user.role
        
        const accessToken = jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refresh_token = jwt.sign({ userId, username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        await prisma.users.update({
            where: { id_user: userId },
            data: {
                refresh_token: refresh_token
            }
        });

        res.json({ accessToken,  role});
    } catch (e) {
        res.status(500).json({"message" : e.message});
    }
};