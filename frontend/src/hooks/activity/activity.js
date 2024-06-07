import api from "../../lib/apiConfig.js"

export default function activity(){
    const totalEggCondition = async () => {
        const res = await api.get('total-condition');
        return res.data;
    }

    const totalGrade = async () => {
        const res = await api.get('total-grade');
        return res.data
    }

    const activitiyInWeek = async () => {
        const res = await api.get('activity-week');
        return res.data
    }
    
    return{
        totalEggCondition,
        totalGrade,
        activitiyInWeek
    }

}