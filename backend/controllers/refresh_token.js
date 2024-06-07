import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
    try {
        const refresh_token = req.cookies.refreshToken;

        if (!refresh_token) {
            return res.status(401).json({'msg' : 'token tidak ada'});
        }

        const user = await prisma.users.findFirst({
            where: {
                refresh_token: refresh_token
            }
        });

        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
            if (err) {
                return res.sendStatus(403);
            }

            const userId = user.id_user;
            const username = user.username;
            const role = user.role;

            const accessToken = jwt.sign({ userId, username, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });

            res.json({ accessToken });
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
