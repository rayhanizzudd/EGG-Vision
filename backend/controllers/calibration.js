import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCalibration = async (req, res) => {
  try {
    const response = await prisma.calibration.findMany({
      select: {
        id_calibration: true,
        length: true,
        width: true,
        scale_length:true,
        scale_width: true
      },
      where: {
        id_user: req.param.id_user,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const setCalibration = async (req, res) => {
  const { length, width, scale_width, scale_length, user_id } = req.body;
  try {
    const response = await prisma.calibration.create({
      data: {
        length: length,
        width: width,
        scale_length: scale_length,
        scale_width: scale_width,
        id_user: user_id,
      },
    });
    res.status(200).json({ msg: "Set Kalibrasi Berhasil" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const updateCalibration = async (req, res) => {
  const { length, width, scale_width, scale_length, user_id } = req.body;
  try {
    const response = await prisma.calibration.update({
      data: {
        length: length,
        width: width,
        scale_length: scale_length,
        scale_width: scale_width,
        id_user: user_id,
      },
      where: {
        id_calibration: parseInt(req.params.id),
      },
    });
    res.status(200).json({ msg: "Set Kalibrasi Berhasil" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
