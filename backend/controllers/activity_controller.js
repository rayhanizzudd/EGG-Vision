import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import moment from 'moment-timezone';


const prisma = new PrismaClient();

export const addActivity = async (req, res) => {
  const { egg_inside, user_id, egg_width, egg_length, grade } = req.body;
  const timeInUTC7 = moment().tz("Asia/Jakarta").format();

  try {
    const response = await prisma.activity.create({
      data: {
        egg_inside: egg_inside,
        egg_width: egg_width,
        user_id: user_id,
        egg_length: egg_length,
        grade: grade,
        date_log: new Date(timeInUTC7)
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getActivityId = async (req, res) => {
  try {
    const response = await prisma.activity.findMany({
      where: {
        user_id: parseInt(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getAllActivity = async (req, res) => {
  try {
    const response = await prisma.activity.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getCountActivityUsers = async (req, res) => {
  try {
    const usersHistoryWithCount = await prisma.users.findMany({
      select: {
        id_user: true,
        username: true,
        _count: {
          select: {
            activity: true,
          },
        },
      },
      where : {
        role: "pegawai"
      }
    });
    res.status(200).json(usersHistoryWithCount);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getAllActivityWithUsername = async (req, res) => {
    try {
        const response = await prisma.users.findMany(
            {
                select: {
                    activity: true
                },
                where: {
                    username: req.params.username
                }
            }
        )
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const getTotalCodition = async (req, res) => {
  try {
    const totalFertile = await prisma.activity.count({
      where: {
        egg_inside: 'fertile',
      },
    });

    const totalNonFertile = await prisma.activity.count({
      where: {
        egg_inside: 'nonfertile',
      },})
    
      res.status(200).json({totalFertile, totalNonFertile})
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}

export const getTotalbyGrade = async (req, res) => {
  try {
    const totalGrade = await prisma.activity.groupBy({
      by: ["grade"],
      _count: {
        grade: true,
      },
    })
    res.status(200).json(totalGrade)
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}

export const totalGradeInWeek = async (req, res) => {
  const startWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  const startOfWeek = startWeek(new Date);
  const endOfWeek = new Date(startOfWeek.getTime());
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const rawData = await prisma.activity.findMany({
    where: {
      date_log: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    select: {
      date_log: true,
      grade: true,
    },
  });

  const data = {
    labels: ['Grade A', 'Grade B', 'Grade C'],
    datasets: [],
  };

  const dayMap = {
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu",
    0: "Minggu",
  };

  const weekData = {};

  for (const entry of rawData) {
    const day = dayMap[entry.date_log.getDay()];
    const grade = entry.grade;

    if (!weekData[day]) {
      weekData[day] = {
        A: 0,
        B: 0,
        C: 0,
      };
    }

    weekData[day][grade]++;
  }

  res.status(200).json(weekData);
}

export const deleteDataActivity = async (req, res) => {
  try {
    const response = await prisma.activity.deleteMany({
      where: {
        user_id: Number(req.params.id)
      }
    })
    return res.status(200).json(response)
  } catch (error) {
    return rs.status(400).json(error)
    
  }
}